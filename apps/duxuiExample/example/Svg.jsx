import { Header, ScrollView, TopView, GroupList, pxNum, duxappTheme, Button, confirm, Column } from '@/duxuiExample'
import {
  Svg, Rect, Circle, Ellipse, Line, Image, Text, TSpan,
  Polyline, Polygon, Path,
  Defs, Use, G,
  LinearGradient, Stop, SvgToImage, SvgComponent
} from '@/duxui/components/Svg'
import { useRef } from 'react'
import { saveImageToPhotosAlbum } from '@tarojs/taro'

export default TopView.HOC(function SvgExample() {

  const toImage = useRef()

  const primary = duxappTheme.primaryColor
  const secondary = duxappTheme.secondaryColor

  return <>
    <Header title='Svg' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <SvgToImage ref={toImage}>
            <Svg width={pxNum(702)} height={pxNum(1080)}>
              <Defs>
                <G id='items' stroke={primary}>
                  <Rect width={50} height={50} />
                  <Circle cx={75} cy={25} r={25} />
                  <Image x={100} y={0} width={50} height={50} href={require('./static/logo.jpg')} />
                  <Line x1={150} y1={0} x2={200} y2={50} strokeWidth={5} />
                  <Polyline points='200,0 250,0 250,50' />
                  <Polygon points='250,0 300,0 300,50' />
                  <Ellipse cx={25} cy={85} rx={25} ry={15} />
                  <Path d={generateRoundedRectPath(50, 60, 50, 50, 12)} />
                  <Text x={150} y={80} fontSize={24}>文本效果</Text>
                  <Text x={150} y={100} fontSize={18}
                    textAnchor='middle'
                  >对齐方式</Text>
                  <Text x={200} y={100} fontSize={18} dx='0 5 5 5 5 5' dy='0 5 5'>
                    文本
                    <TSpan dx={5}>子元素1</TSpan>
                    <TSpan x={200} y={130} fontStyle='italic'>
                      子元
                      <TSpan dx='10 10' fontWeight='bold'>素2</TSpan>
                    </TSpan>
                  </Text>
                </G>
                <LinearGradient id='lg' x1={0} y1={0} x2={1} y2={0}>
                  <Stop offset={0} stopColor={primary} />
                  <Stop offset={1} stopColor={secondary} />
                </LinearGradient>
              </Defs>
              <Use href='#items' fill={secondary} />
              <Use href='#items' x={0} y={140} fill='url(#lg)' />
              <Use href='#items' x={0} y={300} fill='url(#lg)' opacity={0.5}
                origin={[pxNum(702) / 2, 300]}
                rotation={10}
                scale={0.9}
              />
              <CustomSvg />
            </Svg>
          </SvgToImage>
          <Button type='primary' size='l'
            onClick={async () => {
              const { tempFilePath } = await toImage.current.capture()
              if (process.env.TARO_ENV === 'h5') {
                confirm({
                  title: 'H5不支持保存',
                  content: '你可以将获取的截图临时文件用于上传等操作(在h5端返回base64格式的图片)',
                  cancel: false
                })
                return
              }
              await saveImageToPhotosAlbum({ filePath: tempFilePath })
              confirm({
                title: '保存成功'
              })
            }}
          >保存到相册</Button>
        </GroupList.Item>
      </GroupList>
      <Column className='p-2' />
    </ScrollView>
  </>
})

// 画圆角矩形路径
const generateRoundedRectPath = (x, y, w, h, radius) => {
  const r = Math.min(radius, w / 2, h / 2);

  return `M ${x + r},${y}
    H ${x + w - r}
    A ${r},${r} 0 0 1 ${x + w},${y + r}
    V ${y + h - r}
    A ${r},${r} 0 0 1 ${x + w - r},${y + h}
    H ${x + r}
    A ${r},${r} 0 0 1 ${x},${y + h - r}
    V ${y + r}
    A ${r},${r} 0 0 1 ${x + r},${y}
    Z`.trim()
}

/**
 * 支持自定义组件
 * 但是组件需要用 SvgComponent 进行包裹，否则自定义组件里面的内容不会渲染
 */
const CustomSvg = () => {

  const primary = duxappTheme.primaryColor
  const secondary = duxappTheme.secondaryColor

  return <SvgComponent>
    <Defs>
      <G id='shape'>
        <Circle cx={50} cy={50} r={50} style='fill: #000;' />
        <Rect x={50} y={50} width={50} height={50} style='fill: #000' />
        <Circle cx={50} cy={50} r={5} style='fill: blue;' />
      </G>
    </Defs>
    <Use href='#shape' x={0} y={420} />
    <Rect
      x={120} y={420}
      width='20%' height='20%'
      rx={10} ry={10}
      stroke={secondary} fill={primary}
      // 不支持百分比，位置从Svg原点开始计算
      origin='120, 420'
      // scale={[0.5, 0.6]}
      scale={0.5}
      rotation={45}
      // RN上斜切效果在组合rotation后和其他端不一致，应该避免组合rotation使用
      // skew={10}
      // translate 写法在RN上不生效，需要分别写两个属性
      // translate={[50, 50]}
      translateX={30}
      translateY={30}
    />
  </SvgComponent>
}
