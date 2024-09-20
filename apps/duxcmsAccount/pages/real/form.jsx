import { useCallback } from 'react'
import { TopView, Header, loading, Card, ScrollView, Form, Divider, Input, Button, UploadImage, px, Image, confirm } from '@/duxui'
import { request, route } from '@/duxcmsAccount'
import realCard from './images/real-card.jpg'

export default function CardAdd() {

  const submit = useCallback(async data => {
    await request({
      url: 'member/real',
      method: 'POST',
      data,
      loading,
      toast: true
    })
    await confirm({
      title: '提交成功',
      cancel: false
    })
    route.back()
  }, [])

  return <TopView isForm>
    <Header title='实名认证' />
    <Form onSubmit={submit}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group padding={0}>
            <Form.Item label='真实姓名' field='name'>
              <Input grow placeholder='请输入真实姓名' />
            </Form.Item>
            <Form.Item label='手机号' field='tel'>
              <Input grow placeholder='请输入手机号' type='number' />
            </Form.Item>
            <Form.Item label='身份证号' field='no'>
              <Input grow placeholder='请输入身份证号' />
            </Form.Item>
            <Form.Item label='身份证正面' field='card_front' direction='vertical'>
              <UploadImage />
            </Form.Item>
            <Form.Item label='身份证反面' field='card_back' direction='vertical'>
              <UploadImage />
            </Form.Item>
            <Image src={realCard} className='w-full' mode='widthFix' />
            <Form.Submit>
              <Button type='primary' size='l' className='mv-3'>提交</Button>
            </Form.Submit>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
