import request from "@/utils/request/index.js"

const api = {
	updateUser: 'app/user/update',
	addAdvice: 'app/advice/add',
	msgList: 'app/msg/list',
	msgRead: 'app/msg/read',
	msgChat: 'app/msg/chat',
}

// 更改昵称或者头像
export const updateUser = (param, option) => {
	return request.get(api.updateUser, param)
}

// 新增意见反馈
export const addAdvice = (param, option) => {
	return request.post(api.addAdvice, param)
}

// 查询聊天列表
export const msgList = (param, option) => {
	return request.get(api.msgList, param)
}

// 设置消息状态（已读未读）
export const msgRead = (param, option) => {
	return request.get(api.msgRead, param)
}

// 查询聊天记录
export const msgChat = (param, option) => {
	return request.get(api.msgChat, param)
}