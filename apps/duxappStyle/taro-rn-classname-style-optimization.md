# Taro RN `className` 样式稳定化/去重方案（草案）

## 背景与问题

RN 端目前使用 `babel-plugin-transform-react-jsx-to-rn-stylesheet`（由 `@tarojs/rn-supporter` 注入）将 JSX 的 `className` 转换为 `style`。

现状的核心问题是：

- **静态** `className="r-2 bg-white p-3 gap-2"` 在编译后通常会变成运行期合并（例如 `Object.assign` / `_mergeEleStyles`），导致 **每次 render 都会产生新的 style 对象引用**。
- **动态** `className={classNames('items-center gap-3', className)}` 会走 `_getStyle(...)`，其内部 `var style = {}; ... Object.assign(...)` 同样 **每次调用返回新对象引用**。

最终表现为：React 浅比较无法命中（`memo`/`PureComponent`/`shouldComponentUpdate` 等优化失效），并且会带来不必要的 GC 压力。

## 关键约束

1. **类名可能存在冲突**（例如 `p-2 p-3`），但业务上较少刻意这么写；仍需保证语义正确。
2. **主题切换机制**：当前主题切换是“整体重新生成并返回一张新的样式表（`_styleSheet`）”，而不是通过 `themeId` 解析 token 的方式。
3. 因为 (2)，任何将“最终数值 style”编译期固化为常量的做法，都可能在主题切换后变成 **过期样式**，除非样式值本身仍可在运行期随样式表变化而更新。
4. **不做**“从运行结果倒推 token”：歧义大且不稳定。

## 目标

- 对静态/动态 `className`，尽可能返回 **稳定引用**（同一主题/同一 `_styleSheet` 实例下，相同输入应复用同一个 style 引用）。
- 在主题切换（`_styleSheet` 整体替换）时，缓存能够 **自动失效/隔离**，避免样式串主题。
- 不改变现有样式覆盖语义：遇到冲突时遵循 **原有 token 顺序**（后者覆盖前者）。

## 总体方案（两段式：编译期收敛 + 运行期按样式表缓存）

### A. 编译期：识别“纯静态 className”并生成短名（不固化最终数值）

对以下可判定为纯静态的写法做处理：

- `className="a b c"`（字符串字面量）
- 可选：`classNames('a b', 'c')` 且所有参数都可在编译期求值为静态字符串（仅在把握住实现复杂度时再做）

编译期输出内容：

1. 为静态 className 生成 **短名**（例如 `a`/`b`/`c` 或 `s1`/`s2`…）。
2. 生成一个“短名注册表”（registry），将短名映射到 **原始 class token 字符串**（保持顺序，不排序）。

注意：编译期阶段只做“短名化/收敛”，不生成最终合并后的数值 style，以适配“主题切换会替换 `_styleSheet`”的约束。

### B. 运行期：按 `_styleSheet` 实例做缓存，返回稳定引用

#### 1) 静态短名样式：`shortName -> style`（per-styleSheet）

为“短名注册表”提供运行期 API，例如：

- 输入：当前 `_styleSheet` 实例 + `shortName`
- 输出：该短名对应的 **合并后 style 引用**

缓存策略：

- 使用 `WeakMap` 以 `_styleSheet` 实例作为第一层 key，避免主题切换串缓存：
  - `WeakMap<styleSheetObject, Map<shortName, mergedStyle>>`
- 主题切换时 `_styleSheet` 会换新对象：天然落在新的 WeakMap 分桶中，旧缓存可被 GC 回收。

合并规则：

- 取 registry 中该 shortName 对应的 class tokens（保持原顺序）。
- 将每个 token 映射为 `_styleSheet[token]`，按顺序合并，后者覆盖前者。
- 产物应尽可能保持为 RN 可接受的形式（对象或数组），但要保证 **返回引用稳定**（同一个 `_styleSheet` + `shortName` 下只创建一次）。

#### 2) 动态 className：`classString -> style`（per-styleSheet）

对动态表达式（如 `classNames('items-center gap-3', className)`、`className={cond ? 'a' : 'b'}`、数组/对象等）：

- `_getStyle` 改为带缓存版本（或旁路一个新的缓存函数），缓存 key 建议使用“归一化后的 class 字符串”：
  - 仅做空白规整（trim + 连续空白折叠），**不排序**，以保留潜在冲突语义。
- 同样按 `_styleSheet` 实例隔离缓存：
  - `WeakMap<styleSheetObject, Map<classKey, mergedStyle>>`

内存控制：

- 动态 classKey 可能高基数（例如拼接变量导致 classString 无限组合），需要上限策略：
  - 简单上限：`Map.size` 超过阈值时清空/按 FIFO 删除
  - 或引入轻量 LRU（视复杂度决定）

### C. 混合场景：`classNames('static tokens', dynamic)`

典型写法：`className={classNames('items-center gap-3', className)}`

建议拆分策略：

- 静态前缀 `'items-center gap-3'`：走编译期短名化，运行期通过 `shortName` 获取稳定引用 `S_static`。
- 动态部分 `className`：走动态缓存，得到稳定引用 `S_dynamic`（在同 `_styleSheet` 实例内稳定）。
- 最终组合：
  - 需要避免每次 render 创建新数组/新对象引用；可引入第二级“组合缓存”：
    - key：`shortName + '|' + classKey`（同样按 `_styleSheet` 实例隔离）
    - value：`[S_static, S_dynamic]`（或 compose 结果），保证引用稳定。

## 关于“顺序不同但类相同归一”的决定

本方案默认 **不做 token 重排/排序**：

- 因为存在冲突类（如 `p-2 p-3`），重排会改变覆盖语义。
- 即使当前业务很少写冲突，也不建议通过排序来“赌”语义正确。

如果后续要进一步优化，可在确认“冲突可控”的前提下引入更激进的 canonical 规则（例如按属性组解决冲突），但这不属于当前方案的必要条件。

## 可选：全局原子样式表（工程收敛项）

可将 RN 端散落的样式导入聚合为一个全局入口，减少各页面/组件重复 import/merge 的碎片化。

但注意：

- 这不是解决“render 期新引用”的关键点（关键仍是 hoist/缓存）。
- 是否落地取决于当前 CSS 导入模式和构建链路复杂度。

## 落地位置（实现点提示）

- 编译期短名化：修改/扩展 `babel-plugin-transform-react-jsx-to-rn-stylesheet`
  - 识别静态 `className` / 可静态求值的 `classNames(...)`
  - 生成 registry（可模块级或汇总到全局模块）
  - 将 JSX 属性替换为短名引用（或替换为对运行期 API 的调用）
- 运行期缓存：提供一个可被编译产物调用的 helper（推荐独立模块）
  - `WeakMap` 分桶：按 `_styleSheet` 实例隔离
  - 支持 shortName 与动态 classKey 两类缓存
  - 支持组合缓存（静态 + 动态）

