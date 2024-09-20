import { duxappTheme } from '@/gasVideo'
import { Header, Column, Row, Text, TopView, useRoute, Form, Button, ScrollView, loading, confirm, nav, Textarea, UploadImages, ModalForm, SelectorPicker } from '@/duxui'
import { CmsIcon, request, usePageData } from '@/duxcms'
import { useCallback, useMemo } from 'react'

export default function Report() {

  const [types] = usePageData('short/video/report')

  const typesRange = useMemo(() => types.map((name, value) => ({ name, value })), [types])

  const { params } = useRoute()

  const submit = useCallback(async data => {
    await request({
      url: `short/video/${params.id}/report`,
      loading,
      toast: true,
      data,
      method: 'POST'
    })
    await confirm({
      title: '举报成功',
      cancel: false
    })
    nav('back:')
  }, [params.id])

  return <TopView>
    <Header title='举报内容' />
    <Form onSubmit={submit}>
      <ScrollView>
        <Column className='bg-white mt-3 mh-3 r-2 p-3 gap-3'>
          <Text bold size={5}><Text type='danger'>*</Text> 举报原因</Text>
          <Form.Item field='type'>
            <ModalForm
              childPropsValueKey='value'
              renderForm={<SelectorPicker range={typesRange} />}
              title='举报原因'
            >
              <PickerContent />
            </ModalForm>
          </Form.Item>
        </Column>
        <Column className='bg-white mt-3 mh-3 r-2 p-3 gap-3'>
          <Text bold size={5}><Text type='danger'>*</Text> 举报描述</Text>
          <Form.Item field='remark'>
            <Textarea placeholder='详细描述你遇到的问题，并上传相关证明材料，可以帮助举报被更快处理' maxlength={300} />
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

const PickerContent = ({ value, ...props }) => {
  return <Row className='bg-page r-1 pv-2 ph-3' items='center' {...props}>
    <Text grow color={value ? 1 : 3}>{value || '请选择'}</Text>
    <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
  </Row>
}
