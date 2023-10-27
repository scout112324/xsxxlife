import request from '@/utils/request'

// 获取寻人寻物列表
export function findList(query) {
  return request({
    url: '/web/find/list',
    method: 'get',
    params: query
  })
}

// 删除寻人寻物
export function deleteFind(query) {
  return request({
    url: '/web/find/delete',
    method: 'get',
    params: query
  })
}
