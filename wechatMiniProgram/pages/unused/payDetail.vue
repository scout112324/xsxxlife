<template>
	<view class="container p-bottom">

		<view class="confirm-container">
			<view class="flow-all-list">
				<text class="flex-five">商品信息</text>
			</view>
			<view class="content">
				<view class="product-image" v-if="pictureList && pictureList.length>0">
					<image
						v-if="imgType.includes(pictureList[0].substr(pictureList[0].lastIndexOf('.') + 1, pictureList[0].length).toLowerCase())"
						class="image" :src="pictureList[0]" mode="">
					</image>
					<video v-else class="image" :src="pictureList[0]" controls></video>
				</view>
				<view v-else class="product-image">
					<image class="image" src="../../static/home/load.png" mode=""></image>
				</view>
				<view class="price">
					<text class="unit">¥</text>
					<text class="num">{{payInfoMore.price || '暂无'}}</text>
				</view>
			</view>
		</view>

		<!-- 支付方式 -->
		<view class="pay-method flow-all-money b-f m-top20">
			<view class="flow-all-list">
				<text class="flex-five">支付方式</text>
			</view>
			<!-- 微信支付 -->
			<view class="pay-item">
				<view class="item-left">
					<image class="icon" src="../../static/wxpay.png" mode=""></image>
					<view class="item-left_text">
						微信支付
					</view>
				</view>
				<view class="item-right">
					<image class="icon" src="../../static/success.png" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 提交订单 -->
		<view class="flow-fixed-footer">
			<view class="chackout-box">
				<view class="chackout-left pl-12">
					<view class="col-amount-do">支付金额：
						<text class="pay-amount">￥{{ payInfoMore.price || 0 }}</text>
					</view>
				</view>
				<view class="chackout-right" @click="doSubmitOrder()">
					<view class="flow-btn f-32" :class="{ disabled }">确认支付</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		wxPayment,
		toPayWx
	} from "@/api/common.js"
	export default {
		data() {
			return {
				payInfoMore: {},
				pictureList: [],
				imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
			}
		},
		onLoad(options) {
			this.payInfoMore = JSON.parse(decodeURIComponent(options.payInfoMore))
			this.pictureList = this.payInfoMore.picture ? this.payInfoMore.picture.split(',') : []
			console.log('payInfoMore', this.payInfoMore)
		},
		methods: {
			doSubmitOrder() {
				toPayWx({
					orderId: this.payInfoMore.orderId
				}).then(res => {
					if (res.code === 200) {
						let payment = res.data
						wxPayment(payment)
							.then(res => {
								uni.showToast({
									title: '支付成功',
									icon: 'success',
									duration: 2000
								})
								uni.navigateTo({
									url: "/pages/user/trading/trading"
								})
							})
							.catch(err => {
								console.log('支付失败')
							})
							.finally(() => {
								// app.disabled = false
								// app.navToOrderResult(result.data.orderInfo.id, '')
							})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.confirm-container {
		padding: 0 30rpx;

		.flow-all-list {
			font-size: 28rpx;
			padding: 20rpx 0;
			border-bottom: 1rpx solid rgb(248, 248, 248);
		}

		.content {
			margin-top: 20rpx;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.image {
				width: 120rpx;
				height: 120rpx;
				border-radius: 10rpx;
			}

			.price {
				font-size: 26rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #D30303;
				margin-left: 30rpx;

				.num {
					font-size: 46rpx;
				}
			}
		}
	}


	/* 支付方式 */
	.pay-method {

		.pay-item {
			padding: 20rpx 0;
			font-size: 28rpx;
			border-bottom: 1rpx solid rgb(248, 248, 248);

			display: flex;
			align-items: center;
			justify-content: space-between;

			.icon {
				width: 40rpx;
				height: 40rpx;
			}

			.item-left {
				display: flex;
				align-items: center;

				.item-left_text {
					margin-left: 20rpx;
				}
			}
		}
	}


	// 底部操作栏
	.flow-fixed-footer {
		position: fixed;
		bottom: var(--window-bottom);
		width: 100%;
		background: #fff;
		border-top: 1px solid #eee;
		z-index: 11;
		padding-top: 8rpx;

		.chackout-box {
			display: flex;
			align-items: center;
		}

		.chackout-left {
			font-size: 28rpx;
			height: 98rpx;
			color: #777;
			flex: 4;
			padding-left: 12px;
			text-align: right;
			padding-right: 40rpx;

			.col-amount-do {
				font-size: 35rpx;
				padding-top: 30rpx;
				height: 100%;

				.pay-amount {
					color: red;
				}
			}
		}

		.chackout-right {
			font-size: 34rpx;
			flex: 2;
		}


		// 提交按钮
		.flow-btn {
			background: #FFD100;
			color: #fff;
			text-align: center;
			height: 92rpx;
			line-height: 92rpx;
			display: block;
			font-size: 28rpx;
			border-radius: 5rpx;
			margin-right: 20rpx;

			// 禁用按钮
			&.disabled {
				background: #CCCCCC;
			}
		}
	}

	.flow-all-money {
		padding: 0 24rpx;
		color: #444;

		.flow-all-list {
			font-size: 28rpx;
			padding: 20rpx 0;
			border-bottom: 1rpx solid rgb(248, 248, 248);
		}

		.flow-all-list:last-child {
			border-bottom: none;
		}

		.flow-all-list-cont {
			font-size: 28rpx;
			padding: 10rpx 0;
		}

		.flow-arrow {
			justify-content: flex-end;
			align-items: center;
		}

	}
</style>