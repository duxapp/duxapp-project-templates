import { request } from '@/duxcms'
import { Button, Column, Divider, Form, Header, Image, Input, ScrollView, Textarea, TopView, confirm, loading, nav, px, useRoute } from '@/duxui'
import { useCallback } from 'react'


export default function AdForm() {

  const { params } = useRoute()

  const submit = useCallback(async data => {
    await request({
      url: `advert/trigger/${params.id}/form`,
      method: 'POST',
      data,
      loading,
      toast: true
    })
    await confirm({
      content: '提交成功，请等待与您联系',
      cancel: false
    })
    nav('back:')
  }, [params.id])

  return <TopView>
    <Header title='表单详情' />
    <Form
      labelProps={{ bold: true }}
      onSubmit={submit}
    >
      <ScrollView>
        <Image src={params.image} className='w-full' style={{ height: px(400) }} />
        <Column className='m-3 bg-white r-2 ph-3' style={{ marginTop: px(-64) }}>
          <Form.Item label='姓名' field='name'>
            <Input placeholder='请输入' grow align='right' />
          </Form.Item>
          <Divider />
          <Form.Item label='电话' field='tel'>
            <Input placeholder='请输入' type='number' grow align='right' />
          </Form.Item>
          <Divider />
          <Form.Item label='备注' direction='vertical' field='remark'>
            <Textarea placeholder='可输入想要咨询的内容' />
          </Form.Item>
        </Column>
      </ScrollView>
      <Form.Submit>
        <Button size='l' type='primary' className='m-3'>立即提交</Button>
      </Form.Submit>
    </Form>
  </TopView>
}

