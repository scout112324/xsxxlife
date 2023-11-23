<template>
	<view class="publish-page">
		<u-navbar title="我的发布" :titleStyle="titleStyle" placeholder>
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
			<tab :list="list" :pageType="pageType" @handlePublishTab="handlePublishTab"></tab>
		</view>
		<scroll-view v-if="publishListInfo.length>0" class="list-container" :style="{'height':screenHeight}" scroll-y
			@scrolltolower="handleToLower">
			<block v-for="item in publishListInfo" :key="item.id">
				<publishItem :itemData="type===100 ? Object.values(item)[0] : item"
					:type="type===100 ? Object.keys(item)[0] : type" @handleDataChange="handleDataChange"></publishItem>
			</block>
		</scroll-view>
		<view class="occupy" v-else>
			<image class="occupy-image" src="../../../static/occupy.png" mode=""></image>
			<text>暂无数据~~</text>
		</view>
	</view>
</template>

<script>
	import tab from "@/components/tab.vue"
	import {
		myPublic
	} from "@/api/user/index.js"
	import publishItem from "@/components/publish_item.vue"
	export default {
		components: {
			tab,
			publishItem
		},
		data() {
			return {
				keyword: "",
				screenHeight: 0,
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
				type: 100,
				pageNum: 1,
				pageSize: 10,
				publishListInfo: [],
				pageType: "publish",
				list: [{
						name: '全部'
					}, {
						name: '兼职'
					}, {
						name: '房屋转让'
					}, {
						name: '寻人寻物'
					}, {
						name: '闲置交易'
					}, {
						name: '同城活动'
					},
					{
						name: '大件清运'
					}
				],
				msgType: 'info',
				hasMore: true
			}
		},
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight * 2 - 400 + 'rpx'
		},
		onShow() {
			this.getMyPublic()
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.refresh()
		},
		methods: {
			// 下拉刷新
			refresh() {
				this.pageNum = 1
				this.publishListInfo = []
				this.hasMore = true
				setTimeout(() => {
					this.getMyPublic();
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
					myPublic(params).then(res => {
						if (res.code == 200) {
							if (res.data.length === 0) {
								this.pageNum -= 1
								this.hasMore = false
								uni.showToast({
									title: "没有数据了",
									icon: "none"
								});
							}
							this.publishListInfo = this.publishListInfo.concat(res.data)
						}
					})
				}
			},
			handlePublishTab(item) {
				if (item.index > 0) {
					this.type = item.index - 1
				} else {
					this.type = 100
				}
				this.pageNum = 1
				this.hasMore = true
				this.publishListInfo = []
				this.getMyPublic()
			},
			getMyPublic() {
				let params = {
					search: this.keyword,
					type: this.type,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				myPublic(params).then(res => {
					if (res.code === 200) {
						this.publishListInfo = res.data
					}
				})
			},
			// 搜索
			handleConfirm() {
				this.getMyPublic()
			},
			handleBack() {
				uni.switchTab({
					url: "/pages/user/index"
				})
			},
			handleDataChange() {
				this.getMyPublic()
			}
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
			width: auto;
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