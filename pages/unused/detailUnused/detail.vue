<template>
	<view class="detail-page">
		<view class="container">
			<view class="header">
				<view class="user-info">
					<image class="avatar" src="https://tupian.qqw21.com/article/UploadPic/2021-3/202132022173036062.png"
						mode=""></image>
					<view class="info">
						<view class="nickname">
							Ketty Perry
						</view>
						<view class="address">
							上海市静安区
						</view>
					</view>
				</view>
				<view class="share">
					<u-button icon="share-square" text="分享" @click="handleShareClick"></u-button>
				</view>
			</view>
			<view class="price">
				<text class="unit">¥</text>
				<text class="num">279000</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			handleShareClick() {}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-page {
		background-color: #F3F6F5;

		.container {
			background-color: #ffffff;
			padding: 46rpx 30rpx;

			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.user-info {
					display: flex;
					align-items: center;

					.avatar {
						width: 72rpx;
						height: 72rpx;
						border-radius: 36rpx;
					}

					.info {
						margin-left: 14rpx;

						.nickname {
							font-size: 30rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #232624;
							line-height: 42rpx;
						}

						.address {
							margin-top: 6rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #707070;
							line-height: 33rpx;
						}
					}

				}

				.share {
					::v-deep .u-button {
						width: 116rpx;
						height: 59rpx;
						background: #FFD100;
						border-radius: 30rpx;
						border: 0 solid rgba(255, 209, 0, 0.31);
					}

					::v-deep .u-button__text {
						font-size: 26rpx !important;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500 !important;
						color: #232624;
					}
				}
			}

			.price {
				padding-top: 25rpx;
				font-size: 26rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #D30303;

				.num {
					font-size: 46rpx;
				}
			}
		}
	}
</style>