const fs = require('fs')
const path = require('path')

const tempConfigPath = path.resolve(__dirname, 'dist/react-native.config.js')
const baseConfig = {}

let mergedConfig = baseConfig
if (fs.existsSync(tempConfigPath)) {
  const tempConfig = require(tempConfigPath) // allow dist config to override defaults
  mergedConfig = {
    ...mergedConfig,
    ...(tempConfig || {}),
  }
}

module.exports = mergedConfig
