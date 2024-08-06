import { Header, ScrollView, TopView, Form, Card, Divider, UploadImages, UploadImage } from '@/duxuiExample'

export default function UploadExample() {
  return <TopView>
    <Header title='Upload' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <Divider.Group>
            <Form.Item label='图片上传' field='image' direction='vertical' >
              <UploadImage />
            </Form.Item>
            <Form.Item label='多图上传' field='images' direction='vertical' >
              <UploadImages />
            </Form.Item>
          </Divider.Group>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
