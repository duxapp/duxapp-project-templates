import { loading, request } from '@/duxcms'
import { confirm, route, toast } from '@/duxui'

export const userReal = async onlySubmit => {
  const info = await request({
    url: 'member/real',
    loading,
    toast: true,
    repeatTime: 0
  })

  if ((onlySubmit ? !info.no : !info.status) && await confirm({
    title: '实名认证',
    content: '需要先完成实名认证才能继续操作，是否立即去认证？'
  })) {
    const { backData } = await route.nav('duxcmsAccount/real/form')
    const data = await backData()
    if (!data?.status) {
      throw '取消提交'
    }
    if (!onlySubmit) {
      const res = await request({
        url: 'member/real',
        loading,
        toast: true,
        repeatTime: 0
      })
      if (!res.status) {
        toast('认证审核中，请等待审核')
        throw '审核中'
      }
    }
  }
}
