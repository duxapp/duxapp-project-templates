export default {
  common: {
    next: 'Next',
    submit: 'Submit'
  },
  discuss: {
    title: 'Comments',
    empty: 'No comments',
    viewAll: 'View all'
  },
  comment: {
    title: 'Reviews',
    sectionTitle: 'Reviews ({{count}})',
    positiveRate: 'Positive rate {{rate}}%',
    empty: 'No reviews',
    viewAll: 'View all reviews',
    anonymous: 'Anonymous',
    tabs: {
      all: 'All ({{count}})',
      good: 'Positive ({{count}})',
      medium: 'Neutral ({{count}})',
      bad: 'Negative ({{count}})'
    }
  },
  collect: {
    title: 'My favorites',
    empty: 'No favorites',
    time: 'Saved at: {{date}}',
    remove: 'Remove'
  },
  foot: {
    title: 'History',
    empty: 'No history'
  },
  info: {
    setting: {
      title: 'Profile',
      avatar: 'Avatar',
      nickname: 'Nickname',
      sex: 'Gender',
      birthday: 'Birthday',
      phone: 'Phone',
      phoneAction: 'Change',
      password: 'Password',
      passwordAction: 'Change',
      logoff: 'Delete account'
    },
    avatar: {
      title: 'Avatar',
      permission: 'Used to update avatar',
      empty: 'N/A',
      upload: 'Upload avatar',
      useWechat: 'Use WeChat avatar'
    },
    nickname: {
      title: 'Nickname',
      placeholder: 'Enter nickname'
    },
    sex: {
      male: 'Male',
      female: 'Female',
      secret: 'Private'
    },
    birthday: {
      unset: 'Not set'
    },
    phone: {
      title: 'Change phone',
      newPhone: 'New phone',
      boundPhone: 'Current phone',
      newPhonePlaceholder: 'Enter new phone',
      code: 'Code',
      codePlaceholder: 'Enter code',
      incomplete: 'Please complete all fields',
      success: 'Updated',
      bind: 'Bind',
      next: 'Next'
    },
    password: {
      verifyTitle: 'Verify identity',
      newTitle: 'New password',
      boundPhone: 'Current phone',
      code: 'Code',
      codePlaceholder: 'Enter code',
      newPassword: 'New password',
      newPasswordPlaceholder: 'Enter new password',
      confirmPassword: 'Confirm',
      confirmPasswordPlaceholder: 'Re-enter password',
      codeRequired: 'Enter code',
      codeInvalid: 'Invalid code',
      mismatch: 'Passwords do not match',
      success: 'Updated'
    },
    forget: {
      title: 'Forgot password',
      phoneRequired: 'Enter phone number',
      resetSuccess: 'Reset successful',
      phonePlaceholder: 'Enter phone number',
      codePlaceholder: 'Enter code',
      passwordPlaceholder: 'Re-enter new password'
    },
    logoff: {
      title: 'Delete account',
      confirmTitle: 'Delete account',
      confirmContent: 'Warning: deleting your account will remove your data permanently and cannot be undone.',
      confirmButton: 'Confirm',
      success: 'Account deleted',
      misopTip: 'If this was a mistake, tap [Keep account].',
      noticeTitle: 'Notice',
      noticeBody: 'Once deleted,\nyou will no longer be able to sign in.\nYour data and benefits will be removed permanently.',
      stay: 'Keep account'
    }
  },
  notice: {
    title: 'Notifications',
    markReadConfirm: 'Mark all as read?',
    markAll: 'Mark all read',
    empty: 'No records'
  },
  feedback: {
    title: 'Feedback',
    success: 'Submitted',
    platform: {
      wechat: 'WeChat',
      qq: 'QQ'
    },
    contentLabel: 'Details',
    contentPlaceholder: '1-200 characters',
    imagesLabel: 'Images',
    weappTip: 'This feedback channel is provided by the mini program, not the official {{platform}} complaint channel.'
  },
  login: {
    greeting: 'Hi,',
    bindAccount: 'Bind your account',
    welcome: 'Welcome to {{appName}} - {{action}}',
    login: 'Sign in',
    register: 'Sign up',
    passwordPlaceholder: 'Enter password',
    setLoginPassword: 'Set a password',
    codePlaceholder: 'SMS code',
    needPhoneOrEmail: 'Enter a valid phone or email',
    needPhone: 'Enter a valid phone number',
    needEmail: 'Enter a valid email',
    agreementModal: {
      title: 'Notice',
      prefix: 'To protect your rights, please read and agree to the following:',
      and: 'and',
      confirmText: 'Agree',
      cancelText: 'Decline',
      disagreeThrow: 'User declined'
    },
    serviceAgreementTitle: 'Terms of Service',
    privacyPolicyTitle: 'Privacy Policy',
    serviceAgreementText: 'Terms of Service',
    privacyPolicyText: 'Privacy Policy',
    agreed: 'I have read and agree',
    invalidAccount: 'Invalid account, unable to sign in',
    needPhoneHint: 'Enter your phone number and we will detect whether you need to sign up',
    next: 'Next',
    noLoginMethod: 'No login method enabled',
    usernamePlaceholder: {
      phone: 'Phone number',
      email: 'Email address',
      phoneOrEmail: 'Phone or email'
    },
    needCode: 'Enter code',
    needPassword: 'Enter password',
    submit: {
      registerAndBind: 'Sign up & bind',
      bind: 'Bind',
      registerAndLogin: 'Sign up & sign in',
      login: 'Sign in'
    },
    switchToCode: 'Use code',
    switchToPassword: 'Use password',
    forget: 'Forgot password?',
    moreLogin: 'More ways to sign in',
    needAgreeService: 'Please agree to the terms',
    wxLoginFail: 'WeChat login failed',
    weappTel: {
      title: 'Sign in',
      quickLogin: 'Quick sign in with phone',
      needReadPrivacy: 'Please read and agree to the privacy policy',
      gotIt: 'OK',
      useOtherPhone: 'Use another phone',
      readAndAgree: 'Read and agree'
    }
  },
  user: {
    notBoundAccount: 'Account not bound. Please bind your account.',
    pleaseBind: 'Please bind your account',
    cancelLogin: 'Login cancelled',
    loggingIn: 'Signing in...',
    wechatNotInstalled: 'WeChat is not installed',
    platformNotSupportAppWechat: 'Unsupported platform for WeChat app login',
    updateSuccess: 'Updated',
    singleSignTitle: 'Warning',
    singleSignContent: 'Your account is signed in on another device. Please check your credentials.',
    loggedOutNeedRelogin: 'You have signed out. Please sign in again.',
    devTokenExpiring: 'Token is about to expire. Please update devToken: {{token}}'
  }
}
