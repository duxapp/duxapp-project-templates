import { GasIcon, duxappTheme, request } from '@/gasVideo'
import { Header, Column, Row, Text, TopView, Avatar, Button, Form, Divider, loading, toast, confirm, Textarea, nav } from '@/duxui'
import { Textarea as TaroTextarea } from '@tarojs/components'
import { CmsIcon, px, upload, VideoUpload } from '@/duxcmsShortVideo'
import { chooseLocation } from '@/amap'
import { useCallback, useRef } from 'react'

export default function Release() {

  const submit = useCallback(async data => {
    if (!data.url) {
      return toast('请上传视频')
    }
    if (!data.title) {
      return toast('请输入视频标题')
    }
    if (!data.topic) {
      return toast('请输入话题')
    }
    await request({
      url: 'short/push',
      method: 'POST',
      toast: true,
      loading,
      data: {
        ...data,
        title: `${data.title}${data.topic.split(' ').map(item => ' #' + item).join('')}`
      }
    })
    await confirm({
      title: '发布成功',
      cancel: false
    })
    nav('back:')
  }, [])

  return <TopView>
    <Header />
    <Form onSubmit={submit}>
      <Row className='bg-white r-2 mh-3 mt-3 p-3 gap-3'>
        <Column grow className='gap-2'>
          <Form.Item field='title'>
            <Title />
          </Form.Item>
          <Form.Item field='topic'>
            <Topic />
          </Form.Item>
        </Column>
        <Form.Item fields>
          <VideoUpload tip='5分钟内视频' />
        </Form.Item>
      </Row>
      <Column className='bg-white r-2 mh-3 mt-3 p-3 gap-3'>
        <Form.Item field='cover'>
          <VideImage />
        </Form.Item>
        <Divider style={{ marginLeft: px(72) }} />
        <Form.Item fields>
          <Address />
        </Form.Item>
      </Column>
      <Form.Submit>
        <Button size='l' type='primary' className='m-3' style={{ marginTop: px(150) }}>立即发布</Button>
      </Form.Submit>
    </Form>
  </TopView>
}

const Title = ({ value, onChange }) => {
  return <TaroTextarea
    value={value} maxlength={100}
    onInput={e => onChange(e.detail.value)}
    style={{ width: px(420), height: px(240), color: duxappTheme.textColor1 }}
    placeholderStyle={`color: ${duxappTheme.textColor3}`}
    placeholder='添加作品描述(100个字内)'
  />
}

const Topic = ({ value, onChange }) => {

  const text = useRef('')
  const input = useCallback(async () => {
    if (await confirm({
      title: '话题',
      content: <Column className='p-3'>
        <Textarea focus defaultValue={text.current} onChange={e => text.current = e} placeholder='请输入话题，使用空格区分多个话题' />
      </Column>
    })) {
      onChange(text.current)
    }
  }, [onChange])

  const values = (value || '话题').split(' ')

  return <Row className='gap-2' wrap>
    {
      values.map((item, index) => <Column key={index} className='bg-page r-1 p-1' self='start' onClick={input}>
        <Text size={2}>#{item}</Text>
      </Column>)
    }
  </Row>
}

const VideImage = ({ value, onChange }) => {

  const up = useCallback(async () => {
    let stop
    try {
      const [url] = await upload('image', { count: 1, compressed: true }).start(() => {
        stop = loading('上传中')
      })
      stop()
      onChange(url)
    } catch (error) {
      stop?.()
    }
  }, [onChange])

  return <Row className='gap-3' items='center' onClick={up}>
    <GasIcon name='pic1' size={48} color={duxappTheme.textColor1} />
    <Text bold grow>添加封面</Text>
    {!!value && <Avatar url={value} />}
    <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
  </Row>
}

const Address = ({ value, onChange }) => {

  const select = useCallback(async () => {
    const res = await chooseLocation()
    onChange({
      address: [...res.area, res.address],
      position: [res.longitude, res.latitude]
    })
  }, [onChange])

  return <Row className='gap-3' items='center' onClick={select}>
    <CmsIcon name='map' size={48} color={duxappTheme.textColor1} />
    <Text bold grow>添加位置</Text>
    {!!value?.address && <Text numberOfLines={2} bold grow>{value.address}</Text>}
    <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
  </Row>
}
