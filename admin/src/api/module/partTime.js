import request from '@/utils/request'

// 获取兼职列表
export function jobList(query) {
  return request({
    url: '/web/job/list',
    method: 'get',
    params: query
  })
}

// 增加兼职
export function addJob(data) {
  return request({
    url: '/web/job/add',
    method: 'post',
    data: data
  })
}

// 编辑兼职
export function updateJob(data) {
  return request({
    url: '/web/job/update',
    method: 'post',
    data: data
  })
}

// 删除兼职
export function deleteJob(query) {
  return request({
    url: '/web/job/delete',
    method: 'get',
    params: query
  })
}
