import { useCallback, useEffect, useMemo, useRef } from 'react'
import { AMapSdk, MapView, Circle, Polyline, Marker } from 'react-native-amap3d'
import { Platform, View, Text, Image, StyleSheet } from 'react-native'
import { mapConfig } from '@/amap/utils'
import { getMarkers } from './util'

const initAmap = (() => {
  let _initAmap = false
  return () => {
    if (_initAmap) {
      return
    }
    _initAmap = true
    AMapSdk.init(
      Platform.select({
        android: mapConfig.appKeyAndroid,
        ios: mapConfig.appKeyIos,
      })
    )
  }
})()

const Markers = ({
  markers,
  onMarkerClick
}) => {

  const _markers = useMemo(() => getMarkers(markers), [markers])

  return _markers?.map((item, index) => <Marker
    key={item.key || index}
    position={{ latitude: item.latitude, longitude: item.longitude }}
    onPress={() => onMarkerClick({ item, index })}
  >
    <View style={[styles.markerItem, { width: item.width, height: item.height }]} >
      <Image source={item.iconPath} resizeMode='stretch' style={[styles.markerItemImage, { width: item.width, height: item.height }]} />
      {!!item.label && <View
        style={[styles.markerItemLebel, {
          padding: item.label.padding || 0,
          backgroundColor: item.label.bgColor,
          borderWidth: item.label.borderWidth || 0,
          borderColor: item.label.borderColor,
          borderRadius: item.label.borderRadius || 0,
        }, {
          transform: [{ translateX: item.label.anchorX || 0 }, { translateY: item.label.anchorY || 0 }]
        }]}
      >
        <Text style={{ fontSize: item.label.fontSize || 12, color: item.label.color || '#000' }}>{item.label.content}</Text>
      </View>}
    </View>
  </Marker>)
}


const styles = StyleSheet.create({
  markerItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  markerItemImage: {
    position: 'absolute',
    left: 0,
    top: 0
  },
  markerItemLebel: {

  }
})

export const Map = ({
  onMoveEnd,
  center,
  zoom = 18,
  markers,
  circles,
  polylines,
  onMarkerClick
}) => {
  const map = useRef(null)

  const mapCenter = useRef([])

  const centerChange = useRef({ status: false, num: 0 })

  initAmap()

  useEffect(() => {
    if (!center) {
      return
    }
    // 如果是地图触发了改变的数据则不会移动
    if (mapCenter.current[0] === center[0] && mapCenter.current[1] === center[1]) {
      return
    }
    map.current?.moveCamera(
      {
        target: {
          latitude: center[1],
          longitude: center[0]
        },
        zoom
      },
      500
    )
    centerChange.current.status = true
    centerChange.current.num++
  }, [center, zoom])

  const mapChange = useCallback(e => {
    // 中心点改变后的移动不触发移动事件 第一次执行
    if (centerChange.current.status && centerChange.current.num > 1) {
      centerChange.current.status = false
      return
    }
    const target = e.nativeEvent.cameraPosition.target
    mapCenter.current = [
      target.longitude,
      target.latitude
    ]
    onMoveEnd?.({
      center: [
        target.longitude,
        target.latitude
      ]
    })
  }, [onMoveEnd])

  return <MapView
    ref={map}
    tiltGesturesEnabled={false}
    zoomControlsEnabled={false}
    rotateGesturesEnabled={false}
    compassEnabled={false}
    onCameraIdle={mapChange}
    initialCameraPosition={{
      target: defaultData.target
    }}
    style={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    }}
  >
    <Markers markers={markers} onMarkerClick={onMarkerClick} />
    {
      circles?.map(item => <Circle
        key={`${item.lng}${item.lat}${item.radius}`}
        strokeWidth={item.strokeWidth || 2}
        strokeColor={item.strokeColor || '#F24844'}
        fillColor={item.fillColor || 'rgba(242,72,68,0.2)'}
        radius={item.radius}
        center={{ latitude: item.lat, longitude: item.lng }}
      />)
    }
    {
      polylines?.map((item, index) => <Polyline
        key={item.key || index}
        dotted={item.dotted}
        color={item.color || 'rgba(255, 0, 0, 0.5)'}
        width={item.width || 5}
        colors={item.colors || defaultData.polyline.colors}
        points={item.points?.map?.(v => ({ latitude: v.lat, longitude: v.lng })) || defaultData.polyline.points}
      />)
    }
  </MapView>
}

const defaultData = {
  polyline: {
    colors: ["#f44336", "#2196f3", "#4caf50"],
    points: []
  },
  target: {
    latitude: 28.231835,
    longitude: 112.928798
  }
}
