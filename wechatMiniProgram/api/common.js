import request from "@/utils/request/index.js"
import store from '@/store/index.js';
import $http from '@/utils/request/index.js'
import { getLocationInfo } from '@/utils/location.js'

const api = {
	addSupport: 'app/support/add',
	cancelSupport: 'app/support/cancel',
	addStar: 'app/star/add',
	cancelStar: 'app/star/cancel',
	addGive: 'app/give/add',
	addComment: 'app/comment/add',
	listComment: 'app/comment/list',
	childrenListComment: 'app/comment/childrenList',
	submitWx: 'app/wx/submit',
	toPayWx: 'app/wx/toPay',
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

// 支付结算
export const submitWx = (param, option) => {
	return request.get(api.submitWx, param)
}

// 去结算
export const toPayWx = (param, option) => {
	return request.get(api.toPayWx, param)
}

/**
 * 发起支付请求
 * @param {Object} 参数
 */
export const wxPayment = (option) => {
	const options = {
		timeStamp: '',
		nonceStr: '',
		prepay_id: '',
		paySign: '',
		...option
	}
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			provider: 'wxpay',
			timeStamp: options.timeStamp,
			nonceStr: options.nonceStr,
			'package': options.packageValue,
			signType: 'MD5',
			paySign: options.paySign,
			success: res => {
				console.log("res", res)
				store.commit('ORDER_SUCCESS', true)
				uni.navigateTo({
					url: "/pages/user/trading/trading"
				})
				resolve(res)
			},
			fail: res => reject(res)
		})
	})
}

// 获取地区信息
export const getArea = (option) => {
	return new Promise((resolve, reject) => {
		// 先获取位置信息
		getLocationInfo().then(location => {
			// 使用获取到的位置信息调用 API
			$http.request({
				url: `https://api.map.baidu.com/geocoder?location=${location.latitude},${location.longitude}&output=json`,
				method: 'GET',
				needLocation: true
			}).then(res => {
				resolve(res);
			}).catch(err => {
				reject(err);
			});
		}).catch(err => {
			reject(err);
		});
	});
}