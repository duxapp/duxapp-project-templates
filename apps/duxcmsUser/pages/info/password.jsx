import { useCallback } from 'react'
import { request, user, toast, useVerifyCode } from '@/duxcmsUser'
import { Button, Input, Form, Header, TopView, Loading, Column, Text, Row, FormItem, FormSubmit, route } from '@/duxui'
import { duxcmsUserLang } from '@/duxcmsUser/utils'

export default function Password() {

  const { params } = route.useRoute()
  const t = duxcmsUserLang.useT()

  const userInfo = user.getUserInfo()

  const code = useVerifyCode()

  const getCode = useCallback(() => {
    code.getCode(() => request({
      url: 'member/setting/code',
      toast: true,
      loading: true,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const start = !params.code

  const submit = async data => {
    if (!data.code) {
      return toast(t('info.password.codeRequired'))
    }
    if (!/^\d{4,6}$/.test(data.code)) {
      return toast(t('info.password.codeInvalid'))
    }
    if (start) {
      return route.nav('duxcmsUser/info/password', data)
    }
    if (data.password != data.password1) {
      return toast(t('info.password.mismatch'))
    }
    await request({
      url: 'member/setting/password',
      method: 'POST',
      data,
      loading: true,
      toast,
    }).then(() => {
      toast(t('info.password.success'))
      setTimeout(() => {
        user.logout()
      }, 800)
    })
  }

  return <TopView>
    <Header title={start ? t('info.password.verifyTitle') : t('info.password.newTitle')} />
    <Form onSubmit={submit} defaultValues={params}>
      <Column className='r-3 bg-white m-3 p-3 gap-4'>
        {start ?
          <>
            <Column className='gap-2'>
              <Text size={1} color={3}>{t('info.password.boundPhone')}</Text>
              <Text size={5} bold>{userInfo.tel}</Text>
            </Column>
            <Column className='gap-2'>
              <Text size={1} color={3}>{t('info.password.code')}</Text>
              <Row className='bg-page r-2 p-3'>
                <FormItem name='code'>
                  <Input className='flex-grow' placeholder={t('info.password.codePlaceholder')} />
                </FormItem>
                {
                  code.status === 2 ?
                    <Loading size={42} /> :
                    <Text size={2} type='primary' onClick={getCode}>{code.text}</Text>
                }
              </Row>
            </Column>
          </> :
          <>
            <Column className='gap-2'>
              <Text size={1} color={3}>{t('info.password.newPassword')}</Text>
              <Column className='p-3 r-2 bg-page'>
                <FormItem name='password1'>
                  <Input placeholder={t('info.password.newPasswordPlaceholder')} />
                </FormItem>
              </Column>
            </Column>
            <Column className='gap-2'>
              <Text size={1} color={3}>{t('info.password.confirmPassword')}</Text>
              <Column className='p-3 r-2 bg-page'>
                <FormItem name='password'>
                  <Input placeholder={t('info.password.confirmPasswordPlaceholder')} />
                </FormItem>
              </Column>
            </Column>
          </>}
        <FormSubmit>
          <Button type='primary' size='l' className='m-3'>{start ? t('common.next') : t('common.submit')}</Button>
        </FormSubmit>
      </Column>
    </Form>
  </TopView>
}

