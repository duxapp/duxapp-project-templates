import { request } from '@/duxcmsUser'
import { loading } from '@/duxui'
import { RenderHook } from '../components'

export * from '@/duxcmsUser/utils'

export const chatHook = new RenderHook()

export const platformCustom = async () => {
  const info = await request({
    url: 'chat/main/platform',
    tiast: true,
    loading
  })
}
