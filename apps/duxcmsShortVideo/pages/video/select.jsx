import { List } from '@/duxcms'
import { Button, Column, Empty, Header, Image, Radio, TopView, nav, px, toast } from '@/duxui'
import { useCallback, useState } from 'react'

export default function VideoSelect() {

  const [select, setSelect] = useState()

  const submit = useCallback(() => {
    if (!select) {
      return toast('请选择视频')
    }
    nav('back:', select)
  }, [select])

  return <TopView>
    <Header title='选择推广视频' />
    <Radio.Group virtual value={select} onChange={setSelect}>
      <Column grow className='p-3'>
        <List
          url='short/push'
          renderEmpty={<Empty title='暂无作品' />}
          renderItem={Item}
          columns={3}
          listClassName='flex-row flex-wrap'
          listStyle={{ gap: px(24) }}
        />
      </Column>
    </Radio.Group>
    <Column className='absolute bottom-0 left-0 right-0 p-3'>
      <Button size='l' type='primary' onClick={submit}>确定</Button>
    </Column>
  </TopView>
}

const Item = ({ item }) => {
  return <Column>
    <Image src={item.cover} style={{ width: px(218), height: px(290) }} className='bg-white r-2' />
    <Radio className='absolute ph-2 right-0 top-0' value={item} />
  </Column>
}
