<template>
	<view class="my-message-page">
		<u-navbar title="消息" :bgColor="bgColor" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="message-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm">
			</uni-easyinput>
			<view class="clear">
				<image class="icon" src="../../../static/user/clear.png" mode=""></image>
				<text class="word">清除未读</text>
			</view>
		</view>
		<view class="message-list">
			<view class="message-item" @click="handleJumpChat">
				<uni-badge class="uni-badge-left-margin" :text="value" absolute="rightTop" size="small">
					<view class="left"></view>
				</uni-badge>

				<view class="center">
					<view class="name">
						上海本地社区生活圈上海本地社区生活圈上海本地社区生活圈上海本地社区生活圈
					</view>
					<view class="detail">
						哲哲小王-上海市 已加入生活圈
					</view>
				</view>
				<view class="time">
					10: 36
				</view>
			</view>
			<view class="message-item">
				<uni-badge class="uni-badge-left-margin" :text="value" absolute="rightTop" size="small">
					<view class="left"></view>
				</uni-badge>
			
				<view class="center">
					<view class="name">
						上海本地社区生活圈
					</view>
					<view class="detail">
						哲哲小王-上海市 已加入生活圈
					</view>
				</view>
				<view class="time">
					10: 36
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		options: {
			styleIsolation: 'shared',
		},
		data() {
			return {
				keyword: "",
				bgColor: "#FBE94E",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				value: 100
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
			// 点击进入在线聊天页面
			handleJumpChat() {
				uni.navigateTo({
					url: "/pages/user/chat/chat"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-message-page {
		font-family: PingFangSC-Regular, PingFang SC;
		background-color: #F3F6F5;
		height: 100vh;

		.message-container {
			background-color: #F3F6F5;
			height: 110rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			box-sizing: border-box;
			padding: 19rpx 28rpx;

			display: flex;
			justify-content: space-between;
			align-items: center;

			.clear {
				display: flex;
				align-items: center;

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-left: 20rpx;
				}

				.word {
					font-weight: 400;
					color: #4D504F;
					font-size: 30rpx;
				}
			}

			::v-deep .uni-easyinput {
				height: 72rpx;
				width: 517rpx;
			}

			::v-deep .is-input-border {
				border-radius: 36rpx;
			}
		}

		.message-list {
			background-color: #ffffff;
			margin: 20rpx 0;

			.message-item {
				height: 173rpx;
				margin: 0 28rpx;
				box-sizing: border-box;
				border-bottom: 2px solid rgba(216, 216, 216, 0.5);

				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					width: 96rpx;
					height: 96rpx;
					background: #DADBDC;
					border-radius: 16rpx;

				}

				.center {
					flex: 1;
					margin: 0 35rpx;

					.name {
						font-size: 30rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #232624;
						line-height: 42rpx;
						
						width: 445rpx;
						overflow: hidden; 
						text-overflow:ellipsis; 
						white-space: nowrap;
					}

					.detail {
						margin-top: 12rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #4D504F;
						line-height: 33rpx;
					}
				}

				.time {
					font-size: 26rpx;
					font-weight: 400;
					color: #C4C4C4;
				}
			}
		}
	}
</style>