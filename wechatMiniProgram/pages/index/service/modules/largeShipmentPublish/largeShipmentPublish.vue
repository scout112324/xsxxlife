<template>
	<view class="publish-page">
		<view class="container">
			<view class="wrap-card">
				<scroll-view scroll-y class="scroll_view">
					<textarea adjust-position='false' auto-height @keyboardheightchange="keyboardheightchange"
						class="con-text" maxlength='-1' v-model="content" placeholder="请用几句话描述一下你要发布的内容…"></textarea>
				</scroll-view>
				<!-- 上传图片 -->
				<view class="wrap-img">
					<caremaItem :cameraNumber="cameraNumber" @handleUploadFile="handleUploadFile"></caremaItem>
				</view>
				<view class="address">
					<image class="dingwei" src="../../../../../static/home/dingwei.png" mode=""></image>
					<u--input class="address-name" placeholder="请输入地址" border="none" v-model="place"></u--input>
					<image class="tiaozhuan" src="../../../../../static/unused/tiaozhuan.png" mode=""></image>
				</view>
			</view>
			<view class="message">
				<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm" labelWidth="240rpx">
					<u-form-item label="上门时间" prop="comeTime" borderBottom @click="showComeTime = true">
						<u--input v-model="userInfo.comeTime" disabled disabledColor="#ffffff" placeholder="请选择"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="价格" prop="price" borderBottom>
						<u--input v-model="userInfo.price" border="none" placeholder="请填写产品价格"></u--input>
					</u-form-item>
					<u-form-item label="联系电话" prop="phone" borderBottom>
						<u--input v-model="userInfo.phone" border="none" placeholder="请填写联系电话"></u--input>
					</u-form-item>
					<u-form-item label="上门地址" prop="detailsPlace" borderBottom>
						<u--input v-model="userInfo.detailsPlace" border="none" placeholder="请填写地址"></u--input>
					</u-form-item>
				</u--form>
				<u-datetime-picker mode="datetime" :show="showComeTime" :minDate="Number(new Date())" :value="comeTime"
					closeOnClickOverlay @cancel="comeTimeClose" @confirm="comeTimeConfirm"
					@close="comeTimeClose"></u-datetime-picker>
			</view>
		</view>
		<view class="publish">
			<u-button text="发布" @click="handlePublish"></u-button>
		</view>
	</view>
</template>

<script>
	import caremaItem from "@/components/camera_item.vue"
	import {
		addBig
	} from "@/api/index/index.js"
	export default {
		components: {
			caremaItem
		},
		data() {
			return {
				cameraNumber: 9,
				content: "",
				place: "",
				picture: [],
				showComeTime: false,
				// comeTime: uni.$u.timeFormat(Number(new Date()), 'yyyy-mm-dd hh:MM:ss')
				userInfo: {
					detailsPlace: '',
					comeTime: '',
					price: '',
					phone: ''
				},
				rules: {
					detailsPlace: [{
						required: true,
						message: '请填写地址',
						trigger: ['blur', 'change'],
					}],
					price: [{
						required: true,
						message: '请填写价格',
						trigger: ['blur', 'change'],
					}],
					phone: [{
							required: true,
							message: '请输入联系电话',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change', 'blur'],
						}
					],
					comeTime: [{
						type: 'string',
						required: true,
						message: '请选择上门时间',
						trigger: ['change']
					}],
				},
				radio: '',
				switchVal: false,
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			keyboardheightchange(event) {
				this.bottomHeight = event.detail.height
			},
			// 文件上传
			handleUploadFile(file) {
				this.picture = file
			},
			// 发布
			handlePublish() {
				this.$refs.uForm.validate().then(valid => {
					if (valid) {
						let params = {
							place: this.place,
							content: this.content,
							picture: this.picture ? this.picture.toString() : "",
							phone: this.userInfo.phone,
							detailsPlace: this.userInfo.detailsPlace,
							goTime: this.userInfo.comeTime,
							price: this.userInfo.price
						}
						addBig(params).then(res => {
							if (res.code === 200) {
								uni.showToast({
									title: '发布成功',
									icon: 'success',
									duration: 2000
								})
								uni.navigateTo({
									url: "/pages/index/service/largeShipmentClearance"
								})
							}
						})
					} else {
						console.log('验证失败');
					}
				})
			},
			comeTimeConfirm(e) {
				this.showComeTime = false
				this.userInfo.comeTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM:ss')
				this.$refs.uForm.validateField('comeTime')
			},
			comeTimeClose(e) {
				this.showComeTime = false
				this.$refs.uForm.validateField('comeTime')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.publish-page {
		background-color: #F3F6F5;

		.container {
			padding: 24rpx 15rpx;

			.wrap-card {
				min-height: 663rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;
				padding: 34rpx 30rpx;

				.scroll_view {
					height: 369rpx;

					.con-text {
						width: 100% !important;
					}
				}

				.wrap-img {

					.image-container,
					::v-deep .u-upload__wrap__preview {
						width: 200rpx !important;
						height: 200rpx !important;
						background: #F1F1F1;
						border-radius: 20rpx !important;
						align-items: center;

					}

					.image-container {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.title {
							margin-top: 15rpx;
							font-size: 22rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #707070;
							line-height: 30rpx;
						}
					}

					::v-deep .u-upload__wrap__preview__image {
						width: 100% !important;
						height: 100% !important;
					}
				}

				.address {
					width: 209rpx;
					height: 46rpx;
					background: #F1F1F1;
					border-radius: 20rpx;
					margin-top: 32rpx;
					box-sizing: border-box;
					padding: 0rpx 14rpx;

					display: flex;
					align-items: center;
					justify-content: space-between;

					.dingwei {
						width: 18rpx;
						height: 21rpx;
					}

					.address-name {
						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #232624;
						line-height: 30rpx;
					}

					.tiaozhuan {
						width: 10rpx;
						height: 17rpx;
					}
				}
			}

			.message {
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;
				margin: 20rpx 0;
				padding: 0 30rpx 20rpx 30rpx;

				::v-deep .u-form-item__body__right {
					margin: 10rpx 0;
				}

				::v-deep .u-input__content__field-wrapper__field {
					text-align: right !important;
				}

			}
		}


		.publish {
			width: 750rpx;
			height: 168rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;

			::v-deep .u-button {
				width: 720rpx;
				height: 82rpx;
				background: #FFD100;
				border-radius: 40rpx;
				border: 0 solid rgba(255, 209, 0, 0.31);
			}

			::v-deep .u-button__text {
				font-size: 30rpx !important;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #232624;
			}
		}
	}
</style>