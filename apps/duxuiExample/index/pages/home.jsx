import { Header, ScrollView, Cell, nav, GroupList, confirm, CellGroup } from '@/duxuiExample'

export const Home = () => {
  return <>
    <Header title='Duxui' titleCenter />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础组件'>
          <CellGroup>
            <Cell title='Button 按钮' onClick={() => nav('duxuiExample/example/Button')} />
            <Cell title='Cell 单元格' onClick={() => nav('duxuiExample/example/Cell')} />
            <Cell title='LinearGradient 渐变' onClick={() => nav('duxuiExample/example/LinearGradient')} />
            <Cell title='BoxShadow 阴影' onClick={() => nav('duxuiExample/example/BoxShadow')} />
            <Cell title='Loading 加载动画' onClick={() => nav('duxuiExample/example/Loading')} />
            <Cell title='Icon 图标' onClick={() => nav('duxuiExample/example/Icon')} />
            <Cell title='Animated 动画' onClick={() => nav('duxuiExample/example/Animated')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='布局组件'>
          <CellGroup>
            <Cell title='Column flex竖向' onClick={() => nav('duxuiExample/example/Column')} />
            <Cell title='Row flex横向' onClick={() => nav('duxuiExample/example/Row')} />
            <Cell title='Space 间距' onClick={() => nav('duxuiExample/example/Space')} />
            <Cell title='Divider 分割线' onClick={() => nav('duxuiExample/example/Divider')} />
            <Cell title='Grid 宫格' onClick={() => nav('duxuiExample/example/Grid')} />
            <Cell title='Card 卡片' onClick={() => nav('duxuiExample/example/Card')} />
            <Cell title='ScrollView 滚动容器' onClick={() => nav('duxuiExample/example/ScrollView')} />
            <Cell title='RollingView 自动滚动容器' onClick={() => nav('duxuiExample/example/RollingView')} />
            <Cell title='Swiper 幻灯片' onClick={() => nav('duxuiExample/example/Swiper')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='导航组件'>
          <CellGroup>
            <Cell title='Header 头部导航' onClick={() => nav('duxuiExample/example/Header')} />
            <Cell title='Tab 选项卡' onClick={() => nav('duxuiExample/example/Tab')} />
            <Cell title='TabBar 底部导航' onClick={() => nav('duxuiExample/example/TabBar')} />
            <Cell title='Elevator 电梯楼层' onClick={() => nav('duxuiExample/example/Elevator')} />
            <Cell title='Menu 下拉菜单' onClick={() => nav('duxuiExample/example/Menu')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='展示组件'>
          <CellGroup>
            <Cell title='Text 文本' onClick={() => nav('duxuiExample/example/Text')} />
            <Cell title='Image 图片' onClick={() => nav('duxuiExample/example/Image')} />
            <Cell title='Badge 徽标' onClick={() => nav('duxuiExample/example/Badge')} />
            <Cell title='Tag 标签' onClick={() => nav('duxuiExample/example/Tag')} />
            <Cell title='Avatar 头像' onClick={() => nav('duxuiExample/example/Avatar')} />
            <Cell title='HtmlView 富文本' onClick={() => nav('duxuiExample/example/HtmlView')} />
            <Cell title='Step 步骤条' onClick={() => nav('duxuiExample/example/Step')} />
            <Cell title='Empty 空数据' onClick={() => nav('duxuiExample/example/Empty')} />
            <Cell title='Status 角标状态' onClick={() => nav('duxuiExample/example/Status')} />
            <Cell title='ProgressCircle 环形进度' onClick={() => nav('duxuiExample/example/ProgressCircle')} />
            <Cell title='QRCode 二维码' onClick={() => nav('duxuiExample/example/QRCode')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='表单组件'>
          <CellGroup>
            <Cell title='Form 表单' onClick={() => nav('duxuiExample/example/Form')} />
            <Cell title='Input 输入框' onClick={() => nav('duxuiExample/example/Input')} />
            <Cell title='Textarea 多行文本' onClick={() => nav('duxuiExample/example/Textarea')} />
            <Cell title='Picker 选择器' onClick={() => nav('duxuiExample/example/Picker')} />
            <Cell title='PickerDate 日期时间' onClick={() => nav('duxuiExample/example/Date')} />
            <Cell title='Radio 单选' onClick={() => nav('duxuiExample/example/Radio')} />
            <Cell title='Checkbox 多选' onClick={() => nav('duxuiExample/example/Checkbox')} />
            <Cell title='Switch 开关' onClick={() => nav('duxuiExample/example/Switch')} />
            <Cell title='InputNumber 数字输入' onClick={() => nav('duxuiExample/example/InputNumber')} />
            <Cell title='Calendar 日历' onClick={() => nav('duxuiExample/example/Calendar')} />
            <Cell title='Grade 评分' onClick={() => nav('duxuiExample/example/Grade')} />
            <Cell title='Cascade 级联选择' onClick={() => nav('duxuiExample/example/Cascade')} />
            <Cell title='CardSelect 卡片选择' onClick={() => nav('duxuiExample/example/CardSelect')} />
            <Cell title='Upload 上传' onClick={() => nav('duxuiExample/example/Upload')} />
            <Cell title='Recorder 录音' onClick={() => nav('duxuiExample/example/Recorder')} />
            <Cell title='ModalForm 弹出表单' onClick={() => nav('duxuiExample/example/ModalForm')} />
            <Cell title='FormComplex 复杂表单(对象数组)' onClick={() => nav('duxuiExample/example/FormComplex')} />
            <Cell title='NumberKeyboard 数字键盘' onClick={() => nav('duxuiExample/example/NumberKeyboard')} />
            <Cell title='InputCode 验证码密码输入' onClick={() => nav('duxuiExample/example/InputCode')} />
            <Cell title='LicensePlate 车牌号输入' onClick={() => nav('duxuiExample/example/LicensePlate')} />
            <Cell title='ColorPicker 颜色选择器' onClick={() => nav('duxuiExample/example/ColorPicker')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='操作反馈'>
          <CellGroup>
            <Cell title='LongPress 长按' onClick={() => nav('duxuiExample/example/LongPress')} />
            <Cell title='TouchableOpacity 触摸反馈' onClick={() => nav('duxuiExample/example/TouchableOpacity')} />
            <Cell title='ActionSheet 弹出菜单' onClick={() => nav('duxuiExample/example/ActionSheet')} />
            <Cell title='Layout 布局计算' onClick={() => nav('duxuiExample/example/Layout')} />
            <Cell title='TopView 顶层容器' onClick={() => nav('duxuiExample/example/TopView')} />
            <Cell title='Absolute 绝对定位' onClick={() => nav('duxuiExample/example/Absolute')} />
            <Cell title='PullView 弹出层' onClick={() => nav('duxuiExample/example/PullView')} />
            <Cell title='DropDown 下拉菜单' onClick={() => nav('duxuiExample/example/DropDown')} />
            <Cell title='loding 显示加载动画' onClick={() => nav('duxuiExample/example/loadingUtil')} />
            <Cell title='message 消息通知' onClick={() => nav('duxuiExample/example/message')} />
            <Cell title='confirm 确认弹框' onClick={() => nav('duxuiExample/example/confirm')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='Svg'>
          <CellGroup>
            <Cell title='组件属性' onClick={() => nav('duxuiExample/example/Svg')} />
            <Cell title='动画' onClick={() => nav('duxuiExample/example/SvgAnimated')} />
            <Cell title='事件结合' onClick={() => nav('duxuiExample/example/SvgEvent')} />
            <Cell title='内容裁剪' onClick={() => nav('duxuiExample/example/SvgClipPath')} />
          </CellGroup>
        </GroupList.Item>
        <GroupList.Item title='高级'>
          <CellGroup>
            <Cell title='List 分页列表' onClick={() => nav('duxuiExample/example/List')} />
            <Cell title='Share 分享系统' onClick={() => nav('duxuiExample/example/Share')} />
            <Cell title='Chart echarts图表' onClick={() => nav('duxuiExample/example/Chart')} />
            <Cell title='Map 地图' onClick={() => nav('duxuiExample/example/Map')} />
            <Cell title='Sign 签名' onClick={() => nav('duxuiExample/example/Sign')} />
            <Cell title='HorseLanternLottery 跑马灯抽奖' onClick={() => nav('duxuiExample/example/HorseLanternLottery')} />
            <Cell title='SvgEditor Svg编辑器' onClick={() => nav('duxuiExample/example/SvgEditor')} />
            <Cell title='UploadManage 大文件上传及管理' onClick={() => confirm({ title: '暂未更新示例', content: '此组件目的是直接将文件上传到云存储，而不需要经过服务器转发，提升上传速度，并且组件封装了文件管理的功能' })} />
          </CellGroup>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </>
}
