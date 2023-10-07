<template>
	<view class="publish-page">
		<u-navbar title="我的发布" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="publish-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm">
			</uni-easyinput>
		</view>
		<view class="tabs">
			<tab></tab>
		</view>
		<view class="list-container">
			<view class="list-item">
				<image class="image" src="../../../static/chat/avatar.png" mode=""></image>
				<view class="content">
					<view class="title">
						出闲置全新Apple/IPhone15一台,出闲置全新Apple/IPhone15一台。出闲置全新Apple/IPhone15一台,出闲置全新Apple/IPhone15一台。
					</view>
					<view class="footer">
						<view class="price">
							<text class="unit">¥</text>
							<text>279000</text>
						</view>
						<view class="btn">
							<button class="edit">编辑</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tab from "@/components/tab.vue"
	export default {
		components: {
			tab
		},
		data() {
			return {
				keyword: "",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
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
		}
	}
</script>

<style lang="scss" scoped>
	.publish-page {
		background-color: #F3F6F5;
		height: 100vh;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.publish-container {
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
			margin-bottom: 20rpx;
		}

		.list-container {
			background-color: #ffffff;
			padding: 32rpx 28rpx 30rpx 28rpx;

			.list-item {
				display: flex;

				.image {
					width: 158rpx;
					height: 158rpx;
					border-radius: 10rpx;

					margin-right: 21rpx;
				}

				.content {
					flex: 1;
					font-family: PingFangSC-Regular, PingFang SC;

					.title {
						font-size: 28rpx;
						font-weight: 400;
						color: #232624;
						width: 521rpx;

						text-overflow: ellipsis;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 3; //第几行
						-webkit-box-orient: vertical;
					}



					.footer {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.price {
							// margin: 20rpx;
							font-size: 30rpx;
							font-weight: 500;
							color: #D30303;

							.unit {
								font-size: 20rpx;
							}
						}

						.btn {
							::v-deep .edit {
								&::after {
									border: none
								}

								width: 126rpx;
								height: 58rpx;
								line-height: 58rpx;
								background: #FFFFFF;
								border-radius: 29rpx;
								border: 2rpx solid #D8D8D8;

								padding: 0;
								font-size: 25rpx;
								font-family: PingFangSC-Regular,
								PingFang SC;
								font-weight: 400;
								color: #4D504F;
							}
						}
					}
				}
			}
		}
	}
</style>