export default {
  common: {
    next: '下一步',
    submit: '提交'
  },
  discuss: {
    title: '評論',
    empty: '暫無評論',
    viewAll: '查看全部'
  },
  comment: {
    title: '評價列表',
    sectionTitle: '評論({{count}})',
    positiveRate: '好評度 {{rate}}%',
    empty: '暫無評價',
    viewAll: '查看全部評價',
    anonymous: '匿名',
    tabs: {
      all: '全部({{count}})',
      good: '好評({{count}})',
      medium: '中評({{count}})',
      bad: '差評({{count}})'
    }
  },
  collect: {
    title: '我的收藏',
    empty: '沒有相關收藏',
    time: '收藏時間：{{date}}',
    remove: '移除'
  },
  foot: {
    title: '足跡',
    empty: '沒有足跡'
  },
  info: {
    setting: {
      title: '用戶資訊',
      avatar: '我的頭像',
      nickname: '暱稱',
      sex: '性別',
      birthday: '出生日期',
      phone: '手機號',
      phoneAction: '更換手機號',
      password: '登入密碼',
      passwordAction: '去修改',
      logoff: '註銷帳戶'
    },
    avatar: {
      title: '設定頭像',
      permission: '用於修改用戶頭像',
      empty: '空',
      upload: '上傳頭像',
      useWechat: '使用微信頭像'
    },
    nickname: {
      title: '暱稱',
      placeholder: '請輸入暱稱'
    },
    sex: {
      male: '男',
      female: '女',
      secret: '保密'
    },
    birthday: {
      unset: '未設定'
    },
    phone: {
      title: '更換手機號',
      newPhone: '新手機號',
      boundPhone: '綁定的手機號',
      newPhonePlaceholder: '請輸入新手機號',
      code: '驗證碼',
      codePlaceholder: '請輸入驗證碼',
      incomplete: '請輸入完整！',
      success: '修改成功',
      bind: '綁定',
      next: '下一步'
    },
    password: {
      verifyTitle: '身份驗證',
      newTitle: '新密碼',
      boundPhone: '綁定的手機號',
      code: '驗證碼',
      codePlaceholder: '請輸入驗證碼',
      newPassword: '新密碼',
      newPasswordPlaceholder: '輸入新密碼',
      confirmPassword: '再次輸入',
      confirmPasswordPlaceholder: '再次輸入新密碼',
      codeRequired: '請輸入驗證碼',
      codeInvalid: '請輸入正確的驗證碼',
      mismatch: '兩次密碼不一致',
      success: '修改成功'
    },
    forget: {
      title: '找回密碼',
      phoneRequired: '請輸入手機號',
      resetSuccess: '重置成功',
      phonePlaceholder: '請輸入手機號',
      codePlaceholder: '請輸入驗證碼',
      passwordPlaceholder: '請再次輸入新密碼'
    },
    logoff: {
      title: '註銷帳戶',
      confirmTitle: '註銷帳戶',
      confirmContent: '警告，您正在執行危險操作，註銷帳戶後，您的資料將會被刪除，且無法撤銷，請謹慎選擇！',
      confirmButton: '確認註銷',
      success: '註銷成功',
      misopTip: '如果您是誤操作，請點[暫不註銷]',
      noticeTitle: '註銷提示',
      noticeBody: '一旦註銷成功\n你的帳號將無法登入和使用。\n你的帳號資訊和會員權益將永久清除且無法恢復。',
      stay: '暫不註銷'
    }
  },
  notice: {
    title: '通知',
    markReadConfirm: '是否標記為已讀？',
    markAll: '一鍵已讀',
    empty: '暫無記錄'
  },
  feedback: {
    title: '意見反饋',
    success: '提交成功',
    platform: {
      wechat: '微信',
      qq: 'QQ'
    },
    contentLabel: '反饋說明',
    contentPlaceholder: '1-200字以內',
    imagesLabel: '上傳圖片',
    weappTip: '此反饋為小程式自有反饋渠道，非{{platform}}官方投訴渠道'
  },
  login: {
    greeting: '您好，',
    bindAccount: '請綁定帳戶',
    welcome: '歡迎{{action}}{{appName}}',
    login: '登入',
    register: '註冊',
    passwordPlaceholder: '請輸入密碼',
    setLoginPassword: '請設定登入密碼',
    codePlaceholder: '輸入簡訊驗證碼',
    needPhoneOrEmail: '請輸入正確的手機號或郵箱',
    needPhone: '請輸入正確的手機號',
    needEmail: '請輸入正確的郵箱',
    agreementModal: {
      title: '系統提示',
      prefix: '為了更好地保障您的合法權益，請您閱讀並同意以下協議',
      and: '和',
      confirmText: '已閱讀並同意',
      cancelText: '不同意',
      disagreeThrow: '用戶不同意'
    },
    serviceAgreementTitle: '服務協議',
    privacyPolicyTitle: '隱私政策',
    serviceAgreementText: '《服務協議》',
    privacyPolicyText: '《隱私政策》',
    agreed: '已閱讀並同意',
    invalidAccount: '您輸入了一個無效帳號，將無法登入',
    needPhoneHint: '請輸入手機號後，將自動識別您的帳號是否需要註冊',
    next: '下一步',
    noLoginMethod: '未開啟任何登入方式',
    usernamePlaceholder: {
      phone: '輸入您的手機號碼',
      email: '請輸入您的郵箱',
      phoneOrEmail: '請輸入手機號或郵箱'
    },
    needCode: '請輸入驗證碼',
    needPassword: '請輸入密碼',
    submit: {
      registerAndBind: '註冊並綁定',
      bind: '綁定',
      registerAndLogin: '註冊並登入',
      login: '登入'
    },
    switchToCode: '驗證碼登入',
    switchToPassword: '密碼登入',
    forget: '忘記密碼?',
    moreLogin: '更多登入方式',
    needAgreeService: '請同意服務協議',
    wxLoginFail: '微信登入失敗',
    weappTel: {
      title: '登入',
      quickLogin: '手機號快捷登入',
      needReadPrivacy: '請閱讀並勾選同意隱私政策',
      gotIt: '知道了',
      useOtherPhone: '使用其他手機號',
      readAndAgree: '閱讀並同意'
    }
  },
  user: {
    notBoundAccount: '未綁定帳戶 請綁定帳戶',
    pleaseBind: '請綁定帳戶',
    cancelLogin: '用戶取消登入',
    loggingIn: '正在登入',
    wechatNotInstalled: '未安裝微信客戶端',
    platformNotSupportAppWechat: '平台錯誤 不支援微信APP登入',
    updateSuccess: '更新成功',
    singleSignTitle: '警告',
    singleSignContent: '你的帳號在其他裝置已登入，請檢查帳號密碼是否洩露',
    loggedOutNeedRelogin: '你已退出登入 請重新登入',
    devTokenExpiring: 'Token即將過期 請使用新的token覆蓋devToken: {{token}}'
  }
}
