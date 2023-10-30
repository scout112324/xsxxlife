import request from '@/utils/request'

// 获取大件清运列表
export function bigList(query) {
  return request({
    url: '/web/big/list',
    method: 'get',
    params: query
  })
}

// 删除大件清运
export function deleteBig(query) {
  return request({
    url: '/web/big/delete',
    method: 'get',
    params: query
  })
}
