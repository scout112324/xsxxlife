<template>
	<view class="message-page">
		<u-navbar title="资讯" :bgColor="bgColor" leftIcon="" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left"></view>
		</u-navbar>
		<view class="unused-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm">
			</uni-easyinput>
		</view>
		<view class="unused-list">
			<infoItem :pageType="pageType" @handleJumpMessageDetail="handleJumpMessageDetail" :showPrice="showPrice">
			</infoItem>
			<infoItem :pageType="pageType" :showPrice="showPrice"></infoItem>
			<infoItem :pageType="pageType" :showPrice="showPrice"></infoItem>
			<infoItem :pageType="pageType" :showPrice="showPrice"></infoItem>
		</view>
	</view>
</template>

<script>
	import infoItem from "@/components/info_item.vue"
	export default {
		options: {
			styleIsolation: 'shared',
		},
		components: {
			infoItem
		},
		data() {
			return {
				keyword: "",
				pageType: "message",
				bgColor: "#FBE94E",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				showPrice: false
			}
		},
		methods: {
			// 搜索
			handleConfirm() {},
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
			height: 110rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			// border-bottom-left-radius: 30rpx;
			// border-bottom-right-radius: 30rpx;
			box-sizing: border-box;
			padding: 19rpx 0;

			::v-deep .uni-easyinput {
				height: 72rpx;
				width: 694rpx;
				margin: 0 28rpx;

			}

			::v-deep .is-input-border {
				border-radius: 36rpx;
			}
		}

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
</style>