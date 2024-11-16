import { TopView, TabBar, TestIcon, duxappTheme } from '@/duxuiExample'
import { Home, User } from './pages'

const tabbarList = [
  {
    text: '首页',
    icon: 'nav-home-line',
    iconHover: 'nav-home-fill',
    comp: Home
  },
  {
    text: '个人中心',
    icon: 'nav-mine-line',
    iconHover: 'nav-mine-fill',
    comp: User
  }
]

const TabBarIcon = ({
  hover,
  index
}) => {

  return <TabBar.ItemIcon
    hover={hover}
    name={tabbarList[index].text}
    icon={<TestIcon size={40} color={hover ? duxappTheme.primaryColor : duxappTheme.textColor1} name={tabbarList[index][hover ? 'iconHover' : 'icon']} />}
  />
}

export default function Index() {

  // const [items, setItems] = useState('stretch')


  // return <Column items={items} className='p-3 bg-success w-full gap-3'>
  //   <Text className='bg-danger text-c4' onClick={() => setItems('start')}>start</Text>
  //   <Text className='bg-danger text-c4' onClick={() => setItems('center')}>center</Text>
  //   <Text className='bg-danger text-c4' onClick={() => setItems('end')}>end</Text>
  //   <Text className='bg-danger text-c4' onClick={() => setItems('stretch')}>stretch</Text>
  //   <Text className='bg-danger text-c4' onClick={() => setItems('baseline')}>baseline</Text>
  // </Column>

  return (
    <TopView isSafe>
      <TabBar>
        {
          tabbarList.map(item => <TabBar.Item key={item.text} component={item.comp} icon={TabBarIcon} />)
        }
      </TabBar>
    </TopView>
  )
}
