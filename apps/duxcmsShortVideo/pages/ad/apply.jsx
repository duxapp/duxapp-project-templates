import { ScrollView, Button, Column, Divider, Form, Header, Image, Input, Text, Textarea, TopView, px, loading, confirm, toast } from '@/duxui'
import { useCallback, useEffect, useRef } from 'react'
import { request, useRequest } from '@/duxcms'
import head from './images/apply-head.png'

export default function AdApply() {

  const [data, { reload }] = useRequest('advert/user')

  const form = useRef()

  const submit = useCallback(async _data => {
    if (data.status > 0) {
      return
    }
    await request({
      url: 'advert/user',
      method: 'POST',
      data: _data,
      loading,
      toast: true
    })
    await confirm({
      title: '申请成功，请等待审核',
      cancel: false
    })
    reload()
  }, [data.status, reload])

  useEffect(() => {
    if (data.name) {
      form.current.setValues({
        name: data.name,
        remark: data.remark,
        tel: data.tel
      })
    }
  }, [data])

  const statusItem = status[data.status || 0] || status[0]

  return <TopView>
    <Header title='申请广告主' />
    <Form
      ref={form}
      labelProps={{ bold: true }}
      onSubmit={submit}
      disabled={data.status > 0}
    >
      <ScrollView>
        <Image src={data.advert_banner || head} className='w-full' style={{ height: px(400) }} />
        <Column className='m-3 p-3 r-2 bg-white' style={{ marginTop: px(-66) }}>
          <Form.Item field='name' label='联系人'>
            <Input placeholder='请输入' grow align='right' />
          </Form.Item>
          <Divider padding={0} />
          <Form.Item field='tel' label='联系电话'>
            <Input placeholder='请输入' grow align='right' />
          </Form.Item>
          <Divider padding={0} />
          <Form.Item field='remark' label='备注' direction='vertical' subLabel='可不填写'>
            <Textarea />
          </Form.Item>
        </Column>
        {!!data.content && <Column className='mh-3 p-3 r-2 bg-white'>
          <Text>{data.content}</Text>
        </Column>}
      </ScrollView>
      <Form.Submit>
        <Button {...statusItem.props} size='l' className='m-3 absolute left-0 bottom-0 right-0'>{statusItem.name}</Button>
      </Form.Submit>
    </Form>
  </TopView>
}

const status = [
  { name: '立即申请', props: { type: 'danger' } },
  { name: '审核中', props: { type: 'secondary' } },
  { name: '已通过', props: { type: 'success' } }
]
