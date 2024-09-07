<template>
	<view class="trading-page">
		<u-navbar title="交易记录" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="publish-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm"
				@clear="handleConfirm">
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
		<scroll-view v-if="tradingList.length>0" class="list-container" :style="{'height':screenHeight}" scroll-y
			@scrolltolower="handleToLower">
			<block v-for="item in tradingList" :key="item.id">
				<view class="list-item" @click="handleDetailClick(item)">
					<view class="red-circle" v-if="!!item.showMsg"></view>
					<view class="header">
						<image v-if="item.photo" class="avatar" src="../../../static/avatar.png" mode=""></image>
						<image v-else class="avatar" src="../../../static/avatar.png" mode=""></image>
						<view class="content">
							{{item.content}}
						</view>
						<view class="status" v-if="type!==2 && type!==3 && item.payStatus==0">
							待支付
						</view>
						<view class="status" v-if="type!==2 && type!==3 && item.payStatus==1">
							已支付
						</view>
						<view class="status" v-if="type!==2 && type!==3 && item.payStatus==2">
							待收货
						</view>
						<view class="status" v-if="type!==2 && type!==3 && item.payStatus==3">
							已收货
						</view>
						<view class="status" v-if="type!==2 && type!==3 && item.payStatus==4">
							已退款
						</view>
						<view class="status" v-if="type===2">
							<text v-if="item.payStatus===1">已支付</text>
							<text v-if="item.payStatus===2">待收货</text>
							<text v-if="item.payStatus===3">已收货</text>
							<text v-if="item.payStatus===4">已退款</text>
						</view>
						<view class="status" v-if="type===3">
							<text class="address" @click.stop="showAddressDetail(item)">显示地址</text>
							<text v-if="item.payStatus===1">已支付</text>
							<text v-if="item.payStatus===2">已发货</text>
							<text v-if="item.payStatus===3">已收货</text>
							<text v-if="item.payStatus===4">已退款</text>
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
					<view class="footer" v-if="type!==2 && type!==3 && type!==4">
						<button class="communicate" @click.stop="handleCommuniteClick(item.userId)">联系卖家</button>
					</view>
					<view class="footer" v-if="type===2 || type===4">
						<button v-if="(item.payStatus===1 || item.payStatus===2) && item.buttonStatus===1"
							class="communicate" @click.stop="handleBuyRefundClick(item.orderId)">
							退款</button>
						<button v-if="(item.payStatus===1 || item.payStatus===2) && item.buttonStatus===2"
							class="communicate" @click.stop>
							退款中</button>
						<button v-if="(item.payStatus===1 || item.payStatus===2) && item.buttonStatus===3"
							class="communicate" @click.stop>
							已拒绝</button>
						<button v-if="item.payStatus===2 && item.buttonStatus===1" class="communicate"
							@click.stop="handleTakeDeliveryClick(item.orderId)">
							收货</button>
					</view>
					<view class="footer" v-if="type===3">
						<button v-if="item.payStatus===1 && item.buttonStatus===1" class="communicate"
							@click.stop="handleDeliveryClick(item.orderId)">发货</button>
						<button v-if="(item.payStatus===1 || item.payStatus===2) && item.buttonStatus===2"
							class="communicate" @click.stop="handleConfirmRefundClick(item.orderId)">同意退款</button>
						<button v-if="(item.payStatus===1 || item.payStatus===2) && item.buttonStatus===2"
							class="communicate" @click.stop="handleRejectRefundClick(item.orderId)">拒绝退款</button>
						<button v-if="(item.payStatus===1 || item.payStatus===2) && item.buttonStatus===3"
							class="communicate" @click.stop>已拒绝</button>
						<button v-if="item.payStatus===3" class="communicate" @click.stop>已收货</button>
						<button v-if="item.payStatus===4" class="communicate" @click.stop>已退款</button>
						<!-- <button class="communicate" @click.stop="handleRefundClick(item.orderId)">退款</button> -->
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="occupy" v-else>
			<image class="occupy-image" src="../../../static/occupy.png" mode=""></image>
			<text>暂无数据~~</text>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="提示" content="确认要退款吗？"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
		<u-modal :show="showAddress" title="收货地址" :content='addressInfo' @confirm="handleConfirmClick"></u-modal>
	</view>
</template>

<script>
	import {
		orderRecord,
		refundRecord,
		selectPlace,
		delivery,
		refund,
		agreeRefund,
		refuseRefund,
		takeDelivery,
		removeRed
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
					},
					// {
					// 	name: '待付款'
					// }, 
					{
						name: '已付款',
					}, {
						name: '已卖出'
					}, {
						name: '待收货'
					}, {
						name: '已收货'
					}, {
						name: '已退款'
					}
				],
				type: 0,
				pageNum: 1,
				pageSize: 10,
				tradingList: [],
				hasMore: true,
				screenHeight: 0,
				orderId: '',
				addressInfo: "",
				showAddress: false,
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
			// 点击收货（待收货订单列表里面——针对买家）
			handleTakeDeliveryClick(orderId) {
				let params = {
					orderId: orderId
				}
				takeDelivery(params).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: '确认收货成功',
							icon: 'success',
							duration: 2000
						})
						this.getOrderRecord()
					} else {
						let msg = res.msg
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 3000
						})
					}
				})
			},
			// 同意退款
			handleConfirmRefundClick(orderId) {
				let params = {
					orderId: orderId
				}
				agreeRefund(params).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: '同意退款成功',
							icon: 'success',
							duration: 2000
						})
						this.getOrderRecord()
					} else {
						let msg = res.msg
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 3000
						})
					}
				})
			},
			// 拒绝退款
			handleRejectRefundClick(orderId) {
				let params = {
					orderId: orderId
				}
				refuseRefund(params).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: '拒绝退款成功',
							icon: 'success',
							duration: 2000
						})
						this.getOrderRecord()
					} else {
						let msg = res.msg
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 3000
						})
					}
				})
			},
			// 退款针对买家
			handleBuyRefundClick(orderId) {
				let params = {
					orderId: orderId
				}
				refund(params).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: '申请退款成功',
							icon: 'success',
							duration: 2000
						})
						this.getOrderRecord()
					} else {
						let msg = res.msg
						uni.showToast({
							title: msg,
							icon: 'none',
							duration: 3000
						})
					}
				})
			},
			// 发货
			handleDeliveryClick(orderId) {
				let params = {
					orderId: orderId
				}
				delivery(params).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title: '发货成功',
							icon: 'success',
							duration: 2000
						})
						this.getOrderRecord()
					}
				})
			},
			handleConfirmClick() {
				this.showAddress = false
				this.addressInfo = ""
			},
			// 显示地址
			showAddressDetail(item) {
				let params = {
					orderId: item.orderId
				}
				selectPlace(params).then(res => {
					if (res.code === 200) {
						this.addressInfo = `${res.data.placeArea},${res.data.placeDetails}`
						this.showAddress = true
					}
				})
			},
			dialogClose() {
				this.$refs.alertDialog.close()
				this.orderId = ""
			},
			// 确定退款
			dialogConfirm() {
				this.$refs.alertDialog.close()
				let params = {
					orderId: this.orderId
				}
				refundRecord(params).then(res => {
					if (res.code === 200) {
						this.getOrderRecord()
						uni.showToast({
							title: '退款成功',
							icon: 'success',
							duration: 2000
						})
					}
				})
			},
			// 退款
			handleRefundClick(orderId) {
				console.log('orderId', orderId)
				this.$refs.alertDialog.open()
				this.orderId = orderId
			},
			// 联系卖家
			handleCommuniteClick(userId) {
				uni.navigateTo({
					url: `/pages/user/chat/chat?userId=${userId}`
				})
			},
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
				switch (item.name) {
					case "全部":
						this.type = 0
						break
						// case "待付款":
						// 	this.type = 1
						// 	break
					case "已付款":
						this.type = 2
						break
					case "已卖出":
						this.type = 3
						break
					case "待收货":
						this.type = 4
						break
					case "已收货":
						this.type = 5
						break
					case "已退款":
						this.type = 6
						break
				}
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
			},
			handleDetailClick(item) {
				console.log("item", item, this.type)
				let params = {
					type: this.type,
					orderId: item.orderId
				}
				removeRed(params).then(res => {
					if (res.code === 200) {
						this.$set(item, "showMsg", false)
					}
				})
				uni.navigateTo({
					url: `/pages/unused/detailUnused/detail?itemData=${encodeURIComponent(JSON.stringify(item))
				}`
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
		}

		.list-container {
			background-color: #F3F6F5;
			margin: 20rpx 15rpx 15rpx 15rpx;
			overflow-y: auto;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;
			width: auto;

			.list-item {
				position: relative;
				background-color: #ffffff;
				border-radius: 24rpx;
				margin-bottom: 20rpx;
				padding: 30rpx 30rpx 22rpx 30rpx;
				box-sizing: border-box;

				.red-circle {
					position: absolute;
					right: 20rpx;
					top: 20rpx;
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background-color: red;
				}

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
						width: 380rpx;
						font-size: 30rpx;
						font-weight: 500;
						color: #232624;

						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.status {
						flex: 1;
						height: 37rpx;
						font-size: 26rpx;

						font-weight: 400;
						color: #707070;
						display: flex;
						justify-content: flex-end;

						.address {
							margin-right: 10rpx;
						}
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
						margin-left: 10rpx !important;

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

		.occupy {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: calc(100vh - 100rpx);
			padding-top: 200rpx;
			box-sizing: border-box;

			.occupy-image {
				width: 200rpx;
				height: 200rpx;
				margin-bottom: 20rpx;
			}
		}
	}
</style>