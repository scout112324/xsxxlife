import request from "@/utils/request/index.js"

const api = {
	login: 'app/user/login',
	getNotice: 'app/home/getNotice',
	tabList: 'app/home/tab',
	getUnused: 'app/home/getUnused',
}

// 登录
export const login = (param, option) => {
	return request.get(api.login, param)
}

// 获取公告
export const getNotice = (param, option) => {
	return request.get(api.getNotice, param)
}

// 获取tab跳转路径及图标
export const tabList = (param, option) => {
	return request.get(api.tabList, param)
}

// 获取闲置物品
export const getUnused = (param, option) => {
	return request.get(api.getUnused, param)
}
