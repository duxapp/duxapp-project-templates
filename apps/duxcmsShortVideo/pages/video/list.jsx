import { Header, TopView, useRoute } from '@/duxui'
import { ShortVideoList } from '@/duxcmsShortVideo'

export default TopView.HOC(function ShortVideo() {

  const { params } = useRoute()

  return (
    <>
      <Header absolute title={params.title} color='#fff' style={{ backgroundColor: 'transparent', zIndex: 2 }} />
      <ShortVideoList />
    </>
  )
})
