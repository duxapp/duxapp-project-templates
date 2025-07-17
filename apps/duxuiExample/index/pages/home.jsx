import { Header, ScrollView, Cell, GroupList, confirm, CellGroup, route } from '@/duxuiExample'

export const Home = () => {

  return <>
    <Header title='Duxui' titleCenter />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础组件'>
          <CellGroup>
            <Cell title='Button 按钮' onClick={() => route.nav('Button')} />
            <Cell title='Cell 单元格' onClick={() => route.nav('Cell')} />
            <Cell title='LinearGradient 渐变' onClick={() => route.nav('LinearGradient')} />
            <Cell title='BoxShadow 阴影' onClick={() => route.nav('BoxShadow')} />
            <Cell title='Loading 加载动画' onClick={() => route.nav('Loading')} />
            <Cell title='Icon 图标' onClick={() => route.nav('Icon')} />
            <Cell title='Animated 动画' onClick={() => route.nav('Animated')} />
            <Cell title='theme 动态主题' onClick={() => route.nav('Theme')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='布局组件'>
          <CellGroup>
            <Cell title='Column flex竖向' onClick={() => route.nav('Column')} />
            <Cell title='Row flex横向' onClick={() => route.nav('Row')} />
            <Cell title='Space 间距' onClick={() => route.nav('Space')} />
            <Cell title='Divider 分割线' onClick={() => route.nav('Divider')} />
            <Cell title='Grid 宫格' onClick={() => route.nav('Grid')} />
            <Cell title='Card 卡片' onClick={() => route.nav('Card')} />
            <Cell title='ScrollView 滚动容器' onClick={() => route.nav('ScrollView')} />
            <Cell title='RollingView 自动滚动容器' onClick={() => route.nav('RollingView')} />
            <Cell title='Swiper 幻灯片' onClick={() => route.nav('Swiper')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='导航组件'>
          <CellGroup>
            <Cell title='Header 头部导航' onClick={() => route.nav('Header')} />
            <Cell title='Tab 选项卡' onClick={() => route.nav('Tab')} />
            <Cell title='TabBar 底部导航' onClick={() => route.nav('TabBar')} />
            <Cell title='Elevator 电梯楼层' onClick={() => route.nav('Elevator')} />
            <Cell title='Menu 下拉菜单' onClick={() => route.nav('Menu')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='展示组件'>
          <CellGroup>
            <Cell title='Text 文本' onClick={() => route.nav('Text')} />
            <Cell title='Image 图片' onClick={() => route.nav('Image')} />
            <Cell title='Badge 徽标' onClick={() => route.nav('Badge')} />
            <Cell title='Tag 标签' onClick={() => route.nav('Tag')} />
            <Cell title='Avatar 头像' onClick={() => route.nav('Avatar')} />
            <Cell title='HtmlView 富文本' onClick={() => route.nav('HtmlView')} />
            <Cell title='Step 步骤条' onClick={() => route.nav('Step')} />
            <Cell title='Empty 空数据' onClick={() => route.nav('Empty')} />
            <Cell title='Status 角标状态' onClick={() => route.nav('Status')} />
            <Cell title='ProgressCircle 环形进度' onClick={() => route.nav('ProgressCircle')} />
            <Cell title='QRCode 二维码' onClick={() => route.nav('QRCode')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='表单组件'>
          <CellGroup>
            <Cell title='Form 表单' onClick={() => route.nav('Form')} />
            <Cell title='Input 输入框' onClick={() => route.nav('Input')} />
            <Cell title='Textarea 多行文本' onClick={() => route.nav('Textarea')} />
            <Cell title='Picker 选择器' onClick={() => route.nav('Picker')} />
            <Cell title='PickerDate 日期时间' onClick={() => route.nav('Date')} />
            <Cell title='Radio 单选' onClick={() => route.nav('Radio')} />
            <Cell title='Checkbox 多选' onClick={() => route.nav('Checkbox')} />
            <Cell title='Switch 开关' onClick={() => route.nav('Switch')} />
            <Cell title='InputNumber 数字输入' onClick={() => route.nav('InputNumber')} />
            <Cell title='Calendar 日历' onClick={() => route.nav('Calendar')} />
            <Cell title='Grade 评分' onClick={() => route.nav('Grade')} />
            <Cell title='Cascade 级联选择' onClick={() => route.nav('Cascade')} />
            <Cell title='CardSelect 卡片选择' onClick={() => route.nav('CardSelect')} />
            <Cell title='Upload 上传' onClick={() => route.nav('Upload')} />
            <Cell title='Recorder 录音' onClick={() => route.nav('Recorder')} />
            <Cell title='ModalForm 弹出表单' onClick={() => route.nav('ModalForm')} />
            <Cell title='FormComplex 复杂表单(对象数组)' onClick={() => route.nav('FormComplex')} />
            <Cell title='NumberKeyboard 数字键盘' onClick={() => route.nav('NumberKeyboard')} />
            <Cell title='InputCode 验证码密码输入' onClick={() => route.nav('InputCode')} />
            <Cell title='LicensePlate 车牌号输入' onClick={() => route.nav('LicensePlate')} />
            <Cell title='ColorPicker 颜色选择器' onClick={() => route.nav('ColorPicker')} />
            <Cell title='ConfirmForm API弹出表单' onClick={() => route.nav('ConfirmForm')} />
            <Cell title='KeyboardDismiss 键盘自动收起' onClick={() => route.nav('KeyboardDismiss')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='操作反馈'>
          <CellGroup>
            <Cell title='LongPress 长按' onClick={() => route.nav('LongPress')} />
            <Cell title='TouchableOpacity 触摸反馈' onClick={() => route.nav('TouchableOpacity')} />
            <Cell title='ActionSheet 弹出菜单' onClick={() => route.nav('ActionSheet')} />
            <Cell title='Layout 布局计算' onClick={() => route.nav('Layout')} />
            <Cell title='TopView 顶层容器' onClick={() => route.nav('TopView')} />
            <Cell title='Absolute 绝对定位' onClick={() => route.nav('Absolute')} />
            <Cell title='PullView 弹出层' onClick={() => route.nav('PullView')} />
            <Cell title='DropDown 下拉菜单' onClick={() => route.nav('DropDown')} />
            <Cell title='loding 显示加载动画' onClick={() => route.nav('loadingUtil')} />
            <Cell title='message 消息通知' onClick={() => route.nav('message')} />
            <Cell title='confirm 确认弹框' onClick={() => route.nav('confirm')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='画布'>
          <CellGroup>
            <Cell title='Canvas 基础' onClick={() => route.nav('Canvas')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='Svg'>
          <CellGroup>
            <Cell title='组件属性' onClick={() => route.nav('Svg')} />
            <Cell title='动画' onClick={() => route.nav('SvgAnimated')} />
            <Cell title='事件结合' onClick={() => route.nav('SvgEvent')} />
            <Cell title='内容裁剪' onClick={() => route.nav('SvgClipPath')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='高级'>
          <CellGroup>
            <Cell title='List 分页列表' onClick={() => route.nav('List')} />
            <Cell title='Share 分享系统' onClick={() => route.nav('Share')} />
            <Cell title='Chart echarts图表' onClick={() => route.nav('Chart')} />
            <Cell title='Map 地图' onClick={() => route.nav('Map')} />
            <Cell title='Sign 签名' onClick={() => route.nav('Sign')} />
            <Cell title='HorseLanternLottery 跑马灯抽奖' onClick={() => route.nav('HorseLanternLottery')} />
            <Cell title='SvgEditor Svg编辑器' onClick={() => route.nav('SvgEditor')} />
            <Cell title='UploadManage 大文件上传及管理' onClick={() => confirm({ title: '暂未更新示例', content: '此组件目的是直接将文件上传到云存储，而不需要经过服务器转发，提升上传速度，并且组件封装了文件管理的功能' })} />
          </CellGroup>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </>
}
