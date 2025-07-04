import { getStyleForm } from '@/duxappDesign/Design'

export const Cell = {
  name: '单元格',
  tag: 'Cell',
  icon: ['duxui-design', 'cell'],
  cate: '布局',
  attr: () => {
    return {
      title: '单元格'
    }
  },
  attrForm: () => {
    return {
      title: {
        name: '标题',
        type: 'text'
      },
      subTitle: {
        name: '子标题',
        type: 'text'
      },
      desc: {
        name: '描述',
        type: 'text'
      }
    }
  }
}

export const CellGroup = {
  name: '单元格组',
  tag: 'CellGroup',
  icon: ['duxui-design', 'cell'],
  cate: '布局',
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
          'opacity', 'overflow', 'transform'
        )
      },
      line: {
        name: '是否显示分割线',
        type: 'switch'
      }
    }
  },
  child: {

  }
}
