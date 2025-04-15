<template>
	<view class="look-for-page">
		<u-navbar title="寻人寻物" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="unused-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm"
				@clear="handleConfirm">
			</uni-easyinput>
		</view>
		<scroll-view class="unused-list" :style="{'height':screenHeight}" scroll-y @scrolltolower="handleToLower">

			<view class="lift-item" v-for="(item,index) in findList" :key="item.id">
				<info-item :pageType="pageType" :itemData="item" :index="index"
					@findPeopleChangeStatus="findPeopleChangeStatus"
					@handleJumpFindDetail="handleJumpFindDetail(item,index)"></info-item>
			</view>
		</scroll-view>
		<view class="publish">
			<u-button icon="plus-circle-fill" text="发布" @click="handlePublishClick"></u-button>
		</view>
	</view>
</template>

<script>
	import infoItem from "@/components/info_item.vue"
	import {
		findList
	} from "@/api/index/index.js"
	export default {
		options: {
			styleIsolation: 'shared',
		},
		components: {
			infoItem
		},
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight * 2 - 395 + 'rpx'
		},
		data() {
			return {
				keyword: "",
				screenHeight: 0,
				pageType: "findPeople",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				pageNum: 1,
				pageSize: 50,
				findList: [],
				hasMore: true,
				timer: null
			}
		},
		onLoad() {
			uni.$on('changeFindList', this.detailStatus)
		},
		onUnload() {
			uni.$off('changeFindList')
			clearTimeout(this.timer)
		},
		created() {
			if (!!this.$store.state.app.lookForPeopleAdd) {
				uni.showToast({
					title: '发布成功',
					icon: 'success',
					duration: 2000
				})
				this.$store.commit('LOOKFORPEOPLE_ADD_SUCCESS', false)
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					this.refresh()
				}, 1000)
			} else if (!!this.$store.state.app.lookForPeopleEdit) {
				uni.showToast({
					title: '编辑成功',
					icon: 'success',
					duration: 2000
				})
				this.$store.commit('LOOKFORPEOPLE_EDIT_SUCCESS', false)
				if (this.timer) {
					clearTimeout(this.timer)
				}
				this.timer = setTimeout(() => {
					this.refresh()
				}, 1000)
			} else {
				this.getFindList()
			}
		},
		onPullDownRefresh() {
			// 下拉刷新
			this.refresh()
		},
		methods: {
			detailStatus(index, type, isAdd) {
				if (type === 'support') {
					if (isAdd) {
						this.$set(this.findList[index], 'supportCount', this.findList[index].supportCount + 1)
						this.$set(this.findList[index], 'support', true)
					} else {
						this.$set(this.findList[index], 'supportCount', this.findList[index].supportCount - 1)
						this.$set(this.findList[index], 'support', false)
					}
				} else if (type === 'star') {
					if (isAdd) {
						this.$set(this.findList[index], 'starCount', this.findList[index].starCount + 1)
						this.$set(this.findList[index], 'star', true)
					} else {
						this.$set(this.findList[index], 'starCount', this.findList[index].starCount - 1)
						this.$set(this.findList[index], 'star', false)
					}
				} else if (type === 'comment') {
					if (isAdd) {
						this.$set(this.findList[index], 'commentCount', this.findList[index].commentCount + 1)
					}
				}
			},
			// 下拉刷新
			refresh() {
				this.pageNum = 1
				this.hasMore = true
				setTimeout(() => {
					this.getFindList();
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
					findList(params).then(res => {
						if (res.code == 200) {
							if (res.data.length === 0) {
								this.pageNum -= 1
								this.hasMore = false
								uni.showToast({
									title: "没有数据了",
									icon: "none"
								});
							}
							this.findList = this.findList.concat(res.data)
						}
					})
				}
			},
			// 获取寻人寻物列表
			getFindList() {
				let params = {
					search: this.keyword,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				findList(params).then(res => {
					this.findList = res.data
				})
			},
			// 搜索
			handleConfirm() {
				this.getFindList()
			},
			// 点赞,收藏状态改变
			findPeopleChangeStatus(index, type, isAdd) {
				if (type === 'support') {
					if (isAdd) {
						this.$set(this.findList[index], 'supportCount', this.findList[index].supportCount + 1)
						this.$set(this.findList[index], 'support', true)
					} else {
						this.$set(this.findList[index], 'supportCount', this.findList[index].supportCount - 1)
						this.$set(this.findList[index], 'support', false)
					}
				} else if (type === 'star') {
					if (isAdd) {
						this.$set(this.findList[index], 'starCount', this.findList[index].starCount + 1)
						this.$set(this.findList[index], 'star', true)
					} else {
						this.$set(this.findList[index], 'starCount', this.findList[index].starCount - 1)
						this.$set(this.findList[index], 'star', false)
					}
				}
			},
			handleBack() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			handleJumpFindDetail(item, index) {
				uni.navigateTo({
					url: `/pages/index/service/modules/lookForPeopleDetail/lookForPeopleDetail?itemData=${encodeURIComponent(JSON.stringify(item))}&index=${index}`
				})
			},
			handlePublishClick() {
				uni.navigateTo({
					url: "/pages/index/service/modules/lookForPeoplePublish/lookForPeoplePublish"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.look-for-page {
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
			padding: 10rpx 0;
			width: auto;

			.lift-item:not(:last-child) {
				border-bottom: 20rpx solid #EEF1F0;
			}
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