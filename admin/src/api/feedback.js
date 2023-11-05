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

// 交易记录
export function orderList(query) {
  return request({
    url: '/web/order/list',
    method: 'get',
    params: query
  })
}

// 获取提现列表
export function withdrawalList(query) {
  return request({
    url: '/web/withdrawal/list',
    method: 'get',
    params: query
  })
}

// 修改提现状态
export function withdrawalStatus(query) {
  return request({
    url: '/web/withdrawal/status',
    method: 'get',
    params: query
  })
}
