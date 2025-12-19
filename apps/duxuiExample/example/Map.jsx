import { Header, ScrollView, TopView, GroupList } from '@/duxuiExample'
import { View } from '@tarojs/components'
import { Map } from '@/duxappAmap'
import { useState } from 'react'

export default function LoadingExample() {

  const [center, setCenter] = useState()

  return <TopView>
    <Header title='Map' />
    <ScrollView>
      <GroupList>
        <GroupList.Item title='地图'>
          <View style={{ height: 500 }}>
            <Map
              center={center}
            />
          </View>
        </GroupList.Item>
      </GroupList>
    </ScrollView>
  </TopView>
}
