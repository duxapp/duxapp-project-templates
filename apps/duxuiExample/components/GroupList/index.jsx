import { Column, Text } from '@/duxui'
import classNames from 'classnames'
import './index.scss'

const GroupListItem = ({
  title,
  desc,
  children
}) => {
  return <>
    <Text className='GroupList__title'>{title}</Text>
    {children}
    <Text className='GroupList__desc'>{desc}</Text>
  </>
}

export const GroupList = ({
  children,
  style,
  className
}) => {
  return <Column style={style} className={classNames('GroupList', className)}>
    {children}
  </Column>
}

GroupList.Item = GroupListItem
