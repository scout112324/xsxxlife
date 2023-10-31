<template>
	<view class="container p-bottom">

		<!-- 支付方式 -->
		<view class="pay-method flow-all-money b-f m-top20">
			<view class="flow-all-list">
				<text class="flex-five">支付方式</text>
			</view>
			<!-- 微信支付 -->
			<view class="pay-item">
				<view class="item-left flex-y-center">
					<view class="item-left_icon wechat">
						<text class="iconfont icon-weixinzhifu"></text>
					</view>
					<view class="item-left_text">
						<text>微信支付</text>
					</view>
				</view>
				<view class="item-right col-m" v-if="curPayType == PayTypeEnum.WECHAT.value">
					<text class="iconfont icon-duihao"></text>
				</view>
			</view>
		</view>

		<!-- 买家留言 -->
		<view class="flow-all-money b-f m-top20">
			<view class="ipt-wrapper flow-all-list">
				<input v-model="remark" placeholder="选填：顾客留言（50字以内）"></input>
			</view>
		</view>

		<!-- 提交订单 -->
		<view class="flow-fixed-footer">
			<view class="chackout-box">
				<view class="chackout-left pl-12">
					<view class="col-amount-do">支付金额：
						<text class="pay-amount">￥{{ 100 }}</text>
					</view>
				</view>
				<view class="chackout-right" @click="doSubmitOrder(10)">
					<view class="flow-btn f-32" :class="{ disabled }">提交订单</view>
				</view>
			</view>
		</view>


		<!-- 支付方式弹窗 -->
		<u-popup v-model="showPayPopup" mode="bottom" :closeable="true">
			<view class="pay-type-popup">
				<view class="title">请选择支付方式</view>
				<view class="pop-content">
					<!-- 微信支付 -->
					<!-- #ifdef MP-WEIXIN -->
					<view class="pay-item">
						<view class="item-left flex-y-center">
							<view class="item-left_icon wechat">
								<text class="iconfont icon-weixinzhifu"></text>
							</view>
							<view class="item-left_text">
								<text>{{ PayTypeEnum.WECHAT.name }}</text>
							</view>
						</view>
					</view>
					<!-- #endif -->
					<!-- 余额支付 -->
					<view class="pay-item">
						<view class="item-left flex-y-center">
							<view class="item-left_icon balance">
								<text class="iconfont icon-qiandai"></text>
							</view>
							<view class="item-left_text">
								<text>{{ PayTypeEnum.BALANCE.name }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		wxPayment
	} from "@/api/common.js"
	export default {
		data() {
			return {
				showPayPopup: true,
				payment: {}
			}
		},
		onLoad(options) {
			this.payment = JSON.parse(decodeURIComponent(options.payment))
		},
		methods: {
			doSubmitOrder() {
				console.log(this.payment)
				wxPayment(this.payment)
					.then(res => {
						console.log('支付成功')
					})
					.catch(err => {
						console.log('支付失败')
					})
					.finally(() => {
						// app.disabled = false
						// app.navToOrderResult(result.data.orderInfo.id, '')
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 弹出层-支付方式
	.pay-type-popup {
		padding: 25rpx;

		.title {
			font-size: 30rpx;
			margin-bottom: 50rpx;
			font-weight: bold;
			text-align: center;
		}

		.pop-content {
			min-height: 140rpx;
			padding: 0 20rpx;

			.pay-item {
				padding: 30rpx;
				font-size: 30rpx;
				background: #fff;
				border: 1rpx solid #00acac;
				border-radius: 8rpx;
				color: #888;
				margin-bottom: 12rpx;
				text-align: center;

				.item-left_icon {
					margin-right: 20rpx;
					font-size: 48rpx;

					&.wechat {
						color: #00c800;
					}

					&.balance {
						color: #00acac;
					}
				}
			}
		}
	}

	// 买家留言
	.flow-all-money {
		.ipt-wrapper {
			input {
				font-size: 28rpx;
				width: 100%;
				height: 75rpx;
			}
		}
	}


	/* 支付方式 */
	.pay-method {

		.pay-item {
			padding: 20rpx 0;
			font-size: 28rpx;
			border-bottom: 1rpx solid rgb(248, 248, 248);

			.item-left_icon {
				margin-right: 20rpx;
				font-size: 32rpx;

				&.wechat {
					color: #00c800;
				}

				&.balance {
					color: #ff9700;
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