import request from "@/utils/request/index.js"

const api = {
	listArticle: 'app/article/list',
}

// 获取资讯物品
export const listArticle = (param, option) => {
	return request.get(api.listArticle, param)
}