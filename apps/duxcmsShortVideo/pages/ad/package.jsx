import { ScrollView, Button, Column, Divider, Form, Header, Image, Input, Text, Calendar, TopView, px, Row, Tab, LinearGradient, duxappTheme, PickerSelect, ModalForm, ModalForms, UploadImage, Radio, nav, Grid, toast, loading, Modal, confirm, route, useRoute, dayjs } from '@/duxui'
import { CmsIcon, NumInput, usePageData, request } from '@/duxcmsShortVideo'
import { useCallback, useEffect, useRef, useState } from 'react'
import { chooseLocation } from '@/amap'
import { startPay } from '@/duxcmsPay'

export default function AdApply() {

  const form = useRef()

  const [areaList] = usePageData('advert/advert/area')

  const [typeList] = usePageData('advert/advert/type')

  const [select, setSelect] = useState()

  const area = areaList.find(v => v.area === select) || areaList[0] || {}

  const [check, setCheck] = useState(false)

  useEffect(() => {
    if (areaList.length) {
      form.current.setValue('area', areaList[0].area)
    }
  }, [areaList])

  const submit = useCallback(async oldData => {
    if (!check) {
      return toast('请先同意投放协议')
    }
    const data = {
      ...oldData,
      data: oldData.data?.map((item, index) => {
        if (!item?.num) {
          return
        }
        return {
          ...item,
          type: typeList[index].type
        }
      }).filter(v => v)
    }
    if (!data.data?.length) {
      return toast('请选择投放数量')
    }
    const { id } = await request({
      url: 'advert/create',
      data,
      method: 'POST',
      loading,
      toast: true
    })
    await startPay({
      // price,
      // token,
      payList: () => request('advert/create/type'),
      payUrl: `advert/create/${id}`,
      passwordUrl: 'duxcmsAccount/account/password',
      fields: {
        type: 'pay_type',
        params: 'pay_params'
      }
    })
    await confirm({
      title: '推广成功',
      cancel: false
    })
    route.redirect('duxcmsShortVideo/ad/list')
  }, [check, typeList])

  return <TopView>
    <Header title='广告套餐' />
    <Form onSubmit={submit} ref={form}>
      <ScrollView>
        <Form.Item field='short_id'>
          <PackageVideo />
        </Form.Item>
        <Column className='mt-3 mh-3'>
          <Text size={5} bold>我的投放设置</Text>
        </Column>
        <Column className='r-2 mh-3 mt-' style={{ backgroundColor: '#FDF1E5' }}>
          <Column className='p-3'>
            <Text color='#A86800' bold>请选择投放区域</Text>
            <Text color='#A86800' size={2} className='mt-1'>不同区域效果及报价有所区别，请谨慎选择</Text>
          </Column>
          <Column className='r-2 mt-2 bg-white ph-3 mh-3'>
            <Form.Item field='area'>
              <Tab key={areaList.length} defaultValue={areaList[0]?.area} onChange={setSelect}>
                {
                  areaList.map(item => <Tab.Item key={item.area} title={item.name} paneKey={item.area} />)
                }
              </Tab>
            </Form.Item>
            <Text size={1} color={2} className='mt-2'>{area.content}</Text>
            {!!area.images?.length && <Image.Group>
              <Grid className='mt-3' gap={24}>
                {
                  area.images.map(item => <Image src={item} key={item} className='bg-page r-2 w-full' style={{ height: px(240) }} />)
                }
              </Grid>
            </Image.Group>}
            <Column className='mt-3' />
          </Column>
          <Column className='pv-3' />
        </Column>
        <Column className='bg-white r-3 pv-2 gap-3 mh-3' style={{ marginTop: px(-32) }}>
          <Text size={5} bold className='mh-2'>其他设置</Text>
          <Row items='center' justify='between' className='mh-2'>
            <Text bold size={2}>可指定投放日期</Text>
            <Form.Item field='date'>
              <ModalForm
                renderForm={<Calendar mode='day' checkbox
                  min={dayjs().format('YYYY-MM-DD')}
                />}
                placeholder='请选择'
                title='可指定投放日期'
                childPropsValueKey='value'
              >
                <DateShow />
              </ModalForm>
            </Form.Item>
          </Row>
          <Form.Item field='data'>
            <Form.Array>
              {
                typeList.map((type, index) => {
                  const Comp = types[type.type]
                  if (!Comp) {
                    return
                  }
                  return <Form.Item field={index} key={type.type}>
                    <Form.Object>
                      <Comp
                        config={area.data?.find(v => v.type === type.type)}
                        name={type.name}
                        content={type.content}
                      />
                    </Form.Object>
                  </Form.Item>
                })
              }
            </Form.Array>
          </Form.Item>

          <Column style={{ height: px(60) }} justify='center' className='overflow-hidden'>
            <Divider type='dashed' />
            <Column style={{ width: px(60), left: px(-30) }} className='absolute square top-0 bg-page r-max' />
            <Column style={{ width: px(60), right: px(-30) }} className='absolute square top-0 bg-page r-max' />
          </Column>
          <Row className='mh-2' justify='between' items='center'>
            <Text bold size={5}>合计金额</Text>
            <Form.Item field='data'>
              {({ value }) => {
                let price = 0
                if (value?.length && area.data) {
                  price = value.reduce((prev, current, index) => {
                    if (!current?.num) {
                      return prev
                    }
                    return current.num * (+current.price || area.data[index].unit_price) + prev
                  }, 0)
                }
                return <Text bold size={40} type='danger'>¥{price}</Text>
              }}
            </Form.Item>
          </Row>
        </Column>
        <Row className='p-3 gap-1' items='center'>
          <Radio checked={check} onClick={() => setCheck(!check)} />
          <Text color={3}>已阅读并同意 <Text type='secondary'
            onClick={() => nav('duxcms/common/richtext?url=advert/advert/agreement&title=隐私政策')}
          >《投放协议》</Text></Text>
        </Row>
        <Form.Submit>
          <Button className='m-3' size='l' type='primary'>立即支付</Button>
        </Form.Submit>
        <Column className='p-3' />
      </ScrollView>
    </Form>
  </TopView >
}

const PackageVideo = ({
  value,
  onChange
}) => {

  const { params } = useRoute()

  const [videos, { setList, loading: _loading }] = usePageData('short/push', {
    ready: !params.select,
    defaultListData: params.select ? [params.select] : []
  })

  useEffect(() => {
    if (params.select) {
      onChange(params.select?.id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.select])

  const select = useCallback(async () => {
    const { backData } = await nav('duxcmsShortVideo/video/select')
    const res = await backData()
    if (res?.id) {
      setList(old => {
        const list = old.slice(0, 3).filter(v => v.id !== res.id)
        list.unshift(res)
        return list.slice(0, 3)
      })
      onChange(res?.id)
    }
  }, [onChange, setList])

  return <Column className='r-2 bg-white mh-3 mt-3 p-3'>
    <Row items='center' justify='between' className='pv-1'>
      <Text size={5} bold>我想推广的视频</Text>
      <Text size={1} color={3} onClick={select}>查看全部 <CmsIcon name='direction_right' /></Text>
    </Row>
    <Text size={1} type='danger'>您可每次选择1个视频进行投放</Text>
    <Radio.Group virtual value={value} onChange={onChange}>
      {!!videos.length && <Grid className='p-3' column={3} gap={24}>
        {
          videos.slice(0, 3).map(item => <VideoSelectItem key={item.id} item={item} />)
        }
      </Grid>}
    </Radio.Group>
    {!videos.length && !_loading && <Column className='m-3 gap-3 r-2 bg-page' justify='center' items='center' style={{ height: px(240) }}>
      <Text>暂无视频，请先去发布视频</Text>
      <Text size={40} bold color='#18CC90'
        onClick={() => nav('duxcmsShortVideo/video/release')}
      >去发布 <CmsIcon name='direction_right' /></Text>
    </Column>}
    <Text size={1} color={3}>按需付费，未达到预期部分退款</Text>
  </Column>
}

const VideoSelectItem = ({ item }) => {
  return <Column style={{ width: px(180), height: px(240) }} className='r-3 w-full overflow-hidden'>
    <Image className='w-full h-full bg-page' src={item.cover} />
    <Radio value={item.id} className='absolute right-0 top-0 ph-2' />
  </Column>
}

const DateShow = ({ value, ...props }) => {
  return <Text {...props} align='right' grow color={value?.length ? 1 : 3}>{value?.length ? `共${value.length}天` : '请选择'}<CmsIcon name='direction_right' /></Text>
}

const types = {
  views: ({ config = {}, ...props }) => {
    return <Card title='按曝光次数收费' {...props}>
      <CardNum title='总曝光次数' max={config.max_num} />
      <Divider />
      <Row items='center' justify='between'>
        <Text size={2}>单价</Text>
        <Text size={2} bold>{config.unit_price * 100} 元/100次</Text>
      </Row>
      <Row items='center' justify='between'>
        <Text size={2}>小计</Text>
        <Text size={2} bold type='secondary'><TotalItemPrice price={config.unit_price} /></Text>
      </Row>
    </Card>
  },
  click: ({ config = {}, ...props }) => {
    return <Card title='按点击观看付费' {...props}>
      <CardNum title='预点击量' max={config.max_num} />
      <Divider />
      <Row items='center' justify='between'>
        <Text size={2}>单价</Text>
        <Text size={2} bold>{config.unit_price * 100} 元/100次</Text>
      </Row>
      <Row items='center' justify='between'>
        <Text size={2}>预充值</Text>
        <Text size={2} bold type='secondary'><TotalItemPrice price={config.unit_price} /></Text>
      </Row>
    </Card>
  },
  share: ({ config = {}, ...props }) => {
    return <Card title='按转发付费' {...props}>
      <CardNum title='预转发量' max={config.max_num} />
      <Divider />
      <Row items='center' justify='between'>
        <Text size={2}>单价</Text>
        <Text size={2} bold>{config.unit_price * 100} 元/100次</Text>
      </Row>
      <Row items='center' justify='between'>
        <Text size={2}>预充值</Text>
        <Text size={2} bold type='secondary'><TotalItemPrice price={config.unit_price} /></Text>
      </Row>
    </Card>
  },
  order: ({ config = {}, ...props }) => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [list] = usePageData('advert/create/industry')

    return <Card title='按效果付费' {...props}>
      <Row items='center' justify='between' className='mt-1'>
        <Text size={2}>基础价格（不同行业基础价格不一样）</Text>
        <Text size={2} bold>{config.unit_price}元/单</Text>
      </Row>
      <Row items='center'>
        <Text bold size={2}>请选择行业</Text>
        <Form.Item field='industry_id'>
          <PickerSelect placeholder='请选择' range={list} valueKey='id' title='行业' grow />
        </Form.Item>
      </Row>
      <Row items='center' >
        <Text bold size={2}>想要的效果</Text>
        <ModalForms
          renderForm={<>
            <Column className='p-3'>
              <Form.Item field='tel' label='电话效果' direction='vertical' labelProps={{ bold: true }}>
                <Input className='bg-page r-2 ph-2' placeholder='请输入电话号码' type='number' style={{ height: px(88) }} />
              </Form.Item>
              <Form.Item field='image' label='表单效果' direction='vertical' labelProps={{ bold: true }} subLabel='请添加表单背景图片'>
                <UploadImage addText='添加背景' />
              </Form.Item>
              <Form.Item fields label='地址信息' direction='vertical' labelProps={{ bold: true }}>
                <PopAddress />
              </Form.Item>
            </Column>
          </>}
        >
          <Text color={3} grow align='right'>请填写联系信息 <CmsIcon name='direction_right' /></Text>
        </ModalForms>
      </Row>
      <Divider />
      <Column className='gap-2'>
        <Row items='center' justify='between'>
          <Text bold size={2}>请输竞价金额(元/单）</Text>
          <Form.Item field='price'>
            <Input grow placeholder='请输入金额' type='number' align='right' />
          </Form.Item>
        </Row>
        <Text size={1} type='secondary'>*同行业竞价排名，优先头发广告</Text>
      </Column>
      <Divider />
      <CardNum title='期望单量' max={config.max_num} step={1} />
      <Divider />
      <Row items='center' justify='between'>
        <Text size={2}>预充值</Text>
        <Form.Item field='price'>
          {({ value }) => {
            return <Text size={2} bold type='secondary'><TotalItemPrice price={+value || config.unit_price} /></Text>
          }}
        </Form.Item>
      </Row>
    </Card>
  }
}

const TotalItemPrice = ({ price }) => {
  return <Form.Item field='num'>
    {({ value }) => {
      if (!value) {
        return '¥0'
      }
      return `¥${value * price}`
    }}
  </Form.Item>
}

const PopTip = ({
  name,
  content,
  onClose
}) => {

  return <Modal show onClose={onClose}>
    <Column className='gap-4' items='center'>
      <Column className='r-3 p-3 gap-3' style={{ backgroundColor: '#FDF1E5', width: px(654) }}>
        <Text align='center' bold color='#A86800'>{name}</Text>
        <Text size={2}>{content}</Text>
      </Column>
      <CmsIcon name='op_close' color='#fff' size={72} onClick={onClose} />
    </Column>
  </Modal>
}

PopTip.show = (name, content) => {
  const { remove } = TopView.add([
    PopTip,
    {
      name,
      content,
      onClose: () => {
        remove()
      }
    }
  ])
}

const PopAddress = ({ value, onChange }) => {

  return <Row style={{ height: px(88) }} className='bg-page r-1 ph-2 items-center justify-between'
    onClick={async () => {
      const res = await chooseLocation()
      onChange({
        address: [...res.area, res.address],
        position: [res.longitude, res.latitude]
      })
    }}
  >
    <Text color={value.address?.length ? 1 : 3}>{value.address?.length ? value.address : '添加位置'}</Text>
    <CmsIcon name='add-select' size={40} color={duxappTheme.textColor3} />
  </Row>
}

const Card = ({ title, children, name, content }) => {
  return <LinearGradient colors={['#5C92FF', '#fff']} className='r-2 mh-2'>
    <Column className='mt-1 mh-1 bg-white r-2 p-3 gap-3'>
      <Row items='center' className='gap-2'>
        <Text bold size={2}>{title}</Text>
        <CmsIcon name='promot_tips' color='#5C92FF' size={36}
          onClick={() => PopTip.show(name, content)}
        />
      </Row>
      {children}
    </Column>
  </LinearGradient>
}

const CardNum = ({ title, max, step = 100 }) => {
  return <Row items='center' justify='between' className='mt-1'>
    <Text bold size={2}>{title}</Text>
    <Form.Item field='num'>
      <NumInput step={step} max={max} />
    </Form.Item>
  </Row>
}
