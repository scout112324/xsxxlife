import request from "@/utils/request/index.js"

const api = {
	login: 'app/user/login',
	getNotice: 'app/home/getNotice'
}

// 登录
export const login = (param, option) => {
	return request.get(api.login, param)
}

// 获取公告
export const getNotice = (param, option) => {
	return request.get(api.getNotice, param)
}