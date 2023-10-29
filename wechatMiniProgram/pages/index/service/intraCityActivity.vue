<template>
	<view class="intra-city-page">
		<u-navbar title="同城活动" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="part-time-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm">
			</uni-easyinput>
		</view>
		<scroll-view class="part-time-list" :style="{'height':screenHeight}" scroll-y @scrolltolower="handleToLower">

			<view class="lift-item" v-for="item in activityList" :key="item.id">
				<intraCityItem :itemData="item" @activityChangeStatus="activityChangeStatus"
					@jumpIntraCityDetail="jumpIntraCityDetail(item)"></intraCityItem>
			</view>
		</scroll-view>
		<view class="publish">
			<u-button icon="plus-circle-fill" text="发布" @click="handlePublishClick"></u-button>
		</view>
	</view>
</template>

<script>
	import intraCityItem from "./components/intraCityItem.vue"
	import {
		activityList
	} from "@/api/index/index.js"
	export default {
		options: {
			styleIsolation: 'shared',
		},
		components: {
			intraCityItem
		},
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight * 2 - 380 + 'rpx'
			// console.log(this.screenHeight)
		},
		data() {
			return {
				keyword: "",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				screenHeight: 0,
				pageNum: 1,
				pageSize: 50,
				activityList: [],
				hasMore: true
			}
		},
		onLoad() {
			uni.$on('changeActivityList', this.getActivityList)
		},
		onUnload() {
			uni.$off('changeActivityList')
		},
		onShow() {
			this.getActivityList()
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.refresh()
		},
		methods: {
			// 下拉刷新
			refresh() {
				this.pageNum = 1
				this.activityList = []
				this.hasMore = true
				setTimeout(() => {
					this.getActivityList();
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
					activityList(params).then(res => {
						if (res.code == 200) {
							if (res.data.length === 0) {
								this.pageNum -= 1
								this.hasMore = false
								uni.showToast({
									title: "没有数据了",
									icon: "none"
								});
							}
							this.activityList = this.activityList.concat(res.data)
						}
					})
				}
			},
			// 获取大件清运列表
			getActivityList() {
				let params = {
					search: this.keyword,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				activityList(params).then(res => {
					if (res.code == 200) {
						this.activityList = res.data
					}
				})
			},
			// 搜索
			handleConfirm() {
				this.getActivityList()
			},
			// 点赞,收藏状态改变
			activityChangeStatus() {
				this.getActivityList()
			},
			handleBack() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			handlePublishClick() {
				uni.navigateTo({
					url: "/pages/index/service/modules/intraCityPublish/intraCityPublish"
				})
			},
			jumpIntraCityDetail(item) {
				uni.navigateTo({
					url: `/pages/index/service/modules/intraCityDetail/intraCityDetail?itemData=${encodeURIComponent(JSON.stringify(item))}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.intra-city-page {
		background-color: #F3F6F5;
		height: 100vh;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.part-time-container {
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

		.part-time-list {
			background-color: #F3F6F5;
			margin: 20rpx 15rpx 15rpx 15rpx;
			overflow-y: auto;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;
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