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

// 查询icon列表
export function iconList(query) {
  return request({
    url: '/web/icon/list',
    method: 'get',
    params: query
  })
}

// 新增icon
export function addIcon(data) {
  return request({
    url: '/web/icon/add',
    method: 'post',
    data: data
  })
}

// 编辑icon
export function updateIcon(data) {
  return request({
    url: '/web/icon/update',
    method: 'post',
    data: data
  })
}

// 删除icon
export function deleteIcon(query) {
  return request({
    url: '/web/icon/delete',
    method: 'get',
    params: query
  })
}

// 获取用户列表
export function userList(query) {
  return request({
    url: '/web/user/list',
    method: 'get',
    params: query
  })
}
