import request from '@/utils/request'

// 意见反馈列表
export function adviceList(query) {
  return request({
    url: '/web/advice/list',
    method: 'get',
    params: query
  })
}

// 删除意见反馈
export function deleteAdvice(query) {
  return request({
    url: '/web/advice/delete',
    method: 'get',
    params: query
  })
}
