import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Column, Grid, Image, Row, Text, duxappTheme, px } from '@/duxui'

export const Spec = ({
  spec,
  sku,
  image,
  value,
  filterStore,
  onChange,
  onImageChange
}) => {

  const defaultSelect = useMemo(() => {
    if (!value) {
      return []
    }
    return [...sku.find(v => v.id === value)?.spec || []]
  }, [value, sku])

  const [select, setSelect] = useState(defaultSelect)

  const powerset = useCallback(arr => {
    const ps = [[]]
    for (let i = 0, l = arr.length; i < l; i++) {
      for (let j = 0, jl = ps.length; j < jl; j++) {
        ps.push(ps[j].concat(arr[i]))
      }
    }
    return ps
  }, [])

  useMemo(() => {
    if (sku.length === 1) {
      setSelect(old => !old.length && sku[0].spec.length ? [...sku[0].spec] : old)
    }
  }, [sku])

  const [defaultDisable, result] = useMemo(() => {
    // 过滤没有库存的商品
    let keys = []
    if (filterStore) {
      keys = sku.filter(v => v.store).map(v => v.spec)
    } else {
      keys = sku.map(v => v.spec)
    }
    // 计算所有可用sku路径
    let _result = {}

    for (let i = 0; i < keys.length; i++) {
      const set = powerset(keys[i])
      for (let j = 0, jl = set.length; j < jl; j++) {
        const key = set[j].join(',')
        _result[key] = true
      }
    }
    // 计算所有的规格可选状态
    const _disable = []
    for (let i = 0, il = spec.length; i < il; i++) {
      const values = spec[i].spec
      _disable.push([])
      for (let j = 0, jl = values.length; j < jl; j++) {
        _disable[i].push(true)
      }
    }

    return [_disable, _result]
  }, [filterStore, powerset, sku, spec])

  const [disable] = useMemo(() => {
    for (let i = 0, il = spec.length; i < il; i++) {
      const values = spec[i].spec
      for (let j = 0, jl = values.length; j < jl; j++) {
        const key = []
        for (let k = 0, kl = select.length; k < kl; k++) {
          if (k === i) {
            key.push(values[j])
          } else if (select[k]) {
            key.push(select[k])
          }
        }
        defaultDisable[i][j] = !result[key.join(',')]
      }
    }
    return [defaultDisable]
  }, [defaultDisable, result, select, spec])

  const selectItem = useCallback((index, _value, vIndex) => {
    if (disable[index][vIndex]) return
    setSelect(old => {
      old[index] = old[index] === _value ? '' : _value
      return [...old]
    })
  }, [disable])

  useEffect(() => {
    const selectKey = select.join(',')
    const selectSku = sku.find(v => v.spec.join(',') === selectKey)
    if (!selectSku) {
      if (value) {
        onChange()
      }
    } else {
      if (value !== selectSku.id) {
        onChange(selectSku.id)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [select, sku, value])

  return spec.map((item, index) => {
    const isImage = item.images?.some(img => img)
    return <Fragment key={item.name}>
      <Text size={2}>{item.name}</Text>
      {
        isImage ?
          <Grid column={3} gap={24}>
            {item.spec.map((text, vIndex) => {
              const isSelect = select[index] === text
              const isDisable = disable[index]?.[vIndex]
              const img = item.images[vIndex]

              return <Column key={text} items='center'
                grow
                className='r-2 overflow-hidden'
                onClick={() => {
                  selectItem(index, text, vIndex)
                  onImageChange?.(img || image)
                }}
                style={{
                  borderWidth: px(1),
                  borderColor: isSelect ? duxappTheme.primaryColor : duxappTheme.pageColor
                }}
              >
                <Image src={img || image} className='w-full' square />
                <Column className='p-2 w-full'>
                  <Text numberOfLines={1} size={1} align='center' color={isDisable ? 3 : 1}>{text}</Text>
                </Column>
              </Column>
            })}
          </Grid> :
          <Row className='gap-3' wrap>
            {item.spec.map((text, vIndex) => {
              const isSelect = select[index] === text
              const isDisable = disable[index]?.[vIndex]
              return <Button
                key={text}
                onClick={() => selectItem(index, text, vIndex)}
                disable={isDisable}
                radiusType='round'
                type={isSelect ? 'primary' : 'default'}
                plain={!isSelect}
              >{text}</Button>
            })}
          </Row>
      }
    </Fragment>
  })
}

Spec.defaultProps = {
  spec: [],
  sku: []
}
