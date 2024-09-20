import { DuxDesign } from '@/duxcmsDesign'
import { Column, Header, duxappTheme } from '@/duxui'

import './index.scss'

export default function NewApp() {
  return <Column style={{ height: '100vh', display: 'flex', backgroundColor: duxappTheme.pageColor }}>
    <Header show={false} title='duxapp 移动端页面设计器' />
    <DuxDesign className='flex-grow' />
  </Column>
}
