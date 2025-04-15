import request from '@/utils/request'

// 获取综合服务列表
export function mIntservList(query) {
  return request({
    url: '/web/mIntserv/list',
    method: 'get',
    params: query
  })
}

// 增加综合服务
export function addMIntserv(data) {
  return request({
    url: '/web/mIntserv/add',
    method: 'post',
    data: data
  })
}

// 编辑综合服务
export function updateMIntserv(data) {
  return request({
    url: '/web/mIntserv/update',
    method: 'post',
    data: data
  })
}

// 删除综合服务
export function deleteMIntserv(query) {
  return request({
    url: '/web/mIntserv/delete',
    method: 'get',
    params: query
  })
}
