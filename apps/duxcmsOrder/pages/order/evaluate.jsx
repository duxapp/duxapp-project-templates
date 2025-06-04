import { useCallback, useMemo } from 'react'
import { TopView, Header, Row, ScrollView, Divider, Form, Button, Textarea, Card, nav, loading, confirm, Grade, UploadImages, useRoute, Image, Column, Text, px, FormItem, FormSubmit, FormObject, FormArray } from '@/duxui'
import { duxappTheme, request, useRequest } from '@/duxcmsOrder'

export default function Evaluate() {

  const { params } = useRoute()

  const [orderInfo] = useRequest(`order/order/${params.id}`)

  const goods = useMemo(() => orderInfo.goods || [], [orderInfo.goods])

  const submit = useCallback(async data => {
    await request({
      url: `order/assess/${params.id}`,
      method: 'POST',
      loading,
      toast: true,
      data: data.data.map((item, index) => {
        item.id = goods[index].id
        return item
      })
    })
    await confirm({
      title: '提交成功',
      cancel: false
    })
    nav('back:')
  }, [goods, params.id])

  return <TopView>
    <Header title='参与评价' />
    <Form onSubmit={submit} labelProps={{ bold: true }}>
      <ScrollView>
        <FormItem field='data'>
          <FormArray>
            {
              goods.map((good, index) => <FormGoodItem good={good} index={index} key={good.id} />)
            }
          </FormArray>
        </FormItem>
      </ScrollView>
      <Row style={{ paddingLeft: px(64), paddingRight: px(64), paddingTop: px(8), paddingBottom: px(8), backgroundColor: '#fff' }}>
        <FormSubmit>
          <Button className='flex-grow' style={{ backgroundColor: duxappTheme.primaryColor, height: px(90) }} color='#fff' radiusType='round' size='l'>保存提交</Button>
        </FormSubmit>
      </Row>
    </Form>
  </TopView>
}

const FormGoodItem = ({ good,index }) => {
  return <FormItem field={index}>
    <FormObject>
      <Card margin verticalPadding={false}>
        <Row className='gap-3 pv-3'>
          <Image src={good.goods_image} className='r-2' square style={{ width: px(160) }} />
          <Column grow justify='between' className='pv-1 overflow-hidden'>
            <Row items='center' justify='between'>
              <Text bold size={2} numberOfLines={1} grow>{good.goods_name}</Text>
              <Text bold size={2}><Text size={1}>￥</Text>{good.goods_price}</Text>
            </Row>
            <Row items='center' justify='between'>
              <Text bold size={2} color={3} numberOfLines={1}>{good.goods_spec}</Text>
              <Text bold size={2} color={2}>x{good.goods_num}</Text>
            </Row>
          </Column>
        </Row>
        <Divider padding={0} />
        <FormItem field='score' label='商品评分'>
          <Grade grow />
        </FormItem>
        <Divider padding={0} />
        <FormItem field='content' label='我的评价' direction='vertical'>
          <Textarea placeholder='选填' />
        </FormItem>
        <Divider padding={0} />
        <FormItem field='images' label='上传图片' direction='vertical'>
          <UploadImages max={9} />
        </FormItem>
      </Card>
    </FormObject>
  </FormItem>
}
