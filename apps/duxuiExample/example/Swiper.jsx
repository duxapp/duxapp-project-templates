import { Header, ScrollView, TopView, Swiper, GroupList, Text, Column, px, SwiperItem } from '@/duxuiExample'

export default function SwiperExample() {
  return <TopView>
    <Header title='Swiper' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='默认'>
          <Swiper style={{ height: px(200) }}>
            {content()}
          </Swiper>
        </GroupList.Item>
        <GroupList.Item title='指示点 自动滚动'>
          <Swiper style={{ height: px(200) }} dot circular autoplay>
            {content()}
          </Swiper>
        </GroupList.Item>
        <GroupList.Item title='垂直滚动'>
          <Swiper style={{ height: px(200) }} vertical>
            {content()}
          </Swiper>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}

const content = () => {
  return [
    <SwiperItem key={1}>
      <Column grow items='center' justify='center' className='bg-primary'>
        <Text size={5} bold color={4}>内容 1</Text>
      </Column>
    </SwiperItem>,
    <SwiperItem key={2}>
      <Column grow items='center' justify='center' className='bg-success'>
        <Text size={5} bold color={4}>内容 2</Text>
      </Column>
    </SwiperItem>
  ]
}
