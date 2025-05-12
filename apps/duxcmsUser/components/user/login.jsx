import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { View, Input } from '@tarojs/components'
import { CmsIcon } from '@/duxcms/components'
import { nav, request, toast, cmsUser, duxappTheme, useRoute, userConfig, useVerifyCode, contextState, userHook } from '@/duxcmsUser/utils'
import { Header, ScrollView, Loading, Button, Row, Text, Radio, confirm, px } from '@/duxui'
import './login.scss'

export const UserLogin = ({ onLogin }) => {

  const { params } = useRoute()

  const [check, checkAction] = useState(false)

  // 是否是第三方账号登录的绑定模式
  const [bind, setBind] = useState(params.token || '')

  const agreement = useRef(null)

  return <contextState.Provider defaultValue={{ reg: false }}>
    <View className='flex-grow bg-white'>
      <userHook.Render mark='page'>
        <Header style={{ backgroundColor: 'transparent' }} />
        <ScrollView>
          <View className='cms-login'>

            <Head bind={bind} />
            {(config.phone || config.email) && <Account check={check} onLogin={onLogin} bind={bind} />}

            <Agreement ref={agreement} checkAction={checkAction} check={check} />

            {process.env.TARO_ENV === 'rn' && config.appWatch && <AppWechat check={check} onLogin={onLogin} bind={bind} onBind={setBind} />}

            {process.env.TARO_ENV === 'weapp' && config.weappWatch && <WeappWatch check={check} auto={config.weappForceWatch} onLogin={onLogin} bind={bind} onBind={setBind} />}
          </View>
        </ScrollView>
      </userHook.Render>
    </View>
  </contextState.Provider>
}

const Head = ({ bind }) => {

  const [{ reg }] = contextState.useState()

  return <View className='cms-login__title gap-2'>
    <Text bold size={48}>您好，</Text>
    <Text bold size={48}>{bind ? '请绑定账户' : `欢迎${reg ? '注册' : '登录'}${config.appName}`}</Text>
  </View>
}

export const config = {
  // 手机号登录
  phone: true,
  // 邮箱登录
  email: true,
  // app微信登录
  appWatch: true,
  // 小程序微信登录
  weappWatch: true,
  // 强制小程序微信登录
  weappForceWatch: false,
  // 开启验证码功能
  code: true,
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

// react-native-wechat-lib start
let isWXAppInstalleds
if (process.env.TARO_ENV === 'rn') {
  const { isWXAppInstalled } = require('react-native-wechat-lib')
  isWXAppInstalleds = isWXAppInstalled
}
// react-native-wechat-lib end

const phoneReg = /^1\d{10}$/
const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export const Password = ({
  value,
  onInput,
  placeholder = '请输入密码'
}) => {
  return <View className='cms-login__content__phone'>
    <Input
      className='cms-login__content__phone__input'
      password
      type='password'
      onInput={onInput}
      value={value}
      placeholder={placeholder}
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
  onInput,
  codeUrl
}) => {

  const code = useVerifyCode()

  const getCode = useCallback(() => {
    if (config.phone && config.email) {
      if (!phoneReg.test(username) && !emailReg.test(username)) {
        return toast('请输入正确的手机号或者邮箱')
      }
    } else if (config.phone) {
      if (!phoneReg.test(username)) {
        return toast('请输入正确的手机')
      }
    } else if (config.email) {
      if (!emailReg.test(username)) {
        return toast('请输入正确的邮箱')
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
  }, [code, codeUrl, username])

  return <View className='cms-login__content__phone'>
    <Input
      className='cms-login__content__phone__input'
      type='number'
      maxlength={6}
      onInput={onInput}
      value={value}
      placeholder='输入短信验证码'
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

/**
 *
 * @returns 账号登录
 */
export const Account = ({
  check,
  onLogin,
  bind,
  checkUrl = 'member/check',
  loginUrl = 'member/login',
  regUrl = 'member/register',
  codeUrl = 'member/code'
}) => {
  const extPost = useMemo(() => Object.fromEntries(config.extForm?.map(item => [item.field, item.value || '']) || []), [])

  const [post, postAction] = useState({
    username: '',
    password: '',
    code: '',
    ...extPost
  })

  const [passwordLogin, passwordLoginAction] = useState(true)

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
          toast('您输入了一个无效账号，将无法登录')
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
  }, [checkUrl, isAccount, post.username, setData])

  // RN端onBlur封装有bug，函数更新之后不会使用最新的函数
  const _checkAccount = useRef(checkAccount)
  _checkAccount.current = checkAccount

  const submit = useCallback(() => {
    if (!check) {
      return toast('请同意用户协议和隐私政策')
    }
    let promise
    loadingAction(old => !old)
    if (reg) {
      promise = request({
        url: regUrl,
        method: 'POST',
        data: post,
        toast: true
      })
    } else {
      promise = request({
        url: loginUrl,
        method: 'POST',
        data: {
          ...post,
          type: passwordLogin ? 'password' : 'code'
        },
        toast: true
      })
    }
    promise
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
        loadingAction(old => !old)
      })
      .catch(() => {
        loadingAction(old => !old)
      })
    // .finally(() => {
    //   loadingAction(old => !old)
    // })
  }, [bind, check, loginUrl, onLogin, passwordLogin, post, reg, regUrl])

  return <>
    <View className='cms-login__content'>
      <View className='cms-login__content__phone'>
        <Input
          className='cms-login__content__phone__input'
          onBlur={_checkAccount.current}
          onInput={e => postAction(old => ({ ...old, 'username': e.detail.value }))}
          value={post.username}
          type={!config.email ? 'number' : 'text'}
          maxLength={!config.email ? 11 : 99}
          placeholder={!config.email ? '输入您的手机号码' : !config.phone ? '请输入您的邮箱' : '请输入手机号或邮箱'}
          placeholderTextColor={duxappTheme.textColor3}
          placeholderStyle={`color: ${duxappTheme.textColor3}`}
        />
      </View>
      {
        !isUserName && <>
          {config.register !== false && <Text align='center' className='mt-2' size={1} color={3}>请输入手机号后，将自动识别您的账号是否需要注册</Text>}
          <Button className='mt-3 self-center' size='l' type='primary'
            disabled={!isAccount}
            style={{ width: px(240) }}
          >下一步</Button>
        </>
      }
      {
        isUserName && <>
          {
            reg
              ? <>
                {config.code && <Code codeUrl={codeUrl} username={post.username} onInput={e => postAction(old => ({ ...old, 'code': e.detail.value }))} value={post.code} />}
                <Password onInput={e => postAction(old => ({ ...old, 'password': e.detail.value }))} value={post.password} placeholder='请设置密码' />
              </>
              : <>
                {
                  passwordLogin || !config.code
                    ? <Password onInput={e => postAction(old => ({ ...old, 'password': e.detail.value }))} value={post.password} />
                    : <Code codeUrl={codeUrl} username={post.username} onInput={e => postAction(old => ({ ...old, 'code': e.detail.value }))} value={post.code} />
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
                    onInput={e => postAction(old => ({ ...old, [item.field]: e.detail.value }))}
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
        {bind ? (reg ? '注册并绑定' : '绑定') : (reg ? '注册并登录' : '登录')}
      </Button>
      {!reg && <Row justify='between' className='mt-3 pv-2'>
        <Text onClick={() => passwordLoginAction(old => !old)}>
          {!config.code ? '' : passwordLogin ? '验证码登录' : '密码登录'}
        </Text>
        {passwordLogin && <Text onClick={() => nav('duxcmsUser/info/forget')}>忘记密码?</Text>}
      </Row>}
    </>}
  </>
}

export const Agreement = ({ check, checkAction }) => {

  // 统一用户协议和隐私政策
  return <View className='cms-login__deal'>
    <View className='cms-login__deal__check' onClick={() => checkAction(old => !old)}>
      {!check && <CmsIcon name='danxuan-weixuan' size={35} />}
      {check && <CmsIcon name='fuhao-zhuangtai-chenggong' color={duxappTheme.primaryColor} size={35} />}
    </View>
    <Text className='cms-login__deal__text'>已阅读并同意</Text>
    <Text className='cms-login__deal__text' style={{ color: duxappTheme.primaryColor }} onClick={() => nav('duxcms/common/richtext?url=member/agreement&title=用户协议')}>《用户协议》</Text>
    <Text className='cms-login__deal__text'>和</Text>
    <Text className='cms-login__deal__text' style={{ color: duxappTheme.primaryColor }} onClick={() => nav('duxcms/common/richtext?url=member/privacy&title=隐私政策')}>《隐私政策》</Text>
  </View>
}

export const AppWechat = ({ check, onLogin, bind, onBind }) => {

  const [wxInstall, setWxInstall] = useState()

  useEffect(() => {
    if (process.env.TARO_ENV === 'rn') {
      isWXAppInstalleds().then(setWxInstall)
    }
  }, [])

  const wxLogin = useCallback(async () => {
    if (!check) {
      return toast('请先勾选同意《用户协议》《隐私政策》')
    }
    cmsUser.appWXLogin().then(data => {
      onLogin({ type: 'appwechat', data })
    }).catch(err => {
      if (err.bind) {
        onBind(err.token)
      } else {
        if (err.message == -2) {
          toast('微信登录失败')
        } else {
          toast(err.message)
        }
      }
    })
  }, [check, onBind, onLogin])

  if (bind) {
    return null
  }

  return <>
    {wxInstall && <>
      <View className='cms-login__flexBox'>
        <View className='cms-login__flexBox__flex'>
          <View className='cms-login__flexBox__flex__line' />
          <View className='cms-login__flexBox__flex__text'>
            更多登录方式
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

  const weappLogin = useCallback(() => {
    if (!check && !auto) {
      return toast('请同意用户协议')
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
  }, [auto, check, onBind, onLogin])

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
        更多登录方式
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

  const [noSkip] = userHook.useMark('WeappTelLogin.noSkip')

  const [check, setCheck] = useState(false)

  const getPhoneNumber = useCallback(e => {
    if (e.detail.errMsg === 'getPhoneNumber:ok') {
      cmsUser.weappTelLogin(e.detail.code).then(data => {
        onLogin(data)
      })
    } else {
      !noSkip && onSkip()
    }
  }, [noSkip, onLogin, onSkip])

  return <View className='cms-login-weapp--mask inset-0 absolute'>
    <View className='cms-login-weapp'>
      <View className='cms-login-weapp__head'>
        <CmsIcon name='guanbi1' size={36} color='#fff' />
        <Text className='cms-login-weapp__head__name'>登录</Text>
        <CmsIcon name='guanbi1' size={36} color={duxappTheme.textColor1} onClick={onCancel} />
      </View>
      {
        check ?
          <Button size='l' type='primary' openType='getPhoneNumber' className='button-clean' onGetPhoneNumber={getPhoneNumber}>手机号快捷登录</Button> :
          <Button size='l' type='primary'
            onClick={() => confirm({
              content: '请阅读并勾选同意隐私政策',
              cancel: false,
              confirmText: '知道了'
            })}
          >手机号快捷登录</Button>
      }
      {
        !noSkip && <Text className='cms-login-weapp__tel' align='center' size={2} onClick={onSkip}>手机号登录</Text>
      }

      <Row items='center' className='gap-2 mt-3' justify='center'>
        <Radio checked={check} onClick={() => setCheck(!check)} />
        <Row>
          <Text>阅读并同意</Text>
          <Text type='danger' onClick={() => nav('duxcms/common/richtext?url=member/agreement&title=用户协议')}>《隐私政策》</Text>
        </Row>
      </Row>
    </View>
  </View>
}
