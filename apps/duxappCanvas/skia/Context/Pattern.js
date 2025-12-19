import { TileMode, FilterMode, MipmapMode } from '@shopify/react-native-skia'

const getTileModes = repetition => {
  switch (repetition) {
    case 'repeat-x':
      return [TileMode.Repeat, TileMode.Clamp]
    case 'repeat-y':
      return [TileMode.Clamp, TileMode.Repeat]
    case 'no-repeat':
      return [TileMode.Clamp, TileMode.Clamp]
    case 'repeat':
    default:
      return [TileMode.Repeat, TileMode.Repeat]
  }
}

export class CanvasPattern {
  constructor(image, repetition = 'repeat') {
    this.repetition = repetition
    this.skImage = image?.image ?? image
    if(!this.skImage?.makeShaderOptions) {
      throw new Error('CanvasPattern: invalid image')
    }
  }

  applyToPaint(paint) {
    if (!this.shader) {
      const [tileX, tileY] = getTileModes(this.repetition)

      this.shader = this.skImage.makeShaderOptions(
        tileX,
        tileY,
        FilterMode.Nearest,
        MipmapMode.None
      )
    }
    paint.setShader(this.shader)
  }
}
