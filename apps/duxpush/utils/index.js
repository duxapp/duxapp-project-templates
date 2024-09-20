import { noop } from '@/duxapp'

export const DuxPush = {}
export const duxPushInit = () => ({
  callback: noop,
  remove: noop
})
