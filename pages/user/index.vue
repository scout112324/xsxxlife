<template>
	<view class="user-page">
		<view class="user-info">
			<view class="title">
				登录~~~~
			</view>
			<button type="default" class="login" @click="handleLogin">授权登录</button>
		</view>
		<view class="user-list">
			<view class="user-item" v-for="item in userData" :key="item.id">
				<view class="icon">
					<uni-icons :type="item.icon" size="22"></uni-icons>
				</view>
				<view class="content">
					<view class="name">
						{{item.name}}
					</view>
					<uni-icons type="forward" size="22"></uni-icons>
				</view>
			</view>
		</view>
		<!-- 普通弹框 -->
		<uni-popup ref="popup" background-color="#fff" class="login-container">
			<view class="popup-content">
				<view class="title">
					<uni-icons type="closeempty" size="22" @click="handleclose"></uni-icons>
				</view>
				<view class="content">
					<image class="logo"
						src="https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
						mode=""></image>
					<button type="default" class="login" @click="handleLogin">授权登录</button>
					<label class="radio"><radio :checked="checked" @click="handleChecked" />我已阅读并同意</label>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData: [{
						id: 1,
						name: "收藏列表",
						icon: "star"
					},
					{
						id: 2,
						name: "点赞列表",
						icon: "hand-up"
					},
					{
						id: 3,
						name: "我的活动",
						icon: "flag"
					},
					{
						id: 4,
						name: "交易记录",
						icon: "star"
					},
					{
						id: 5,
						name: "我的发布",
						icon: "star"
					},
					{
						id: 6,
						name: "聊天列表",
						icon: "chat"
					},
					{
						id: 7,
						name: "联系客服",
						icon: "chat"
					},
					{
						id: 8,
						name: "意见反馈",
						icon: "chat"
					}
				],
				checked: false
			}
		},
		methods: {
			// 登录
			handleLogin() {
				this.$refs.popup.open('bottom')
			},
			handleChecked() {
				console.log(!this.checked)
				this.checked = !this.checked
			},
			handleclose() {
				this.$refs.popup.close();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-page {
		.user-info {
			display: flex;
			flex-direction: column;
			align-items: center;

			.login {
				height: 80rpx;
				line-height: 80rpx;
				width: 60%;
				color: #ffffff;
				background-color: #1841f4;
				border-radius: 40rpx;
			}
		}

		.user-list {
			.user-item {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.icon {
					width: 100rpx;
					text-align: center;
				}

				.content {
					flex: 1;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1px solid #ccc;
					padding: 20rpx 0;
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