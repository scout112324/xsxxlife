<template>
	<view class="publish-page">
		<view class="container">
			<view class="wrap-card">
				<scroll-view scroll-y class="scroll_view">
					<textarea adjust-position='false' auto-height @keyboardheightchange="keyboardheightchange"
						class="con-text" maxlength='-1' v-model="textContent"
						placeholder="请用几句话描述一下你要发布的内容…"></textarea>
				</scroll-view>
				<!-- 上传图片 -->
				<view class="wrap-img">
					<caremaItem :cameraNumber="cameraNumber"></caremaItem>
				</view>
				<view class="address">
					<image class="dingwei" src="../../../../../static/home/dingwei.png" mode=""></image>
					<text class="address-name">上海市静安区</text>
					<image class="tiaozhuan" src="../../../../../static/unused/tiaozhuan.png" mode=""></image>
				</view>
			</view>
			<view class="message">
				<u--form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm" labelWidth="240rpx">
					<u-form-item label="报名截止时间" prop="deadline" borderBottom @click="showDeadline = true">
						<u--input v-model="userInfo.deadline" disabled disabledColor="#ffffff" placeholder="请选择"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="活动开始时间" prop="startTime" borderBottom @click="showStartTime = true">
						<u--input v-model="userInfo.startTime" disabled disabledColor="#ffffff" placeholder="请选择"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="活动地点" prop="address" borderBottom>
						<u--input v-model="userInfo.address" border="none" placeholder="请填写活动地点"></u--input>
					</u-form-item>
				</u--form>
				<u-datetime-picker mode="date" :show="showDeadline" :value="deadline"
					closeOnClickOverlay @cancel="deadlineClose" @confirm="deadlineConfirm"
					@close="deadlineClose"></u-datetime-picker>
				<u-datetime-picker mode="date" :show="showStartTime" :value="startTime"
					closeOnClickOverlay @cancel="startTimeClose" @confirm="startTimeConfirm"
					@close="deadlineClose"></u-datetime-picker>
			</view>
		</view>
		<view class="publish">
			<u-button text="发布" @click="handlePublish"></u-button>
		</view>
	</view>
</template>

<script>
	import caremaItem from "@/components/camera_item.vue"
	export default {
		components: {
			caremaItem
		},
		data() {
			return {
				cameraNumber: 9,
				textContent: "",
				showDeadline: false,
				showStartTime: false,
				userInfo: {
					address: '',
					deadline: '',
					startTime: ''
				},
				rules: {
					address: [{
						required: true,
						message: '请填写活动地点',
						trigger: ['blur', 'change'],
					}],
					deadline: [{
						type: 'string',
						required: true,
						message: '请选择报名截止时间',
						trigger: ['change']
					}],
					startTime: [{
						type: 'string',
						required: true,
						message: '请选择活动开始时间',
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
			// 发布
			handlePublish() {
				this.$refs.uForm.validate().then(valid => {
					if (valid) {
						console.log("fabu")
					} else {
						console.log('验证失败');
					}
				})
			},
			deadlineConfirm(e) {
				this.showDeadline = false
				this.userInfo.deadline = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.$refs.uForm.validateField('deadline')
			},
			deadlineClose(e) {
				this.showDeadline = false
				this.$refs.uForm.validateField('deadline')
			},
			startTimeConfirm(e) {
				this.showStartTime = false
				this.userInfo.startTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.$refs.uForm.validateField('startTime')
			},
			startTimeClose(e) {
				this.showStartTime = false
				this.$refs.uForm.validateField('startTime')
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