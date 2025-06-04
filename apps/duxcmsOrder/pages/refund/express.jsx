import { Column, ScrollView, Button, TopView, Header, route, Form, PickerSelect, useRoute, Input, loading, FormItem, FormSubmit } from '@/duxui'
import { request, usePageData } from '@/duxcmsOrder'
import { useCallback } from 'react'

export default function RefundExpress() {

  const { params } = useRoute()

  const [list] = usePageData('order/refund/express')

  const submit = useCallback(async _data => {
    await request({
      url: `order/refund/${params.id}/delivery`,
      loading,
      toast: true,
      data: _data,
      method: 'POST'
    })
    route.back()
  }, [params.id])

  return <TopView>
    <Header title='售后提交' />
    <Form direction='horizontal' labelProps={{ bold: true }} onSubmit={submit}>
      <ScrollView>
        <Column className='mh-3 mt-3 bg-white r-2 ph-3'>
          <FormItem label='快递' field='express_id'>
            <PickerSelect grow valueKey='id' range={list} title='快递' placeholder='请选择' />
          </FormItem>
          <FormItem label='单号' field='no'>
            <Input grow align='right' placeholder='请输入单号' />
          </FormItem>
        </Column>
        <FormSubmit>
          <Button type='primary' size='l' className='m-3'>提交发货</Button>
        </FormSubmit>
      </ScrollView>
    </Form>
  </TopView>
}
