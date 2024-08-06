import { Column, Header, HorseLanternLottery, Text, TopView, duxappTheme, px, GroupList, ScrollView, confirm } from '@/duxuiExample'

export default function HorseLanternLotteryExample() {

  return (
    <TopView isSafe>
      <Header title='HorseLanternLottery' />
      <ScrollView>
        <GroupList>
          <GroupList.Item title='随机结果'>
            <HorseLanternLottery
              list={list}
              renderItem={Item}
              onEnd={res => console.log('抽奖结果', res.index)}
              renderStart={<Column grow className='items-center justify-center'>
                <Text>开始</Text>
              </Column>}
            />
          </GroupList.Item>
          <GroupList.Item title='异步获取结果'>
            <HorseLanternLottery
              list={list}
              renderItem={Item}
              onStart={async () => {
                const status = await confirm({
                  content: '点击确定选中奖品3，点击取消取消抽奖'
                })
                if (status) {
                  return 2
                }
                throw '取消'
              }}
              onEnd={res => console.log('抽奖结果', res.index)}
              renderStart={<Column grow className='items-center justify-center'>
                <Text>开始</Text>
              </Column>}
            />
          </GroupList.Item>
          <GroupList.Item title='指定行和列'>
            <HorseLanternLottery
              list={list}
              column={4}
              row={4}
              renderItem={Item}
              onEnd={res => console.log('抽奖结果', res.index)}
              renderStart={<Column grow className='items-center justify-center'>
                <Text>开始</Text>
              </Column>}
            />
          </GroupList.Item>
          <GroupList.Item title='自定义间距'>
            <HorseLanternLottery
              list={list}
              gap={64}
              renderItem={Item}
              onEnd={res => console.log('抽奖结果', res.index)}
              renderStart={<Column grow className='items-center justify-center'>
                <Text>开始</Text>
              </Column>}
            />
          </GroupList.Item>
          <GroupList.Item title='禁用抽奖'>
            <HorseLanternLottery
              disabled
              list={list}
              onDisabledClick={() => confirm({ content: '抽奖次数已经用完了' })}
              renderItem={Item}
              onEnd={res => console.log('抽奖结果', res.index)}
              renderStart={<Column grow className='items-center justify-center'>
                <Text>抽奖次数已用完</Text>
              </Column>}
            />
          </GroupList.Item>
        </GroupList>
      </ScrollView>
    </TopView>
  )
}

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const Item = ({ item, index, select }) => {
  return <Column className='bg-white items-center justify-center'
    style={
      select ?
        {
          borderColor: duxappTheme.primaryColor,
          borderWidth: 3,
          height: px(180)
        } :
        {
          height: px(180)
        }
    }
  >
    <Text>奖品{item}</Text>
  </Column>
}