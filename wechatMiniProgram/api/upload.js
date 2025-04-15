import {apiUrl} from '@/config.js'

// 单文件上传
export const uploadFiles = () => {
	return {url: apiUrl + `app/user/upload`}
}

// 批量文件上传
export const uploadBatchFiles = () => {
	return {url: apiUrl + `app/user/uploadBatch`}
}
