import { CmsIcon } from '@/duxcms'
import { px, Row, Text, nav, duxappTheme, LinearGradient } from '@/duxui'

export const OrderNav = ({ title, url, ...props }) => {
  return <Row className='overflow-hidden mh-3 mt-3' items='center' justify='between' {...props}>
    <Row items='center' >
      <LinearGradient className='absolute bottom-0 left-0'
        style={{
          width: px(68),
          height: px(12)
        }}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[duxappTheme.primaryColor, duxappTheme.pageColor]}
      />
      <Text className='z-1' size={6} bold >{title}</Text>
    </Row>
    {!!url && <Row items='center'
      onClick={() => {
        if (typeof url === 'function') {
          url()
        } else {
          nav(url)
        }
      }}
    >
      <Text color={3}>查看更多</Text>
      <CmsIcon name='direction_right' color='#A1A6B6' size={32} />
    </Row>}
  </Row>
}
