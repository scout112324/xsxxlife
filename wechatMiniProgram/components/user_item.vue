<template>
	<view class="user-item">
		<image class="image" src="../../../static/chat/avatar.png" mode=""></image>
		<view class="content">
			<view class="title">
				出闲置全新Apple/IPhone15一台,出闲置全新Apple/IPhone15一台。
			</view>
			<view class="price">
				<text class="unit">¥</text>
				<text>279000</text>
			</view>
			<view class="footer">
				<view class="left">
					<image class="avatar" src="../../../static/chat/avatar.png" mode=""></image>
					<view class="nickname">
						热量计算器
					</view>
				</view>
				<view class="btn">
					<button class="add">联系TA</button>
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
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.user-item {
		display: flex;
		margin-bottom: 32rpx;

		.image {
			width: 188rpx;
			height: 188rpx;
			border-radius: 10rpx;

			margin-right: 21rpx;
		}

		.content {
			flex: 1;
			font-family: PingFangSC-Regular, PingFang SC;

			.title {
				font-size: 28rpx;
				font-weight: 400;
				color: #232624;
				width: 456rpx;

				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.price {
				margin: 20rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #D30303;

				.unit {
					font-size: 20rpx;
				}
			}

			.footer {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					display: flex;
					align-items: center;

					.avatar {
						width: 36rpx;
						height: 36rpx;
						border-radius: 18rpx;
						margin-right: 9rpx;
					}

					.nickname {
						font-size: 22rpx;
						font-weight: 500;
						color: #4D504F;
					}
				}

				.btn {
					::v-deep .add {
						width: 126rpx;
						height: 58rpx;
						background: #FFD100;
						border-radius: 29rpx;

						padding: 0;
						font-size: 25rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #4D504F;
					}
				}
			}
		}
	}
</style>