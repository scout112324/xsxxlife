<template>
	<view class="service-page" :style="{'height':screenHeight}">
		<u-navbar title="综合服务" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="occupy"></view>
		<view class="content-page">
			<view class="notice">
				<u-notice-bar :text="text" :step="true" @click="handleClickNotice"></u-notice-bar>
			</view>
			<view class="service">
				<view class="item" v-for="item in serviceData" :key="item.id" @click="handleClickService(item)">
					<image class="icon" :src="item.url" mode=""></image>
					<view class="title">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="others">
			没有想要的类目？试试
			<button class="btn-contact" open-type="contact" style="margin: 0;">
				<text class="communicate">联系我们</text>
			</button>

		</view>
	</view>
</template>

<script>
	import {
		intservHome,
		getNotice
	} from "@/api/index/index.js"
	export default {
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight * 2 - 100 + 'rpx'
		},
		data() {
			return {
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				screenHeight: 0,
				text: [],
				newText: [],
				serviceData: [],
			}
		},
		onShow() {
			this.getIntservHome()
			// 获取公告数据
			this.getNoticeData()
		},
		methods: {
			// 获取公告
			getNoticeData() {
				getNotice().then(res => {
					if (res.code === 200) {
						this.newText = res.data
						this.text = res.data.map(item => {
							return item.content
						})
					}
				})
			},
			handleClickNotice(item) {
				if (this.newText[item].url == null) {
					return
				} else {
					console.log('handleClickNotice', item, this.newText[item])
					uni.navigateTo({
						url: `${this.newText[item].url}`,
						fail(err) {
							console.log(err)
						}
					})
				}
			},
			getIntservHome() {
				intservHome().then(res => {
					if (res.code === 200) {
						this.serviceData = res.data
					}
				})
			},
			handleClickService(item) {
				uni.navigateTo({
					url: `${item.iconTo}?itemData=${encodeURIComponent(JSON.stringify(item))}`
				})
			},
			handleBack() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.service-page {
		background-color: #F3F6F5;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.occupy {
			height: 50rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			margin-top: -50rpx;
			background-color: #F1F1F2;
			padding: 24rpx 15rpx;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
		}

		.content-page {
			margin-top: -50rpx;
			background-color: #F1F1F2;
			padding: 24rpx 15rpx;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;

			.notice {
				display: flex;
				align-items: center;
				height: 64rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 16rpx;

				::v-deep .u-notice-bar {
					background: #FFFFFF !important;
					box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
					border-radius: 16rpx;

					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #855C15;
				}
			}

			.service {
				display: flex;
				flex-shrink: 1;
				flex-wrap: wrap;
				align-items: center;
				margin: 20rpx 0;
				height: 348rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 25%;

					.icon {
						width: 68rpx;
						height: 60rpx;
						margin-bottom: 17rpx;
					}
				}
			}
		}

		.others {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #4D504F;

			.btn-contact {
				background-color: transparent;
				font-size: 28rpx;
				padding: 0;

				&::after {
					border: none
				}
			}

			.communicate {
				color: #3B8DDA;
				border-bottom: 1px solid #3B8DDA;
			}
		}
	}
</style>