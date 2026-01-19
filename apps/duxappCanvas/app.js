if (process.env.TARO_ENV === 'rn') {
  // 禁止使用 NativeReanimatedContainer 绘制 会大幅降低性能
  global._skiaUseReanimated = false
}
