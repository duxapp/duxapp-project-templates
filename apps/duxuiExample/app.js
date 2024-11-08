import { formConfig } from '@/duxui'
import { getMedia } from '@/duxapp/utils/net/util'

export default {}

formConfig.setConfig({
  upload: (type, option) => {
    const promse = getMedia(type, option).then(res => res.map(v => v.path))

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
