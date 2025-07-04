/**
 * login:是否需要登录
 * platform:支持的平台(weapp, h5, rn)不配置支持所有
 * subPackage:是否将其设置为分包
 * home: 是否是主页 是主页的页面将会被排在前面
 */
export default {
  disablePages: [
    'user/'
  ],
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
        Chart: {
          platform: ['weapp', 'rn', 'h5']
        },
        Map: {
          platform: ['weapp', 'rn', 'h5']
        },
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
        Sign: {
          platform: ['weapp', 'rn', 'h5']
        },
        TopView: {},
        PullView: {},
        Layout: {},
        LongPress: {},
        Absolute: {},
        DropDown: {},
        Column: {},
        Row: {},
        Empty: {},
        List: {},
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
        ActionSheet: {},
        Recorder: {},
        ScrollView: {},
        Animated: {},
        InputNumber: {},
        ProgressCircle: {
          platform: ['weapp', 'rn', 'h5']
        },
        RollingView: {},
        Swiper: {},
        Svg: {
          platform: ['weapp', 'rn', 'h5']
        },
        SvgAnimated: {
          platform: ['weapp', 'rn', 'h5']
        },
        SvgEvent: {
          platform: ['weapp', 'rn', 'h5']
        },
        SvgClipPath: {
          platform: ['weapp', 'rn', 'h5']
        },
        QRCode: {
          platform: ['weapp', 'rn', 'h5']
        },
        SvgEditor: {
          platform: ['weapp', 'rn', 'h5']
        },
        ColorPicker: {
          platform: ['weapp', 'rn', 'h5']
        },
        Theme: {},
        ConfirmForm: {},
        Canvas: {
          platform: ['weapp', 'rn', 'h5']
        }
      }
    }
  }
}
