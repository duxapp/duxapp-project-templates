import { Header, ScrollView, TopView, Form, Card, Divider, Upload } from '@/duxuiExample'

export default function UploadExample() {
  return <TopView>
    <Header title='Upload' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>
            <Form.Item label='图片上传' field='image' direction='vertical' >
              <Upload />
            </Form.Item>
            <Form.Item label='多图上传' field='images' direction='vertical' >
              <Upload max={9} />
            </Form.Item>
            <Form.Item label='视频上传' field='videos' direction='vertical' >
              <Upload type='video' />
            </Form.Item>
            <Form.Item label='视频和图片上传' field='all' direction='vertical' >
              <Upload max={9} type='all' />
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
