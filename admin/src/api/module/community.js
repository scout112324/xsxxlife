import request from '@/utils/request'

// 查询社群列表
export function crowdList(query) {
  return request({
    url: '/web/crowd/list',
    method: 'get',
    params: query
  })
}

// 新增社群
export function addCrowd(data) {
  return request({
    url: '/web/crowd/add',
    method: 'post',
    data: data
  })
}

// 编辑社群
export function updateCrowd(data) {
  return request({
    url: '/web/crowd/update',
    method: 'post',
    data: data
  })
}

// 删除社群
export function deleteCrowd(query) {
  return request({
    url: '/web/crowd/delete',
    method: 'get',
    params: query
  })
}
