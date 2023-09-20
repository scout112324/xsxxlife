<template>
	<view class="user-page">
		<u-navbar title="我的" :bgColor="bgColor" leftIcon="" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left"></view>
		</u-navbar>
		<view class="user-info">
			<view class="user">
				<image class="avatar"
					src="https://tse4-mm.cn.bing.net/th/id/OIP-C.vNfhdk-LRUEgI7aMQdSwYgAAAA?pid=ImgDet&rs=1" mode="">
				</image>
				<view class="nickname">
					ketty perry
				</view>
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
					<uni-icons type="forward" size="22"></uni-icons>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor: "#FBE94E",
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

		}
	}
</script>

<style lang="scss" scoped>
	.user-page {
		background-color: #F3F6F5;
		height: 100vh;

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

				.avatar {
					width: 96rpx;
					height: 96rpx;
					border-radius: 48rpx;
					border: 1rpx solid #FFD100;
					margin: 0 30rpx;
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

					::v-deep .uni-icons {
						color: #AAAAAA !important;
					}
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