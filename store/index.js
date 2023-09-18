import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {
	user
} from './modules/index.js'


const store = new Vuex.Store({
	modules: {
		user
	},
	state: {
		storeCityName: '',
		changeCity: false
	},
	mutations: {
		changeCityName(state, name) {
			state.storeCityName = name;
			state.changeCity = true
		}
	},
	actions: {

	}
})

export default store