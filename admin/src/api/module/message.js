import request from '@/utils/request'

// 查询公告（管理端）
export function noticeToList(query) {
  return request({
    url: '/web/noticeTo/select',
    method: 'get',
    params: query
  })
}

// 编辑公告跳转地址（管理端）
export function updateNoticeTo(data) {
  return request({
    url: '/web/noticeTo/update',
    method: 'post',
    data: data
  })
}

// 查询文章列表
export function articleList(query) {
  return request({
    url: '/web/article/list',
    method: 'get',
    params: query
  })
}

// 新增文章
export function addArticle(data) {
  return request({
    url: '/web/article/add',
    method: 'post',
    data: data
  })
}

// 编辑文章
export function updateArticle(data) {
  return request({
    url: '/web/article/update',
    method: 'post',
    data: data
  })
}

// 删除文章
export function deleteArticle(query) {
  return request({
    url: '/web/article/delete',
    method: 'get',
    params: query
  })
}
