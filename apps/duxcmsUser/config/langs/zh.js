export default {
  common: {
    next: '下一步',
    submit: '提交'
  },
  discuss: {
    title: '评论',
    empty: '暂无评论',
    viewAll: '查看全部'
  },
  comment: {
    title: '评价列表',
    sectionTitle: '评论({{count}})',
    positiveRate: '好评度 {{rate}}%',
    empty: '暂无评价',
    viewAll: '查看全部评价',
    anonymous: '匿名',
    tabs: {
      all: '全部({{count}})',
      good: '好评({{count}})',
      medium: '中评({{count}})',
      bad: '差评({{count}})'
    }
  },
  collect: {
    title: '我的收藏',
    empty: '没有相关收藏',
    time: '收藏时间：{{date}}',
    remove: '移除'
  },
  foot: {
    title: '足迹',
    empty: '没有足迹'
  },
  info: {
    setting: {
      title: '用户信息',
      avatar: '我的头像',
      nickname: '昵称',
      sex: '性别',
      birthday: '出生日期',
      phone: '手机号',
      phoneAction: '更换手机号',
      password: '登录密码',
      passwordAction: '去修改',
      logoff: '注销账户'
    },
    avatar: {
      title: '设置头像',
      permission: '用于修改用户头像',
      empty: '空',
      upload: '上传头像',
      useWechat: '使用微信头像'
    },
    nickname: {
      title: '昵称',
      placeholder: '请输入昵称'
    },
    sex: {
      male: '男',
      female: '女',
      secret: '保密'
    },
    birthday: {
      unset: '未设置'
    },
    phone: {
      title: '更换手机号',
      newPhone: '新手机号',
      boundPhone: '绑定的手机号',
      newPhonePlaceholder: '请输入新手机号',
      code: '验证码',
      codePlaceholder: '请输入验证码',
      incomplete: '请输入完整！',
      success: '修改成功',
      bind: '绑定',
      next: '下一步'
    },
    password: {
      verifyTitle: '身份验证',
      newTitle: '新密码',
      boundPhone: '绑定的手机号',
      code: '验证码',
      codePlaceholder: '请输入验证码',
      newPassword: '新密码',
      newPasswordPlaceholder: '输入新密码',
      confirmPassword: '再次输入',
      confirmPasswordPlaceholder: '再次输入新密码',
      codeRequired: '请输入验证码',
      codeInvalid: '请输入正确的验证码',
      mismatch: '两次密码不一致',
      success: '修改成功'
    },
    forget: {
      title: '找回密码',
      phoneRequired: '请输入手机号',
      resetSuccess: '重置成功',
      phonePlaceholder: '请输入手机号',
      codePlaceholder: '请输入验证码',
      passwordPlaceholder: '请再次输入新密码'
    },
    logoff: {
      title: '注销账户',
      confirmTitle: '注销账户',
      confirmContent: '警告，您正在执行危险操作，注销账户后，您的数据将会被删除，且无法撤销，请谨慎选择！',
      confirmButton: '确认注销',
      success: '注销成功',
      misopTip: '如果您是误操作，请点[暂不注销]',
      noticeTitle: '注销提示',
      noticeBody: '一旦注销成功\n你的账号将无法登录和使用。\n你的账号信息和会员权益将永久清除且无法恢复。',
      stay: '暂不注销'
    }
  },
  notice: {
    title: '通知',
    markReadConfirm: '是否标记为已读？',
    markAll: '一键已读',
    empty: '暂无记录'
  },
  feedback: {
    title: '意见反馈',
    success: '提交成功',
    platform: {
      wechat: '微信',
      qq: 'QQ'
    },
    contentLabel: '反馈说明',
    contentPlaceholder: '1-200字以内',
    imagesLabel: '上传图片',
    weappTip: '此反馈为小程序自有反馈渠道，非{{platform}}官方投诉渠道'
  },
  login: {
    greeting: '您好，',
    bindAccount: '请绑定账户',
    welcome: '欢迎{{action}}{{appName}}',
    login: '登录',
    register: '注册',
    passwordPlaceholder: '请输入密码',
    setLoginPassword: '请设置登录密码',
    codePlaceholder: '输入短信验证码',
    needPhoneOrEmail: '请输入正确的手机号或者邮箱',
    needPhone: '请输入正确的手机',
    needEmail: '请输入正确的邮箱',
    agreementModal: {
      title: '系统提示',
      prefix: '为了更好地保障您的合法权益，请您阅读并同意以下协议',
      and: '和',
      confirmText: '已阅读并同意',
      cancelText: '不同意',
      disagreeThrow: '用户不同意'
    },
    serviceAgreementTitle: '服务协议',
    privacyPolicyTitle: '隐私政策',
    serviceAgreementText: '《服务协议》',
    privacyPolicyText: '《隐私政策》',
    agreed: '已阅读并同意',
    invalidAccount: '您输入了一个无效账号，将无法登录',
    needPhoneHint: '请输入手机号后，将自动识别您的账号是否需要注册',
    next: '下一步',
    noLoginMethod: '未开启任何登录方式',
    usernamePlaceholder: {
      phone: '输入您的手机号码',
      email: '请输入您的邮箱',
      phoneOrEmail: '请输入手机号或邮箱'
    },
    needCode: '请输入验证码',
    needPassword: '请输入密码',
    submit: {
      registerAndBind: '注册并绑定',
      bind: '绑定',
      registerAndLogin: '注册并登录',
      login: '登录'
    },
    switchToCode: '验证码登录',
    switchToPassword: '密码登录',
    forget: '忘记密码?',
    moreLogin: '更多登录方式',
    needAgreeService: '请同意服务协议',
    wxLoginFail: '微信登录失败',
    weappTel: {
      title: '登录',
      quickLogin: '手机号快捷登录',
      needReadPrivacy: '请阅读并勾选同意隐私政策',
      gotIt: '知道了',
      useOtherPhone: '使用其他手机号',
      readAndAgree: '阅读并同意'
    }
  },
  user: {
    notBoundAccount: '未绑定账户 请绑定账户',
    pleaseBind: '请绑定账户',
    cancelLogin: '用户取消登录',
    loggingIn: '正在登录',
    wechatNotInstalled: '未安装微信客户端',
    platformNotSupportAppWechat: '平台错误 不支持微信APP登陆',
    updateSuccess: '更新成功',
    singleSignTitle: '警告',
    singleSignContent: '你的账号在其他设备已登录，请检查账号密码是否泄露',
    loggedOutNeedRelogin: '你已退出登录 请重新登录',
    devTokenExpiring: 'Token即将过期 请使用新的token覆盖devToken: {{token}}'
  }
}
