import { Grid, UploadImage, UploadImages, Image as UIImage } from '@/duxui'
import { NestFormItem } from './FormItem'

export const Image = ({ config }) => {

  return <NestFormItem config={config}>
    <UploadImage />
  </NestFormItem>
}

Image.type = 'image'

Image.Display = ({ value }) => {
  if (!value) {
    return null
  }
  return <UIImage src={value} preview className='Magic__image' />
}

export const Images = ({ config }) => {

  return <NestFormItem config={config}>
    <UploadImages />
  </NestFormItem>
}

Images.type = 'images'

Images.Display = ({ value }) => {
  return <UIImage.Group>
    <Grid colum={4} square gap={24}>
      {
        value?.map((item, index) => <UIImage key={index} src={item} className='w-full h-full' />)
      }
    </Grid>
  </UIImage.Group>
}
