import { nav, toast } from '@/duxcms'

export const previewVideos = ({
  list,
  select = 0,
  url,
  params,
  page = 2,
  titile,
  ...props
}) => {
  if (!list.length) {
    return toast('预览数据错误')
  }
  nav('duxcmsShortVideo/video/list', {
    list,
    select,
    url,
    params,
    page,
    titile,
    ...props
  })
}
