<template>
	<view class="area-page">
		<view class="search-bar">
			<uni-icons type="back" size="22" @click="handleBack"></uni-icons>
			<uni-search-bar radius="20" @confirm="search" :focus="true" v-model="searchValue" cancelButton="none">
			</uni-search-bar>
		</view>
		<view class="address">
			<uni-indexed-list :options="list" :show-select="false" @click="bindClick" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					letter: 'A',
					data: [
						'阿克苏机场',
						'阿拉山口机场',
						'阿勒泰机场',
						'阿里昆莎机场',
						'安庆天柱山机场',
						'澳门国际机场'
					]
				}, {
					letter: 'B',
					data: [
						'保山机场',
						'包头机场',
						'北海福成机场',
						'北京南苑机场',
						'北京首都国际机场'
					]
				}, {
					letter: 'C',
					data: [
						'长白山机场',
						'长春龙嘉国际机场',
						'常德桃花源机场',
						'昌都邦达机场',
						'长沙黄花国际机场',
						'长治王村机场',
						'常州奔牛机场',
						'成都双流国际机场',
						'赤峰机场'
					]
				}, {
					letter: 'D',
					data: [
						'大理机场',
						'大连周水子国际机场',
						'大庆萨尔图机场',
						'大同东王庄机场',
						'达州河市机场',
						'丹东浪头机场',
						'德宏芒市机场',
						'迪庆香格里拉机场',
						'东营机场',
						'敦煌机场'
					]
				}],
			}
		},
		methods: {
			handleBack() {
				uni.navigateBack()
			},
			bindClick(e) {
				uni.switchTab({
					url: `/pages/index/index`
				});
				this.$store.commit('changeCityName', e.item.name);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.area-page {
		.search-bar {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 100rpx;
		}

		::v-deep .uni-searchbar {
			width: 100%;
		}

		::v-deep .uni-indexed-list {
			margin-top: 100rpx;
		}
	}
</style>