<template>
	<view class="part-time-page">
		<u-navbar title="兼职入口" :bgColor="bgColor" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="part-time-container"></view>
		<view class="part-time-list" :style="{'height':screenHeight}">
			<partTimeItem></partTimeItem>
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
		components: {
			partTimeItem
		},
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight*2-250+'rpx'
			// console.log(this.screenHeight)
		},
		data() {
			return {
				bgColor: "#FBE94E",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				screenHeight: 0
			}
		},
		methods: {
			handleBack() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			handlePublishClick() {}
		}
	}
</script>

<style lang="scss" scoped>
	.part-time-page {
		background-color: #F3F6F5;
		height: 100vh;

		.part-time-container {
			background-color: #F3F6F5;
			height: 92rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			border-bottom-left-radius: 30rpx;
			border-bottom-right-radius: 30rpx;
			box-sizing: border-box;
		}

		.part-time-list {
			background-color: #F3F6F5;
			margin: -92rpx 15rpx 15rpx 15rpx;
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