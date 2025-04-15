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
		unusedAdd: false,
		unusedEdit: false,
		houseTransferAdd: false,
		houseTransferEdit: false,
		lookForPeopleAdd: false,
		lookForPeopleEdit: false,
		intraCityAdd: false,
		intraCityEdit: false,
		largeShipmentAdd: false,
		largeShipmentEdit: false,
		orderSuccess: false
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
		UNUSED_ADD_SUCCESS: (state, value) => {
			state.unusedAdd = value
		},
		UNUSED_EDIT_SUCCESS: (state, value) => {
			state.unusedEdit = value
		},
		HOUSETRANSFER_ADD_SUCCESS: (state, value) => {
			state.houseTransferAdd = value
		},
		HOUSETRANSFER_EDIT_SUCCESS: (state, value) => {
			state.houseTransferEdit = value
		},
		LOOKFORPEOPLE_ADD_SUCCESS: (state, value) => {
			state.lookForPeopleAdd = value
		},
		LOOKFORPEOPLE_EDIT_SUCCESS: (state, value) => {
			state.lookForPeopleEdit = value
		},
		INTRACITY_ADD_SUCCESS: (state, value) => {
			state.intraCityAdd = value
		},
		INTRACITY_EDIT_SUCCESS: (state, value) => {
			state.intraCityEdit = value
		},
		LARGESHIPMENT_ADD_SUCCESS: (state, value) => {
			state.largeShipmentAdd = value
		},
		LARGESHIPMENT_EDIT_SUCCESS: (state, value) => {
			state.largeShipmentEdit = value
		},
		ORDER_SUCCESS: (state, value) => {
			state.orderSuccess = value
		},

	},

	actions: {

	}
}

export default app