import { useCallback, useRef } from 'react'
import { request, toast, useVerifyCode } from '@/duxcmsUser'
import { Button, Input, Form, Header, TopView, ScrollView, Loading, Column, Text, Row, nav, loading, FormItem, FormSubmit } from '@/duxui'
import { duxcmsUserLang } from '@/duxcmsUser/utils'

export default function Password() {

  const form = useRef()
  const t = duxcmsUserLang.useT()

  const code = useVerifyCode()

  const getCode = useCallback(() => {
    if (!form.current.values.username) {
      return toast(t('info.forget.phoneRequired'))
    }
    code.getCode(() => request({
      url: 'member/code',
      data: { username: form.current.values.username },
      toast: true,
      loading,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const submit = async (data) => {
    await request({
      url: 'member/forget',
      method: 'POST',
      data,
      loading: true,
      toast,
    }).then(() => {
      toast(t('info.forget.resetSuccess'))
      setTimeout(() => nav('back:'), 800)
    })
  }

  return <TopView>
    <Header title={t('info.forget.title')} />
    <Form onSubmit={submit} ref={form}>
      <ScrollView>
        <Column className='mh-3 mt-3 bg-white r-2 p-3'>
          <FormItem field='username'>
            <Input placeholder={t('info.forget.phonePlaceholder')} />
          </FormItem>
        </Column>
        <Row className='mh-3 mt-3 bg-white r-2 p-3' items='center'>
          <FormItem field='code'>
            <Input placeholder={t('info.forget.codePlaceholder')} className='flex-grow' />
          </FormItem>
          {
            code.status === 2 ?
              <Loading size={42} /> :
              <Text size={2} type='primary' onClick={getCode}>{code.text}</Text>
          }
        </Row>
        <Column className='mh-3 mt-3 bg-white r-2 p-3'>
          <FormItem field='password'>
            <Input password placeholder={t('info.forget.passwordPlaceholder')} />
          </FormItem>
        </Column>
        <FormSubmit>
          <Button type='primary' size='l' className='m-3'>{t('common.submit')}</Button>
        </FormSubmit>
      </ScrollView>
    </Form>
  </TopView>
}


