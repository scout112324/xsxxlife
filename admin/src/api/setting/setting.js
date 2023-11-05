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

// 获取聊天列表
export function chatMsgList(query) {
  return request({
    url: '/web/chatMsg/list',
    method: 'get',
    params: query
  })
}

// 删除聊天列表
export function deleteChatMsg(query) {
  return request({
    url: '/web/chatMsg/delete',
    method: 'get',
    params: query
  })
}

// 获取icon列表（不分页）综合服务
export function intservList(query) {
  return request({
    url: '/web/intserv/list',
    method: 'get',
    params: query
  })
}

// 新增icon列表（不分页）综合服务
export function addIntserv(data) {
  return request({
    url: '/web/intserv/add',
    method: 'post',
    data: data
  })
}

// 编辑icon列表（不分页）综合服务
export function updateIntserv(data) {
  return request({
    url: '/web/intserv/update',
    method: 'post',
    data: data
  })
}

// 删除icon列表（不分页）综合服务
export function deleteIntserv(query) {
  return request({
    url: '/web/intserv/delete',
    method: 'get',
    params: query
  })
}
