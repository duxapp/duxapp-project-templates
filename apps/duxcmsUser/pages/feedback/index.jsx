import { showToast } from '@tarojs/taro'
import { request, nav, asyncTimeOut } from '@/duxcmsUser'
import { Header, TopView, UploadImages, ScrollView, Form, Button, Textarea, loading, Column, Text, FormItem, FormSubmit } from '@/duxui'
import { duxcmsUserLang } from '@/duxcmsUser/utils'
import { useCallback } from 'react'

export default function Feedback() {

  const t = duxcmsUserLang.useT()
  const platform = process.env.TARO_ENV === 'qq' ? t('feedback.platform.qq') : t('feedback.platform.wechat')

  const submit = useCallback(async data => {
    await request({
      url: 'member/feedback',
      method: 'POST',
      data,
      loading,
      toast: true
    })
    showToast({
      title: t('feedback.success'),
    })
    await asyncTimeOut(800)
    nav('back:')
  }, [t])

  return <TopView isSafe>
    <Header title={t('feedback.title')}></Header>
    <Form onSubmit={submit} direction='vertical'>
      <ScrollView>
        <Column className='bg-white r-3 m-3 ph-3'>
          <FormItem field='content' label={t('feedback.contentLabel')}>
            <Textarea
              placeholder={t('feedback.contentPlaceholder')}
              maxlength={200}
            />
          </FormItem>
          <FormItem field='images' label={t('feedback.imagesLabel')}>
            <UploadImages />
          </FormItem>
        </Column>
        {
          process.env.TARO_ENV === 'weapp' && <Column>
            <Text size={1} color={3} align='center'>{t('feedback.weappTip', { params: { platform } })}</Text>
          </Column>
        }
      </ScrollView>

      <FormSubmit>
        <Button type='primary' size='l' className='m-3'>{t('common.submit')}</Button>
      </FormSubmit>
    </Form>
  </TopView>
}
