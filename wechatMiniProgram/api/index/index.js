import request from "@/utils/request/index.js"

const api = {
	login: 'app/user/login',
}

// 登录
export const login = (param, option) => {
	return request.get(api.login, param)
}