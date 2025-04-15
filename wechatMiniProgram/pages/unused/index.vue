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
		<scroll-view v-if="unusedList && unusedList.length>0" class="unused-list" :style="{'height':screenHeight}"
			scroll-y @scrolltolower="handleToLower">
			<view class="lift-item" v-for="(item,index) in unusedList" :key="item.id">
				<info-item :pageType="pageType" :itemData="item" :index="index" @unusedChangeStatus="unusedChangeStatus"
					@handleJumpDetail="handleJumpDetail(item,index)"></info-item>
			</view>
		</scroll-view>
		<view class="occupy" v-else>
			当前区域没有内容，请发布内容或切换区域。
		</view>
		<view class="publish">
			<u-button icon="plus-circle-fill" text="发布闲置" @click="handlePublishClick"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		listUnused
	} from "@/api/unused/index.js"
	import {
		placeUser
	} from '@/api/index/index.js'
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
				unusedListLength: 0,
				timer: null
			}
		},
		onShow() {
			if (!!this.$store.state.app.unusedAdd) {
				uni.showToast({
					title: '发布成功',
					icon: 'success',
					duration: 2000
				})
				this.$store.commit('UNUSED_ADD_SUCCESS', false)
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					this.refresh()
				}, 1000)
			}
			if (!!this.$store.state.app.unusedEdit) {
				uni.showToast({
					title: '编辑成功',
					icon: 'success',
					duration: 2000
				})
				this.$store.commit('UNUSED_EDIT_SUCCESS', false)
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					this.refresh()
				}, 1000)
			}
		},
		onLoad(options) {
			uni.$on('changeUnused', this.detailStatus)
			uni.$on('getUnusedListChange', this.refreshUnusedList)
			if (options.place) {
				placeUser({
					place: options.place
				}).then(res => {
					if (res.code === 200) {
						this.getUnusedList()
					}
				})
			}
		},
		onUnload() {
			uni.$off('changeUnused')
			uni.$off('getUnusedListChange')
			clearTimeout(this.timer)
		},
		created() {
			this.getUnusedList()
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.refresh()
		},
		/**
		 * 分享当前页面
		 */
		onShareAppMessage() {
			if (this.unusedListLength === 1) {
				return {
					title: "分享了一件闲置物品",
					path: "/pages/unused/index?place=" + uni.getStorageSync('place'),
				}
			} else {
				return {
					title: `${uni.getStorageSync('place')}闲置物品列表`,
					path: "/pages/unused/index?place=" + uni.getStorageSync('place'),
				}
			}
		},
		methods: {
			refreshUnusedList() {
				this.refresh()
			},
			detailStatus(index, type, isAdd) {
				if (type === 'support') {
					if (isAdd) {
						this.$set(this.unusedList[index], 'supportCount', this.unusedList[index].supportCount + 1)
						this.$set(this.unusedList[index], 'support', true)
					} else {
						this.$set(this.unusedList[index], 'supportCount', this.unusedList[index].supportCount - 1)
						this.$set(this.unusedList[index], 'support', false)
					}
				} else if (type === 'star') {
					if (isAdd) {
						this.$set(this.unusedList[index], 'starCount', this.unusedList[index].starCount + 1)
						this.$set(this.unusedList[index], 'star', true)
					} else {
						this.$set(this.unusedList[index], 'starCount', this.unusedList[index].starCount - 1)
						this.$set(this.unusedList[index], 'star', false)
					}
				} else if (type === 'comment') {
					if (isAdd) {
						this.$set(this.unusedList[index], 'commentCount', this.unusedList[index].commentCount + 1)
					}
				}
			},
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
				console.log('handleToLower')
				if (this.hasMore) {
					this.pageNum += 1
					let params = {
						search: this.keyword,
						pageNum: this.pageNum,
						pageSize: this.pageSize
					}
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
			},
			// 获取闲置物品列表
			getUnusedList() {
				let params = {
					search: this.keyword,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				listUnused(params).then(res => {
					if (res.code == 200) {
						this.unusedList = res.data
						this.unusedListLength = this.unusedList.length
					}
				})
			},
			// 搜索
			handleConfirm() {
				this.getUnusedList()
			},
			// 点赞,收藏状态改变
			unusedChangeStatus(index, type, isAdd) {
				if (type === 'support') {
					if (isAdd) {
						this.$set(this.unusedList[index], 'supportCount', this.unusedList[index].supportCount + 1)
						this.$set(this.unusedList[index], 'support', true)
					} else {
						this.$set(this.unusedList[index], 'supportCount', this.unusedList[index].supportCount - 1)
						this.$set(this.unusedList[index], 'support', false)
					}
				} else if (type === 'star') {
					if (isAdd) {
						this.$set(this.unusedList[index], 'starCount', this.unusedList[index].starCount + 1)
						this.$set(this.unusedList[index], 'star', true)
					} else {
						this.$set(this.unusedList[index], 'starCount', this.unusedList[index].starCount - 1)
						this.$set(this.unusedList[index], 'star', false)
					}
				}
			},
			handleJumpDetail(item, index) {
				uni.navigateTo({
					url: `/pages/unused/detailUnused/detail?itemData=${encodeURIComponent(JSON.stringify(item))
			}&index=${index}`
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
		// background-color: #F3F6F5;
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
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			overflow-y: auto;
			padding: 10rpx 0;
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