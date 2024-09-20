import { Header, TopView } from '@/duxapp'
import { MagicList } from '@/magic/components'

import './index.scss'

export default function NewApp() {
  return <TopView>
    <Header title='魔方数据演示' titleCenter />
    <MagicList table='test' />
  </TopView>
}
