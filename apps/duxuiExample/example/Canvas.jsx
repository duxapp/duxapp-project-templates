import { Header, TopView, GroupList, ScrollView, px } from '@/duxuiExample'
import { Canvas, defineCanvasRef } from '@/duxappCanvas'
import { useEffect, useRef } from 'react'

export default function CanvasExample() {

  const pictureRef = useRef(defineCanvasRef())
  const normalRef = useRef(defineCanvasRef())

  useEffect(() => {
    let cancelled = false
    let rafId = null
    let canvasInst = null

    pictureRef.current.getCanvas().then(({ canvas }) => {
      if (cancelled) {
        return
      }

      canvasInst = canvas
      const ctx = canvas.getContext('2d')

      const logo = canvas.createImage()
      let logoReady = false
      logo.src = require('./static/logo.jpg')
      logo.onload = () => {
        logoReady = true
      }

      const render = (t = 0) => {
        if (cancelled) {
          return
        }

        const { width = 0, height = 0 } = canvas.layout || {}
        if (!width || !height) {
          rafId = canvas.requestAnimationFrame(render)
          return
        }

        const time = t / 1000

        // picture 模式下 clearRect 不会清屏：每帧全量重绘背景
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = '#f5f7fb'
        ctx.fillRect(0, 0, width, height)

        // 轻微动效：网格背景
        const grid = 24
        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgba(0,0,0,0.05)'
        const offset = (time * 30) % grid
        for (let x = -grid; x < width + grid; x += grid) {
          ctx.beginPath()
          ctx.moveTo(x + offset, 0)
          ctx.lineTo(x + offset, height)
          ctx.stroke()
        }

        // 旋转方块
        ctx.save()
        ctx.translate(width / 2, height / 2)
        ctx.rotate(time)
        ctx.fillStyle = 'rgba(76, 175, 80, 0.9)'
        ctx.fillRect(-44, -44, 88, 88)
        ctx.restore()

        // 弹跳小球
        const cx = width / 2 + Math.cos(time * 1.6) * (width * 0.25)
        const cy = height / 2 + Math.sin(time * 2.2) * (height * 0.18)
        ctx.beginPath()
        ctx.arc(cx, cy, 18 + Math.sin(time * 3) * 3, 0, Math.PI * 2)
        ctx.fillStyle = '#2196f3'
        ctx.fill()

        // 文本
        ctx.font = 'bold 18px Arial'
        ctx.fillStyle = '#111827'
        ctx.textAlign = 'left'
        ctx.fillText('Canvas picture 模式（全量重绘）', 12, 28)

        // 图片：随时间轻微摆动
        if (logoReady) {
          const imgSize = 72
          const imgX = 12
          const imgY = Math.max(44, height - imgSize - 12)
          ctx.save()
          ctx.translate(imgX + imgSize / 2, imgY + imgSize / 2)
          ctx.rotate(Math.sin(time * 1.5) * 0.15)
          ctx.drawImage(logo, -imgSize / 2, -imgSize / 2, imgSize, imgSize)
          ctx.restore()
        }

        rafId = canvas.requestAnimationFrame(render)
      }

      rafId = canvas.requestAnimationFrame(render)
    }).catch(err => {
      console.error(err)
    })

    return () => {
      cancelled = true
      if (canvasInst?.cancelAnimationFrame && rafId !== null) {
        canvasInst.cancelAnimationFrame(rafId)
      }
    }
  }, [])

  useEffect(() => {
    normalRef.current.getCanvas().then(({ canvas, size }) => {
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
    <ScrollView>
      <GroupList>
        <GroupList.Item title='画布（picture）' desc='开启后每次渲染都会使用新的绘制画布：变换状态会重置，需每帧/每次完整重绘；适合动画或全局重绘场景，使用这个模式大约能提升50%的性能'>
          <Canvas
            ref={pictureRef}
            className='w-full'
            style={{ height: px(720) }}
            picture
          />
        </GroupList.Item>
        <GroupList.Item title='画布（普通）' desc='默认模式会复用同一绘制画布并保留变换状态；适合静态或增量绘制（例如只更新局部内容）'>
          <Canvas
            ref={normalRef}
            className='w-full'
            style={{ height: px(720) }}
          />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
