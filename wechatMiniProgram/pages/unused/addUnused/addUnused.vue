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
					<caremaItem :mediaList="mediaList" :cameraNumber="cameraNumber"
						@handleUploadFile="handleUploadFile">
					</caremaItem>
				</view>
				<view class="address">
					<image class="dingwei" src="../../../static/home/dingwei.png" mode=""></image>
					<uni-data-picker style="width: calc(100% - 18rpx);" ellipsis popup-title="请选择所在地区" :localdata="areaTree" v-model="place"
						@change="onchange" :clear-icon="false">
					</uni-data-picker>
					<!-- <image class="tiaozhuan" src="../../../static/unused/tiaozhuan.png" mode=""></image> -->
				</view>
			</view>
			<view class="message">
				<u-form labelPosition="left" :model="userInfo" :rules="rules" ref="uForm" labelWidth="240rpx"
					:key='keydata'>
					<u-form-item label="产品价格" prop="realPrice" borderBottom>
						<u--input v-model="userInfo.realPrice" border="none" placeholder="请填写产品价格(元)"></u--input>
					</u-form-item>
					<u-form-item label="选择交易方式" prop="saleType" borderBottom labelPosition="top">
						<u-checkbox-group v-model="userInfo.saleType">
							<u-checkbox shape="circle" :customStyle="{marginRight: '16rpx'}"
								v-for="(item, index) in checkboxList" :key="index" :label="item.name"
								:name="item.value">
							</u-checkbox>
						</u-checkbox-group>
					</u-form-item>
					<u-form-item label="手机号" prop="phone" borderBottom>
						<u--input v-model="userInfo.phone" border="none" placeholder="请填写你的手机号码"></u--input>
					</u-form-item>
				</u-form>
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
		addUnused,
		updateUnused
	} from "@/api/unused/index.js"
	import {
		areaData
	} from "@/utils/area.js"

	export default {
		components: {
			caremaItem
		},
		data() {
			return {
				pageType: "unused",
				cameraNumber: 9,
				content: "",
				picture: [],
				// imgList: [],
				showType: false,
				place: [{
						text: `${uni.getStorageSync('province')}`,
						value: `${uni.getStorageSync('province')}`
					},
					{
						text: `${uni.getStorageSync('district')}`,
						value: `${uni.getStorageSync('district')}`
					}
				],
				userInfo: {
					realPrice: '',
					saleType: [],
					phone: '',
				},
				checkboxList: [{
						name: '通过平台',
						value: 0
					},
					{
						name: '线下个人交易',
						value: 1
					}
				],
				rules: {
					realPrice: [{
						type: 'number',
						required: true,
						message: '请填写产品价格(必须是数字)',
						// blur和change事件触发检验
						trigger: ['change', 'blur'],
					}],
					phone: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],
					saleType: [{
						type: 'array',
						max: 1,
						required: true,
						message: '只能选择一个交易类型',
						trigger: 'change'
					}],
				},
				radio: '',
				switchVal: false,
				itemData: {},
				keydata: '1',
				mediaList: [],
				itemId: "",
				areaTree: [],
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		onLoad(options) {
			this.areaTree = areaData
			if (JSON.stringify(options) != "{}") {
				this.itemData = JSON.parse(decodeURIComponent(options.itemData))
			}
		},
		mounted() {
			if (JSON.stringify(this.itemData) != "{}") {
				this.keydata++;
				let obj = {
					realPrice: this.itemData.realPrice + "",
					phone: this.itemData.phone,
					saleType: this.itemData.saleType == 1 ? [1] : [0]
				}
				this.userInfo = obj
				this.content = this.itemData.content
				this.place = this.itemData.place.split(',').map(item => {
					return {
						text: item,
						value: item
					}
				})
				this.mediaList = this.itemData.picture ? this.itemData.picture.split(',') : []
				this.picture = this.mediaList
				console.log('this.mediaList', this.mediaList)
				this.itemId = this.itemData.id
			}
		},
		methods: {
			onchange(e) {
				this.place = []
				e.detail.value.forEach(item => {
					return this.place.push(item.text)
				})
				this.place = this.place.toString()
			},
			keyboardheightchange(event) {
				this.bottomHeight = event.detail.height
			},
			// 文件上传
			handleUploadFile(file) {
				this.picture = file
			},
			// 发布
			handlePublish() {
				this.keydata++;
				this.$refs.uForm.validate().then(valid => {
					if (valid) {
						if (this.itemId) {
							let param = {
								id: this.itemId,
								realPrice: this.userInfo.realPrice,
								saleType: this.userInfo.saleType + "",
								place: typeof(this.place) == "string" ? this.place : this.place.map(item => {
									return item.text
								}).toString(),
								content: this.content,
								picture: this.picture.toString(),
								phone: this.userInfo.phone
							}
							if (!!this.picture.toString() && !!this.content) {
								updateUnused(param).then(res => {
									if (res.code === 200) {
										uni.showToast({
											title: '编辑成功',
											icon: 'success',
											duration: 2000
										})
										uni.switchTab({
											url: "/pages/unused/index"
										})
									}
								})
							} else {
								uni.showToast({
									title: '有描述和图片/视频才能发布哦~',
									icon: 'none',
									duration: 2000
								})
							}
						} else {
							let param = {
								realPrice: this.userInfo.realPrice,
								saleType: this.userInfo.saleType + "",
								place: typeof(this.place) == "string" ? this.place : this.place.map(item => {
									return item.text
								}).toString(),
								content: this.content,
								picture: this.picture.toString(),
								phone: this.userInfo.phone
							}
							if (!!this.picture.toString() && !!this.content) {
								addUnused(param).then(res => {
									if (res.code === 200) {
										uni.showToast({
											title: '发布成功',
											icon: 'success',
											duration: 2000
										})
										uni.switchTab({
											url: "/pages/unused/index"
										})
									}
								})
							} else {
								uni.showToast({
									title: '有描述和图片/视频才能发布哦~',
									icon: 'none',
									duration: 2000
								})
							}
						}
					} else {
						console.log('验证失败');
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.publish-page {
		background-color: #F3F6F5;
		height: 100vh;

		.container {
			padding: 24rpx 15rpx;
			max-height: calc(100vh - 198rpx);
			overflow-y: auto;

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
					width: 80%;
					height: 46rpx;
					background: #F1F1F1;
					border-radius: 20rpx;
					margin-top: 32rpx;
					box-sizing: border-box;
					padding: 0rpx 14rpx;

					display: flex;
					align-items: center;
					justify-content: flex-start;

					.dingwei {
						width: 18rpx;
						height: 21rpx;
					}

					::v-deep .input-value-border {
						width: 100%;
						border: none;
					}

					::v-deep .arrow-area {
						display: none !important;
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
			position: fixed;
			bottom: 0;
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