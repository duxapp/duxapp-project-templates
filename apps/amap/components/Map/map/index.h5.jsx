import { Map as AMap, APILoader, Marker } from '@uiw/react-amap'
import { useCallback, useRef } from 'react'
import { mapConfig } from '@/amap/utils'

export const Map = ({
  onMoveEnd,
  center,
  zoom = 18,
  markers
}) => {

  const map = useRef()

  const mapChange = useCallback(() => {
    const _center = map.current.map.getCenter()
    onMoveEnd?.({ center: [_center.lng, _center.lat] })
  }, [onMoveEnd])

  return <APILoader akey={mapConfig.h5Key}>
    <AMap
      ref={map}
      center={center}
      zoom={zoom}
      onDragEnd={mapChange}
      onZoomEnd={mapChange}
      onComplete={mapChange}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
      }}
    >
      {
        markers?.map(marker => <Marker
          key={'' + marker.lng + marker.lat}
          position={[marker.lng, marker.lat]}
        />)
      }
    </AMap>
  </APILoader>
}
