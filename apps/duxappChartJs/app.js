import '@/duxappCanvas/global'

// 兼容小程序 Intl 不存在的问题
if (process.env.TARO_PLATFORM === 'mini') {
  if (!global.Intl) {
    global.Intl = {
      NumberFormat: (locale, options = {}) => ({
        format: (value) => {
          const num = Number(value)
          if (!Number.isFinite(num)) return String(value)
          const min = Number.isFinite(options.minimumFractionDigits)
            ? options.minimumFractionDigits
            : null
          const max = Number.isFinite(options.maximumFractionDigits)
            ? options.maximumFractionDigits
            : null
          const digits = max ?? min
          if (Number.isFinite(digits)) {
            return num.toFixed(digits)
          }
          return String(num)
        },
        resolvedOptions: () => ({ locale: typeof locale === 'string' ? locale : 'en' })
      })
    }
    global.Intl.NumberFormat.supportedLocalesOf = () => []
  }
}
