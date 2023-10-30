import request from "@/utils/request/index.js"

import config from '@/config'

// 后端api地址
const baseURL = config.apiUrl

const api = {
	updateUser: 'app/user/update',
	addAdvice: 'app/advice/add',
	msgList: 'app/msg/list',
	msgRead: 'app/msg/read',
	msgChat: 'app/msg/chat',
	websocket: 'websocket'
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

// 聊天的websocket
export const websocket = (param, option) => {
	console.log(param.openId)
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseURL + api.websocket + param.openId,
			method: 'POST',
			header: {
				'content-type': 'application/json',
				'openId': uni.getStorageSync('openId')
			},
			// data: data,
			success: (res) => {
				resolve(res.data);
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}