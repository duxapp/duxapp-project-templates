import { Header, ScrollView, TopView, GroupList, Column } from '@/duxuiExample'
import {
  Svg, Rect, Circle, Ellipse, Image, Text,
  Polygon,
  Defs, G, ClipPath, RadialGradient,
  Stop, Path
} from '@/duxui/components/Svg'

export default TopView.page(function SvgExample() {

  return <>
    <Header title='Svg 裁剪' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='实现图片圆角'>
          <Svg width={100} height={100}>
            <Defs>
              <ClipPath id='clip'>
                <Path d={generateRoundedRectPath(10, 10, 80, 80, 24)} />
              </ClipPath>
            </Defs>
            <Image
              x={10}
              y={10}
              width={80}
              height={80}
              href={require('./static/logo.jpg')}
              clipPath='url(#clip)'
            />
          </Svg>
        </GroupList.Item>
        <GroupList.Item title='图片复杂示例'>
          <Svg width={100} height={100}>
            <Defs>
              <ClipPath id='clip'>
                <Circle cx='50%' cy='50%' r='40%' />
              </ClipPath>
            </Defs>
            <Rect x='0' y='0' width='100%' height='100%' fill='red' />
            <Rect x='5%' y='5%' width='50%' height='90%' />

            <Image
              x='5%'
              y='5%'
              width='50%'
              height='90%'
              preserveAspectRatio='xMidYMid slice'
              opacity='0.7'
              href={require('./static/logo.jpg')}
              clipPath='url(#clip)'
            />
            <Text
              x='50'
              y='50'
              textAnchor='middle'
              fontWeight='bold'
              fontSize='16'
              fill='yellow'
            >
              DUXAPP
            </Text>
          </Svg>
        </GroupList.Item>
        <GroupList.Item title='形状组合裁剪'>
          <Svg width={100} height={100}>
            <Defs>
              <RadialGradient
                id='grad'
                cx='50%'
                cy='50%'
                rx='50%'
                ry='50%'
                fx='50%'
                fy='50%'
              >
                <Stop offset='0%' stopColor='#ff0' stopOpacity='1' />
                <Stop offset='100%' stopColor='#00f' stopOpacity='1' />
              </RadialGradient>
              <ClipPath id='clip'>
                <G scale='0.9' x='10'>
                  <Circle cx='30' cy='30' r='20' />
                  <Ellipse cx='60' cy='70' rx='20' ry='10' />
                  <Rect x='65' y='15' width='30' height='30' />
                  <Polygon points='20,60 20,80 50,70' />
                  <Text
                    x='50'
                    y='65'
                    fontSize='32'
                    fontWeight='bold'
                    textAnchor='middle'
                    scale='1.2'
                  >Q</Text>
                </G>
              </ClipPath>
            </Defs>
            <Rect
              x='0'
              y='0'
              width='100'
              height='100'
              fill='url(#grad)'
              clipPath='url(#clip)'
            />
          </Svg>
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
