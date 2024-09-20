import { Header, Column, Row, Text, TopView, useRoute, Form, ScrollView, LinearGradient, Textarea, UploadImages, loading, confirm, nav, Button } from '@/duxui'
import { px, request, usePageData } from '@/duxcms'
import { useCallback } from 'react'

export default function Feedback() {

  const { params } = useRoute()

  const submit = useCallback(async data => {
    await request({
      url: `short/video/${params.id}/feedback`,
      loading,
      toast: true,
      data,
      method: 'POST'
    })
    await confirm({
      title: '反馈成功',
      cancel: false
    })
    nav('back:')
  }, [params.id])

  return <TopView>
    <Header title='功能反馈' />
    <Form onSubmit={submit}>
      <ScrollView>
        <Column className='bg-white mt-3 mh-3 r-2 p-3 gap-3'>
          <Text bold size={5}><Text type='danger'>*</Text> 请选择问题类型</Text>
          <Form.Item field='type'>
            <Types />
          </Form.Item>
        </Column>
        <Column className='bg-white mt-3 mh-3 r-2 p-3 gap-3'>
          <Text bold size={5}>请具体描述</Text>
          <Form.Item field='remark'>
            <Textarea placeholder='请输入问题描述，帮助我们更快定位你的问题' maxlength={300} />
          </Form.Item>
          <Column className='mt-3 gap-1'>
            <Text bold size={5}>补充信息</Text>
            <Text size={1} color={3}>上传相关截图能够更快解决问题</Text>
          </Column>
          <Form.Item field='images'>
            <UploadImages addText='上传凭证' />
          </Form.Item>
        </Column>
      </ScrollView>
      <Form.Submit>
        <Button size='l' type='primary' className='m-3'>提交</Button>
      </Form.Submit>
    </Form>
  </TopView>
}

const Types = ({ value, onChange }) => {

  const [types] = usePageData('short/video/feedback')

  const props = {
    style: { width: px(316), height: px(72) },
    className: 'items-center justify-center bg-page r-1'
  }

  return <Row className='gap-3' wrap>
    {
      types.map((item, index) => {
        if (value === index) {
          return <LinearGradient key={item} {...props} colors={['#FF3F8D', '#FF3E4A']} useAngle angle={90}>
            <Text color={4}>{item}</Text>
          </LinearGradient>
        }
        return <Column key={item} {...props} onClick={() => onChange(index)}>
          <Text>{item}</Text>
        </Column>
      })
    }
  </Row>
}
