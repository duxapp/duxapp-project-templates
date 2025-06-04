import { Header, ScrollView, TopView, GroupList, Menu, Text, Form, Button, Column, toast, FormItem, MenuItem } from '@/duxuiExample'
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
              <FormItem field='show1'>
                <MenuItem
                  title='显示1'
                  options={[{ name: '标题1', value: 1 }, { name: '标题2', value: 2 }]}
                />
              </FormItem>
              <FormItem field='show2'>
                <MenuItem
                  column={2}
                  title='多列'
                  options={[{ name: 'ABC1', value: 1 }, { name: 'ABC2', value: 2 }, { name: 'ABC3', value: 3 }]}
                />
              </FormItem>
              <FormItem field='show3'>
                <MenuItem
                  title='自定义内容'
                  ref={itemRef}
                >
                  <Text>自定义显示</Text>
                  <Button onClick={() => itemRef.current.toggle()}>关闭</Button>
                </MenuItem>
              </FormItem>
            </Menu>
          </GroupList.Item>


          
          <GroupList.Item title='直角'>
            <Menu>
              <FormItem field='show4'>
                <MenuItem
                  title='允许取消'
                  cancel
                  options={[{ name: '标题1', value: 1 }, { name: '标题2', value: 2 }]}
                />
              </FormItem>
              <FormItem field='show5'>
                <MenuItem
                  column={2}
                  align='center'
                  title='居中对齐'
                  options={[{ name: 'ABC1', value: 1 }, { name: 'ABC2', value: 2 }, { name: 'ABC3', value: 3 }]}
                />
              </FormItem>
              <MenuItem
                title='自定义内容'
                ref={itemRef}
              >
                <Text>自定义显示</Text>
                <Button onClick={() => itemRef.current.toggle()}>关闭</Button>
              </MenuItem>
            </Menu>
          </GroupList.Item>
          <GroupList.Item title='点击事件'>
            <Menu>
              <FormItem field='show6'>
                <MenuItem
                  title='菜单1'
                  options={[{ name: '标题1', value: 1 }, { name: '标题2', value: 2 }]}
                />
              </FormItem>
              <FormItem field='show7'>
                <MenuItem
                  title='菜单2'
                  options={[{ name: 'ABC1', value: 1 }, { name: 'ABC2', value: 2 }, { name: 'ABC3', value: 3 }]}
                />
              </FormItem>
              <MenuItem
                title='点击菜单'
                ref={itemRef}
                onClick={() => toast('点击了菜单')}
              >

              </MenuItem>
            </Menu>
          </GroupList.Item>
        </GroupList>
      </Form>
      <Column style={{ height: 800 }} />
    </ScrollView>
  </TopView>
}
