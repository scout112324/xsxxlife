<template>
	<view class="community-page">
		<u-navbar title="附近社群" :bgColor="bgColor" leftIcon="" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left"></view>
		</u-navbar>
		<view class="community-container">
			<view class="community-list">
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
			</view>
		</view>
	</view>
</template>

<script>
	import communityItem from "@/components/community_item.vue"
	export default {
		components: {
			communityItem
		},
		data() {
			return {
				bgColor: "#FBE94E",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.community-page {
	background-color: #F3F6F5;
	.community-container {
		height: 92rpx;
		background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		box-sizing: border-box;
		.community-list {
			margin: 0rpx 15rpx;
			height: 1150rpx;
			overflow-y: auto;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;
			padding: 10rpx 20rpx;
		}
	}
}
</style>
