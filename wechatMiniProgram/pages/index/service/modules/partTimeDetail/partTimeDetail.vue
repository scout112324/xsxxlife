<template>
	<view class="detail-page">
		<view class="container">
			<view class="title">
				日结无印良品店员上海-长期兼职/包吃包住/可短期做一个月
			</view>
			<view class="tags">
				<uni-tag text="日结" style="margin-right: 10rpx;" />
				<uni-tag text="有责任心" />
			</view>
			<view class="price">
				<text class="num">25元/小时</text>
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
				<view class="share">
					<view class="item" style="margin-right: 20rpx;">
						<image class="icon" src="../../../../../static/home/weixin.png" mode=""></image>
						<text class="title">微信联系</text>
					</view>
					<view class="item">
						<image class="icon" src="../../../../../static/home/dianhua.png" mode=""></image>
						<text class="title">电话联系</text>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="title">
					职位详情
				</view>
				<view class="condition">
					【工作内容】
					1.收银公族：保证每天营收数额正确；
					2.商品管理及销售：商品陈列整齐，数量正确、来货验收、商品销售；
					3.卖场管理：保证卖场干净整洁、防盗防损；
					4.顾客服务：保证顾客满意度，提升顾客回头率

					【薪资待遇】
					1.25元/小时，日结70%，周结30%
					2.入职即购买商业保险；
					3.节假日按照国家法定三倍薪资支付

					【工作时间】
					早班9点-14点，晚班14点到22点，轮休，每周6天；

					【用工要求】
					1.男女不限，18-40岁，身高155-178cm；
					2.有服务意识
				</view>
			</view>
		</view>
		<view class="person-info">
			<view class="address">
				工作地址
			</view>
			<view class="info-item">
				<image class="icon" src="../../../../../static/home/dingwei.png" mode=""></image>
				<view class="item">
					上海市奉贤区金海公路3800号龙湖上海奉贤天街F2
				</view>
			</view>
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
			</view>
			<view class="communicate">
				<u-button text="立即报名" @click="handleCommuniteClick"></u-button>
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
			handleCommuniteClick() {}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-page {
		background-color: #F3F6F5;
		font-family: PingFangSC-Regular, PingFang SC;

		.container {
			background-color: #ffffff;
			padding: 46rpx 30rpx 20rpx 30rpx;

			.title {
				font-size: 40rpx;
				font-weight: 500;
				color: #232624;
			}

			.tags {
				display: flex;
				align-items: center;
				margin: 36rpx 0;

				::v-deep .uni-tag {
					border-radius: 8rpx;
					border: 1rpx solid #FFD100;
					background-color: #FFF6CE;
					font-size: 24rpx;
					font-weight: 400;
					color: #855C15;
				}
			}

			.price {
				font-size: 40rpx;
				font-weight: 600;
				color: #D30303;
				margin-bottom: 36rpx;
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
							font-weight: 500;
							color: #232624;
							line-height: 42rpx;
						}

						.address {
							margin-top: 6rpx;
							font-size: 24rpx;
							font-weight: 400;
							color: #707070;
							line-height: 33rpx;
						}
					}

				}

				.share {
					display: flex;
					align-items: center;

					.item {
						display: flex;
						flex-direction: column;
						align-items: center;

						.icon {
							width: 56rpx;
							height: 56rpx;
						}

						.title {
							font-size: 24rpx;
							font-weight: 400;
							color: #707070;
							margin-top: 10rpx;
						}
					}
				}
			}


			.content {


				.title {
					font-size: 40rpx;
					font-weight: 500;
					color: #232624;
					margin: 36rpx 0;
				}

				.condition {
					font-size: 28rpx;
					font-weight: 400;
					color: #4D504F;
					line-height: 44rpx;
				}
			}
		}

		.person-info {
			height: 208rpx;
			background: #FFFFFF;
			margin-top: 24rpx;
			padding: 36rpx 31rpx;
			box-sizing: border-box;

			.address {
				font-size: 40rpx;
				font-weight: 500;
				color: #232624;
				line-height: 56rpx;
			}

			.info-item {
				display: flex;
				align-items: center;
				margin: 36rpx 0;
				line-height: 44rpx;

				.icon {
					width: 30rpx;
					height: 31rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #4D504F;
					margin-right: 7rpx;
				}
			}
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
						font-weight: 500;
						color: #232624;
						line-height: 33rpx;
					}
				}
			}

			.communicate {
				::v-deep .u-button {
					width: 416rpx;
					height: 74rpx;
					background: #FFD100;
					border-radius: 46rpx;
					border: 0 solid rgba(255, 209, 0, 0.31);
				}

				::v-deep .u-button__text {
					font-size: 30rpx;
					font-weight: 500;
					color: #232624;
				}
			}
		}
	}
</style>