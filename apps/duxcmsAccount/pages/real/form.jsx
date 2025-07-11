import { useCallback } from 'react'
import { TopView, Header, loading, Card, ScrollView, Form, Input, Button, UploadImage, Image, confirm, DividerGroup, FormItem, FormSubmit } from '@/duxui'
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
    route.back({ status: true })
  }, [])

  return <TopView isForm>
    <Header title='实名认证' />
    <Form onSubmit={submit}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <DividerGroup padding={0}>
            <FormItem label='真实姓名' field='name'>
              <Input grow placeholder='请输入真实姓名' />
            </FormItem>
            <FormItem label='手机号' field='tel'>
              <Input grow placeholder='请输入手机号' type='number' />
            </FormItem>
            <FormItem label='身份证号' field='no'>
              <Input grow placeholder='请输入身份证号' />
            </FormItem>
            <FormItem label='身份证正面' field='card_front' direction='vertical'>
              <UploadImage />
            </FormItem>
            <FormItem label='身份证反面' field='card_back' direction='vertical'>
              <UploadImage />
            </FormItem>
            <Image src={realCard} className='w-full' mode='widthFix' />
            <FormSubmit>
              <Button type='primary' size='l' className='mv-3'>提交</Button>
            </FormSubmit>
          </DividerGroup>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
