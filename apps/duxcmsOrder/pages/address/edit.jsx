import { Button, Card, Column, Divider, Form, Header, Input, Radio, Row, ScrollView, Text, TopView, asyncTimeOut, loading, nav, useRoute } from '@/duxui'
import { request, useRequest, orderHook } from '@/duxcmsOrder'
import { showToast } from '@tarojs/taro'
import { useCallback } from 'react'
import { chooseLocation } from '@/amap'

export default function AddressEdit() {

  const { params } = useRoute()

  const submit = useCallback(data => {
    request({
      url: `order/address${params.id ? '/' + params.id : ''}`,
      method: 'POST',
      loading,
      toast: true,
      data
    }).then(() => {
      showToast({
        title: '提交成功',
      })
      asyncTimeOut(800).then(() => nav('back:'))
    }).catch(() => { })
  }, [params.id])

  const del = useCallback(() => {
    request({
      url: `order/address/${params.id}`,
      method: 'DELETE',
      loading,
      toast: true,
    }).then(() => {
      showToast({
        title: '删除成功'
      })
      asyncTimeOut(800).then(() => nav('back:'))
    })
  }, [params.id])

  return <TopView isForm>
    <Header title='收货地址' renderRight={params.id && <Text size={2} onClick={del}>删除</Text>} />
    {
      params.id ? <Edit id={params.id} onSubmit={submit} /> : <Add onSubmit={submit} />
    }
  </TopView>
}

const Edit = ({ id, ...props }) => {
  const [data] = useRequest(`order/address/${id}`)

  return <Form {...props} key={data.id} defaultValues={data} direction='horizontal'>
    <FormContent />
  </Form>

}

const Add = props => {
  return <Form {...props} direction='horizontal'>
    <FormContent />
  </Form>
}

const FormContent = () => {
  return <>
    <ScrollView>
      <Card margin verticalPadding={false}>
        <Divider.Group padding={0}>
          <Form.Item label='联系人' field='name'>
            <Input grow placeholder='请输入联系人姓名' />
          </Form.Item>
          <Form.Item label='联系电话' field='tel'>
            <Input grow placeholder='请输入联系人号码' />
          </Form.Item>
          <orderHook.Render mark='address.edit.area'>
            <Form.Item label='所在区域' fields>
              <Address />
            </Form.Item>
          </orderHook.Render>
          <Form.Item label='详细地址' field='address'>
            <Input grow placeholder='请输入详细地址' />
          </Form.Item>
        </Divider.Group>
      </Card>
      <Form.Item field='default'>
        <DefaultCheck />
      </Form.Item>
    </ScrollView>
    <Column className='p-3 bg-white'>
      <Form.Submit>
        <Button type='primary' size='l' radiusType='round'>保存地址</Button>
      </Form.Submit>
    </Column>
  </>
}

const Address = ({ value, onChange }) => {
  return <Text grow color={value.area ? 1 : 3}
    onClick={async () => {
      const res = await chooseLocation()
      onChange({
        area: res.area,
        address: res.address,
        lng: res.longitude,
        lat: res.latitude
      })
    }}
  >{value.area ? value.area.join('') : '请选择'}</Text>
}

const DefaultCheck = ({ value = false, onChange }) => {
  return <Row className='ph-3 gap-1' items='center' onClick={() => onChange(!value)}>
    <Radio checked={!!value} />
    <Text size={2}>设置为默认地址</Text>
  </Row>
}
