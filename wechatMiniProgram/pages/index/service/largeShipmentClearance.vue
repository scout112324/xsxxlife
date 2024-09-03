<template>
	<view class="large-shipment-page">
		<u-navbar title="大件清运" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="unused-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm"
				@clear="handleConfirm">
			</uni-easyinput>
		</view>
		<scroll-view class="unused-list" :style="{'height':screenHeight}" scroll-y @scrolltolower="handleToLower">

			<view class="lift-item" v-for="(item,index) in bigList" :key="item.id">
				<info-item :pageType="pageType" :itemData="item" :index="index"
					@largeShipmentTransferChangeStatus="largeShipmentTransferChangeStatus"
					@handleJumpLargeDetail="handleJumpLargeDetail(item,index)"></info-item>
			</view>
		</scroll-view>
		<view class="publish">
			<u-button icon="plus-circle-fill" text="发布" @click="handlePublishClick"></u-button>
		</view>
	</view>
</template>

<script>
	import infoItem from "@/components/info_item.vue"
	import {
		bigList
	} from "@/api/index/index.js"
	export default {
		options: {
			styleIsolation: 'shared',
		},
		components: {
			infoItem
		},
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight * 2 - 395 + 'rpx'
			// console.log(this.screenHeight)
		},
		data() {
			return {
				keyword: "",
				screenHeight: 0,
				pageType: "largeShipmentTransfer",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				pageNum: 1,
				pageSize: 50,
				bigList: [],
				hasMore: true,
				timer: null
			}
		},
		onLoad() {
			uni.$on('changeBigList', this.detailStatus)
		},
		onUnload() {
			uni.$off('changeBigList')
			clearTimeout(this.timer)
		},
		created() {
			if (!!this.$store.state.app.largeShipmentAdd) {
				uni.showToast({
					title: '发布成功',
					icon: 'success',
					duration: 2000
				})
				this.$store.commit('LARGESHIPMENT_ADD_SUCCESS', false)
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					this.refresh()
				}, 1000)
			} else if (!!this.$store.state.app.largeShipmentEdit) {
				uni.showToast({
					title: '编辑成功',
					icon: 'success',
					duration: 2000
				})
				this.$store.commit('LARGESHIPMENT_EDIT_SUCCESS', false)
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					this.refresh()
				}, 1000)
			} else {
				this.getBigList()
			}
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.refresh()
		},
		methods: {
			detailStatus(index, type, isAdd) {
				if (type === 'support') {
					if (isAdd) {
						this.$set(this.bigList[index], 'supportCount', this.bigList[index].supportCount + 1)
						this.$set(this.bigList[index], 'support', true)
					} else {
						this.$set(this.bigList[index], 'supportCount', this.bigList[index].supportCount - 1)
						this.$set(this.bigList[index], 'support', false)
					}
				} else if (type === 'star') {
					if (isAdd) {
						this.$set(this.bigList[index], 'starCount', this.bigList[index].starCount + 1)
						this.$set(this.bigList[index], 'star', true)
					} else {
						this.$set(this.bigList[index], 'starCount', this.bigList[index].starCount - 1)
						this.$set(this.bigList[index], 'star', false)
					}
				} else if (type === 'comment') {
					if (isAdd) {
						this.$set(this.bigList[index], 'commentCount', this.bigList[index].commentCount + 1)
					}
				}
			},
			// 下拉刷新
			refresh() {
				this.pageNum = 1
				this.bigList = []
				this.hasMore = true
				setTimeout(() => {
					this.getBigList();
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
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
					bigList(params).then(res => {
						if (res.code == 200) {
							if (res.data.length === 0) {
								this.pageNum -= 1
								this.hasMore = false
								uni.showToast({
									title: "没有数据了",
									icon: "none"
								});
							}
							this.bigList = this.bigList.concat(res.data)
						}
					})
				}
			},
			// 获取大件清运列表
			getBigList() {
				let params = {
					search: this.keyword,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				bigList(params).then(res => {
					if (res.code == 200) {
						this.bigList = res.data
					}
				})
			},
			// 搜索
			handleConfirm() {
				this.getBigList()
			},
			// 点赞,收藏状态改变
			largeShipmentTransferChangeStatus(index, type, isAdd) {
				if (type === 'support') {
					if (isAdd) {
						this.$set(this.bigList[index], 'supportCount', this.bigList[index].supportCount + 1)
						this.$set(this.bigList[index], 'support', true)
					} else {
						this.$set(this.bigList[index], 'supportCount', this.bigList[index].supportCount - 1)
						this.$set(this.bigList[index], 'support', false)
					}
				} else if (type === 'star') {
					if (isAdd) {
						this.$set(this.bigList[index], 'starCount', this.bigList[index].starCount + 1)
						this.$set(this.bigList[index], 'star', true)
					} else {
						this.$set(this.bigList[index], 'starCount', this.bigList[index].starCount - 1)
						this.$set(this.bigList[index], 'star', false)
					}
				}
			},
			handleBack() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			handleJumpLargeDetail(item, index) {
				uni.navigateTo({
					url: `/pages/index/service/modules/largeShipmentDetail/largeShipmentDetail?itemData=${encodeURIComponent(JSON.stringify(item))}&index=${index}`
				})
			},
			handlePublishClick() {
				uni.navigateTo({
					url: "/pages/index/service/modules/largeShipmentPublish/largeShipmentPublish"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.large-shipment-page {
		background-color: #F3F6F5;
		height: 100vh;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.unused-container {
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

		.unused-list {
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			overflow-y: auto;
			padding: 10rpx 0;
			width: auto;

			.lift-item:not(:last-child) {
				border-bottom: 20rpx solid #EEF1F0;
			}
		}

		.publish {
			position: fixed;
			bottom: 15rpx;
			width: 100%;

			::v-deep .u-button {
				width: 280rpx;
				height: 91rpx;
				background: #FFD100;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(255, 209, 0, 0.31);
				border-radius: 46rpx;
				border: 0 solid rgba(255, 209, 0, 0.31);
			}

			::v-deep .u-button__text {
				margin-left: 6rpx;
				font-size: 30rpx !important;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #232624;
			}
		}
	}
</style>