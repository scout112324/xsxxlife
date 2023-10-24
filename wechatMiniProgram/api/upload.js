import {apiUrl} from '@/config.js'

// 文件上传
export const uploadFiles = () => {
	return {url:apiUrl + `app/user/upload`}
}
