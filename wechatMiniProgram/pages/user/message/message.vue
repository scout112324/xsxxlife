<template>
	<view class="my-message-page">
		<u-navbar title="消息" :bgColor="bgColor" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="message-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm"
				@clear="handleConfirm">
			</uni-easyinput>
			<view class="clear" @click="handleClearMsg">
				<image class="icon" src="../../../static/user/clear.png" mode=""></image>
				<text class="word">清除未读</text>
			</view>
		</view>
		<view class="message-list">
			<view class="message-item" @click="handleJumpChat(item.userId)" v-for="item in msgList" :key="item.userId"
				@longpress="handleLongpress(item.userId)">
				<uni-badge class="uni-badge-left-margin" :text="item.unReadCount" absolute="rightTop" size="small">
					<image v-if="item.photo" class="left" :src="item.photo" mode=""></image>
					<image v-else class="left" src="../../../static/avatar.png" mode=""></image>
				</uni-badge>

				<view class="center">
					<view class="name">
						{{item.nickname}}
					</view>
					<view class="detail" v-if="item.type==0">
						{{item.msg}}
					</view>
					<view class="detail" v-else>
						【图片】
					</view>
				</view>
				<view class="time">
					{{item.time}}
				</view>
			</view>
		</view>
		<u-popup :show="show" mode="center" @close="handleClose">
			<view class="popup_container" @click.stop="handleRead">
				<text>标为已读</text>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		msgList,
		msgRead
	} from "@/api/user/index.js"
	export default {
		options: {
			styleIsolation: 'shared',
		},
		data() {
			return {
				keyword: "",
				bgColor: "#FBE94E",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				value: 100,
				msgList: [],
				pageNum: 1,
				pageSize: 1000,
				show: false,
				userId: ""
			}
		},
		created() {
			this.getMsgList()
		},
		onLoad() {
			uni.$on('changeReadStatus', (userId) => {
				this.userId = userId
				this.handleRead()
			})
		},
		onUnload() {
			uni.$off('changeReadStatus')
		},
		methods: {
			handleRead() {
				this.show = false
				let params = {
					all: 1,
					userId: this.userId
				}
				msgRead(params).then(res => {
					if (res.code === 200) {
						this.getMsgList()
					}
				})
			},
			handleClose() {
				this.show = false
			},
			// 长按
			handleLongpress(userId) {
				this.show = true
				this.userId = userId
			},
			// 清除未读
			handleClearMsg() {
				let params = {
					all: 0,
					userId: this.userId
				}
				msgRead(params).then(res => {
					if (res.code === 200) {
						this.getMsgList()
					}
				})
			},
			// 获取消息列表
			getMsgList() {
				let params = {
					search: this.keyword,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				msgList(params).then(res => {
					if (res.code === 200) {
						this.msgList = res.data
						console.log('msgList', this.msgList)
					}
				})
			},
			// 搜索
			handleConfirm() {
				this.getMsgList()
			},
			handleBack() {
				uni.switchTab({
					url: "/pages/user/index"
				})
			},
			// 点击进入在线聊天页面
			handleJumpChat(userId) {
				this.show = false
				let params = {
					all: 1,
					userId: userId
				}
				msgRead(params).then(res => {
					if (res.code === 200) {
						this.getMsgList()
					}
				})
				uni.navigateTo({
					url: `/pages/user/chat/chat?userId=${userId}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-message-page {
		font-family: PingFangSC-Regular, PingFang SC;
		background-color: #F3F6F5;
		height: 100vh;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.message-container {
			background-color: #F3F6F5;
			height: 110rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			box-sizing: border-box;
			padding: 19rpx 28rpx;

			display: flex;
			justify-content: space-between;
			align-items: center;

			.clear {
				display: flex;
				align-items: center;

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-left: 20rpx;
				}

				.word {
					font-weight: 400;
					color: #4D504F;
					font-size: 30rpx;
				}
			}

			::v-deep .uni-easyinput {
				height: 72rpx;
				width: 517rpx;
			}

			::v-deep .is-input-border {
				border-radius: 36rpx;
			}
		}

		.message-list {
			background-color: #ffffff;
			margin: 20rpx 0;
			padding-bottom: 20rpx;

			.message-item {
				height: 173rpx;
				margin: 0 28rpx;
				box-sizing: border-box;
				border-bottom: 2px solid rgba(216, 216, 216, 0.5);

				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					width: 96rpx;
					height: 96rpx;
					border-radius: 16rpx;

				}

				.center {
					flex: 1;
					margin: 0 35rpx;
					/*超出隐藏*/
					overflow: hidden;

					.name {
						font-size: 30rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #232624;
						line-height: 42rpx;

						width: 445rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.detail {
						width: 100%;
						/*超出的空白区域不换行*/
						white-space: nowrap;
						/*超出隐藏*/
						overflow: hidden;
						/*文本超出显示省略号*/
						text-overflow: ellipsis;
						margin-top: 12rpx;
						font-size: 24rpx;
						font-weight: 400;
						color: #4D504F;
						line-height: 33rpx;
					}
				}

				.time {
					font-size: 26rpx;
					font-weight: 400;
					color: #C4C4C4;
				}
			}
		}
	}

	.popup_container {
		padding: 60rpx 100rpx;
	}
</style>