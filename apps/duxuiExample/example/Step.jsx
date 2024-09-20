import { Header, ScrollView, TopView, Step, GroupList, Text } from '@/duxuiExample'

const list = [
  { name: '阶段1', time: '06-18 14:22' },
  { name: '阶段2', time: '06-19 14:27' },
  { name: '阶段3', time: '06-20 15:12' },
  { name: '阶段4', time: '06-21 12:22' },
  { name: '阶段5', time: '06-22 14:22' },
  { name: '阶段6', time: '06-23 14:24' },
]

const Start = ({
  item
}) => {
  return <Text align='center'>{item.name}</Text>
}

const End = ({
  item
}) => {
  return <Text align='center'>{item.time}</Text>
}

export default function StepExample() {
  return <TopView>
    <Header title='Step' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='横向'>
          <Step
            data={list}
            startSize={30}
            renderStart={Start}
            renderEnd={End}
          />
        </GroupList.Item>
        <GroupList.Item title='纵向'>
          <Step
            vertical
            data={list}
            startSize={150}
            renderStart={Start}
            renderEnd={End}
          />
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
