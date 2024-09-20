import { Column, Text } from '@/duxui'
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
  children
}) => {
  return <Column className='GroupList'>
    {children}
  </Column>
}

GroupList.Item = GroupListItem
