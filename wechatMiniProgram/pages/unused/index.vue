<template>
	<view class="unused-page">
		<u-navbar title="闲置" leftIcon="" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left"></view>
		</u-navbar>
		<view class="unused-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm"
				@clear="handleConfirm">
			</uni-easyinput>
		</view>
		<scroll-view class="unused-list" :style="{'height':screenHeight}" scroll-y @scrolltolower="handleToLower">
			<view class="lift-item" v-for="item in unusedList" :key="item.id">
				<info-item :pageType="pageType" :itemData="item" @unusedChangeStatus="unusedChangeStatus"
					@handleJumpDetail="handleJumpDetail(item)"></info-item>
			</view>
		</scroll-view>
		<view class="publish">
			<u-button icon="plus-circle-fill" text="发布闲置" @click="handlePublishClick"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		listUnused,
		freeUnused
	} from "@/api/unused/index.js"
	import infoItem from "@/components/info_item.vue"

	export default {
		options: {
			styleIsolation: 'shared',
		},
		components: {
			infoItem
		},
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight * 2 - 510 + 'rpx'
			console.log(this.screenHeight)
		},
		data() {
			return {
				keyword: "",
				screenHeight: 0,
				pageType: "unused",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				pageNum: 1,
				pageSize: 50,
				unusedList: [],
				hasMore: true,
				type: ""
			}
		},
		onLoad(options) {
			console.log('type', options.type)
			this.type = options.type ? options.type : ""
			uni.$on('changeUnused', this.getUnusedList)
		},
		onUnload() {
			uni.$off('changeUnused')
		},
		onShow() {
			this.getUnusedList()
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.refresh()
		},
		methods: {
			// 下拉刷新
			refresh() {
				this.pageNum = 1
				this.bigList = []
				this.hasMore = true
				setTimeout(() => {
					this.getUnusedList();
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
					if (this.type == 'free') {
						freeUnused(params).then(res => {
							if (res.code == 200) {
								if (res.data.length === 0) {
									this.pageNum -= 1
									this.hasMore = false
									uni.showToast({
										title: "没有数据了",
										icon: "none"
									});
								}
								this.unusedList = this.unusedList.concat(res.data)
							}
						})
					} else {
						listUnused(params).then(res => {
							if (res.code == 200) {
								if (res.data.length === 0) {
									this.pageNum -= 1
									this.hasMore = false
									uni.showToast({
										title: "没有数据了",
										icon: "none"
									});
								}
								this.unusedList = this.unusedList.concat(res.data)
							}
						})
					}
				}
			},
			// 获取闲置物品列表
			getUnusedList() {
				let params = {
					search: this.keyword,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				if (this.type == 'free') {
					freeUnused(params).then(res => {
						if (res.code == 200) {
							this.unusedList = res.data
						}
					})
				} else {
					listUnused(params).then(res => {
						if (res.code == 200) {
							this.unusedList = res.data
						}
					})
				}
			},
			// 搜索
			handleConfirm() {
				this.getUnusedList()
			},
			// 点赞,收藏状态改变
			unusedChangeStatus() {
				this.getUnusedList()
			},
			handleJumpDetail(item) {
				uni.navigateTo({
					url: `/pages/unused/detailUnused/detail?itemData=${encodeURIComponent(JSON.stringify(item))
			}`
				})
			},
			handlePublishClick() {
				uni.navigateTo({
					url: "/pages/unused/addUnused/addUnused"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.unused-page {
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
			margin: 21rpx 15rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;
			overflow-y: auto;
			padding: 10rpx 20rpx;
			width: auto;
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