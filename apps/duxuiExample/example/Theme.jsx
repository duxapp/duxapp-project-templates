import { Header, ScrollView, TopView, GroupList, theme, Button } from '@/duxuiExample'

export default function ThemeExample() {

  const mode = theme.useMode(true)

  const modes = theme.useModes()

  return <TopView>
    <Header title='Theme' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='主题切换功能' desc='主题切换当前仅支持小程序和H5端，其他端还在努力开发中'
          className='gap-3'
        >
          {
            modes.map(item => <Button
              type='primary'
              plain={item.mode !== mode}
              key={item.name}
              onClick={() => item.switch()}
              size='l'
            >{item.name}</Button>)
          }
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
