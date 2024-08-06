import { Header, ScrollView, TopView, GroupList, Menu, Text, Form, Button, Column, toast } from '@/duxuiExample'
import { useRef } from 'react'

export default function MenuExample() {

  const itemRef = useRef()

  return <TopView>
    <Header title='Menu' />
    <ScrollView>
      <Form>
        <GroupList>
          <GroupList.Item title='基础用法'>
            <Menu round>
              <Form.Item field='show1'>
                <Menu.Item
                  title='显示1'
                  options={[{ name: '标题1', value: 1 }, { name: '标题2', value: 2 }]}
                />
              </Form.Item>
              <Form.Item field='show2'>
                <Menu.Item
                  column={2}
                  title='多列'
                  options={[{ name: 'ABC1', value: 1 }, { name: 'ABC2', value: 2 }, { name: 'ABC3', value: 3 }]}
                />
              </Form.Item>
              <Form.Item field='show3'>
                <Menu.Item
                  title='自定义内容'
                  ref={itemRef}
                >
                  <Text>自定义显示</Text>
                  <Button onClick={() => itemRef.current.toggle()}>关闭</Button>
                </Menu.Item>
              </Form.Item>
            </Menu>
          </GroupList.Item>


          
          <GroupList.Item title='直角'>
            <Menu>
              <Form.Item field='show4'>
                <Menu.Item
                  title='允许取消'
                  cancel
                  options={[{ name: '标题1', value: 1 }, { name: '标题2', value: 2 }]}
                />
              </Form.Item>
              <Form.Item field='show5'>
                <Menu.Item
                  column={2}
                  align='center'
                  title='居中对齐'
                  options={[{ name: 'ABC1', value: 1 }, { name: 'ABC2', value: 2 }, { name: 'ABC3', value: 3 }]}
                />
              </Form.Item>
              <Menu.Item
                title='自定义内容'
                ref={itemRef}
              >
                <Text>自定义显示</Text>
                <Button onClick={() => itemRef.current.toggle()}>关闭</Button>
              </Menu.Item>
            </Menu>
          </GroupList.Item>
          <GroupList.Item title='点击事件'>
            <Menu>
              <Form.Item field='show6'>
                <Menu.Item
                  title='菜单1'
                  options={[{ name: '标题1', value: 1 }, { name: '标题2', value: 2 }]}
                />
              </Form.Item>
              <Form.Item field='show7'>
                <Menu.Item
                  title='菜单2'
                  options={[{ name: 'ABC1', value: 1 }, { name: 'ABC2', value: 2 }, { name: 'ABC3', value: 3 }]}
                />
              </Form.Item>
              <Menu.Item
                title='点击菜单'
                ref={itemRef}
                onClick={() => toast('点击了菜单')}
              >

              </Menu.Item>
            </Menu>
          </GroupList.Item>
        </GroupList>
      </Form>
      <Column style={{ height: 800 }} />
    </ScrollView>
  </TopView>
}
