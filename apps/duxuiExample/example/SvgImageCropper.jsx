import { Header, ScrollView, TopView, GroupList, SvgImageCropper, svgImageCropper, pxNum, Button, chooseMedia, Column, Row, Text, Image, px, toast } from '@/duxuiExample'
import { useRef, useState } from 'react'

export default function SvgImageCropperExample() {

  const [img, setImg] = useState()

  const [result, setResult] = useState()

  const [apiResult, setApiResult] = useState()

  const save = useRef()

  return <TopView>
    <Header title='SvgImageCropper' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='使用组件裁剪'>
          <Column className='gap-2 bg-white r-2 p-2'>
            <Column className='bg-white border-w1 border-primary'>
              <SvgImageCropper quality={0.8} ref={save} src={img} width={pxNum(702)} height={pxNum(300)} />
            </Column>
            <Row className='gap-3'>
              <Button type='primary'
                onClick={async () => {
                  const [file] = await chooseMedia('image')
                  setImg(file.path)
                }}
              >选择图片</Button>
              <Button type='primary'
                onClick={async () => {
                  if (!img) {
                    return toast('请选择图片')
                  }
                  // 在选择图片之前调用裁剪方法会报错
                  const { tempFilePath } = await save.current.capture()
                  setResult(tempFilePath)
                }}
              >裁剪并保存</Button>
            </Row>
            <Text size={1} color={3}>裁剪结果</Text>
            <Image src={result} style={{ width: px(702), height: px(300) }} />
          </Column>
        </GroupList.Item>
        <GroupList.Item title='API使用'>
          <Column className='gap-2 bg-white r-2 p-2'>
            <Button type='primary'
              onClick={async () => {
                const [file] = await chooseMedia('image')
                const { tempFilePath } = await svgImageCropper({
                  src: file.path,
                  cropScale: '4:3',
                  quality: 0.8
                })
                setApiResult(tempFilePath)
              }}
            >选择图片并裁剪</Button>
            <Text size={1} color={3}>裁剪结果</Text>
            <Image src={apiResult} style={{ width: px(702), height: px(702 / 4 * 3) }} />
          </Column>
        </GroupList.Item>

      </GroupList>
    </ScrollView>
  </TopView>
}
