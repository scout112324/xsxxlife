import request from "@/utils/request/index.js"

const api = {
	addUnused: 'app/unused/add',
	listUnused: 'app/unused/list',
}

// 增加闲置物品
export const addUnused = (param, option) => {
	return request.post(api.addUnused, param)
}

// 获取闲置物品
export const listUnused = (param, option) => {
	return request.get(api.listUnused, param)
}