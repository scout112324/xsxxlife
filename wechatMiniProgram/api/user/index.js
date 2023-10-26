import request from "@/utils/request/index.js"

const api = {
	updateUser: 'app/user/update',
	addAdvice: 'app/advice/add',
}

// 更改昵称或者头像
export const updateUser = (param, option) => {
	return request.get(api.updateUser, param)
}

// 新增意见反馈
export const addAdvice = (param, option) => {
	return request.post(api.addAdvice, param)
}