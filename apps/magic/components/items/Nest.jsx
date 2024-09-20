import { Card, Column, Form, Space, Text as UIText } from '@/duxui'
import { Fragment, createContext, isValidElement, useContext, useMemo } from 'react'
import { FormItem } from './FormItem'
import { Text, Textarea, Number, Editor } from './Text'
import { Image, Images } from './Image'
import { Date, Time } from './Date'
import { Radio, Checkbox } from './Radio'
import { Switch } from './Switch'
import { Select } from './Select'
import { Cascader, CascaderMulti } from './Cascader'

const ObjectForm = ({
  config
}) => {
  return <FormItem config={{ ...config, label: '' }}>
    <Form.Object>
      {
        config.child?.map(field => {
          const item = items[field.type]

          if (!item?.Form) {
            return null
          }
          return <item.Form key={field.name} config={field} />
        })
      }
    </Form.Object>
  </FormItem>
}

ObjectForm.type = 'object'

ObjectForm.Display = ({ value, config }) => {
  return <Display fields={config.child} values={value} />
}

class DataContext {
  static context = createContext({})

  static Provider = this.context.Provider

  static useContext = () => useContext(this.context)
}

const ArrayForm = ({ config }) => {

  return <DataContext.Provider value={{ config }}>
    <Card shadow>
      <Space>
        <FormItem config={config}>
          <Form.Array
            renderItem={ArrayItem}
            renderBottom={<Form.ArrayAction action={list => [...list, config.child?.[0]?.setting?.default || '']}>
              <Card shadow>
                <UIText>添加</UIText>
              </Card>
            </Form.ArrayAction>}
          />
        </FormItem>
      </Space>
    </Card>
  </DataContext.Provider>
}

const ArrayItem = ({ index }) => {

  const { config } = DataContext.useContext()

  const item = items[config.child?.[0]?.type]

  const _config = useMemo(() => {
    return {
      name: index,
      setting: {}
    }
  }, [index])

  if (!item?.Form) {
    return null
  }

  return <Space row items='center' justify='between'>
    <Column grow>
      <item.Form config={_config} />
    </Column>
    <Form.ArrayAction
      action={list => {
        list.splice(index, 1)
        return list
      }}
    >
      <UIText>删除</UIText>
    </Form.ArrayAction>
  </Space>
}

ArrayForm.type = 'array'

ArrayForm.Display = ({ value, config }) => {

  const item = items[config.child?.[0]?.type]

  if (!item?.Display) {
    return null
  }

  return <Card shadow>
    <Space>
      {
        value.map((val, index) => {
          const result = item.Display({ config: config.child[0], value: val })
          return <Fragment key={index}>
            {
              isValidElement(result)
                ? result
                : <UIText size={4}>{result}</UIText>
            }
          </Fragment>
        })
      }
    </Space>
  </Card>
}

const ArrayObjectForm = ({ config }) => {
  return <DataContext.Provider value={{ config }}>
    <FormItem config={config}>
      <Form.Array
        renderItem={ArrayObjectItem}
        renderBottom={<Form.ArrayAction
          action={list => [
            ...list,
            Object.fromEntries(config.child?.map(item => [item.name, item.setting?.default]) || [])
          ]}
        >
          <Card shadow>
            <UIText>添加</UIText>
          </Card>
        </Form.ArrayAction>}
      />
    </FormItem>
  </DataContext.Provider>
}

const ArrayObjectItem = ({ index }) => {

  const { config } = DataContext.useContext()

  return <Card shadow>
    <Form.Item field={index}>
      <Form.Object>
        <Space row items='center' justify='between'>
          <UIText>项目{index + 1}</UIText>
          <Form.ArrayAction
            action={list => {
              list.splice(index, 1)
              return list
            }}
          >
            <UIText>删除</UIText>
          </Form.ArrayAction>
        </Space>
        {
          config.child?.map(field => {
            const item = items[field.type]

            if (!item?.Form) {
              return null
            }
            return <item.Form key={field.name} config={field} />
          })
        }
      </Form.Object>
    </Form.Item>
  </Card>
}

ArrayObjectForm.type = 'arrayObject'

ArrayObjectForm.Display = ({ value, config }) => {
  return <Space>
    {
      value.map((item, index) => <Card key={index} shadow>
        <Display fields={config.child} values={item} />
      </Card>)
    }
  </Space>
}

export const items = Object.fromEntries([
  Text,
  Textarea,
  Number,
  Editor,
  Image,
  Images,
  Date,
  Time,
  Radio,
  Checkbox,
  Switch,
  Select,
  Cascader,
  CascaderMulti,
  ObjectForm,
  ArrayForm,
  ArrayObjectForm
].map(item => [item.type, {
  Form: item,
  Display: item.Display
}]))

export const Display = ({
  fields,
  values
}) => {

  return <Space size={32}>
    {
      fields?.map(field => {
        const item = items[field.type]

        if (!item?.Display) {
          return null
        }
        const result = item.Display({ config: field, value: values?.[field.name] })

        return <Space key={field.name} size={8}>
          <UIText color={3} size={2}>{field.label}</UIText>
          {
            isValidElement(result)
              ? result
              : <UIText size={4}>{result}</UIText>
          }
        </Space>
      })
    }
  </Space>
}
