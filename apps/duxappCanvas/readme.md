# duxappCanvas

为了实现兼容多端的canvas，开发了这个组件，在RN端将用 `react-native-skia` 模拟canvas的api，实现跨端绘图功能

## 安装
```
yarn duxapp app add duxappCanvas
```

## 使用

```jsx
import { Header, TopView, GroupList } from '@/duxuiExample'
import { Canvas, defineCanvasRef } from '@/duxappCanvas'
import { useEffect, useRef } from 'react'

export default function CanvasExample() {

  const ref = useRef(defineCanvasRef())

  useEffect(() => {
    ref.current.getCanvas().then(({ canvas, size }) => {
      const ctx = canvas.getContext('2d')
      // 1. 基本矩形绘制
      ctx.fillStyle = '#e1f5fe'
      ctx.fillRect(0, 0, size.width, size.height)

      // 2. 路径和描边
      ctx.beginPath()
      ctx.moveTo(50, 50)
      ctx.lineTo(150, 50)
      ctx.lineTo(100, 150)
      ctx.closePath()

      ctx.strokeStyle = '#0277bd'
      ctx.lineWidth = 5
      ctx.lineJoin = 'round'
      ctx.stroke()

      ctx.fillStyle = 'rgba(2, 119, 189, 0.3)'
      ctx.fill()

      // 3. 圆形和虚线
      ctx.beginPath()
      ctx.arc(200, 100, 50, 0, Math.PI * 2)
      ctx.setLineDash([10, 5])
      ctx.strokeStyle = '#d81b60'
      ctx.stroke()
      ctx.setLineDash([])

      // 4. 文本绘制
      ctx.font = 'bold 24px Arial'
      ctx.fillStyle = '#000'
      ctx.textAlign = 'center'
      ctx.fillText('Hello Skia!', size.width / 2, 50)

      ctx.strokeStyle = '#ff9800'
      ctx.lineWidth = 1
      ctx.strokeText('Stroke Text', size.width / 2, 80)

      // 5. 图像绘制
      const image = canvas.createImage()
      image.src = require('./static/logo.jpg')
      image.onload = () => {
        // 完整图片
        ctx.drawImage(image, 50, 200, 100, 100)

        // 裁剪后图片
        ctx.drawImage(
          image,
          50, 50, 100, 100,  // 源矩形
          180, 200, 150, 150  // 目标矩形
        )
      }

      // 6. 变换和旋转
      ctx.save()
      ctx.translate(size.width / 2, size.height / 2)
      ctx.rotate(Math.PI / 4)
      ctx.fillStyle = '#4caf50'
      ctx.fillRect(-50, -50, 100, 100)
      ctx.restore()

      // 7. 混合模式
      ctx.globalCompositeOperation = 'multiply'
      ctx.fillStyle = '#2196f3'
      ctx.beginPath()
      ctx.arc(300, 400, 40, 0, Math.PI * 2)
      ctx.fill()

      // 8. 重置混合模式
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = '#ff5722'
      ctx.fillRect(280, 380, 40, 40)
    }).catch(err => {
      console.error(err)
    })
  }, [])

  return <TopView>
    <Header title='Canvas' />
    <GroupList className='flex-grow'>
      <GroupList.Item title='画布' desc='RN端使用skia模拟部分canvas的功能（实验性的）'>
        <Canvas
          ref={ref}
          className='flex-grow w-full'
        />
      </GroupList.Item>
    </GroupList>
  </TopView>
}
```
