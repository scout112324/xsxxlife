<template>
	<view class="collection-page">
		<view class="tabs">
			<tab :list="list" :pageType="pageType" @handleStarTab="handleStarTab"></tab>
		</view>
		<scroll-view class="list-container" :style="{'height':screenHeight}" scroll-y @scrolltolower="handleToLower">
			<block v-for="item in starListInfo" :key="item.id">
				<userItem :itemData="item" :typeStar="type"></userItem>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import tab from "@/components/tab.vue"
	import userItem from "@/components/user_item.vue"
	import {
		starList
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
				starListInfo: [],
				pageType: 'star',
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
			this.getStarList()
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.refresh()
		},
		methods: {
			// 下拉刷新
			refresh() {
				this.pageNum = 1
				this.starListInfo = []
				this.hasMore = true
				setTimeout(() => {
					this.getStarList();
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
					starList(params).then(res => {
						if (res.code == 200) {
							if (res.data.length === 0) {
								this.pageNum -= 1
								this.hasMore = false
								uni.showToast({
									title: "没有数据了",
									icon: "none"
								});
							}
							this.starListInfo = this.starListInfo.concat(res.data)
						}
					})
				}
			},
			// tab切换
			handleStarTab(item) {
				this.type = item.index
				this.pageNum = 1
				this.hasMore = true
				this.starListInfo = []
				this.getStarList()
			},
			// 获取收藏列表
			getStarList() {
				let params = {
					type: this.type,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				starList(params).then(res => {
					if (res.code === 200) {
						this.starListInfo = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collection-page {
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
	}
</style>