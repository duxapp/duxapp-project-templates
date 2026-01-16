# Chart.js
基于 `duxappCanvas` 的 Chart.js v4 封装，支持多端渲染。
## 安装

```bash
yarn duxapp app add duxappChartJs
```

## 使用
```jsx
import { Chart } from '@/duxappChartJs'
import { useMemo, useState } from 'react'

export default function Demo() {
  const [data] = useState([120, 200, 150, 80, 70, 110, 130])
  const config = useMemo(() => ({
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{ label: '销量', data }]
    }
  }), [data])

  return (
    <Chart
      style={{ height: 300 }}
      config={config}
    />
  )
}
```

## 配置建议
- `config` 传入后会驱动图表更新，建议放在 `state`/`useMemo` 中保持引用稳定。
- 当数据变化时，只更新 `config.data` 相关字段，避免每次 render 都创建新的对象。
