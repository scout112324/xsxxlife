import request from "@/utils/request/index.js"

const api = {
	addUnused: 'app/unused/add',
	updateUnused: 'app/unused/update',
	listUnused: 'app/unused/list',
	freeUnused: 'app/unused/list/free'
}

// 增加闲置物品
export const addUnused = (param, option) => {
	return request.post(api.addUnused, param)
}

// 编辑闲置物品
export const updateUnused = (param, option) => {
	return request.post(api.updateUnused, param)
}

// 获取闲置物品
export const listUnused = (param, option) => {
	return request.get(api.listUnused, param)
}

// 查询闲置物品免费
export const freeUnused = (param, option) => {
	return request.get(api.freeUnused, param)
}