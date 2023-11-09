import { Fragment, cloneElement, isValidElement, useMemo } from 'react'

export class RenderHook {

  elements = {}

  add = (mark, ...element) => {
    if (!this.elements[mark]) {
      this.elements[mark] = []
    }
    this.elements[mark].push(...element)
  }

  useMark = mark => {
    const res = useMemo(() => this.elements[mark] || [], [mark])

    return res
  }

  Render = ({ mark, option }) => {
    const element = this.elements[mark]
    if (!element?.length) {
      return null
    }
    return element.map((item, index) => {
      if (item instanceof Array && !isValidElement(item[0])) {
        const [Item, props] = item
        return <Item key={index} {...props} {...option} />
      } else {
        return <Fragment key={index}>
          {cloneElement(item, option)}
        </Fragment>
      }
    })
  }
}
