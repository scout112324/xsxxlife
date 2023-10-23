import request from '@/utils/request'

// 查询公告列表
export function noticeList(query) {
  return request({
    url: '/web/notice/list',
    method: 'get',
    params: query
  })
}

// 新增公告
export function addNotice(data) {
  return request({
    url: '/web/notice/add',
    method: 'post',
    data: data
  })
}

// 编辑公告
export function updateNotice(data) {
  return request({
    url: '/web/notice/update',
    method: 'post',
    data: data
  })
}

// 删除公告
export function deleteNotice(query) {
  return request({
    url: '/web/notice/delete',
    method: 'get',
    params: query
  })
}
