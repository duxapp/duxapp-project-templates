import Taro from '@tarojs/taro'
import { request, nav, asyncTimeOut } from '@/duxcmsUser'
import { Header, TopView, UploadImages, ScrollView, Form, Button, Textarea, loading, Column } from '@/duxui'
import { useCallback } from 'react'

export default function Feedback() {

  const submit = useCallback(async data => {
    await request({
      url: 'member/feedback',
      method: 'POST',
      data,
      loading,
      toast: true
    })
    Taro.showToast({
      title: '提交成功',
    })
    await asyncTimeOut(800)
    nav('back:')
  }, [])

  return <TopView isSafe>
    <Header title='意见反馈'></Header>
    <Form onSubmit={submit} direction='vertical'>
      <ScrollView>
        <Column className='bg-white r-3 m-3 ph-3'>
          <Form.Item field='content' label='反馈说明'>
            <Textarea
              placeholder='1-200字以内'
              maxlength={200}
            />
          </Form.Item>
          <Form.Item field='images' label='上传图片'>
            <UploadImages />
          </Form.Item>
        </Column>
      </ScrollView>

      <Form.Submit>
        <Button type='primary' size='l' className='m-3'>提交</Button>
      </Form.Submit>
    </Form>
  </TopView>
}
