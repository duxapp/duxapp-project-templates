import { payHook } from '@/duxcmsPay'
import { Row, Text } from '@/duxui'
import { Price } from '../components'

const PayTitle = ({ price }) => {

  return <Row items='center'>
    <Text bold>需支付：</Text>
    <Price>{price}</Price>
  </Row>
}

const PayBalance = ({ balance }) => {

  return <Row items='center'>
    <Text size={2} color={2}>余额：</Text>
    <Price size={2} color={2}>{balance}</Price>
  </Row>
}

payHook.add('pay.title', PayTitle)
payHook.add('pay.balance', PayBalance)
