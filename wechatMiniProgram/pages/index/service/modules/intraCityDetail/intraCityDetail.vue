<template>
	<view class="detail-page">
		<view class="activity-info">
			<view class="leaflet"></view>
			<view class="content">
				<view class="title">
					全民唱歌挑战赛全民唱歌挑战赛活动
				</view>
				<view class="item">
					<view class="circle circle1"></view>
					<view class="type">
						报名截止时间: 2023年9月18日
					</view>
				</view>
				<view class="item">
					<view class="circle circle2"></view>
					<view class="type">
						发布地点: 上海市静安区
					</view>
				</view>
				<view class="item">
					<view class="circle circle3"></view>
					<view class="type">
						活动开始时间: 2023年9月25日
					</view>
				</view>
				<view class="item">
					<view class="circle circle4"></view>
					<view class="type">
						活动地点: 上海市奉贤区金海公路3800号龙湖上海奉贤天街F2
					</view>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="title">
				活动详情
			</view>
			<view class="content">
				1.参赛选手按指定时间和地点提前10分钟签到,比赛正式开始后未签到的则视为自动弃权;
				2.参赛选手按抽签号顺序上场演唱;
				3.每位参赛选手演唱一首歌曲,唱法不限;
				4.演唱开始后,参赛选手不得要求中途中止演唱,演唱结束后不得要求重新演唱;
			</view>
			<view class="product-image">
				<image class="image"
					src="https://tse1-mm.cn.bing.net/th/id/OIP-C.PutJRYbN20MeTUKQCLFAZQHaHa?pid=ImgDet&rs=1" mode="">
				</image>
			</view>
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
			</view>
		</view>
		<view class="comments">
			<comment></comment>
		</view>
		<view class="footer">
			<view class="btns">
				<view class="item">
					<image class="icon" src="../../../../../static/components/zhuanfa.png" mode=""></image>
					<view class="num">
						999
					</view>
				</view>
				<view class="item">
					<image class="icon" src="../../../../../static/components/shoucang_set.png" mode=""></image>
					<view class="num">
						999
					</view>
				</view>
				<view class="item">
					<image class="icon" src="../../../../../static/components/pinglun.png" mode=""></image>
					<view class="num">
						999
					</view>
				</view>
			</view>
			<view class="communicate">
				<u-button text="立即报名" @click="handleCommuniteClick"></u-button>
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
			handleCommuniteClick() {}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-page {
		background-color: #F3F6F5;
		font-family: PingFangSC-Medium, PingFang SC;

		.activity-info {
			margin-bottom: 20rpx;

			.leaflet {
				height: 306rpx;
				background: #D8D8D8;
			}

			.content {
				background: #FFFFFF;
				border-radius: 35rpx 35rpx 0rpx 0rpx;
				box-sizing: border-box;
				padding: 44rpx 35rpx;
				margin-top: -35rpx;


				.title {
					font-size: 40rpx;
					font-weight: 500;
					color: #232624;
				}

				.item {
					display: flex;
					align-items: center;
					font-size: 26rpx;
					font-weight: 400;
					color: #4D504F;
					line-height: 42rpx;
					margin: 18rpx 0;

					.circle {
						width: 10rpx;
						height: 10rpx;
						border-radius: 10rpx;
						margin-right: 12rpx;
					}

					.circle1 {
						background: #D30303;
					}

					.circle2 {
						background: #008CC2;
					}

					.circle3 {
						background: #FFD100;
					}

					.circle4 {
						background: #2ABD6F;
					}
				}

			}
		}

		.container {
			background-color: #ffffff;
			padding: 46rpx 30rpx 20rpx 30rpx;

			.title {
				font-size: 40rpx;
				font-weight: 500;
				color: #232624;
			}

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