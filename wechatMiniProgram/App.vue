<script>
	import {
		getArea
	} from "@/api/common.js"
	import store from '@/store/index.js';
	export default {
		onLaunch: function() {
			// 初始化应用
		},
		onShow: function() {
			// 应用显示时的逻辑
		},
		onHide: function() {
			// 应用隐藏时的逻辑
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
	@import "./app.scss";
</style>