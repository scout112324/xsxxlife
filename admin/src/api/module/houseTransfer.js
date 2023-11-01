import request from '@/utils/request'

// 获取房屋转让列表
export function houseList(query) {
  return request({
    url: '/web/house/list',
    method: 'get',
    params: query
  })
}

// 修改房屋转让（主要修改审核）
export function updateHouse(data) {
  return request({
    url: '/web/house/update',
    method: 'post',
    data: data
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
