import { defineConfig } from '@tarojs/cli'
import path from 'node:path'

export default defineConfig({
  rn: {
    postcss: {
      'postcss-css-variables': {
        enable: false
      },
      variables(value) {
        const name = value.slice(4, value.length - 1)
        return `theme['${name}']`
      }
    },
    styleSheet: {
      getWrapedCSS(css) {
        const userThemePath = path.resolve(process.cwd(), 'src', 'duxapp', 'userTheme', 'index.rn.js')
        return `import { StyleSheet } from 'react-native'
import { scalePx2dp, scaleVu2dp } from '@tarojs/runtime-rn'
import themes from '${userThemePath}'

// 用来标识 rn-runner transformer 是否读写缓存
function ignoreStyleFileCache() {}

export default (() => {
  let currentMode
  let currentStyle
  return mode => {
    if (currentMode !== mode) {
      const theme = themes[mode] || {}
      currentStyle = StyleSheet.create(${cssReplace(css)})
      currentMode = mode
    }
    return currentStyle
  }
})()
`;
      }
    }
  }
})

const cssReplace = css => {
  return css.replace(/theme\['--([a-zA-Z0-9-]{1,})'\]/g, (res, name) => {
    return `theme['${name.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}']`
  })
}
