import { ActionSheet, Card, Header, Row, ScrollView, Text, TopView, lang } from '@/duxui'
import { CmsIcon } from '@/duxcms'

export default function Lang() {

  const currentLang = lang.useLang()

  return <TopView>
    <Header title='Lang 多语言' />
    <ScrollView>
      <Card margin disableMarginBottom className='gap-3'>
        <Row className='items-center'
          onClick={async () => {
            const langs = lang.getLangs()
            const { index } = await ActionSheet.show({
              list: langs.map(v => v.name)
            })
            lang.setLang(langs[index].value)
          }}
        >
          <Text grow>语言</Text>
          <Text>{currentLang.name}</Text>
          <CmsIcon name='direction_right' className='text-s5 text-c2' />
        </Row>
        <Text>展示程序仅少部分区域支持语言切换，切换后可返回首页查看效果</Text>
      </Card>
    </ScrollView>
  </TopView>
}
