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
	updateHouse: '/app/house/update',
	findList: 'app/find/list',
	addFind: 'app/find/add',
	updateFind: '/app/find/update',
	bigList: 'app/big/list',
	addBig: 'app/big/add',
	updateBig: 'app/big/update',
	activityList: 'app/activity/list',
	addActivity: 'app/activity/add',
	updateActivity: 'app/activity/update',
	entryActivity: 'app/activity/entry',
	intservInfoHome: 'app/home/intservInfo',
	intservHome: 'app/home/intserv',
	placeUser: 'app/user/place',
	articleTo: 'app/articleTo/select',
	homeUrl: 'app/home/url',
	cancelEntry: 'app/activity/cancelEntry'
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

// 编辑房屋转让
export const updateHouse = (param, option) => {
	return request.post(api.updateHouse, param)
}

// 查询寻人寻物列表
export const findList = (param, option) => {
	return request.get(api.findList, param)
}

// 增加寻人寻物
export const addFind = (param, option) => {
	return request.post(api.addFind, param)
}

// 编辑寻人寻物
export const updateFind = (param, option) => {
	return request.post(api.updateFind, param)
}

// 获取大件清运列表
export const bigList = (param, option) => {
	return request.get(api.bigList, param)
}

// 增加大件清运
export const addBig = (param, option) => {
	return request.post(api.addBig, param)
}

// 编辑大件清运
export const updateBig = (param, option) => {
	return request.post(api.updateBig, param)
}

// 查询同城活动
export const activityList = (param, option) => {
	return request.get(api.activityList, param)
}

// 增加同城活动
export const addActivity = (param, option) => {
	return request.post(api.addActivity, param)
}

// 编辑同城活动
export const updateActivity = (param, option) => {
	return request.post(api.updateActivity, param)
}

// 取消报名同城活动
export const cancelEntry = (param, option) => {
	return request.get(api.cancelEntry, param)
}

// 报名同城活动
export const entryActivity = (param, option) => {
	return request.get(api.entryActivity, param)
}

// 获取综合服务信息
export const intservInfoHome = (param, option) => {
	return request.get(api.intservInfoHome, param)
}

// 获取综合服务的icon
export const intservHome = (param, option) => {
	return request.get(api.intservHome, param)
}

// 更改用户的地址
export const placeUser = (param, option) => {
	return request.get(api.placeUser, param)
}

// 公告跳转页面内容（小程序）
export const articleTo = (param, option) => {
	return request.post(api.articleTo, param)
}

// 查询首页跳转地址跟图片地址
export const homeUrl = (param, option) => {
	return request.get(api.homeUrl, param)
}