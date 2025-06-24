import { Component } from 'react'
import { View, Input } from '@tarojs/components'
import { ScrollView, PullView, Text, px, Button, Row } from '@/duxui'
import { CmsIcon } from '@/duxcms'
import './filter.scss'

export default class PullListFilter extends Component {
  state = {
    accordion: [],
    inputVal: this.props.data || {},
  }

  componentDidMount() {
    const { data } = this.props
    data.map((item) => {
      item.tpl == 'interval' && (item.accordionOff = true)
    })
    this.forceUpdate()
  }

  // 手风琴折叠
  accordion(index) {
    const { data } = this.props
    const { accordion } = this.state
    if (data[index].accordionOff) return
    this.setState({ accordion: { ...accordion, [index]: !accordion[index] } })
  }

  //选择标签
  select(data, item) {
    var { inputVal } = this.state
    if (data.maxName) {
      inputVal[data.minName] = item.min + ''
      inputVal[data.maxName] = item.max + ''
    } else {
      inputVal[data.minName] = item.min + ''
    }
    this.setState({ inputVal })
  }

  // 输入框
  input(key, e) {
    const { inputVal } = this.state
    this.setState({ inputVal: { ...inputVal, [key]: e.target.value } })
  }

  // 重置
  reset() {
    this.setState({ inputVal: {} })
  }

  // 确定
  submit() {
    this.props.onSubmit(this.state.inputVal)
    this.close()
  }

  close() {
    this.props.onClose?.()
  }

  render() {
    const { accordion, inputVal } = this.state
    const { data = [] } = this.props
    return (
      <PullView side='right' onClose={this.close.bind(this)}>
        <View className='search__container'>
          <ScrollView>
            {data.map((item, index) => {
              const key = item.maxName ? item.maxName : item.value
              return <View key={item.name + item.text} className='search__container__box'>
                <View className='search__container__title' onClick={this.accordion.bind(this, index)}>
                  <Text className='search__container__title__titleText'>{item.text}</Text>
                  {!data[index].accordionOff &&
                    <CmsIcon name={!!accordion[index] ? 'direction_down' : 'direction_up'} className='search__container__title__icon' />
                  }
                </View>
                {(!!accordion[index] || data[index].accordionOff) &&
                  <View className='search__container__content'>
                    {item.tpl === 'interval' &&
                      <View className='search__container__content__enter'>
                        <View className='search__container__content__enter__inputBox'>
                          <Input onInput={this.input.bind(this, item.minName)} value={inputVal[item.minName]} className='search__container__content__enter__input' placeholder='最小值'></Input>
                          <Text> — </Text>
                          <Input onInput={this.input.bind(this, item.maxName)} value={inputVal[item.maxName]} className='search__container__content__enter__input' placeholder='最大值'></Input>
                        </View>
                      </View>
                    }
                    {item.list.map(item_ => {
                      return (
                        <Text
                          key={item_.text}
                          numberOfLines={1}
                          className={['search__container__content__item', inputVal[key] == item_.max && 'search__container__content__item--hover']}
                          style={{ width: px(item.tpl === 'interval' ? 260 : 163) }}
                          onClick={this.select.bind(this, item, item_)}
                        >{item_.text}</Text>
                      )
                    })}
                  </View>
                }
              </View>
            })}
          </ScrollView>
          <Row className='gap-3 p-3'>
            <Button type='primary' className='flex-grow' size='l' plain onClick={this.reset.bind(this)}>重置</Button>
            <Button type='primary' className='flex-grow' size='l' onClick={this.submit.bind(this)}>确定</Button>
          </Row>
        </View>
      </PullView>
    )
  }
}
