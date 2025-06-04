import { getMedia } from '@/duxapp/utils/net/util'
import { Header, TopView, Column, SvgEditor, SvgEditorController, px, useSvgEditorController } from '@/duxuiExample'

export default function SvgEditorExample() {

  const context = useSvgEditorController()

  return <TopView>
    <Header title='SvgEditor' />
    <Column grow className='m-3 bg-white'>
      <SvgEditor
        width='100%' height='100%'
        {...context.editor}
      />
    </Column>
    <SvgEditorController
      {...context.controller}
      selectImage={selectImage}
      className='m-3 bg-white r-1'
      style={{ height: px(100), marginTop: 0 }}
    />
  </TopView>
}

const selectImage = async () => {
  const res = await getMedia('image', { count: 1 })

  return res[0].path
}
