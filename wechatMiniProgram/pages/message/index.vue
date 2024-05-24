<template>
	<view class="message-page">
		<u-navbar title="资讯" leftIcon="" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left"></view>
		</u-navbar>
		<view class="unused-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm"
				@clear="handleConfirm">
			</uni-easyinput>
		</view>
		<scroll-view v-if="messageList.length>0" class="unused-list" :style="{'height':screenHeight}" scroll-y @scrolltolower="handleToLower">

			<view class="lift-item" v-for="item in messageList" :key="item.id">
				<info-item :showPrice="showPrice" :pageType="pageType" :itemData="item"
					@messageChangeStatus="messageChangeStatus"
					@handleJumpMessageDetail="handleJumpMessageDetail(item)"></info-item>
			</view>
		</scroll-view>
		<view class="occupy" v-else>
			当前板块没有内容，敬请期待。
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
			this.screenHeight = uni.getSystemInfoSync().screenHeight * 2 - 370 + 'rpx'
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
				pageSize: 50,
				hasMore: true
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
				this.pageNum = 1
				this.bigList = []
				this.hasMore = true
				setTimeout(() => {
					this.getMessageList();
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
					listArticle(params).then(res => {
						if (res.code == 200) {
							if (res.data.length === 0) {
								this.pageNum -= 1
								this.hasMore = false
								uni.showToast({
									title: "没有数据了",
									icon: "none"
								});
							}
							this.messageList = this.messageList.concat(res.data)
						}
					})
				}
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
			width: auto;

			.lift-item:not(:last-child) {
				border-bottom: 20rpx solid #EEF1F0;
			}
		}
		
		.occupy {
			text-align: center;
			height: 100%;
			margin-top: 300rpx;
					
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #4D504F;
		}
	}
</style>