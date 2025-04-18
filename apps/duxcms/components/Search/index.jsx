import { View } from '@tarojs/components'
import { useCallback, useState } from 'react'
import { ObjectManage } from '@/duxapp'
import { Button, InputSearch, ScrollView, Text, Layout, Absolute } from '@/duxui'
import classNames from 'classnames'
import { Keyboard } from '@/duxapp/utils/rn/util'
import { CmsIcon } from '../CmsIcon'
import './index.scss'

class SearchKeys extends ObjectManage {
  constructor(props) {
    super(props)
  }

  setKeys = (mark, keys) => {
    if (mark == 'mark') {
      this.set({})

      // submit('')
    }
    this.set({ ...this.data, [mark]: keys })
  }

  getKeys = mark => this.data[mark] || []
}

const searchKeys = new SearchKeys({
  cache: true,
  cacheKey: 'list-search-key-history'
})

export const ListSearch = ({
  mark,
  defaultValue,
  defaultShow,
  onChange,
  color,
  top: inputTop = 0,
  className,
  style
}) => {

  const [show, setShow] = useState(defaultShow)

  const [top, setTop] = useState(0)

  const [keyword, setKeyword] = useState(defaultValue || '')

  const keys = searchKeys.getKeys(mark)

  const submit = useCallback(value => {
    if (process.env.TARO_ENV === 'rn') {
      Keyboard?.dismiss()
    }
    setShow(false)
    // let _keyword
    // let _keyword
    // if (typeof value === 'string') {
    //   setKeyword(value)
    //   _keyword = value
    // }
    onChange?.(value)

    if (keyword) {
      const index = keys.indexOf(keyword)
      if (index !== -1) {
        keys.splice(index, 1)
      }
      keys.unshift(keyword)
      searchKeys.setKeys(mark, keys)
    }
  }, [keys, keyword, mark, onChange])

  return <>
    <Layout className='list-search' onLayout={e => setTop(e.height + e.top)} style={color ? { backgroundColor: color } : {}}>
      <InputSearch className='list-search__input'
        placeholder='请输入查询内容'
        confirmType='search'
        value={keyword}
        focus={!!show}
        onClick={() => setShow(true)}
        onChange={value => {
          setKeyword(value.trim())
        }}
        onFocus={() => setShow(true)}
        onConfirm={() => submit(keyword)}
      />
      <Button radiusType='round' type='primary' onClick={() => submit(keyword)}>搜索</Button>
    </Layout>
    {show && <Absolute>
      <View className={classNames('list-search__old', className)} style={{ top: top + inputTop, ...style }}>
        <View className='list-search__old__head'>
          <Text className='list-search__old__head__name text-c1'>搜索记录</Text>
          <CmsIcon name='ashbin' size={40} className='text-c2'
            onClick={() => { searchKeys.setKeys('mark', []); setShow(false) }}
          />
        </View>
        <ScrollView>
          <View className='list-search__old__keys'>
            {keys.map(item => {
              return <View key={item} className='list-search__old__key bg-page'
                onClick={() => {
                  setKeyword(item)
                  submit(item)
                }}
              >
                <Text numberOfLines={1} className='list-search__old__key__text text-c2'>{item}</Text>
              </View>
            })}
          </View>
        </ScrollView>
      </View>
    </Absolute>}
  </>
}
