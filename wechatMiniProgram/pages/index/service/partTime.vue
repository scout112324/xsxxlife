<template>
	<view class="part-time-page">
		<u-navbar title="兼职入口" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="part-time-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm"
				@clear="handleConfirm">
			</uni-easyinput>
		</view>
		<scroll-view class="part-time-list" :style="{'height':screenHeight}" scroll-y @scrolltolower="handleToLower">

			<view class="lift-item" v-for="item in jobList" :key="item.id">
				<partTimeItem :itemData="item" @jobChangeStatus="jobChangeStatus"
					@jumpPartTimeDetail="jumpPartTimeDetail(item)"></partTimeItem>
			</view>
		</scroll-view>
		<view class="publish">
			<u-button icon="plus-circle-fill" text="发布兼职" @click="handlePublishClick"></u-button>
		</view>
	</view>
</template>

<script>
	import partTimeItem from "./components/partTimeItem.vue"
	import {
		getJob
	} from "@/api/index/index.js"
	export default {
		options: {
			styleIsolation: 'shared',
		},
		components: {
			partTimeItem
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
				jobList: [],
				hasMore: true
			}
		},
		onLoad() {
			uni.$on('changeJobList', this.getJobList)
		},
		onUnload() {
			uni.$off('changeJobList')
		},
		onShow() {
			this.getJobList()
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.refresh()
		},
		methods: {
			// 下拉刷新
			refresh() {
				this.pageNum = 1
				this.jobList = []
				this.hasMore = true
				setTimeout(() => {
					this.getJobList();
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
					getJob(params).then(res => {
						if (res.code == 200) {
							if (res.data.length === 0) {
								this.pageNum -= 1
								this.hasMore = false
								uni.showToast({
									title: "没有数据了",
									icon: "none"
								});
							}
							this.jobList = this.jobList.concat(res.data)
						}
					})
				}
			},
			// 获取兼职列表
			getJobList() {
				let params = {
					search: this.keyword,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				getJob(params).then(res => {
					if (res.code === 200) {
						this.jobList = res.data
					}
				})
			},
			// 搜索
			handleConfirm() {
				this.getJobList()
			},
			// 点赞,收藏状态改变
			jobChangeStatus() {
				this.getJobList()
			},
			handleBack() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			handlePublishClick() {
				uni.navigateTo({
					url: "/pages/index/service/modules/partTimePublish/partTimePublish"
				})
			},
			jumpPartTimeDetail(item) {
				uni.navigateTo({
					url: `/pages/index/service/modules/partTimeDetail/partTimeDetail?itemData=${encodeURIComponent(JSON.stringify(item))}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.part-time-page {
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