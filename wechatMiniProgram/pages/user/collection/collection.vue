<template>
	<view class="collection-page">
		<view class="tabs">
			<tab @handleStarTab="handleStarTab"></tab>
		</view>
		<view class="list-container">
			<block v-for="item in starListInfo" :key="item.id">
				<userItem :itemData="item" :typeStar="type"></userItem>
			</block>
		</view>
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
				starListInfo: []
			}
		},
		onShow() {
			this.getStarList()
		},
		methods: {
			// tab切换
			handleStarTab(item) {
				this.type = item.index
				this.getStarList()
				console.log('item', this.type);
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
						console.log(res.data)
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


		}
	}
</style>