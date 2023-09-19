<template>
	<view class="community-item">
		<view class="left">

		</view>
		<view class="center">
			<view class="name">
				上海本地社区生活圈
			</view>
			<view class="detail">
				哲哲小王-上海市 已加入生活圈
			</view>
		</view>
		<view class="right">
			<button class="add">+加入</button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.community-item {
		height: 173rpx;
		background: #F5F5F5;
		border-radius: 24rpx;
		margin: 20rpx 0;
		padding: 28rpx 38rpx;
		box-sizing: border-box;

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
			}

			.detail {
				margin-top: 12rpx;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #4D504F;
				line-height: 33rpx;
			}
		}

		.right {
			::v-deep .add {
				width: 112rpx;
				height: 52rpx;
				background: #FFD100;
				border-radius: 26rpx;
				
				font-size: 28rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #4D504F;
				line-height: 52rpx;
				padding: 0;
			}
		}
	}
</style>