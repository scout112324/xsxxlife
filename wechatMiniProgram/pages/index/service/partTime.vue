<template>
	<view class="part-time-page">
		<u-navbar title="兼职入口" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="part-time-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm">
			</uni-easyinput>
		</view>
		<view class="part-time-list" :style="{'height':screenHeight}">
			<partTimeItem @jumpPartTimeDetail="jumpPartTimeDetail"></partTimeItem>
			<partTimeItem></partTimeItem>
			<partTimeItem></partTimeItem>
			<partTimeItem></partTimeItem>
			<partTimeItem></partTimeItem>
			<partTimeItem></partTimeItem>
		</view>
		<view class="publish">
			<u-button icon="plus-circle-fill" text="发布兼职" @click="handlePublishClick"></u-button>
		</view>
	</view>
</template>

<script>
	import partTimeItem from "./components/partTimeItem.vue"
	export default {
		options: {
			styleIsolation: 'shared',
		},
		components: {
			partTimeItem
		},
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight * 2 - 380 + 'rpx'
			// console.log(this.screenHeight)
		},
		data() {
			return {
				keyword: "",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				screenHeight: 0
			}
		},
		methods: {
			// 搜索
			handleConfirm() {},
			handleBack() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			handlePublishClick() {
				uni.navigateTo({
					url: "/pages/index/service/modules/partTimePublish/partTimePublish"
				})
			},
			jumpPartTimeDetail() {
				uni.navigateTo({
					url: "/pages/index/service/modules/partTimeDetail/partTimeDetail"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.part-time-page {
		background-color: #F3F6F5;
		height: 100vh;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.part-time-container {
			background-color: #F3F6F5;
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

		.part-time-list {
			background-color: #F3F6F5;
			margin: 20rpx 15rpx 15rpx 15rpx;
			overflow-y: auto;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;
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