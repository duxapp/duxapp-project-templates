import { Header, ScrollView, TopView, GroupList, loading, Button, Space } from '@/duxuiExample'
import { useRef } from 'react'

export default function LoadingExample() {

  const loadingRef = useRef(null)

  return <TopView>
    <Header title='loading' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='显示加载动画'>
          <Space>
            <Button
              type='primary'
              onClick={() => {
                loadingRef.current = loading()
              }}
            >显示</Button>
            <Button
              type='danger'
              onClick={() => {
                loadingRef.current?.()
              }}
            >隐藏</Button>
          </Space>
        </GroupList.Item>
        <GroupList.Item title='自定义文本'>
          <Button
            type='primary'
            onClick={() => {
              const stop = loading('加载中')
              setTimeout(stop, 3000)
            }}
          >显示</Button>
        </GroupList.Item>
        <GroupList.Item title='遮住页面'>
          <Button
            type='primary'
            onClick={() => {
              const stop = loading('加载中', true)
              setTimeout(stop, 3000)
            }}
          >显示</Button>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
