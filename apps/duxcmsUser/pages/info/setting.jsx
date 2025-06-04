import { Avatar, Card, Column, Divider, Form, Header, Input, ModalForm, Row, ScrollView, Text, TopView, SelectorPicker, DatePicker, nav, confirm, loading, toast, DividerGroup, FormItem } from '@/duxui'
import { CmsIcon, cmsUser, duxappTheme, request, user, userHook } from '@/duxcmsUser'
import { useMemo, useCallback } from 'react'

export default function UserSetting() {

  const [userInfo] = cmsUser.useUserInfo()

  const defaultData = useMemo(() => ({
    ...userInfo
  }), [userInfo])

  const update = useCallback(data => {
    cmsUser.setInfo({ ...defaultData, ...data }, true)
  }, [defaultData])

  const logoff = useCallback(async () => {
    if (await confirm({
      title: '注销账户',
      content: '警告，您正在执行危险操作，注销账户后，您的数据将会被删除，且无法撤销，请谨慎选择！',
      confirmText: '确认注销'
    })) {
      await request({
        url: 'member/setting/disable',
        loading,
        toast: true,
        method: 'POST'
      })
      toast('注销成功')
      user.logout()
    }
  }, [])

  return <TopView>
    <Header title='用户信息' />
    <ScrollView>
      <Form onChange={update} defaultValues={defaultData}>
        <Card margin disableMarginBottom verticalPadding={false}>
          <DividerGroup padding={0}>
            <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcmsUser/info/avatar')}>
              <Text bold grow>我的头像</Text>
              <Avatar size='s' url={userInfo.avatar} />
              <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
            </Row>
            <FormItem field='nickname'>
              <ModalForm
                renderForm={props => <Column className='p-3'>
                  <Input placeholder='请输入昵称' type='nickname' focus {...props} />
                </Column>}
                type='confirm'
                title='昵称'
              >
                <Row items='center' justify='between' className='pv-3'>
                  <Text bold grow>昵称</Text>
                  <Text bold>{userInfo.nickname}</Text>
                  <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
                </Row>
              </ModalForm>
            </FormItem>
            <FormItem field='sex'>
              <ModalForm
                renderForm={<SelectorPicker
                  range={[{ name: '男', value: 1 }, { name: '女', value: 2 }, { name: '保密', value: 0 }]}
                />}
                title='性别'
              >
                <Row items='center' justify='between' className='pv-3'>
                  <Text bold grow>性别</Text>
                  <Text bold>{userInfo.sex == 1 ? '男' : userInfo.sex == 2 ? '女' : '保密'}</Text>
                  <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
                </Row>
              </ModalForm>
            </FormItem>

            <FormItem field='birthday'>
              <ModalForm
                renderForm={<DatePicker mode='date' minDate='1970-01-01' />}
                title='出生日期'
              >
                <Row items='center' justify='between' className='pv-3'>
                  <Text bold grow>出生日期</Text>
                  <Text bold>{!userInfo.birthday ? '2000-01-01' : userInfo.birthday}</Text>
                  <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
                </Row>
              </ModalForm>
            </FormItem>
            {userHook.Render({ mark: 'setting.item', option: { defaultData, update } })}
          </DividerGroup>
        </Card>
        <userHook.Render mark='setting.security' option={{ defaultData, update }}>
          <Card margin disableMarginBottom verticalPadding={false}>
            <DividerGroup padding={0}>
              <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcmsUser/info/phone')}>
                <Text bold grow>手机号</Text>
                <Text color={3}>更换手机号</Text>
                <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
              </Row>
              <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcmsUser/info/password')}>
                <Text bold grow>登录密码</Text>
                <Text color={3}>去修改</Text>
                <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
              </Row>
            </DividerGroup>
          </Card>
        </userHook.Render>
        <userHook.Render mark='setting.logoff' option={{ defaultData, update }}>
          <Column className='mt-3'>
            <Text align='center' size={1} color={3} onClick={logoff}>注销账户</Text>
          </Column>
        </userHook.Render>
      </Form>
    </ScrollView>
  </TopView>
}
