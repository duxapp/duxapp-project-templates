/**
 * login:是否需要登录
 * platform:支持的平台(weapp, h5, rn)不配置支持所有
 * subPackage:是否将其设置为分包
 * home: 是否是主页 是主页的页面将会被排在前面
 */
const config = {
  pages: {
    'duxuiExample/index': {
      pages: {
        index: {
          home: true
        }
      }
    },
    'duxuiExample/example': {
      pages: {
        Button: {},
        Cell: {},
        Grid: {},
        Divider: {},
        Space: {},
        LinearGradient: {},
        BoxShadow: {},
        Loading: {},
        Icon: {},
        Header: {},
        Tab: {},
        Tag: {},
        Avatar: {},
        Badge: {},
        Card: {},
        Image: {},
        CardSelect: {},
        Text: {},
        Form: {},
        Menu: {},
        Chart: {},
        Map: {},
        Cascade: {},
        Calendar: {},
        Checkbox: {},
        Date: {},
        FormComplex: {},
        Grade: {},
        Input: {},
        ModalForm: {},
        Picker: {},
        Radio: {},
        Switch: {},
        Textarea: {},
        Upload: {},
        Elevator: {},
        TabBar: {},
        Step: {},
        Sign: {},
        TopView: {},
        PullView: {},
        Layout: {},
        LongPress: {},
        Absolute: {},
        Modal: {},
        DropDown: {},
        Column: {},
        Row: {},
        Empty: {},
        List: {},
        Detail: {},
        confirm: {},
        message: {},
        loadingUtil: {},
        HtmlView: {},
        Share: {},
        Status: {},
        NumberKeyboard: {},
        InputCode: {},
        TouchableOpacity: {},
        LicensePlate: {},
        HorseLanternLottery: {},
        ActionSheet: {}
      }
    }
  },
  /**
   * 路由转换，当跳转到左侧路由时，实际上跳转的是右侧的路由
   *
   * 右侧是字符串则全局匹配
   * {
   *  mode: 'start', // start匹配路由的开始部分
   *  page: ''
   * }
   */
  transfer: {

  }
}

module.exports = config
