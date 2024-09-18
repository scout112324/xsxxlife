<template>
	<view class="user-page">
		<u-navbar title="我的" leftIcon="" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left"></view>
		</u-navbar>
		<view class="user-info">
			<view class="user">
				<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image v-if="avatarUrl" class="avatar" :src="avatarUrl"></image>
					<image v-else class="avatar" src="../../static/avatar.png" mode=""></image>
				</button>
				<input type="nickname" v-model="nickname" class="nickname" placeholder="请输入昵称"
					@confirm="handleConfirmChange" @blur="handleBlur" />
			</view>
		</view>
		<view class="user-list">
			<view class="user-item" v-for="item in userData" :key="item.id" @click="handleJumpDetail(item.name)">
				<view class="icon" v-if="item.name!=='联系客服'">
					<image class="icon-image" :src="item.icon" mode=""></image>
				</view>
				<view class="content">
					<view class="name" v-if="item.name!=='联系客服'">
						{{item.name}}
					</view>
					<button class="btn-contact" open-type="contact" v-if="item.name=='联系客服'">
						<view class="left-con">
							<view class="icon">
								<image class="icon-image" :src="item.icon" mode=""></image>
							</view>
							<view class="name">
								联系客服
							</view>
						</view>
						<uni-icons type="forward" size="22"></uni-icons>
					</button>
					<view class="right" v-else>
						<view class="new" v-if="item.name=='交易记录' && showOrderMsg==true">
							NEW
						</view>
						<view class="money" v-if="item.name=='点击提现'">
							总金额：{{money}}￥
						</view>
						<uni-icons type="forward" size="22"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		<u-modal :show="show" :title="title" showCancelButton confirmColor="#FFD100" width="650rpx"
			@cancel="handleCancle" @confirm="handleConfirm">
			<view class="slot-content">
				<view style="text-align: center;">
					(可提现金额：{{myInfo.useMoney ? myInfo.useMoney : 0}}￥)
				</view>
				<u--form labelWidth="180rpx" labelPosition="left" :model="userInfo" :rules="rules" ref="uForm">
					<u-form-item :label="name" prop="name" v-if="!!name">
						<u--input v-model="userInfo.name" border="bottom"></u--input>
					</u-form-item>
					<u-form-item :label="zfb" prop="account" v-if="!!zfb">
						<u--input v-model="userInfo.account" border="bottom"></u--input>
					</u-form-item>
				</u--form>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {
		infoUser,
		withdrawal,
		updateUser,
		orderShowMsg
	} from "@/api/user/index.js"
	import {
		uploadFiles
	} from "@/api/upload.js"
	export default {
		data() {
			return {
				avatarUrl: uni.getStorageSync('avatarUrl'),
				nickname: uni.getStorageSync('nickName'),
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
					},
					{
						id: 9,
						name: "点击提现",
						icon: "../../static/user/tixian.png"
					}
				],
				checked: false,
				show: false,
				title: '提现',
				userInfo: {
					name: '',
					account: '',
				},
				rules: {
					name: {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					account: [{
							required: true,
							message: '请输入支付宝账号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value) || uni.$u.test.email(value);
							},
							message: '支付宝账号不正确',
							trigger: ['change', 'blur'],
						}
					]
				},
				money: 0,
				myInfo: {},
				showOrderMsg: false,
				name: "",
				zfb: ""
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		onShow() {
			this.getInfoUser()
			this.getOrderShowMsg()
		},
		methods: {
			getOrderShowMsg() {
				orderShowMsg().then(res => {
					if (res.code === 200) {
						this.showOrderMsg = res.data
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			// 获取我的信息
			getInfoUser() {
				infoUser().then(res => {
					if (res.code === 200) {
						this.myInfo = res.data
						this.avatarUrl = res.data.photo ? res.data.photo : this.avatarUrl
						this.nickname = res.data.nickname
						this.money = res.data.realMoney
						this.name = res.data.name
						this.zfb = res.data.zfb
					}
				})
			},
			onChooseAvatar(e) {
				const {
					avatarUrl
				} = e.detail
				this.uploadImages(avatarUrl)
			},
			uploadImages(imgPath) {
				uni.uploadFile({
					url: uploadFiles().url,
					method: "POST",
					header: {
						'Content-Type': 'multipart/form-data',
						'openId': uni.getStorageSync('openId')
					},
					filePath: imgPath,
					name: 'file',
					success: (res) => {
						let imgData = JSON.parse(res.data); //微信和头条支持
						if (imgData.code == 200) {
							this.avatarUrl = imgData.data.url
							this.updateUserInfo()
						}
					}
				})
			},
			handleConfirmChange(e) {
				this.nickname = e.detail.value
				this.updateUserInfo()
			},
			handleBlur() {
				this.updateUserInfo()
			},
			// 更改微信昵称和头像
			updateUserInfo() {
				let params = {
					photo: this.avatarUrl,
					nickname: this.nickname
				}
				updateUser(params).then(res => {
					if (res.code === 200) {
						this.getInfoUser()
						uni.showToast({
							title: '修改成功',
							icon: 'success',
							duration: 2000
						})
					}
				})
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
					case '点击提现':
						this.show = true
						break
					default:
						return
				}
			},
			// 关闭弹框
			handleCancle() {
				this.show = false
			},
			// 确认
			handleConfirm() {
				this.$refs.uForm.validate().then(res => {
					if (this.money == 0) {
						uni.showToast({
							title: '无可提现金额',
							icon: 'error',
							duration: 2000
						})
						this.userInfo = {
							name: '',
							account: '',
						}
						this.show = false
					} else {
						let params = {
							money: this.money,
							name: this.userInfo.name,
							phone: this.userInfo.account,
							nickname: this.userInfo.nickname
						}
						withdrawal(params).then(res => {
							if (res.code === 200) {
								uni.showToast({
									title: '提现成功',
									icon: 'success',
									duration: 2000
								})
								this.userInfo = {
									name: '',
									account: '',
								}
								this.show = false
							} else {
								uni.showToast({
									title: '无可提现金额',
									icon: 'error',
									duration: 2000
								})
								this.userInfo = {
									name: '',
									account: '',
								}
								this.show = false
							}
						})
					}
				}).catch(errors => {
					console.log('校验失败')
				})
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
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 0;
				padding: 0;
				background-color: #ffffff;
				height: 44rpx;
				width: 100%;
				line-height: 44rpx;

				&::after {
					border: none
				}

				.left-con {
					display: flex;
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

	::v-deep .u-modal__title {
		padding: 20rpx 0 !important;
	}
</style>