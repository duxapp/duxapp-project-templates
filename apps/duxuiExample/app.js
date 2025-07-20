import { formConfig } from '@/duxui'
import { chooseMedia } from '@/duxapp/utils/net/util'
import '@/duxapp/utils/touchEvent'

formConfig.setConfig({
  upload: (type, option) => {
    const promse = chooseMedia(type, option).then(res => res.map(v => v.path))

    promse.start = () => {
      return promse
    }
    promse.progress = () => {
      return promse
    }

    return promse
  },
  uploadTempFile: files => {
    const promse = Promise.resolve().then(() => files.map(v => v.path))

    promse.start = () => {
      return promse
    }
    promse.progress = () => {
      return promse
    }

    return promse
  }
})
