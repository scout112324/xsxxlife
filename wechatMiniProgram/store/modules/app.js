import {
  PLATFORM
} from '@/store/mutation-types'
import storage from '@/utils/storage'


const app = {
  state: {
    // 当前终端平台
    platform: '',
	province: '', //省份
	district: '', // 市区
	defaultAreas: [], // 默认定位的地区数据
  }, 

  mutations: {
    SET_PLATFORM: (state, value) => {
      state.platform = value
    },
	SET_PROVINCE: (state, value) => {
	  state.province = value
	},
	SET_DISTRICT: (state, value) => {
	  state.district = value
	},
	SET_DEFAULTAREAS: (state, value) => {
	  state.defaultAreas = value
	},
  },

  actions: {

  }
}

export default app
