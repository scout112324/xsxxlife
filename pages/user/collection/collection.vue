<template>
	<view class="collection-page">
		<view class="tabs">
			<tab></tab>
		</view>
		<view class="list-container">
			<userItem></userItem>
			<userItem></userItem>
			<userItem></userItem>
			<userItem></userItem>
			<userItem></userItem>
			<userItem></userItem>
			<userItem></userItem>
			<userItem></userItem>
			<userItem></userItem>
			<userItem></userItem>
		</view>
	</view>
</template>

<script>
	import tab from "@/components/tab.vue"
	import userItem from "@/components/user_item.vue"
	export default {
		components: {
			tab,
			userItem
		},
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

	}
</script>

<style lang="scss" scoped>
	.collection-page {
		background-color: #F3F6F5;

		.tabs {
			background-color: #ffffff;
			margin-bottom: 20rpx;

		}

		.list-container {
			background-color: #ffffff;
			padding: 32rpx 28rpx;


		}
	}
</style>