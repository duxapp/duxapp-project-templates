import { Header, ScrollView, TopView, Column, Text, px, PullView, Button } from '@/duxui'
import { useState } from 'react'

export default TopView.page(function ScrollViewExample() {

  const [show, setShow] = useState(false)

  return <>
    <Header title='ScrollView' />
    <ScrollView>
      <Child
        title='滚动组件默认具有 flex: 1 这个属性，因此，滚动组件的父组件需要有剩余高度'
      />
    </ScrollView>
    <Button className='m-3' type='secondary' onClick={() => setShow(true)}>弹出一个滚动容器</Button>
    <ScrollView.Horizontal>
      <Child
        title='横向滚动默认不会有 flex: 1 这个属性'
      />
    </ScrollView.Horizontal>
    {show && <PullView onClose={() => setShow(false)}>
      <Column style={{ height: px(800) }}
        className='bg-page rt-3 pv-3'
      >
        <ScrollView>
          <Child
            title='如果在弹出框里，需要给父元素设置一个高度'
          />
        </ScrollView>
      </Column>
    </PullView>}
  </>
})

const Child = ({ title }) => {
  return <>
    <Column className='p-3 m-3 bg-white r-2'>
      <Text>{title}</Text>
    </Column>
    <Column className='p-3 m-3 bg-white r-2' style={{ height: px(400) }}>
      <Text>内容</Text>
    </Column>
    <Column className='p-3 m-3 bg-white r-2' style={{ height: px(400) }}>
      <Text>内容</Text>
    </Column>
    <Column className='p-3 m-3 bg-white r-2' style={{ height: px(400) }}>
      <Text>内容</Text>
    </Column>
    <Column className='p-3 m-3 bg-white r-2' style={{ height: px(400) }}>
      <Text>内容</Text>
    </Column>
  </>
}
