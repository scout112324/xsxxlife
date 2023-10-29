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
					{{concatJob.phone}}
				</view>
				<view class="btn">
					<button class="tel-call" @click="handlePhoneCall(concatJob.phone)">呼叫</button>
				</view>
			</view>
			<view class="communicate">
				<image class="icon" src="../../../../../static/home/weixin.png" mode=""></image>
				<view class="number">
					{{concatJob.wx}}
				</view>
				<view class="btn">
					<uni-button type="primary" class="tel-call uni-btn" @tap="handleCopy(concatJob.wx)">
						复制
					</uni-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		concatJob
	} from "@/api/index/index.js"
	export default {
		data() {
			return {
				concatJob: {}
			}
		},
		onShow() {
			this.getConcatJob()
		},
		methods: {
			// 获取管理员信息
			getConcatJob() {
				concatJob().then(res => {
					if (res.code === 200) {
						this.concatJob = res.data
					}
				})
			},
			// 拨打电话
			handlePhoneCall(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber: phoneNumber,
					success: (e) => {
						console.log(e)
					},
					fail: (e) => {
						console.log(e)
					}
				});
			},
			// 复制
			handleCopy(value) {
				//提示模板
				uni.showModal({
					content: value, //模板中提示的内容
					confirmText: '复制内容',
					showCancel: false,
					success: () => { //点击复制内容的后调函数
						uni.setClipboardData({
							data: value, //要被复制的内容
							success: () => { //复制成功的回调函数
								uni.showToast({ //提示
									title: '复制成功'
								})
							}
						});
					}
				});
			}
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

					::v-deep .uni-btn {
						padding: 8rpx 43rpx;
					}
				}
			}
		}
	}
</style>