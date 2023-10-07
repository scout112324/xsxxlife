<template>
	<view class="unused-page">
		<u-navbar title="闲置" leftIcon="" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left"></view>
		</u-navbar>
		<view class="unused-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm">
			</uni-easyinput>
		</view>
		<view class="unused-list" :style="{'height':screenHeight}">
			<infoItem :pageType="pageType" @handleJumpDetail="handleJumpDetail"></infoItem>
			<infoItem :pageType="pageType"></infoItem>
			<infoItem :pageType="pageType"></infoItem>
			<infoItem :pageType="pageType"></infoItem>
		</view>
		<view class="publish">
			<u-button icon="plus-circle-fill" text="发布闲置" @click="handlePublishClick"></u-button>
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
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight * 2 - 510 + 'rpx'
			console.log(this.screenHeight)
		},
		data() {
			return {
				keyword: "",
				screenHeight: 0,
				pageType: "unused",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
			}
		},
		methods: {
			// 搜索
			handleConfirm() {},
			handleJumpDetail() {
				uni.navigateTo({
					url: "/pages/unused/detailUnused/detail"
				})
			},
			handlePublishClick() {
				uni.navigateTo({
					url: "/pages/unused/addUnused/addUnused"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.unused-page {
		background-color: #F3F6F5;
		height: 100vh;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.unused-container {
			height: 110rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			box-sizing: border-box;
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
			margin: 21rpx 15rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;
			overflow-y: auto;
			padding: 10rpx 20rpx;
		}

		.publish {
			position: fixed;
			bottom: 15rpx;
			width: 100%;

			::v-deep .u-button {
				width: 280rpx;
				height: 91rpx;
				background: #FFD100;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(255, 209, 0, 0.31);
				border-radius: 46rpx;
				border: 0 solid rgba(255, 209, 0, 0.31);
			}

			::v-deep .u-button__text {
				margin-left: 6rpx;
				font-size: 30rpx !important;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #232624;
			}
		}
	}
</style>