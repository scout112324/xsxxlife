<template>
	<view class="trading-page">
		<u-navbar title="交易记录" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="publish-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm">
			</uni-easyinput>
		</view>
		<view class="tabs">
			<u-tabs :list="list" @click="click" lineWidth="41" lineColor="#FFD100" :activeStyle="{
				            color: '#232624',
				            fontWeight: 'bold',
				            transform: 'scale(1.05)'
				        }" :inactiveStyle="{
				            color: '#949494',
				            transform: 'scale(1)'
				        }" itemStyle="padding-left: 28rpx; padding-right: 28rpx; height: 88rpx;"></u-tabs>
		</view>
		<view class="list-container">
			<view class="list-item">
				<view class="header">
					<image class="avatar" src="../../../static/chat/avatar.png" mode=""></image>
					<view class="content">
						出闲置全新！感兴趣的朋友看过来…
					</view>
					<view class="status">
						交易成功
					</view>
				</view>
				<view class="container">
					<image class="logo" src="../../../static/chat/avatar.png" mode=""></image>
					<view class="info">
						<text class="time">
							下单时间：2023年9月23日
						</text>
						<text class="price">
							总价：279000
						</text>
					</view>
				</view>
				<view class="footer">
					<button class="communicate">联系卖家</button>
					<button class="delete">删除订单</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				list: [{
					name: '全部',
				}, {
					name: '待付款'
				}, {
					name: '已付款',
				}, {
					name: '已卖出'
				}]
			}
		},
		methods: {
			// 搜索
			handleConfirm() {},
			handleBack() {
				uni.switchTab({
					url: "/pages/user/index"
				})
			},
			click() {}
		}
	}
</script>

<style lang="scss" scoped>
	.trading-page {
		background-color: #F3F6F5;
		height: 100vh;
		font-family: PingFangSC-Regular, PingFang SC;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.publish-container {
			background-color: #F3F6F5;
			height: 110rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
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

		.tabs {
			background-color: #ffffff;

			/deep/ .u-tabs__wrapper__nav {
				justify-content: space-around;
			}

			/deep/ .u-tabs__wrapper__nav__line {
				left: 0;
			}

			/deep/ .u-tabs__wrapper__nav__item {
				flex: 1;
			}
		}

		.list-container {
			background-color: #F3F6F5;
			margin: 20rpx 15rpx 15rpx 15rpx;
			overflow-y: auto;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;

			.list-item {
				height: 315rpx;
				background-color: #ffffff;
				border-radius: 24rpx;
				margin-bottom: 20rpx;
				padding: 30rpx 30rpx 22rpx 30rpx;
				box-sizing: border-box;

				.header {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.avatar {
						width: 45rpx;
						height: 45rpx;
						border-radius: 22rpx;
					}

					.content {
						width: 480rpx;
						font-size: 30rpx;
						font-weight: 500;
						color: #232624;

						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.status {
						height: 37rpx;
						font-size: 26rpx;

						font-weight: 400;
						color: #707070;
					}
				}

				.container {
					display: flex;
					align-items: center;
					margin: 25rpx 0;

					.logo {
						width: 107rpx;
						height: 107rpx;
						border-radius: 10rpx;
						opacity: 0.64;
						margin-right: 21rpx;
					}

					.info {
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						font-size: 28rpx;
						font-weight: 400;
						color: #707070;

						.price {
							margin-top: 20rpx;
						}
					}
				}

				.footer {
					display: flex;
					justify-content: flex-end;
					align-items: center;

					::v-deep .communicate,
					::v-deep .delete {
						&::after {
							border: none
						}

						width: 165rpx;
						height: 63rpx;
						line-height: 63rpx;
						background: #FFFFFF;
						border-radius: 31rpx;
						border: 2rpx solid #D8D8D8;

						padding: 0;
						margin: 0;
						font-size: 25rpx;
						font-weight: 400;
						color: #4D504F;
					}

					::v-deep .delete {
						margin-left: 16rpx;
					}
				}
			}
		}
	}
</style>