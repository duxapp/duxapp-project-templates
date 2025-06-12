const config = {
  pages: {
    'user/auth': {
      pages: {
        start: {
          // 此页面默认禁用,可以在配置里面开启，当你的app是需要默认就登录的则在配置里面开启
          disable: true,
          home: true
        },
        login: {}
      }
    }
  }
}

export default config
