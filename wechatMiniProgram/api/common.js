import request from "@/utils/request/index.js"

const api = {
	addSupport: 'app/support/add',
	cancelSupport: 'app/support/cancel',
	addStar: 'app/star/add',
	cancelStar: 'app/star/cancel',
	addGive: 'app/give/add',
	addComment: 'app/comment/add',
	listComment: 'app/comment/list',
	childrenListComment: 'app/comment/childrenList',
}

// 点赞
export const addSupport = (param, option) => {
	return request.get(api.addSupport, param)
}

// 取消点赞
export const cancelSupport = (param, option) => {
	return request.get(api.cancelSupport, param)
}

// 收藏
export const addStar = (param, option) => {
	return request.get(api.addStar, param)
}

// 取消收藏
export const cancelStar = (param, option) => {
	return request.get(api.cancelStar, param)
}

// 分享
export const addGive = (param, option) => {
	return request.get(api.addGive, param)
}

// 增加评论
export const addComment = (param, option) => {
	return request.get(api.addComment, param)
}

// 获取一级评论列表
export const listComment = (param, option) => {
	return request.get(api.listComment, param)
}

// 获取二级评论列表
export const childrenListComment = (param, option) => {
	return request.get(api.childrenListComment, param)
}