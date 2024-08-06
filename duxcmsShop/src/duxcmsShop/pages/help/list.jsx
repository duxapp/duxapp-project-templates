import { Column, Divider, Header, Row, ScrollView, Text, TopView, duxappTheme, nav } from '@/duxui'
import { CmsIcon, usePageData } from '@/duxcmsShop'

export default function HelpList() {

  const [list, action] = usePageData('tools/magic/help')

  return <TopView>
    <Header title='帮助中心' />
    <ScrollView
      refresh={action.refresh}
      onRefresh={action.reload}
      onScrollToLower={action.next}
    >
      <Column className='mh-3 mt-2 r-2' style={{ backgroundColor: duxappTheme.primaryColor }}>
        <Column className='mt-2 bg-white r-2 ph-3 pv-1'>
          {
            list.map((item, index) => <Item item={item} index={index} key={item.id} />)
          }
        </Column>
      </Column>
    </ScrollView>
  </TopView>
}

const Item = ({ item, index }) => {
  return <>
    {!!index && <Divider padding={0} />}
    <Row className='pv-3 mv-1 gap-3' items='center' justify='between' onClick={() => nav('duxcmsShop/help/detail', { id: item.id })}>
      <Text>{item.title}</Text>
      <CmsIcon name='you2' size={32} color={duxappTheme.textColor2} />
    </Row>
  </>
}
