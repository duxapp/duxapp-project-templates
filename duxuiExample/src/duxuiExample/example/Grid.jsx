import { Grid, Header, ScrollView, TopView, GroupList, Column, Text } from '@/duxuiExample'
import './Grid.scss'

const list = ['内容1', '内容21', '内容3', '内容4', '内容5', '内容6', '内容7', '内容8']

export default function CellExample() {
  return <TopView>
    <Header title='Grid' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Grid>
            {
              list.map(item => <Column key={item} className='grid-item'>
                <Text>{item}</Text>
              </Column>)
            }
          </Grid>
        </GroupList.Item>
        <GroupList.Item title='间距'>
          <Grid gap={20}>
            {
              list.map(item => <Column key={item} className='grid-item'>
                <Text>{item}</Text>
              </Column>)
            }
          </Grid>
        </GroupList.Item>
        <GroupList.Item title='正方形'>
          <Grid gap={20} square>
            {
              list.map(item => <Column key={item} className='grid-item'>
                <Text>{item}</Text>
              </Column>)
            }
          </Grid>
        </GroupList.Item>
        <GroupList.Item title='指定列数量 和不同间距'>
          <Grid rowGap={20} columnGap={60} column={3}>
            {
              list.map(item => <Column key={item} className='grid-item'>
                <Text>{item}</Text>
              </Column>)
            }
          </Grid>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
