# duxapp框架项目初始化模板库

## 搭建环境

需要安装以下工具环境，才能正常进行duxapp的开发

- [nodejs 20+](https://nodejs.cn/download/)
- [git命令行工具](https://git-scm.com/downloads)
- yarn  
使用命令 `npm i yarn -g` 安装

## 初始化一个项目

```bash
npx duxapp-cli create projectName
```

`projectName` 是项目名称，项目初始化后将会自动安装依赖，安装完成就可以打开项目进行开发了，命令执行过程中，你可以选择你需要的模板，当前提供了以下模板选择

- 基础模板(仅包含基础duxapp模块)
- 移动端页面编辑器(编辑器示例代码模块)
- cms商城(单用户商城模块 支持RN端)
- duxui 示例代码(包含所有组件的示例代码 支持RN端)

## 运行

安装完成后，根据选择的不同模板，命令行将会提示不同的运行命令，下面的是运行基础模块的命令

```bash
# 运行小程序
yarn dev:weapp --app=duxapp
# 运行H5
yarn dev:h5 --app=duxapp
```
运行命令是在Taro的基础上加了 `--app=模块` 参数，用来指定要运行的模块，模块位于 `src` 目录下，每个文件夹就是一个模块
