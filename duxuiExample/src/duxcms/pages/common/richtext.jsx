import { TopView, Header, Detail } from '@/duxcms/components'
import { View } from '@tarojs/components'
import { useRoute, userConfig } from '@/duxcms/utils'
import { HtmlView } from '@/duxui/components/HtmlView'

const getContent = text => {
  if (typeof text !== 'string') {
    return text
  }
  const replace = userConfig.option?.duxcms?.richtext?.replace
  if (replace?.length) {
    replace.forEach(([str1, str2]) => {
      text = text.replaceAll(str1, str2)
    })
  }
  return text
}

export default function CommonRichText() {

  const { params } = useRoute()

  return <TopView>
    <Header title={params.title} />
    <Detail url={params.url}>
      {({ data }) => {
        return <View className='m-3 r-3 bg-white p-3'>
          <HtmlView html={getContent(data[params.key || 'content'])}></HtmlView>
        </View>
      }}
    </Detail>
  </TopView>
}
