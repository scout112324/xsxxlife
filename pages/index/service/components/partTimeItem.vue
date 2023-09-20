<template>
	<view class="part-time-item">
		<view class="header">
			<view class="name">
				罗森便利店店员-总部大厦店
			</view>
			<view class="price">
				3000-6000/月
			</view>
		</view>
		<view class="address">
			<image class="icon" src="../../../../static/home/dingwei.png" mode=""></image>
			<text class="address-name">上海市静安区</text>
		</view>
		<view class="tags">
			<uni-tag text="周结" style="margin-right: 10rpx;" />
			<uni-tag text="工作轻松" />
		</view>
		<view class="footer">
			<view class="user">
				<image class="avatar"
					src="https://www.qqkw.com/d/file/p/2018/07-10/7e27b761d63caa38080a0dbca04a8a11.jpg" mode=""></image>
				<view class="nickname">
					热量计算器
				</view>
			</view>
			<view class="right">
				<button class="add">立即报名</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		options: {
			styleIsolation: 'shared', // 解除样式隔离
		},
		data() {
			return {
				value: 100
			}
		}
	}
</script>

<style lang="scss" scoped>
	.part-time-item {
		height: 282rpx;
		background-color: #ffffff;
		border-radius: 24rpx;
		margin-bottom: 20rpx;
		padding: 30rpx 30rpx 22rpx 30rpx;
		box-sizing: border-box;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 45rpx;

			.name {
				color: #232624;
			}

			.price {
				color: #D30303;
			}
		}

		.address {
			margin: 15rpx 0;

			.icon {
				width: 23rpx;
				height: 26rpx;
				margin-right: 7rpx;
			}

			.address-name {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #4D504F;
				line-height: 40rpx;
			}
		}

		.tags {
			display: flex;
			align-items: center;
			margin: 15rpx 0;

			::v-deep .uni-tag {
				border-radius: 8rpx;
				border: 1rpx solid #FFD100;
				background-color: #FFF6CE;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #855C15;
			}
		}

		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.user {
				display: flex;
				align-items: center;

				.avatar {
					width: 44rpx;
					height: 43rpx;
					border-radius: 22rpx;
					margin-right: 16rpx;
				}

				.nickname {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #232624;
				}
			}

			.right {
				::v-deep .add {
					width: 168rpx;
					height: 63rpx;
					background: #FFD100;
					border-radius: 32rpx;

					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #232624;
					line-height: 63rpx;
					padding: 0;
				}
			}
		}
	}
</style>