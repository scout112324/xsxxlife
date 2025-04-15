import request from '@/utils/request'

// 获取闲置物品列表
export function unusedList(query) {
  return request({
    url: '/web/unused/list',
    method: 'get',
    params: query
  })
}

// 修改闲置物品（主要修改首页展示、审核）
export function updateUnused(data) {
  return request({
    url: '/web/unused/update',
    method: 'post',
    data: data
  })
}

// 删除闲置物品
export function deleteUnused(query) {
  return request({
    url: '/web/unused/delete',
    method: 'get',
    params: query
  })
}
