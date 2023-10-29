<template>
	<view class="service-detail-page">
		<u-navbar title="综合服务" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="service-detail-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm">
			</uni-easyinput>
		</view>
		<view class="service-detail-list" v-if="serviceInfo && serviceInfo.id">
			<view class="service-detail-item">
				<view class="header">
					<view class="avatar">
						<image v-if="serviceInfo.photo" class="image" :src="serviceInfo.photo" mode=""></image>
						<image v-else class="image" src="./../../../../static/home/address.png" mode="">
						</image>
					</view>
					<view class="info">
						<view class="name">
							{{serviceInfo.name}}
						</view>
						<view class="product">
							{{serviceInfo.content}}
						</view>
					</view>
				</view>
				<view class="phone">
					<image class="icon" src="../../../../../static/home/dianhua.png" mode=""></image>
					<view class="number">
						{{serviceInfo.phone}}
					</view>
					<view class="btn">
						<button class="tel-call" @click="handlePhoneCall(serviceInfo.phone)">点击拨打</button>
					</view>
				</view>
				<view class="address">
					<image class="icon" src="../../../../../static/home/address.png" mode=""></image>
					<view class="name">
						{{serviceInfo.detailsPlace}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		intservInfoHome
	} from "@/api/index/index.js"
	export default {
		options: {
			styleIsolation: 'shared',
		},
		onLoad(options) {
			this.itemData = JSON.parse(decodeURIComponent(options.itemData))
		},
		data() {
			return {
				keyword: "",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				itemData: {},
				serviceInfo: {}
			}
		},
		onShow() {
			this.getIntservInfoHome()
		},
		methods: {
			getIntservInfoHome() {
				let params = {
					id: this.itemData.id,
					search: this.keyword
				}
				intservInfoHome(params).then(res => {
					if (res.code === 200) {
						this.serviceInfo = res.data[0]
						console.log(this.serviceInfo)
					}
				})
			},
			// 搜索
			handleConfirm() {
				this.getIntservInfoHome()
			},
			handleBack() {
				uni.navigateTo({
					url: "/pages/index/service/service"
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.service-detail-page {
		background-color: #F3F6F5;
		height: 100vh;
		font-family: PingFangSC-Regular, PingFang SC;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.service-detail-container {
			background-color: #F3F6F5;
			height: 110rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			// border-bottom-left-radius: 30rpx;
			// border-bottom-right-radius: 30rpx;
			box-sizing: border-box;
			padding: 19rpx 0;

			::v-deep .uni-easyinput {
				height: 72rpx;
				width: 694rpx;
				margin: 0 28rpx;

			}

			::v-deep .is-input-border {
				border-radius: 36rpx;
			}
		}

		.service-detail-list {
			background-color: #F3F6F5;
			margin: 20rpx 15rpx 15rpx 15rpx;
			overflow-y: auto;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;

			.service-detail-item {
				height: 377rpx;
				background-color: #ffffff;
				border-radius: 24rpx;
				margin-bottom: 20rpx;
				padding: 30rpx 30rpx 22rpx 30rpx;
				box-sizing: border-box;

				.header {
					display: flex;

					.avatar {
						margin-right: 20rpx;
						box-sizing: border-box;

						.image {
							width: 144rpx;
							height: 144rpx;
							border-radius: 10rpx;
						}
					}

					.info {

						.name {
							font-size: 32rpx;
							font-weight: 500;
							color: #232624;
							margin-bottom: 7rpx;
						}

						.product {
							font-size: 28rpx;
							font-weight: 400;
							color: #707070;
							line-height: 46rpx;
						}
					}
				}

				.phone,
				.address {
					display: flex;
					margin: 16rpx 0;

					.name,
					.number {
						font-size: 28rpx;
						font-weight: 400;
						color: #707070;
						line-height: 40rpx;
					}
				}

				.phone {
					align-items: center;

					.icon {
						width: 30rpx;
						height: 30rpx;
						margin-right: 10rpx;
					}

					.btn {
						::v-deep .tel-call {
							&::after {
								border: none
							}

							width: 144rpx;
							height: 55rpx;
							line-height: 55rpx;
							background: #FFFFFF;
							border-radius: 28rpx;
							border: 1rpx solid #855C15;

							padding: 0;
							margin: 0;
							font-size: 28rpx;
							font-weight: 400;
							color: #855C15;
							margin-left: 12rpx;
						}
					}
				}

				.address {
					.icon {
						width: 40rpx;
						height: 40rpx;
						margin-left: -5rpx;
					}
				}
			}
		}
	}
</style>