import request from "@/utils/request/index.js"

const api = {
	login: 'app/user/login',
	getNotice: 'app/home/getNotice',
	tabList: 'app/home/tab',
	getUnused: 'app/home/getUnused',
	getCrowd: 'app/home/getCrowd',
	getJob: 'app/job/list',
	concatJob: 'app/job/concat',
	houseList: 'app/house/list',
	addHouse: 'app/house/add',
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

// 获取附近社群
export const getCrowd = (param, option) => {
	return request.get(api.getCrowd, param)
}

// 获取兼职列表
export const getJob = (param, option) => {
	return request.get(api.getJob, param)
}

// 查询管理员联系方式
export const concatJob = (param, option) => {
	return request.get(api.concatJob, param)
}

// 查询房屋转让
export const houseList = (param, option) => {
	return request.get(api.houseList, param)
}

// 增加房屋转让
export const addHouse = (param, option) => {
	return request.post(api.addHouse, param)
}
