import request from "@/utils/request/index.js"

const api = {
	addUnused: 'app/unused/add',
}

// 获取闲置物品
export const addUnused = (param, option) => {
	return request.post(api.addUnused, param)
}