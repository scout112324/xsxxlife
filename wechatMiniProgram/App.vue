<script>
	import {
		getArea
	} from "@/api/common.js"
	export default {
		onLaunch: function() {

		},
		onShow: function() {
			// 获取位置信息
			uni.authorize({
				scope: 'scope.userLocation',
				success() {
					uni.getLocation({
						type: 'gcj02',
						success(res) {
							uni.setStorageSync('latitude', res.latitude);
							uni.setStorageSync('longitude', res.longitude);
							let option = {
								latitude: res.latitude,
								longitude: res.longitude
							}
							getArea(option).then(res => {
								if (res.statusCode === 200) {
									uni.setStorageSync('province', res.data.result
										.addressComponent.province);
									uni.setStorageSync('district', res.data.result
										.addressComponent.district);
								}
							})
						},
						fail(e) {
							// empty
						}
					})
				}
			})
		},
		onHide: function() {

		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
	@import "./app.scss";
</style>