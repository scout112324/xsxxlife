<template>
	<view class="message-page">
		<u-navbar title="资讯" leftIcon="" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left"></view>
		</u-navbar>
		<view class="unused-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm">
			</uni-easyinput>
		</view>
		<view class="unused-list" :style="{'height':screenHeight}">
			<view class="lift-item" v-for="item in messageList" :key="item.id">
				<info-item :showPrice="showPrice" :pageType="pageType" :itemData="item"
					@messageChangeStatus="messageChangeStatus"
					@handleJumpMessageDetail="handleJumpMessageDetail(item)"></info-item>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		listArticle
	} from "@/api/message/index.js"
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
				pageType: "message",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				showPrice: false,
				messageList: [],
				pageNum: 1,
				pageSize: 10
			}
		},
		onLoad() {
			uni.$on('changeMessage', this.getMessageList)
		},
		onUnload() {
			uni.$off('changeMessage')
		},
		onShow() {
			this.getMessageList()
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.refresh()
		},
		methods: {
			// 下拉刷新
			refresh() {
				setTimeout(() => {
					this.getMessageList();
					// 停止下拉刷新
					uni.stopPullDownRefresh()
				}, 1000)
			},
			// 获取资讯列表
			getMessageList() {
				let params = {
					search: this.keyword,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				listArticle(params).then(res => {
					if (res.code == 200) {
						this.messageList = res.data
					}
				})
			},
			// 搜索
			handleConfirm() {
				this.getMessageList()
			},
			// 点赞,收藏状态改变
			messageChangeStatus() {
				this.getMessageList()
			},
			handleJumpMessageDetail(item) {
				uni.navigateTo({
					url: `/pages/message/detailMessage/detail?itemData=${encodeURIComponent(JSON.stringify(item))
			}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.message-page {
		background-color: #F3F6F5;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.unused-container {
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

		.unused-list {
			margin: 20rpx 15rpx;
			height: 1497rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;
			overflow-y: auto;
			padding: 10rpx 20rpx;
		}
	}
</style>