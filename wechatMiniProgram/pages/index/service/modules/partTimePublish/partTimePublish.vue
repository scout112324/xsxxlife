<template>
	<view class="part-time-publish">
		<view class="content">
			<image class="load" src="../../../../../static/home/load.png" mode=""></image>
			<view class="title">
				请联系管理员后进行发布
			</view>
			<view class="communicate">
				<image class="icon" src="../../../../../static/home/dianhua.png" mode=""></image>
				<view class="number">
					888-888-8888
				</view>
				<view class="btn">
					<button class="tel-call">呼叫</button>
				</view>
			</view>
			<view class="communicate">
				<image class="icon" src="../../../../../static/home/weixin.png" mode=""></image>
				<view class="number">
					888-888-8888
				</view>
				<view class="btn">
					<button class="tel-call">复制</button>
				</view>
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

		}
	}
</script>

<style lang="scss" scoped>
	.part-time-publish {
		background-color: #F3F6F5;
		height: 100vh;
		padding-top: 270rpx;
		font-family: PingFangSC-Regular, PingFang SC;

		.content {
			display: flex;
			flex-direction: column;
			align-items: center;

			.load {
				width: 320rpx;
				height: 254rpx;
			}

			.title {
				font-size: 28rpx;
				font-weight: 400;
				color: #4D504F;
				margin-top: 16rpx;
			}

			.communicate {
				display: flex;
				align-items: center;
				margin: 21rpx 0 43rpx 0;

				.icon {
					width: 42rpx;
					height: 42rpx;
				}

				.number {
					font-size: 34rpx;
					font-weight: 600;
					color: #232624;
					margin: 0 16rpx;
				}

				.btn {
					::v-deep .tel-call {
						&::after {
							border: none
						}

						width: 138rpx;
						height: 48rpx;
						background: #FFD100;
						border-radius: 40rpx;
						line-height: 48rpx;

						padding: 0;
						margin: 0;
						font-size: 26rpx;
						font-weight: 400;
						color: #232624;
					}
				}
			}
		}
	}
</style>