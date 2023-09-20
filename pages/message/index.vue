<template>
	<view class="message-page">
		<u-navbar title="资讯" :bgColor="bgColor" leftIcon="" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left"></view>
		</u-navbar>
		<view class="unused-container">
			<view class="unused-list">
				<infoItem :pageType="pageType" @handleJumpMessageDetail="handleJumpMessageDetail"></infoItem>
				<infoItem :pageType="pageType"></infoItem>
				<infoItem :pageType="pageType"></infoItem>
				<infoItem :pageType="pageType"></infoItem>
			</view>
		</view>
	</view>
</template>

<script>
	import infoItem from "@/components/info_item.vue"
	export default {
		components: {
			infoItem
		},
		data() {
			return {
				pageType: "message",
				bgColor: "#FBE94E",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
			}
		},
		methods: {
			handleJumpMessageDetail() {
				uni.navigateTo({
					url: "/pages/message/detailMessage/detail"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.message-page {
		background-color: #F3F6F5;

		.unused-container {
			height: 92rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			border-bottom-left-radius: 30rpx;
			border-bottom-right-radius: 30rpx;
			box-sizing: border-box;

			.unused-list {
				margin: 0rpx 15rpx;
				height: 1497rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;
				overflow-y: auto;
				padding: 10rpx 20rpx;
			}
		}
	}
</style>