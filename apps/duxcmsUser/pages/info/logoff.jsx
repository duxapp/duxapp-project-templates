import { request, user } from '@/duxcmsUser'
import { Button, Header, TopView, Column, Text, Row, colorLighten, duxappTheme, confirm, loading, toast, route } from '@/duxui'
import { duxcmsUserLang } from '@/duxcmsUser/utils'

export default function Logoff() {

  const t = duxcmsUserLang.useT()

  const logoff = async () => {
    if (await confirm({
      title: t('info.logoff.confirmTitle'),
      content: t('info.logoff.confirmContent'),
      confirmText: t('info.logoff.confirmButton')
    })) {
      await request({
        url: 'member/setting/disable',
        loading,
        toast: true,
        method: 'POST'
      })
      toast(t('info.logoff.success'))
      user.logout()
    }
  }

  return <TopView>
    <Header title={t('info.logoff.title')} />
    <Column className='r-3 bg-white m-3 p-3 gap-4'>
      <Text size={5} bold align='center' type='danger'>{t('info.logoff.misopTip')}</Text>
      <Column className='p-3 gap-1 r-3'
        style={{
          backgroundColor: colorLighten(duxappTheme.dangerColor, 0.9)
        }}
      >
        <Text size={5}>{t('info.logoff.noticeTitle')}</Text>
        <Text size={1} color={2}>{t('info.logoff.noticeBody')}</Text>
        <Column className='p-2' />
        <Row className='ph-3 gap-4'>
          <Button size='l' type='danger' className='flex-grow' onClick={logoff}>{t('info.logoff.confirmButton')}</Button>
          <Button size='l' type='primary' className='flex-grow' onClick={() => route.back()}>{t('info.logoff.stay')}</Button>
        </Row>
      </Column>
    </Column>
  </TopView>
}

