<template>
	<view class="trading-page">
		<u-navbar title="交易记录" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="publish-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm">
			</uni-easyinput>
		</view>
		<view class="tabs">
			<u-tabs :list="list" @click="handleTabClick" lineWidth="41" lineColor="#FFD100" :activeStyle="{
				            color: '#232624',
				            fontWeight: 'bold',
				            transform: 'scale(1.05)'
				        }" :inactiveStyle="{
				            color: '#949494',
				            transform: 'scale(1)'
				        }" itemStyle="padding-left: 28rpx; padding-right: 28rpx; height: 88rpx;"></u-tabs>
		</view>
		<scroll-view class="list-container" :style="{'height':screenHeight}" scroll-y @scrolltolower="handleToLower">
			<block v-for="item in tradingList" :key="item.id">
				<view class="list-item">
					<view class="header">
						<image v-if="item.photo" class="avatar" src="../../../static/avatar.png" mode=""></image>
						<image v-else class="avatar" src="../../../static/avatar.png" mode=""></image>
						<view class="content">
							{{item.content}}
						</view>
						<view class="status">
							{{item.payStatus==0 ? '待支付' : '已支付'}}
						</view>
					</view>
					<view class="container">
						<block v-if="item.picture">
							<image
								v-if="imgType.includes(item.picture.split(',')[0].substr(item.picture.split(',')[0].lastIndexOf('.') + 1, item.picture.split(',')[0].length).toLowerCase())"
								class="logo" :src="item.picture.split(',')[0]" mode="">
							</image>
							<video v-else class="logo" :src="item.picture.split(',')[0]" controls></video>
						</block>
						<image class="logo" v-else src="../../../static/chat/avatar.png" mode=""></image>
						<view class="info">
							<text class="time">
								下单时间：{{item.createTime}}
							</text>
							<text class="price">
								总价：{{item.price}}
							</text>
						</view>
					</view>
					<view class="footer">
						<button class="communicate">联系卖家</button>
					</view>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import {
		orderRecord
	} from "@/api/user/index.js"
	export default {
		data() {
			return {
				keyword: "",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
				list: [{
					name: '全部',
				}, {
					name: '待付款'
				}, {
					name: '已付款',
				}, {
					name: '已卖出'
				}],
				type: 0,
				pageNum: 1,
				pageSize: 10,
				tradingList: [],
				hasMore: true,
				screenHeight: 0,
			}
		},
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight * 2 - 380 + 'rpx'
		},
		onShow() {
			this.getOrderRecord()
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.refresh()
		},
		methods: {
			// 下拉刷新
			refresh() {
				this.pageNum = 1
				this.tradingList = []
				this.hasMore = true
				setTimeout(() => {
					this.getOrderRecord();
					// 停止下拉刷新
					uni.stopPullDownRefresh()
				}, 100)
			},
			// 上拉加载更多
			handleToLower() {
				if (this.hasMore) {
					this.pageNum += 1
					let params = {
						search: this.keyword,
						type: this.type,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
					orderRecord(params).then(res => {
						if (res.code == 200) {
							if (res.data.length === 0) {
								this.pageNum -= 1
								this.hasMore = false
								uni.showToast({
									title: "没有数据了",
									icon: "none"
								});
							}
							this.tradingList = this.tradingList.concat(res.data)
						}
					})
				}
			},
			// 搜索
			handleConfirm() {
				this.getOrderRecord()
			},
			handleBack() {
				uni.switchTab({
					url: "/pages/user/index"
				})
			},
			handleTabClick(item) {
				this.type = item.index
				this.pageNum = 1
				this.hasMore = true
				this.tradingList = []
				this.getOrderRecord()
			},
			getOrderRecord() {
				let params = {
					search: this.keyword,
					type: this.type,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				orderRecord(params).then(res => {
					if (res.code === 200) {
						this.tradingList = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.trading-page {
		background-color: #F3F6F5;
		height: 100vh;
		font-family: PingFangSC-Regular, PingFang SC;

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

		.list-container {
			background-color: #F3F6F5;
			margin: 20rpx 15rpx 15rpx 15rpx;
			overflow-y: auto;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;
			width: auto;

			.list-item {
				height: 315rpx;
				background-color: #ffffff;
				border-radius: 24rpx;
				margin-bottom: 20rpx;
				padding: 30rpx 30rpx 22rpx 30rpx;
				box-sizing: border-box;

				.header {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.avatar {
						width: 45rpx;
						height: 45rpx;
						border-radius: 22rpx;
					}

					.content {
						width: 480rpx;
						font-size: 30rpx;
						font-weight: 500;
						color: #232624;

						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.status {
						height: 37rpx;
						font-size: 26rpx;

						font-weight: 400;
						color: #707070;
					}
				}

				.container {
					display: flex;
					align-items: center;
					margin: 25rpx 0;

					.logo {
						width: 107rpx;
						height: 107rpx;
						border-radius: 10rpx;
						opacity: 0.64;
						margin-right: 21rpx;
					}

					.info {
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						font-size: 28rpx;
						font-weight: 400;
						color: #707070;

						.price {
							margin-top: 20rpx;
						}
					}
				}

				.footer {
					display: flex;
					justify-content: flex-end;

					::v-deep .communicate {
						&::after {
							border: none
						}

						width: 165rpx;
						height: 63rpx;
						line-height: 63rpx;
						background: #FFFFFF;
						border-radius: 31rpx;
						border: 2rpx solid #D8D8D8;

						padding: 0;
						margin: 0;
						font-size: 25rpx;
						font-weight: 400;
						color: #4D504F;
					}
				}
			}
		}
	}
</style>