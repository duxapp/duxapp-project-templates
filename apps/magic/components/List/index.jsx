import { List, ScrollView, useRequest } from '@/duxcms'
import { pxTransform } from '@tarojs/taro'
import { isValidElement, useMemo } from 'react'
import { Card, Grid, Row, Text, nav } from '@/duxui'
import { MagicForm } from '../Form'
import { items } from '../items'

export const MagicList = ({
  table,
  detailPage,
  disabled
}) => {
  const [data] = useRequest('tools/magic/config?table=' + table)

  if (!data.type) {
    return null
  }

  if (data.type === 'page') {
    return <ScrollView>
      <MagicForm config={data} formProps={{ disabled }} />
    </ScrollView>
  }

  return <RenderList table={table} config={data} detailPage={detailPage} disabled={disabled} />
}

const RenderListItem = ({
  item, index, showKeys,
  detailPage,
  table,
  disabled
}) => {
  return <Card margin disableMarginTop={!!index} style={{ gap: pxTransform(24) }} onClick={() => detailPage && nav(`${detailPage}`, { table, id: item.id, disabled: disabled ? 1 : '' })}>
    <Card.Title >
      序号: {item.id}
    </Card.Title>
    <Grid column={2}>
      {
        showKeys.map(config => {
          const { label, name, type } = config
          const form = items[type]
          if (!form?.Display) {
            return <Text key={name}>
              {label}：{item[name]}
            </Text>
          }
          const result = <form.Display item={item} value={item[name]} config={config} />
          return <Row key={name}>
            <Text color={2} size={2}>{label}：</Text>
            {isValidElement(result) ? result : <Text size={4}>{result}</Text>}
          </Row>
        })
      }
    </Grid>
  </Card>
}

const RenderList = ({
  table,
  config,
  ...props
}) => {

  const showKeys = useMemo(() => {
    return config?.fields.filter(item => item.list) || []
  }, [config?.fields])

  return <List
    url={`tools/magic/${table}`}
    renderItem={({ item, index }) => <RenderListItem
      index={index} item={item}
      showKeys={showKeys} table={table}
      {...props}
    />}
  />
}
