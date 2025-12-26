import { Avatar, Card, Column, Form, Header, Input, ModalForm, Row, ScrollView, Text, TopView, SelectorPicker, DatePicker, nav, DividerGroup, FormItem, route } from '@/duxui'
import { CmsIcon, cmsUser, duxappTheme, userHook } from '@/duxcmsUser'
import { duxcmsUserLang } from '@/duxcmsUser/utils'
import { useMemo, useCallback } from 'react'

export default function UserSetting() {

  const [userInfo] = cmsUser.useUserInfo()
  const t = duxcmsUserLang.useT()

  const defaultData = useMemo(() => ({
    ...userInfo
  }), [userInfo])

  const update = useCallback(data => {
    cmsUser.setInfo({ ...defaultData, ...data }, true)
  }, [defaultData])

  return <TopView>
    <Header title={t('info.setting.title')} />
    <ScrollView>
      <Form onChange={update} defaultValues={defaultData}>
        <Card margin disableMarginBottom verticalPadding={false}>
          <DividerGroup padding={0}>
            <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcmsUser/info/avatar')}>
              <Text bold grow>{t('info.setting.avatar')}</Text>
              <Avatar size='s' url={userInfo.avatar} />
              <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
            </Row>
            <FormItem name='nickname'>
              <ModalForm
                renderForm={props => <Column className='p-3'>
                  <Input placeholder={t('info.nickname.placeholder')} type='nickname' focus {...props} />
                </Column>}
                type='confirm'
                title={t('info.nickname.title')}
              >
                <Row items='center' justify='between' className='pv-3'>
                  <Text bold grow>{t('info.setting.nickname')}</Text>
                  <Text bold>{userInfo.nickname}</Text>
                  <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
                </Row>
              </ModalForm>
            </FormItem>
            <FormItem name='sex'>
              <ModalForm
                renderForm={<SelectorPicker
                  range={[
                    { name: t('info.sex.male'), value: 1 },
                    { name: t('info.sex.female'), value: 2 },
                    { name: t('info.sex.secret'), value: 0 }
                  ]}
                />}
                title={t('info.setting.sex')}
              >
                <Row items='center' justify='between' className='pv-3'>
                  <Text bold grow>{t('info.setting.sex')}</Text>
                  <Text bold>{userInfo.sex == 1 ? t('info.sex.male') : userInfo.sex == 2 ? t('info.sex.female') : t('info.sex.secret')}</Text>
                  <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
                </Row>
              </ModalForm>
            </FormItem>

            <FormItem name='birthday'>
              <ModalForm
                renderForm={<DatePicker mode='date' minDate='1970-01-01' />}
                title={t('info.setting.birthday')}
              >
                <Row items='center' justify='between' className='pv-3'>
                  <Text bold grow>{t('info.setting.birthday')}</Text>
                  <Text bold>{!userInfo.birthday ? t('info.birthday.unset') : userInfo.birthday}</Text>
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
                <Text bold grow>{t('info.setting.phone')}</Text>
                <Text color={3}>{t('info.setting.phoneAction')}</Text>
                <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
              </Row>
              <Row items='center' justify='between' className='pv-3' onClick={() => nav('duxcmsUser/info/password')}>
                <Text bold grow>{t('info.setting.password')}</Text>
                <Text color={3}>{t('info.setting.passwordAction')}</Text>
                <CmsIcon name='direction_right' size={32} color={duxappTheme.textColor3} />
              </Row>
            </DividerGroup>
          </Card>
        </userHook.Render>
        <userHook.Render mark='setting.logoff' option={{ defaultData, update }}>
          <Column className='mt-3'>
            <Text align='center' size={1} color={3}
              onClick={() => {
                route.nav('duxcmsUser/info/logoff')
              }}
            >{t('info.setting.logoff')}</Text>
          </Column>
        </userHook.Render>
      </Form>
    </ScrollView>
  </TopView>
}
