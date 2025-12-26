import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { View } from '@tarojs/components'
import { CmsIcon } from '@/duxcms/components'
import { nav, request, toast, cmsUser, duxappTheme, useRoute, userConfig, useVerifyCode, contextState, userHook, duxcmsUserLang } from '@/duxcmsUser/utils'
import { Header, ScrollView, Loading, Button, Row, Text, Radio, confirm, px, PullView, Input } from '@/duxui'
import { WechatLib } from '@/duxappWechatShare'
import classNames from 'classnames'
import './login.scss'

export const UserLogin = ({ onLogin }) => {

  const { params } = useRoute()

  const [check, setCheck] = useState(false)

  // 是否是第三方账号登录的绑定模式
  const [bind, setBind] = useState(params.token || '')

  const agreement = useRef(null)

  return <contextState.Provider defaultValue={{ reg: false }}>
    <View className='flex-grow bg-white'>
      <userHook.Render mark='page'>
        <Header bgColor='transparent' />
        <ScrollView>
          <View className='cms-login'>

            <Head bind={bind} />
            {(config.phone || config.email) && <Account check={check} setCheck={setCheck} onLogin={onLogin} bind={bind} />}

            <Agreement ref={agreement} setCheck={setCheck} check={check} />

            {process.env.TARO_ENV === 'rn' && config.appWatch && <AppWechat check={check} setCheck={setCheck} onLogin={onLogin} bind={bind} onBind={setBind} />}

            {process.env.TARO_ENV === 'weapp' && config.weappWatch && <WeappWatch check={check} auto={config.weappForceWatch} onLogin={onLogin} bind={bind} onBind={setBind} />}
          </View>
        </ScrollView>
      </userHook.Render>
    </View>
  </contextState.Provider>
}

const Head = ({ bind }) => {

  const t = duxcmsUserLang.useT()
  const [{ reg }] = contextState.useState()
  const actionText = reg ? t('login.register') : t('login.login')

  return <View className='cms-login__title gap-2'>
    <Text bold size={48}>{t('login.greeting')}</Text>
    <Text bold size={48}>{bind ? t('login.bindAccount') : t('login.welcome', { params: { action: actionText, appName: config.appName } })}</Text>
  </View>
}

export const config = {
  // 手机号登录
  phone: true,
  // 邮箱登录
  email: true,
  // 注册功能
  register: true,
  // app微信登录
  appWatch: true,
  // 小程序微信登录
  weappWatch: true,
  // 强制小程序微信登录
  weappForceWatch: false,
  // 开启验证码功能
  code: true,
  // 开启密码功能
  password: true,
  // 名称
  appName: 'DuxCms',
  // 扩展表单
  extForm: null,
  ...userConfig.option.duxcms?.loginConfig || {}
}

/**
 * 设置登录配置
 * @param {*} _val
 */
export const setLoginConfig = _val => {
  Object.keys(_val).forEach(key => {
    config[key] = _val[key]
  })
}

const phoneReg = /^1\d{10}$/
const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export const Password = ({
  value,
  onChange,
  placeholder
}) => {
  const t = duxcmsUserLang.useT()
  const placeholderText = placeholder ?? t('login.passwordPlaceholder')
  return <View className='cms-login__content__phone'>
    <Input
      className='cms-login__content__phone__input'
      password
      type='password'
      onChange={onChange}
      value={value}
      placeholder={placeholderText}
      placeholderTextColor={duxappTheme.textColor3}
      placeholderStyle={`color: ${duxappTheme.textColor3}`}
    />
  </View>
}

/**
 * 验证码
 * @param {*} param0
 * @returns
 */
export const Code = ({
  username,
  value,
  onChange,
  codeUrl
}) => {

  const t = duxcmsUserLang.useT()
  const code = useVerifyCode()

  const getCode = useCallback(() => {
    if (code.status > 1) {
      return
    }
    if (config.phone && config.email) {
      if (!phoneReg.test(username) && !emailReg.test(username)) {
        return toast(t('login.needPhoneOrEmail'))
      }
    } else if (config.phone) {
      if (!phoneReg.test(username)) {
        return toast(t('login.needPhone'))
      }
    } else if (config.email) {
      if (!emailReg.test(username)) {
        return toast(t('login.needEmail'))
      }
    }
    code.getCode(async () => {
      await request({
        url: codeUrl,
        data: {
          username
        },
        toast: true
      })
    })
  }, [code, codeUrl, t, username])

  return <View className='cms-login__content__phone'>
    <Input
      className='cms-login__content__phone__input'
      type='number'
      maxlength={6}
      onChange={onChange}
      value={value}
      placeholder={t('login.codePlaceholder')}
      placeholderTextColor={duxappTheme.textColor3}
      placeholderStyle={`color: ${duxappTheme.textColor3}`}
    />
    {
      code.status === 2
        ? <Loading />
        : <View className='cms-login__content__phone__code' onClick={getCode} style={{ color: duxappTheme.primaryColor }}>{code.text}</View>
    }
  </View>
}

const checkConfirm = async (check, setCheck) => {
  if (!check) {
    const t = (key, paramsOrOptions) => duxcmsUserLang.t(key, paramsOrOptions)
    if (!await confirm({
      title: t('login.agreementModal.title'),
      content: <Text className='mh-3 mt-3'>{t('login.agreementModal.prefix')}<Text
        type='primary'
        onClick={() => {
          nav(`duxcms/common/richtext?url=member/agreement&title=${encodeURIComponent(t('login.serviceAgreementTitle'))}`)
        }}
      >{t('login.serviceAgreementText')}</Text>{t('login.agreementModal.and')}<Text
        type='primary'
        onClick={() => {
          nav(`duxcms/common/richtext?url=member/privacy&title=${encodeURIComponent(t('login.privacyPolicyTitle'))}`)
        }}
      >{t('login.privacyPolicyText')}</Text></Text>,
      confirmText: t('login.agreementModal.confirmText'),
      cancelText: t('login.agreementModal.cancelText')
    })) {
      throw t('login.agreementModal.disagreeThrow')
    }
    setCheck(true)
  }
}

/**
 *
 * @returns 账号登录
 */
export const Account = ({
  check,
  setCheck,
  onLogin,
  bind,
  checkUrl = 'member/check',
  loginUrl = 'member/login',
  regUrl = 'member/register',
  codeUrl = 'member/code'
}) => {
  const t = duxcmsUserLang.useT()
  const extPost = useMemo(() => Object.fromEntries(config.extForm?.map(item => [item.field, item.value || '']) || []), [])

  const [post, postAction] = useState({
    username: '',
    password: '',
    code: '',
    ...extPost
  })

  // 登录方式：优先密码；当关闭密码功能时，强制为验证码登录
  const [passwordLogin, passwordLoginAction] = useState(() => !!config.password)

  // 是否输入了完整的用户名
  const [isUserName, setIsUserName] = useState(false)

  // 注册模式
  const [reg, regAction] = useState(false)

  const [loading, loadingAction] = useState(false)
  const [, setData] = contextState.useState()

  const isAccount = useMemo(() => {
    return (config.phone && phoneReg.test(post.username)) || (config.email && emailReg.test(post.username))
  }, [post.username])

  const checkAccount = useCallback(async () => {
    if (isAccount) {
      const res = await request({
        url: checkUrl,
        data: {
          username: post.username
        }
      })
      if (config.register === false) {
        setData(old => ({ ...old, reg: false }))
        if (!res.check) {
          setIsUserName(false)
          toast(t('login.invalidAccount'))
        } else {
          setIsUserName(true)
        }
      } else {
        setData(old => ({ ...old, reg: !res.check }))
        setIsUserName(true)
        regAction(!res.check)
      }
    } else {
      setIsUserName(false)
      setData(old => ({ ...old, reg: false }))
    }
  }, [checkUrl, isAccount, post.username, setData, t])

  // RN端onBlur封装有bug，函数更新之后不会使用最新的函数
  const _checkAccount = useRef(checkAccount)
  _checkAccount.current = checkAccount

  const submit = useCallback(async () => {
    let promise
    if (reg) {
      // 注册：当关闭密码功能时，不传 password 字段，仅支持验证码/扩展表单
      const payload = { ...post }
      if (!config.code) {
        delete payload.code
      } else {
        if (!payload.code) {
          return toast(t('login.needCode'))
        }
      }
      if (!config.password) {
        delete payload.password
      } else {
        if (!payload.password) {
          return toast(t('login.needPassword'))
        }
      }
      promise = () => request({
        url: regUrl,
        method: 'POST',
        data: payload,
        toast: true
      })
    } else {
      // 登录：当关闭密码功能时，强制验证码登录
      const loginType = config.password ? (passwordLogin ? 'password' : 'code') : 'code'
      const payload = { ...post, type: loginType }
      if (loginType === 'code') {
        delete payload.password
        if (!payload.code) {
          return toast(t('login.needCode'))
        }
      }
      if (loginType === 'password') {
        delete payload.code
        if (!payload.password) {
          return toast(t('login.needPassword'))
        }
      }
      promise = () => request({
        url: loginUrl,
        method: 'POST',
        data: payload,
        toast: true
      })
    }
    await checkConfirm(check, setCheck)
    loadingAction(true)
    promise()
      .then(async res => {
        if (bind) {
          cmsUser.setInfo({ token: res.token })
          // 绑定账户
          await request({
            url: 'member/oauth/bind',
            toast: true,
            method: 'POST',
            data: {
              token: bind
            }
          }).catch(err => {
            cmsUser.setInfo({ token: '' })
            throw err
          })
        }
        onLogin({
          type: 'account',
          data: { token: res.token, ...res.userInfo }
        })
        loadingAction(false)
      })
      .catch(() => {
        loadingAction(false)
      })
    // .finally(() => {
    //   loadingAction(old => !old)
    // })
  }, [bind, check, loginUrl, onLogin, passwordLogin, post, reg, regUrl, setCheck, t])

  return <>
    <View className='cms-login__content'>
      <View className='cms-login__content__phone'>
        <Input
          className='cms-login__content__phone__input'
          onBlur={_checkAccount.current}
          onChange={e => postAction(old => ({ ...old, 'username': e }))}
          value={post.username}
          type={!config.email ? 'number' : 'text'}
          maxLength={!config.email ? 11 : 99}
          placeholder={!config.email ? t('login.usernamePlaceholder.phone') : !config.phone ? t('login.usernamePlaceholder.email') : t('login.usernamePlaceholder.phoneOrEmail')}
          placeholderTextColor={duxappTheme.textColor3}
          placeholderStyle={`color: ${duxappTheme.textColor3}`}
        />
      </View>
      {
        !isUserName && <>
          {config.register !== false && <Text align='center' className='mt-2' size={1} color={3}>{t('login.needPhoneHint')}</Text>}
          <Button className='mt-3 self-center' size='l' type='primary'
            disabled={!isAccount}
            style={{ width: px(240) }}
          >{t('login.next')}</Button>
        </>
      }
      {
        isUserName && <>
          {
            reg
              ? <>
                {config.code && <Code codeUrl={codeUrl} username={post.username} onChange={e => postAction(old => ({ ...old, 'code': e }))} value={post.code} />}
                {config.password && <Password onChange={e => postAction(old => ({ ...old, 'password': e }))} value={post.password} placeholder={t('login.setLoginPassword')} />}
              </>
              : <>
                {
                  (config.password && (passwordLogin || !config.code))
                    ? <Password onChange={e => postAction(old => ({ ...old, 'password': e }))} value={post.password} />
                    : (config.code
                      ? <Code codeUrl={codeUrl} username={post.username} onChange={e => postAction(old => ({ ...old, 'code': e }))} value={post.code} />
                      : <Text align='center' size={2} color={3}>{t('login.noLoginMethod')}</Text>
                    )
                }
              </>
          }
          {
            config.extForm?.map((item) => {
              if (item.type === 'input') {
                if (item.show && ((item.show === 'reg' && !reg) || (item.show === 'login' && reg))) {
                  return null
                }
                const input = <View key={item.field} className='cms-login__content__phone gap-1 mt-3'
                  style={{ marginTop: item.title ? px(16) : px(32) }}
                >
                  <Input
                    className='cms-login__content__phone__input'
                    onChange={e => postAction(old => ({ ...old, [item.field]: e }))}
                    value={post[item.field]}
                    placeholder={item.placeholder}
                    disabled={item.disabled}
                    placeholderTextColor={duxappTheme.textColor3}
                    placeholderStyle={`color: ${duxappTheme.textColor3}`}
                  />
                </View>
                if (item.title) {
                  return <View key={item.field}
                    style={{ marginTop: px(32) }}
                  >
                    {!!item.title && <Text className='text-s2 text-danger mh-3'>{item.title}</Text>}
                    {input}
                  </View>
                }
                return input
              }
              return null
            })
          }
          <userHook.Render mark='reg.extForm' option={{ reg, post, postAction }} />
        </>
      }
    </View>
    {isUserName && <>
      <Button
        style={{ marginTop: px(80) }}
        size='l'
        onClick={submit}
        loading={loading}
        type='primary'
      >
        {bind ? (reg ? t('login.submit.registerAndBind') : t('login.submit.bind')) : (reg ? t('login.submit.registerAndLogin') : t('login.submit.login'))}
      </Button>
      {!reg && (config.password && config.code) && <Row justify='between' className='mt-3 pv-2'>
        <Text onClick={() => passwordLoginAction(old => !old)}>
          {passwordLogin ? t('login.switchToCode') : t('login.switchToPassword')}
        </Text>
        {config.password && passwordLogin && <Text onClick={() => nav('duxcmsUser/info/forget')}>{t('login.forget')}</Text>}
      </Row>}
    </>}
  </>
}

export const Agreement = ({ check, setCheck }) => {

  const t = duxcmsUserLang.useT()
  // 统一服务协议和隐私政策
  return <View className='cms-login__deal'>
    <View className='cms-login__deal__check' onClick={() => setCheck(old => !old)}>
      {!check && <CmsIcon name='danxuan-weixuan' size={35} />}
      {check && <CmsIcon name='fuhao-zhuangtai-chenggong' color={duxappTheme.primaryColor} size={35} />}
    </View>
    <Text className='cms-login__deal__text'>{t('login.agreed')}</Text>
    <Text className='cms-login__deal__text' style={{ color: duxappTheme.primaryColor }} onClick={() => nav(`duxcms/common/richtext?url=member/agreement&title=${encodeURIComponent(t('login.serviceAgreementTitle'))}`)}>{t('login.serviceAgreementText')}</Text>
    <Text className='cms-login__deal__text'>{t('login.agreementModal.and')}</Text>
    <Text className='cms-login__deal__text' style={{ color: duxappTheme.primaryColor }} onClick={() => nav(`duxcms/common/richtext?url=member/privacy&title=${encodeURIComponent(t('login.privacyPolicyTitle'))}`)}>{t('login.privacyPolicyText')}</Text>
  </View>
}

export const AppWechat = ({ check, setCheck, onLogin, bind, onBind }) => {

  const t = duxcmsUserLang.useT()
  const [wxInstall, setWxInstall] = useState()

  useEffect(() => {
    if (process.env.TARO_ENV === 'rn') {
      WechatLib.isWXAppInstalled().then(setWxInstall)
    }
  }, [])

  const wxLogin = useCallback(async () => {
    await checkConfirm(check, setCheck)
    cmsUser.appWXLogin().then(data => {
      onLogin({ type: 'appwechat', data })
    }).catch(err => {
      if (err.bind) {
        onBind(err.token)
      } else {
        if (err.message == -2) {
          toast(t('login.wxLoginFail'))
        } else {
          toast(err.message)
        }
      }
    })
  }, [check, onBind, onLogin, setCheck, t])

  if (bind) {
    return null
  }

  return <>
    {wxInstall && <>
      <View className='cms-login__flexBox'>
        <View className='cms-login__flexBox__flex'>
          <View className='cms-login__flexBox__flex__line' />
          <View className='cms-login__flexBox__flex__text'>
            {t('login.moreLogin')}
          </View>
          <View className='cms-login__flexBox__flex__line' />
        </View>
        <View className='cms-login__icon' onClick={wxLogin}>
          <CmsIcon name='weixin' color='#fff' size={55} />
        </View>
      </View>
    </>}
  </>
}

export const WeappWatch = ({ check, auto, onLogin, bind, onBind }) => {

  const t = duxcmsUserLang.useT()
  const weappLogin = useCallback(() => {
    if (!check && !auto) {
      return toast(t('login.needAgreeService'))
    }
    cmsUser.weappLogin().then(data => {
      // 登陆回调
      onLogin({ type: 'weapp', data })
    }).catch(err => {
      if (err.bind) {
        onBind(err.token)
      } else {
        toast(err.message)
      }
    })
  }, [auto, check, onBind, onLogin, t])

  useEffect(() => {
    if (auto) {
      weappLogin()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (bind) {
    return null
  }

  return <View className='cms-login__flexBox'>
    <View className='cms-login__flexBox__flex'>
      <View className='cms-login__flexBox__flex__line' />
      <View className='cms-login__flexBox__flex__text'>
        {t('login.moreLogin')}
      </View>
      <View className='cms-login__flexBox__flex__line' />
    </View>
    <View className='cms-login__icon' onClick={weappLogin}>
      <CmsIcon name='weixin' color='#fff' size={55} />
    </View>
  </View>
}

/**
 * 小程序端微信授权手机号快捷登录
 */
export const WeappTelLogin = ({
  onLogin,
  onCancel,
  onSkip
}) => {

  const t = duxcmsUserLang.useT()
  const [noSkip] = userHook.useMark('WeappTelLogin.noSkip')

  const [check, setCheck] = useState(false)

  const ref = useRef()

  const getPhoneNumber = useCallback(async e => {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      const data = await cmsUser.weappTelLogin(e.detail.code)
      await ref.current.close(false)
      onLogin(data)
    } else {
      !noSkip && onSkip()
    }
  }, [noSkip, onLogin, onSkip])

  useEffect(() => {
    return () => onCancel()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <PullView ref={ref} side='center' mask onClose={onCancel}>
    <View className='cms-login-weapp'>
      <View className='cms-login-weapp__head'>
        <CmsIcon name='guanbi1' size={36} className='text-white' />
        <Text className='cms-login-weapp__head__name'>{t('login.weappTel.title')}</Text>
        <CmsIcon name='guanbi1' size={36} color={duxappTheme.textColor1}
          onClick={() => {
            ref.current.close()
          }}
        />
      </View>
      {
        check ?
          <Button size='l' type='primary' openType='getPhoneNumber' className='button-clean' onGetPhoneNumber={getPhoneNumber}>{t('login.weappTel.quickLogin')}</Button> :
          <Button size='l' type='primary'
            onClick={() => confirm({
              content: t('login.weappTel.needReadPrivacy'),
              cancel: false,
              confirmText: t('login.weappTel.gotIt')
            })}
          >{t('login.weappTel.quickLogin')}</Button>
      }
      {
        !noSkip && <Text className='cms-login-weapp__tel' align='center' size={2} onClick={onSkip}>{t('login.weappTel.useOtherPhone')}</Text>
      }
      <Row items='center' className={classNames('gap-2', noSkip ? 'cms-login-weapp__tel' : 'mt-3')} justify='center'>
        <Radio checked={check} onClick={() => setCheck(!check)} />
        <Row>
          <Text>{t('login.weappTel.readAndAgree')}</Text>
          <Text type='danger' onClick={() => nav(`duxcms/common/richtext?url=member/privacy&title=${encodeURIComponent(t('login.privacyPolicyTitle'))}`)}>{t('login.privacyPolicyText')}</Text>
        </Row>
      </Row>
    </View>
  </PullView>
}
