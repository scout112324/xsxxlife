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
					<uni-button type="primary" class="uni-btn" @click="handleShareClick">
						<image src="../../../static/components/zhuanfa.png" mode="aspectFit"
							style="width: 25rpx; height: 25rpx;margin-right: 8rpx; ">
						</image>
						分享
					</uni-button>
				</view>
			</view>
			<view class="price">
				<text class="unit">¥</text>
				<text class="num">279000</text>
			</view>
			<view class="content">
				出闲置全新！感兴趣的朋友看过来或者在线直接联系，Apple/IPhone15一台，国行版内128G，手机无任何维修记录，没有任何划痕！
			</view>
			<view class="product-image">
				<image class="image"
					src="https://tse1-mm.cn.bing.net/th/id/OIP-C.PutJRYbN20MeTUKQCLFAZQHaHa?pid=ImgDet&rs=1" mode="">
				</image>
				<image class="image"
					src="https://tse1-mm.cn.bing.net/th/id/OIP-C.PutJRYbN20MeTUKQCLFAZQHaHa?pid=ImgDet&rs=1" mode="">
				</image>
			</view>
		</view>
		<view class="comments">
			<comment></comment>
		</view>
		<view class="footer">
			<view class="btns">
				<view class="item">
					<image class="icon" src="../../../static/components/dianzan.png" mode=""></image>
					<view class="num">
						999
					</view>
				</view>
				<view class="item">
					<image class="icon" src="../../../static/components/shoucang_set.png" mode=""></image>
					<view class="num">
						999
					</view>
				</view>
				<view class="item">
					<image class="icon" src="../../../static/components/pinglun.png" mode=""></image>
					<view class="num">
						999
					</view>
				</view>
			</view>
			<view class="communicate">
				<u-button text="立即下单" @click="handleCommuniteClick"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import comment from "@/components/comment.vue"
	export default {
		components: {
			comment
		},
		data() {
			return {

			}
		},
		methods: {
			handleShareClick() {},
			handleCommuniteClick() {}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-page {
		background-color: #F3F6F5;

		.container {
			background-color: #ffffff;
			padding: 46rpx 30rpx 20rpx 30rpx;

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
					::v-deep .uni-btn {
						height: 59rpx;
						background: #FFD100;
						border-radius: 30rpx;
					
						padding: 14rpx 25rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
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

			.content {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #232624;
				line-height: 44rpx;
				margin: 25rpx 0;
			}
			.product-image {
				display: flex;
				flex-direction: column;
				align-items: center;
				.image {
					width: 689rpx;
					height: 659rpx;
					border-radius: 10rpx;
					margin-bottom: 20rpx;
				}
			}
		}
		.comments {
			background-color: #ffffff;
		}
		.footer {
			background-color: #ffffff;
			padding: 0 34rpx;
			margin-top: 24rpx;
			height: 157rpx;
			
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #D8D8D;
			
			.btns {
				display: flex;
				align-items: center;
				.item {
					display: flex;
					align-items: center;
					margin-right: 43rpx;
					.icon {
						width: 33rpx;
						height: 35rpx;
					}
					.num {
						margin-left: 15rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #232624;
						line-height: 33rpx;
					}
				}
			}
			.communicate {
				::v-deep .u-button {
					width: 224rpx;
					height: 74rpx;
					background: #FFD100;
					border-radius: 46rpx;
					border: 0 solid rgba(255, 209, 0, 0.31);
				}
				
				::v-deep .u-button__text {
					font-size: 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #232624;
				}
			}
		}
	}
</style>