import { Header, ScrollView, TopView, GroupList } from '@/duxuiExample'
import { Button, duxappTheme, px, Row, Sign, toast } from '@/duxui'
import { useRef } from 'react'

export default function SignExample() {

  const sign = useRef()

  return <TopView>
    <Header title='Sign' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='签名' desc='需要设置高度'>
          <Sign ref={sign} style={{ height: px(1000) }} color={duxappTheme.primaryColor} className='bg-white' />
        </GroupList.Item>
        <Row className='gap-2'>
          <Button
            type='primary'
            size='l'
            className='flex-grow'
            onClick={async () => {
              try {
                const tempPath = await sign.current.save(true)
                console.log(tempPath)
                toast('临时文件路径：' + tempPath)
              } catch (error) {
                toast(error)
              }
            }}
          >获取图片</Button>
          <Button
            type='secondary'
            size='l'
            className='flex-grow'
            onClick={() => sign.current.clear()}
          >清空</Button>
          <Button
            type='secondary'
            size='l'
            className='flex-grow'
            onClick={() => sign.current.revoke()}
          >撤销</Button>
        </Row>
      </GroupList>
    </ScrollView>
  </TopView>
}
