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
	websocket: 'websocket',
	starList: 'app/my/starList',
	supportList: 'app/my/supportList',
	activityList: 'app/my/activityList',
	myPublic: 'app/my/myPublic',
	orderRecord: 'app/my/order',
	withdrawal: '/app/withdrawal/add',
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

// 收藏列表
export const starList = (param, option) => {
	return request.get(api.starList, param)
}

// 获取点赞列表
export const supportList = (param, option) => {
	return request.get(api.supportList, param)
}

// 我的活动
export const activityList = (param, option) => {
	return request.get(api.activityList, param)
}

// 我的发布
export const myPublic = (param, option) => {
	return request.get(api.myPublic, param)
}

// 交易记录
export const orderRecord = (param, option) => {
	return request.get(api.orderRecord, param)
}

// 增加提现申请
export const withdrawal = (param, option) => {
	return request.get(api.withdrawal, param)
}