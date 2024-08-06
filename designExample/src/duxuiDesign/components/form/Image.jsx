export const UploadImage = {
  name: '单图上传',
  tag: 'UploadImage',
  icon: ['duxui-design', 'upload-image'],
  cate: '表单',
  import: '@/duxui',
  attr: () => {
    return {
      max: 9,
      addText: '上传图片',
      column: 4
    }
  },
  attrForm: () => {
    return {
      addText: {
        name: '上传提示',
        type: 'text'
      }
    }
  }
}

export const UploadImages = {
  name: '多图上传',
  tag: 'UploadImages',
  import: '@/duxui',
  icon: ['duxui-design', 'upload-images'],
  cate: '表单',
  attr: () => {
    return {
      addText: '上传图片',
    }
  },
  attrForm: () => {
    return {
      max: {
        name: '最大数量',
        type: 'number'
      },
      addText: {
        name: '上传提示',
        type: 'text'
      },
      column: {
        name: '每行数量',
        type: 'number'
      }
    }
  }
}

