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
	refundRecord: 'app/wx/refund',
	withdrawal: 'app/withdrawal/add',
	infoUser: 'app/user/info',
	deleteHouse: 'app/house/delete',
	deleteFind: 'app/find/delete',
	deleteUnused: 'app/unused/delete',
	deleteActivity: 'app/activity/delete',
	deleteBig: 'app/big/delete',
	selectPlace: 'app/wx/selectPlace',
	delivery: 'app/my/delivery',
	refund: 'app/my/refund',
	agreeRefund: 'app/my/agreeRefund',
	refuseRefund: 'app/my/refuseRefund',
	takeDelivery: 'app/my/takeDelivery',
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

// 退款
export const refundRecord = (param, option) => {
	return request.get(api.refundRecord, param)
}

// 增加提现申请
export const withdrawal = (param, option) => {
	return request.get(api.withdrawal, param)
}

// 查询自己的信息
export const infoUser = (param, option) => {
	return request.get(api.infoUser, param)
}

// 删除房屋转让
export const deleteHouse = (param, option) => {
	return request.get(api.deleteHouse, param)
}

// 删除寻人寻物
export const deleteFind = (param, option) => {
	return request.get(api.deleteFind, param)
}

// 删除闲置交易
export const deleteUnused = (param, option) => {
	return request.get(api.deleteUnused, param)
}

// 删除同城活动
export const deleteActivity = (param, option) => {
	return request.get(api.deleteActivity, param)
}

// 删除大件清运
export const deleteBig = (param, option) => {
	return request.get(api.deleteBig, param)
}

// 查询地址
export const selectPlace = (param, option) => {
	return request.get(api.selectPlace, param)
}

// 发货
export const delivery = (param, option) => {
	return request.get(api.delivery, param)
}

// 退款针对买家
export const refund = (param, option) => {
	return request.get(api.refund, param)
}

// 同意退款
export const agreeRefund = (param, option) => {
	return request.get(api.agreeRefund, param)
}

// 拒绝退款
export const refuseRefund = (param, option) => {
	return request.get(api.refuseRefund, param)
}

// 收货
export const takeDelivery = (param, option) => {
	return request.get(api.takeDelivery, param)
}