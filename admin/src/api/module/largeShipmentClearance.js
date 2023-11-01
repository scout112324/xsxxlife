import request from '@/utils/request'

// 获取大件清运列表
export function bigList(query) {
  return request({
    url: '/web/big/list',
    method: 'get',
    params: query
  })
}

// 修改大件清运（主要修改审核）
export function updateBig(data) {
  return request({
    url: '/web/big/update',
    method: 'post',
    data: data
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
