import request from "@/utils/request/index.js"

const api = {
	updateUser: 'app/user/update',
}

// 更改昵称或者头像
export const updateUser = (param, option) => {
	return request.get(api.login, param)
}
