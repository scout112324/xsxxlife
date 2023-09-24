<template>
	<view class="activity-page">
		<u-navbar title="我的活动" :bgColor="bgColor" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="activity-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm">
			</uni-easyinput>
		</view>
		<view class="tabs">
			<u-tabs :list="list" @click="click" lineWidth="41" lineColor="#FFD100" :activeStyle="{
				            color: '#232624',
				            fontWeight: 'bold',
				            transform: 'scale(1.05)'
				        }" :inactiveStyle="{
				            color: '#949494',
				            transform: 'scale(1)'
				        }" itemStyle="padding-left: 28rpx; padding-right: 28rpx; height: 88rpx;"></u-tabs>
		</view>
		<view class="activity-list">
			<view class="activity-item">
				<view class="leaflet">

				</view>
				<view class="content">
					<view class="title">
						全民唱歌挑战赛全民唱歌挑战赛活动
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
				<view class="footer">
					<image class="avatar" src="../../../static/chat/avatar.png" mode=""></image>
					<text class="nickname">热量计算器</text>
					<uni-tag text="发布者" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		options: {
			styleIsolation: 'shared',
		},
		data() {
			return {
				keyword: "",
				bgColor: "#FBE94E",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				list: [{
					name: '已开始',
				}, {
					name: '未开始'
				}]
			}
		},
		methods: {
			// 搜索
			handleConfirm() {},
			handleBack() {
				uni.switchTab({
					url: "/pages/user/index"
				})
			},
			click() {}
		}
	}
</script>

<style lang="scss" scoped>
	.activity-page {
		background-color: #F3F6F5;
		height: 100vh;

		.activity-container {
			background-color: #F3F6F5;
			height: 110rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
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

		.tabs {
			background-color: #ffffff;

			/deep/ .u-tabs__wrapper__nav {
				justify-content: space-around;
			}

			/deep/ .u-tabs__wrapper__nav__line {
				left: 0;
			}

			/deep/ .u-tabs__wrapper__nav__item {
				flex: 1;
			}

		}

		.activity-list {
			background-color: #F3F6F5;
			margin: 20rpx 15rpx 15rpx 15rpx;
			overflow-y: auto;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;

			.activity-item {
				height: 636rpx;
				background-color: #ffffff;
				border-radius: 24rpx;
				margin-bottom: 20rpx;
				box-sizing: border-box;

				.leaflet {
					height: 294rpx;
					background: #D8D8D8;
					border-radius: 20rpx 20rpx 0rpx 0rpx;
				}

				.content {
					box-sizing: border-box;
					margin: 20rpx 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					border-bottom: 2px solid rgba(216, 216, 216, 0.5);

					.title {
						font-size: 30rpx;
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

						.circle3 {
							background: #FFD100;
						}

						.circle4 {
							background: #2ABD6F;
						}
					}

				}

				.footer {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					margin: 0 30rpx;

					.avatar {
						width: 45rpx;
						height: 45rpx;
						border-radius: 22rpx;
					}

					.nickname {
						margin: 0 8rpx 0 18rpx;
						font-size: 30rpx;
						font-weight: 500;
						color: #232624;
					}

					::v-deep .uni-tag {
						height: 43rpx;
						border-radius: 8rpx;
						border: 1rpx solid #FFD100;
						background-color: #FFF6CE;
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #855C15;
					}
				}
			}
		}
	}
</style>