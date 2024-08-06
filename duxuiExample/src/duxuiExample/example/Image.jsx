import { Card, Description, Divider, Image, Header, ScrollView, TopView, GroupList, Space, Button } from '@/duxuiExample'
import Taro from '@tarojs/taro'

export default function ImagedExample() {
  return <TopView>
    <Header title='Image' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='基础用法'>
          <Space row>
            <Image style={{ width: Taro.pxTransform(200), height: Taro.pxTransform(160) }}
              src='https://img0.baidu.com/it/u=1684532727,1424929765&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681318800&t=50301360a9bd698d5f29da34ffb5cbb0'
            />
            <Image style={{ width: Taro.pxTransform(200), height: Taro.pxTransform(160) }}
              radiusType='round-min'
              src='https://img1.baidu.com/it/u=3007048469,3759326707&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681318800&t=be56dabb266748e4ab260d11a100b46f'
            />
          </Space>
        </GroupList.Item>
        <GroupList.Item title='预览'>
          <Image style={{ width: Taro.pxTransform(200), height: Taro.pxTransform(160) }} preview
            src='https://img0.baidu.com/it/u=1684532727,1424929765&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681318800&t=50301360a9bd698d5f29da34ffb5cbb0'
          />
        </GroupList.Item>
        <GroupList.Item title='多图预览'>
          <Image.Group>
            <Space row>
              <Image style={{ width: Taro.pxTransform(200), height: Taro.pxTransform(160) }}
                src='https://img0.baidu.com/it/u=1684532727,1424929765&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681318800&t=50301360a9bd698d5f29da34ffb5cbb0'
              />
              <Image style={{ width: Taro.pxTransform(200), height: Taro.pxTransform(160) }}
                src='https://img1.baidu.com/it/u=3007048469,3759326707&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681318800&t=be56dabb266748e4ab260d11a100b46f'
              />
              <Image style={{ width: Taro.pxTransform(200), height: Taro.pxTransform(160) }}
                src='https://img1.baidu.com/it/u=4049022245,514596079&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1681318800&t=2b375ed6d93d638d1be405d04eb8c7f2'
              />
            </Space>
          </Image.Group>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
