import request from '@/utils/request'

// 获取房屋转让列表
export function houseList(query) {
  return request({
    url: '/web/house/list',
    method: 'get',
    params: query
  })
}

// 删除房屋转让
export function deleteHouse(query) {
  return request({
    url: '/web/house/delete',
    method: 'get',
    params: query
  })
}
