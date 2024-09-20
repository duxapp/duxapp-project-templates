import { List, CmsIcon } from '@/duxcmsShortVideo'
import { Avatar, Column, Divider, Empty, Header, InputSearch, Row, Tab, Text, TopView, duxappTheme, nav } from '@/duxui'
import { useState } from 'react'

export default function UserAtList() {

  const [keyword, setKeyword] = useState('')

  const [url, setUrl] = useState(tabs[0].url)

  return <TopView>
    <Header
      renderHeader={<Row className='h-full gap-1 pv-1'>
        <Header.Back />
        <Row items='center' grow className='gap-2 ph-3 r-max' self='stretch'
          style={{ backgroundColor: duxappTheme.pageColor }}
        >
          <CmsIcon name='search' size={36} color={duxappTheme.textColor3} />
          <InputSearch onChange={setKeyword} className='flex-grow' placeholder='请输入用户昵称' />
        </Row>
      </Row>}
    />
    <Tab value={url} onChange={setUrl}>
      {
        tabs.map(item => <Tab.Item key={item.name} title={item.name} paneKey={item.url} />)
      }
    </Tab>
    <Column grow className='ph-3 r-3 bg-white mt-1'>
      <List
        url={url}
        data={{ keyword }}
        renderItem={Item}
        renderEmpty={<Empty title='暂无用户' />}
        renderLine={<Divider />}
      />

    </Column>
  </TopView>
}

const tabs = [
  { name: '关注', url: 'member/fans/concern' },
  { name: '粉丝', url: 'member/fans' }
]

const Item = ({ item }) => {
  return <Row className='pv-3 gap-3' items='center' onClick={() => nav('back:', item)}>
    <Avatar url={item.avatar} />
    <Text bold>{item.nickname}</Text>
  </Row>
}
