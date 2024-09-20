import Taro from '@tarojs/taro'
import { Column, Row } from '@/duxui'
import { Design, ComponentList, Editor, Layer, Attr, defineComponentConfigs } from '@/design/Design'
import { defineComponents } from '@/design'
import { getMedia } from '@/duxapp/utils/net/util'
import * as form from '@/duxuiDesign/components/form/config'
import * as layout from '@/duxuiDesign/components/layout/config'
import * as show from '@/duxuiDesign/components/show/config'
import '../../../theme.scss'
import '../../../app.scss'

import './index.scss'

defineComponents({
  ...layout.comps,
  ...form.comps,
  ...show.comps,
})

defineComponentConfigs({
  ...layout.config,
  ...form.config,
  ...show.config,
})

Taro.initPxTransform({
  designWidth: 375,
  deviceRatio: {
    375: 1.25
  }
})

export default function DuxDesign({ config, ...props }) {

  return <Design config={{ ...defaultConfig, ...config }} Design={DuxDesign} {...props}>
    <Row grow justify='between' className='design-page'>
      <ComponentList />
      <div className='center'>
        <div className='editor'>
          <div className='phone'>
            <Editor />
          </div>
        </div>
      </div>
      <Column className='attr-layer'>
        <Layer />
        <Attr />
      </Column>
    </Row>
  </Design>
}

const defaultConfig = {
  upload: async (type, option) => {
    const res = await getMedia(type, option)
    return res.map(item => item.path)
  },
  theme: {
    dark: false,
  },
  link: [

  ]
}
