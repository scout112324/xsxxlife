import request from "@/utils/request/index.js"

const api = {
	setting: 'clientApi/user/setting',
}

// 获取会员设置
export const setting = (param, option) => {
	return request.get(api.setting, param)
}