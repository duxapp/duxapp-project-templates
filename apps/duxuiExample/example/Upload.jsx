import { Header, ScrollView, TopView, Form, Card, Divider, Upload, DividerGroup, FormItem } from '@/duxuiExample'

export default function UploadExample() {
  return <TopView>
    <Header title='Upload' />
    <Form onSubmit={console.log}>
      <ScrollView>
        <Card margin verticalPadding={false}>
          <DividerGroup>
            <FormItem label='图片上传' field='image' direction='vertical' >
              <Upload />
            </FormItem>
            <FormItem label='多图上传' field='images' direction='vertical' >
              <Upload max={9} />
            </FormItem>
            <FormItem label='视频上传' field='videos' direction='vertical' >
              <Upload type='video' />
            </FormItem>
            <FormItem label='视频和图片上传' field='all' direction='vertical' >
              <Upload max={9} type='all' />
            </FormItem>
          </DividerGroup>
        </Card>
      </ScrollView>
    </Form>
  </TopView>
}
