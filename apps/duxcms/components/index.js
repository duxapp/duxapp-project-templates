import { useRequest, usePageData } from '@/duxcms/utils'
import { createList } from '@/duxapp/components'
import { createDetail } from './Detail'

const Detail = createDetail(useRequest)
const List = createList(usePageData)

export {
  Detail,
  List
}

export * from '@/duxappReactNative/components'
export * from '@/duxapp/components'
export * from './CmsIcon'
export * from './Search'
