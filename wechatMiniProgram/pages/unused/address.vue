<template>
	<view class="address">
		<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm" labelWidth="240rpx" :key='keydata'>
			<u-form-item label="姓名" prop="placeName" borderBottom>
				<u--input v-model="userInfo.placeName" border="none" placeholder="请填写姓名"></u--input>
			</u-form-item>
			<u-form-item label="手机号" prop="placePhone" borderBottom>
				<u--input v-model="userInfo.placePhone" border="none" placeholder="请填写你的手机号码"></u--input>
			</u-form-item>
			<u-form-item label="地区" prop="placeArea" borderBottom>
				<uni-data-picker style="width: calc(100% - 18rpx);" ellipsis popup-title="请选择区域" placeholder="请选择区域"
					:localdata="areaTree" v-model="userInfo.placeArea" @change="onchange" :clear-icon="false">
				</uni-data-picker>
			</u-form-item>
			<u-form-item label="详细地址" prop="placeDetails" borderBottom>
				<u--input v-model="userInfo.placeDetails" border="none" placeholder="请填写详细地址"></u--input>
			</u-form-item>
		</u-form>
		<view class="publish">
			<u-button text="确定" @click="handlePublish"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		submitWx,
	} from "@/api/common.js"
	import {
		areaData
	} from "@/utils/area.js"
	export default {
		data() {
			return {
				payInfo: {},
				userInfo: {
					placeName: '',
					placePhone: '',
					placeDetails: '',
					placeArea: [],
				},
				rules: {
					placeName: [{
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change'],
					}],
					placeDetails: [{
						required: true,
						message: '请填写详细地址',
						trigger: ['blur', 'change'],
					}],
					placePhone: [{
							required: true,
							message: '请输入手机号',
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
				},
				areaTree: [],
			}
		},
		onLoad(options) {
			this.areaTree = areaData
			this.payInfo = JSON.parse(decodeURIComponent(options.payInfo))
		},
		mounted() {
			this.userInfo.placeArea = uni.getStorageSync("place") ? uni.getStorageSync("place").split(',').map(item => {
				return {
					text: item,
					value: item
				}
			}) : ['上海市']
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		methods: {
			onchange(e) {
				this.userInfo.placeArea = []
				e.detail.value.forEach(item => {
					return this.userInfo.placeArea.push(item.text)
				})
				this.userInfo.placeArea = this.userInfo.placeArea.toString()
			},
			handlePublish() {
				this.$refs.uForm.validate().then(valid => {
					if (valid) {
						submitWx({
							id: this.payInfo.id,
							placeName: this.userInfo.placeName,
							placePhone: this.userInfo.placePhone,
							placeArea: typeof(this.userInfo.placeArea) == "string" ? this.userInfo
								.placeArea : this.userInfo.placeArea.map(item => {
									return item.text
								}).toString(),
							placeDetails: this.userInfo.placeDetails
						}).then(res => {
							if (res.code === 200) {
								let payInfoMore = {
									...this.payInfo,
									orderId: res.data.orderId
								}
								uni.navigateTo({
									url: `/pages/unused/payDetail?payInfoMore=${encodeURIComponent(JSON.stringify(payInfoMore))}`
								})
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								})
							}
						})
					} else {
						console.log('验证失败');
					}
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	.address {
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
		border-radius: 20rpx;
		margin: 20rpx 0;
		padding: 0 30rpx 20rpx 30rpx;

		.tips {
			margin-top: 20rpx;
			color: #949494;
			font-size: 26rpx;
		}

		::v-deep .u-form-item__body__right {
			margin: 10rpx 0;
		}

		::v-deep .u-input__content__field-wrapper__field {
			text-align: right !important;
		}

		::v-deep .input-value-border {
			border: 0 solid transparent !important;
		}

		::v-deep .selected-area {
			justify-content: flex-end;
		}

		.publish {
			position: fixed;
			left: 10%;
			bottom: 0;
			width: 80%;
			height: 168rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;

			::v-deep .u-button {
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