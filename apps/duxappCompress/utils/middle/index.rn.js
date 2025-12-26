import { duxappTheme, ObjectManage, TopView } from '@/duxapp'
import { useEffect, useRef, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { File } from 'expo-file-system'
import { Video, Image } from 'react-native-compressor'

export const chooseMediaCompressor = async (files, option) => {

  const compressed = option.sizeType && option.sizeType.length === 1 && option.sizeType[0] === 'compressed'

  if (!compressed) {
    return files
  }

  await Promise.all(files.map(async file => {
    if (file.type === 'video') {
      // 开始压缩视频
      file.path = await Task.getInstance().compressor(file.path)
      const info = new File(file.path).info()
      file.size = info.size
    } else if (file.type === 'image') {
      file.path = await Image.compress(file.path, {
        maxWidth: 1920,
        maxHeight: 1920,
        quality: 0.6
      })
      const info = new File(file.path).info()
      file.size = info.size
    }
  }))
  return files
}

class Task extends ObjectManage {

  constructor() {
    super({
      defaultData: {
        tasks: []
      }
    })
  }

  async compressor(filePath) {
    return new Promise((resolve, reject) => {
      this.data.tasks.push({
        filePath,
        callback: (error, file) => {
          error ? reject(error) : resolve(file)
        }
      })
      this.set({ ...this.data })
      this.showProgress()
    })
  }

  showProgress() {
    if (this.show) {
      return
    }
    this.show = true
    const { remove } = TopView.add([
      Progress,
      {
        onStop: () => {
          remove()
          this.show = false
        },
        onClose: () => {
          // 终止任务 页面被关闭
          const { tasks } = this.data
          tasks.forEach(task => {
            task.callback('关闭页面')
          })
          this.merge({
            tasks: []
          })
        }
      }
    ])
  }
}

const Progress = ({ onStop, onClose }) => {

  const { tasks } = Task.getInstance().useData()

  const [progress, setProgress] = useState(0)

  const refs = useRef({}).current

  const exec = async () => {
    if (refs.close) {
      return
    }

    if (!tasks.length) {
      onStop()
      return
    }

    const task = tasks.pop()

    setProgress(0)

    try {
      const newFilePath = await Video.compress(task.filePath, {
        maxSize: 720,
        bitrate: 1000,
        getCancellationId: cancellationId => {
          refs.cancellationId = cancellationId
        }
      }, setProgress)

      task.callback(null, newFilePath)

      // 继续执行
      exec()
    } catch (error) {
      exec()
      task.callback(error)
    }
  }

  useEffect(() => {
    exec()
    return () => {
      refs.close = true
      Video.cancelCompression(refs.cancellationId)
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose, refs])

  return <>
    <View style={styles.mask} />
    <View
      style={[
        styles.main,
        {
          backgroundColor: duxappTheme.whiteColor
        }
      ]}
    >
      <Text style={[styles.progress, { color: duxappTheme.textColor1 }]}>{(progress * 100).toFixed(1)}%</Text>
      <Text style={[styles.length, { color: duxappTheme.textColor2 }]}>压缩中 {tasks.length + 1}</Text>
    </View>
  </>
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  main: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [
      { translateX: '-50%' },
      { translateY: '-50%' }
    ],
    zIndex: 10,
    borderRadius: 16,
    width: 240,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32
  },
  progress: {
    fontSize: 36,
    fontWeight: 'bold'
  },
  length: {
    fontSize: 16
  }
})
