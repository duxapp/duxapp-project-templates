import { Map as MapTaro } from '@tarojs/components'
import { useCallback, useMemo } from 'react'
import { getMarkers } from './util'

export const Map = ({
  onMoveEnd,
  center,
  zoom = 18,
  markers,
  circles,
  polylines,
  polygons,
  onMarkerClick
}) => {

  const regionChange = useCallback(e => {
    if (e.type === 'end' && e.causedBy !== 'update') {
      onMoveEnd?.({
        center: [e.detail.centerLocation.longitude, e.detail.centerLocation.latitude]
      })
    }
  }, [onMoveEnd])

  const _markers = useMemo(() => getMarkers(markers).map(item => {
    if (item.label) {
      item.label.anchorY = (item.label.anchorY || 0) - ((item.height + item.label.fontSize) / 2)
      item.label.textAlign = 'center'
    }
    return item
  }), [markers])

  const markerClick = useCallback(e => {
    const index = _markers.findIndex(item => item.id === e.detail.markerId)
    onMarkerClick?.({ item: _markers[index], index })
  }, [_markers, onMarkerClick])

  return <MapTaro
    style={{
      width: '100%', height: '100%',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0
    }}
    markers={_markers}
    longitude={center?.[0]}
    latitude={center?.[1]}
    scale={zoom}
    circles={circles}
    polyline={polylines}
    polygon={polygons}
    onRegionChange={regionChange}
    onMarkerTap={markerClick}
  />
}
