<template>
	<view class="detail-page">
		<view class="container">
			<view class="title">
				{{noticeData.title}}
			</view>
			<view class="content" v-html="noticeData.content"></view>
		</view>
	</view>
</template>

<script>
	import {
		articleTo
	} from '@/api/index/index.js'
	export default {
		data() {
			return {
				noticeData: {}
			}
		},
		onShow() {
			this.getArticleTo()
		},
		methods: {
			// 公告跳转页面内容（小程序）
			getArticleTo() {
				articleTo().then(res => {
					if (res.code === 200) {
						this.noticeData = res.data
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.detail-page {
	background-color: #F3F6F5;
	font-family: PingFangSC-Medium, PingFang SC;
	.container {
		background-color: #ffffff;
		padding: 32rpx 30rpx 20rpx 30rpx;
		
		.title {
			font-size: 38rpx;
			font-weight: bold;
			color: #000000;
			margin-bottom: 32rpx;
		}
		
		.content {
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #232624;
			line-height: 44rpx;
			margin: 25rpx 0;
			min-height: 650rpx;
		}
	}
}
</style>
