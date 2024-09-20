import { CmsIcon, List } from '@/duxcms'
import { Column, Calendar, Empty, Header, Image, ModalForm, Row, Text, TopView, duxappTheme, px, dayjs } from '@/duxui'
import { useState } from 'react'

export default function UserLike() {

  const [dates, setDate] = useState(() => {
    return [
      dayjs().add(-30, 'day').format('YYYY-MM-DD'),
      dayjs().format('YYYY-MM-DD')
    ]
  })
  return <TopView>
    <Header title='我的获赞' />
    <ModalForm
      renderForm={<Calendar mode='scope' />}
      childPropsValueKey='value'
      title='日期范围'
      value={dates}
      onChange={setDate}
    >
      <Dates />
    </ModalForm>
    <List
      url='mall/mall'
      renderEmpty={<Empty title='暂无作品' />}
      renderItem={Item}
      columns={3}
      listClassName='flex-row flex-wrap'
      listStyle={{ gap: px(4) }}
    />
  </TopView>
}

const Item = () => {
  return <Column>
    <Image style={{ width: px(246), height: px(328) }} />
    <Column className='absolute left-0 bottom-0 right-0 p-2'>
      <Text color={4} size={20}><CmsIcon name='xihuan' size={28} /> 203万</Text>
    </Column>
  </Column>
}

const Dates = ({ value, ...props }) => {
  return <Row className='p-3 gap-1' justify='end' shrink items='center' {...props}>
    <Text color={2} size={1} align='right'>{value?.join('~') || '未设置'}</Text>
    <CmsIcon name='direction_down' color={duxappTheme.textColor2} size={40} />
  </Row>
}
