import { getStyleForm } from '@/design/Design'
import { Text } from '@/duxuiDesign/components/show/Text'

export const ShopNav = {
  name: '导航',
  tag: 'ShopNav',
  icon: ['shop-design', 'nav'],
  cate: '商城',
  import: '@/duxcmsDesign/components/Design/shop',
  attr: () => {
    return {
      title: '导航',
      url: ''
    }
  },
  attrForm: () => {
    return {
      title: {
        name: '标题',
        type: 'text'
      },
      url: {
        name: '跳转连接',
        type: 'link'
      },
    }
  }
}

export const ShopPrice = {
  name: '价格',
  tag: 'ShopPirce',
  icon: ['shop-design', 'price'],
  cate: '商城',
  import: '@/duxcmsDesign/components/Design/shop',
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    const textForm = Text.attrForm()
    delete textForm.children
    return {
      children: {
        name: '价格',
        type: 'text'
      },
      pointSize: {
        ...textForm.size,
        name: '小数部分尺寸'
      },
      unitSize: {
        ...textForm.size,
        name: '单位的尺寸'
      },
      ...textForm,
    }
  }
}

export const ShopAddress = {
  name: '地址选择',
  tag: 'ShopAddress',
  icon: ['shop-design', 'address'],
  cate: '商城',
  import: '@/duxcmsDesign/components/Design/shop',
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {
      className: {
        name: '类名',
        type: 'className'
      },
      style: {
        __object: true,
        ...getStyleForm(
          'size', 'padding', 'margin',
          'borderRadius', 'border',
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow'
        )
      },
    }
  },
  child: {

  }
}

export const ShopNumInput = {
  name: '商品数量选择',
  tag: 'ShopNumInput',
  icon: ['shop-design', 'num-input'],
  cate: '商城',
  import: '@/duxcmsDesign/components/Design/shop',
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {
      className: {
        name: '类名',
        type: 'className'
      },
      style: {
        __object: true,
        ...getStyleForm(
          'size', 'padding', 'margin',
          'borderRadius', 'border',
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow'
        )
      },
      max: {
        name: '最大值',
        type: 'number'
      }
    }
  }
}

export const ShopHeaderSearch = {
  name: '搜索框',
  tag: 'ShopHeaderSearch',
  icon: ['shop-design', 'header-search'],
  cate: '商城',
  import: '@/duxcmsDesign/components/Design/shop',
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {
      className: {
        name: '类名',
        type: 'className'
      },
      style: {
        __object: true,
        ...getStyleForm(
          'size', 'padding', 'margin',
          'borderRadius', 'border',
          'flexChild',
          'position', 'backgroundColor',
          'opacity', 'overflow'
        )
      },
      placeholder: {
        name: '搜索提示文本',
        type: 'text'
      }
    }
  }
}

export const ShopDataSource = {
  name: '商城数据源',
  tag: 'ShopDataSource',
  icon: ['shop-design', 'data-source'],
  cate: '商城',
  import: '@/duxcmsDesign/components/Design/shop',
  attr: () => {
    return {

    }
  },
  attrForm: () => {
    return {
      api: {
        name: '接口地址',
        type: 'text',
        desc: 'API前往 duxcms-api.apifox.cn 查找, 使用地址时，请删除最前面的"/"'
      }
    }
  },
  editor: {
    virtual: true
  },
  child: {}
}
