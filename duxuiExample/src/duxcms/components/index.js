import { useRequest, usePageData } from '@/duxcms/utils'
import { createDetail, createList } from '@/duxapp/components'

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
