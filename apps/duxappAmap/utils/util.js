import { getLocationBase, nav } from '@/duxapp'
import { mapApi } from './api'

/**
 * 获取位置信息包含省市区信息
 * @returns
 */
export const getLocation = async () => {
  const { latitude, longitude } = await getLocationBase()
  return await mapApi.getRegeo(longitude, latitude)
}

/**
 * 选择位置
 * @param {number} lng 当前的精度
 * @param {number} lat 当前的纬度
 */
export const chooseLocation = async (lng = '', lat = '') => {
  const { backData } = await nav('duxappAmap/location/index', { lng, lat })
  const info = await backData()
  if (info) {
    info.longitude = +info.longitude
    info.latitude = +info.latitude
    info.area = [info.province, info.city, info.district]
    return info
  }
  throw '取消选择'
}
