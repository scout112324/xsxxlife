<template>
	<view class="collection-page">
		<view class="tabs">
			<u-tabs :list="list1" @click="click" lineWidth="41" lineColor="#FFD100" :activeStyle="{
				            color: '#232624',
				            fontWeight: 'bold',
				            transform: 'scale(1.05)'
				        }" :inactiveStyle="{
				            color: '#949494',
				            transform: 'scale(1)'
				        }" itemStyle="padding-left: 28rpx; padding-right: 28rpx; height: 88rpx;"></u-tabs>
		</view>

	</view>
</template>

<script>
	export default {
		options: {
			styleIsolation: 'shared',
		},
		data() {
			return {
				list1: [{
					name: '闲置',
				}, {
					name: '资讯',
				}, {
					name: '兼职'
				}, {
					name: '寻人寻物'
				}, {
					name: '大件清运'
				}, {
					name: '房屋转让'
				}, {
					name: '闲置交易'
				}, {
					name: '同城活动'
				}, {
					name: '闲置专区'
				}]
			}
		},
		methods: {
			click(item) {
				console.log('item', item);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collection-page {
		background-color: #F3F6F5;

		.tabs {
			margin-bottom: 20rpx;
			::v-deep .u-tabs {
				background-color: #ffffff;
			}
		}
	}
</style>