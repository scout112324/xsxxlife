import request from '@/utils/request'

// 获取寻人寻物列表
export function findList(query) {
  return request({
    url: '/web/find/list',
    method: 'get',
    params: query
  })
}

// 修改大件清运（主要修改审核）
export function updateFind(data) {
  return request({
    url: '/web/find/update',
    method: 'post',
    data: data
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
