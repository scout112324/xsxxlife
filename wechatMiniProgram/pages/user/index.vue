<template>
	<view class="user-page">
		<u-navbar title="我的" leftIcon="" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left"></view>
		</u-navbar>
		<view class="user-info">
			<view class="user">
				<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image class="avatar" :src="avatarUrl"></image>
				</button>
				<input type="nickname" class="nickname" placeholder="请输入昵称" />
			</view>
		</view>
		<view class="user-list">
			<view class="user-item" v-for="item in userData" :key="item.id">
				<view class="icon">
					<image class="icon-image" :src="item.icon" mode=""></image>
				</view>
				<view class="content">
					<view class="name">
						{{item.name}}
					</view>
					<view class="right" v-if="item.name=='联系客服'">
						<button class="btn-contact" open-type="contact">
							<uni-icons type="forward" size="22"></uni-icons>
						</button>
					</view>
					<view class="right" @click="handleJumpDetail(item.name)" v-else>
						<view class="new" v-if="item.name=='收藏列表'">
							NEW
						</view>
						<uni-icons type="forward" size="22"></uni-icons>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				userData: [{
						id: 1,
						name: "收藏列表",
						icon: "../../static/user/shoucang.png"
					},
					{
						id: 2,
						name: "点赞列表",
						icon: "../../static/user/dianzan.png"
					},
					{
						id: 3,
						name: "我的消息",
						icon: "../../static/user/xiaoxi.png"
					},
					{
						id: 4,
						name: "我的活动",
						icon: "../../static/user/huodong.png"
					},
					{
						id: 5,
						name: "我的发布",
						icon: "../../static/user/fabu.png"
					},
					{
						id: 6,
						name: "交易记录",
						icon: "../../static/user/jiaoyi.png"
					},

					{
						id: 7,
						name: "联系客服",
						icon: "../../static/user/kefu.png"
					},
					{
						id: 8,
						name: "意见反馈",
						icon: "../../static/user/yijian.png"
					}
				],
				checked: false
			}
		},
		created() {

		},
		methods: {
			onChooseAvatar(e) {
				const {
					avatarUrl
				} = e.detail
				this.avatarUrl = avatarUrl
			},
			handleJumpDetail(name) {
				switch (name) {
					case '收藏列表':
						uni.navigateTo({
							url: "/pages/user/collection/collection"
						})
						break
					case '点赞列表':
						uni.navigateTo({
							url: "/pages/user/upvote/upvote"
						})
						break
					case '我的消息':
						uni.navigateTo({
							url: "/pages/user/message/message"
						})
						break
					case '我的活动':
						uni.navigateTo({
							url: "/pages/user/activity/activity"
						})
						break
					case '我的发布':
						uni.navigateTo({
							url: "/pages/user/publish/publish"
						})
						break
					case '交易记录':
						uni.navigateTo({
							url: "/pages/user/trading/trading"
						})
						break
						// case '联系客服':
						// 	uni.navigateTo({
						// 		url: "/pages/user/service/service"
						// 	})
						// 	break
					case '意见反馈':
						uni.navigateTo({
							url: "/pages/user/feedback/feedback"
						})
						break
					default:
						return
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-page {
		background-color: #F3F6F5;
		height: 100vh;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.user-info {
			height: 92rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			border-bottom-left-radius: 30rpx;
			border-bottom-right-radius: 30rpx;
			box-sizing: border-box;

			.user {
				margin: 0 15rpx;
				height: 184rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;
				display: flex;
				align-items: center;

				.avatar-wrapper {
					display: flex;
					align-items: center;
					background-color: transparent;
					padding-left: 0;
					padding-right: 0;
					margin-left: 0;
					margin-right: 0;

					&::after {
						border: none;
					}

					.avatar {
						width: 96rpx;
						height: 96rpx;
						border-radius: 48rpx;
						border: 1rpx solid #FFD100;
						margin: 0 30rpx;
					}
				}

				.nickname {
					font-size: 35rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #232624;
					line-height: 49rpx;
				}
			}
		}

		.user-list {
			margin: 112rpx 15rpx 15rpx 15rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;

			.user-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 34rpx 0rpx;
				margin: 0 30rpx;

				&:not(:last-child) {
					border-bottom: 1px solid #EDEDED;
				}


				.icon {
					text-align: center;

					.icon-image {
						width: 35rpx;
						height: 34rpx;
					}
				}

				.content {
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.name {
						margin-left: 20rpx;
						font-size: 30rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #4D504F;
						line-height: 42rpx;
					}

					.right {
						display: flex;
						align-items: center;

						.new {
							width: 52rpx;
							height: 33rpx;
							background: #EA3D5E;
							border-radius: 10rpx;
							text-align: center;
							line-height: 33rpx;

							font-size: 17rpx;
							font-family: PingFangSC-Semibold, PingFang SC;
							font-weight: 600;
							color: #FFFFFF;
						}
					}

					::v-deep .uni-icons {
						color: #AAAAAA !important;
					}
				}
			}

			.btn-contact {
				margin: 0;
				padding: 0;
				background-color: #ffffff;
				height: 44rpx;
				line-height: 44rpx;

				&::after {
					border: none
				}

			}
		}

		.login-container {
			.popup-content {
				padding: 20rpx;

				.title {
					text-align: right;
				}

				.content {
					display: flex;
					flex-direction: column;
					align-items: center;

					.logo {
						width: 160rpx;
						height: 160rpx;
					}

					.login {
						height: 80rpx;
						line-height: 80rpx;
						width: 80%;
						color: #ffffff;
						background-color: #1841f4;
						border-radius: 40rpx;
						margin: 20rpx 0;
					}
				}
			}
		}
	}
</style>