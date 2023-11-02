<template>
	<view class="upvote-page">
		<view class="tabs">
			<tab :pageType="pageType" @handleSupportTab="handleSupportTab"></tab>
		</view>
		<view class="list-container">
			<block v-for="item in supportListInfo" :key="item.id">
				<userItem :itemData="item" :typeStar="type"></userItem>
			</block>
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
				pageType: 'support'
			}
		},
		onShow() {
			this.getSupportList()
		},
		methods: {
			handleSupportTab(item) {
				this.type = item.index
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
		}
	}
</style>