<template>
	<view class="upvote-page">
		<view class="tabs">
			<tab :list="list" :pageType="pageType" @handleSupportTab="handleSupportTab"></tab>
		</view>
		<scroll-view v-if="supportListInfo.length>0" class="list-container" :style="{'height':screenHeight}" scroll-y
			@scrolltolower="handleToLower">
			<block v-for="item in supportListInfo" :key="item.id">
				<userItem :itemData="item" :typeStar="type"></userItem>
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
	import userItem from "@/components/user_item.vue"
	import {
		supportList
	} from "@/api/user/index.js"

	export default {
		components: {
			tab,
			userItem
		},
		options: {
			styleIsolation: 'shared',
		},
		data() {
			return {
				type: 0,
				pageNum: 1,
				pageSize: 10,
				supportListInfo: [],
				pageType: 'support',
				list: [{
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
					},
					{
						name: '资讯',
					}
				],
				hasMore: true,
				screenHeight: 0,
			}
		},
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight * 2 - 300 + 'rpx'
		},
		onShow() {
			this.getSupportList()
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.refresh()
		},
		methods: {
			// 下拉刷新
			refresh() {
				this.pageNum = 1
				this.supportListInfo = []
				this.hasMore = true
				setTimeout(() => {
					this.getSupportList();
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
					supportList(params).then(res => {
						if (res.code == 200) {
							if (res.data.length === 0) {
								this.pageNum -= 1
								this.hasMore = false
								uni.showToast({
									title: "没有数据了",
									icon: "none"
								});
							}
							this.supportListInfo = this.supportListInfo.concat(res.data)
						}
					})
				}
			},
			handleSupportTab(item) {
				this.type = item.index
				this.pageNum = 1
				this.hasMore = true
				this.supportListInfo = []
				this.getSupportList()
			},
			// 获取点赞列表
			getSupportList() {
				let params = {
					type: this.type,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				supportList(params).then(res => {
					if (res.code === 200) {
						this.supportListInfo = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upvote-page {
		background-color: #F3F6F5;

		.tabs {
			background-color: #ffffff;
			margin-bottom: 20rpx;

		}

		.list-container {
			background-color: #ffffff;
			padding: 32rpx 28rpx;
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