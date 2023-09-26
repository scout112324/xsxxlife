<template>
	<view class="service-page" :style="{'height':screenHeight}">
		<view class="occupy"></view>
		<view class="content-page">
			<view class="notice">
				<u-notice-bar :text="text"></u-notice-bar>
			</view>
			<view class="service">
				<view class="item" v-for="item in serviceData" :key="item.id" @click="handleClickService(item.name)">
					<image class="icon" :src="item.icon" mode=""></image>
					<view class="title">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="others">
			没有想要的类目？试试<text class="communicate">联系我们</text>
		</view>
	</view>
</template>

<script>
	export default {
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight*2 - 100+'rpx'
		},
		data() {
			return {
				screenHeight: 0,
				text: "发布闲置后支持线上线下交易啦～",
				serviceData: [{
						id: 1,
						name: "通下水道",
						icon: "../../../static/home/tongxiashuidao.png"
					},
					{
						id: 2,
						name: "家电维修",
						icon: "../../../static/home/jiadianweixiu.png"
					},
					{
						id: 3,
						name: "大件清运",
						icon: "../../../static/home/dajianqingyun.png"
					},
					{
						id: 4,
						name: "维修水电",
						icon: "../../../static/home/weixiushuidian.png"
					},
					{
						id: 5,
						name: "防水漏水",
						icon: "../../../static/home/fangshuiloushui.png"
					},
					{
						id: 6,
						name: "开锁",
						icon: "../../../static/home/lock.png"
					},
				],
			}
		},
		methods: {
			handleClickService(name) {
				uni.navigateTo({
					url: "/pages/index/service/modules/serviceDetail/serviceDetail"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.service-page {
		background-color: #F3F6F5;

		.occupy {
			height: 50rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			margin-top: -50rpx;
			background-color: #F1F1F2;
			padding: 24rpx 15rpx;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
		}

		.content-page {
			margin-top: -50rpx;
			background-color: #F1F1F2;
			padding: 24rpx 15rpx;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;

			.notice {
				display: flex;
				align-items: center;
				height: 64rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 16rpx;

				::v-deep .u-notice-bar {
					background: #FFFFFF !important;
					box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
					border-radius: 16rpx;

					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #855C15;
				}
			}

			.service {
				display: flex;
				flex-shrink: 1;
				flex-wrap: wrap;
				align-items: center;
				margin: 20rpx 0;
				height: 348rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 25%;

					.icon {
						width: 68rpx;
						height: 60rpx;
						margin-bottom: 17rpx;
					}
				}
			}
		}
		
		.others {
			text-align: center;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #4D504F;
			.communicate {
				color: #3B8DDA;
				border-bottom: 1px solid #3B8DDA;
			}
		}
	}
</style>