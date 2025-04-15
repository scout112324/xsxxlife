import request from '@/utils/request'

// 获取同城活动列表
export function activityList(query) {
  return request({
    url: '/web/activity/list',
    method: 'get',
    params: query
  })
}

// 修改活动（主要修改审核）
export function updateActivity(data) {
  return request({
    url: '/web/activity/update',
    method: 'post',
    data: data
  })
}

// 删除同城活动
export function deleteActivity(query) {
  return request({
    url: '/web/activity/delete',
    method: 'get',
    params: query
  })
}
