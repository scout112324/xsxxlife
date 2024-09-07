<template>
	<view class="feedback-page">
		<view class="content">
			<uni-forms :model="form" ref="form" :rules="rules" label-position="top" label-width="380rpx">
				<uni-forms-item label="问题分类" name="type">
					<uni-data-checkbox mode="tag" selectedColor="#FFD100" selectedTextColor="#353535"
						v-model="form.type" multiple :localdata="types" />
				</uni-forms-item>
				<uni-forms-item label="详情描述" name="desc">
					<uni-easyinput type="textarea" :maxlength="200" v-model="form.desc"
						placeholder="您在哪个页面，遇到了哪些问题，详细描述有利于更快的解决哦～" />
				</uni-forms-item>
				<uni-forms-item label="上传问题图片/视频(1/3)">
					<caremaItem :pageType="pageType" :cameraNumber="cameraNumber" @handleUploadFile="handleUploadFile">
					</caremaItem>
				</uni-forms-item>
				<uni-forms-item label="联系方式" name="phone">
					<uni-easyinput v-model="form.phone" placeholder="请输入联系方式~" />
				</uni-forms-item>
				<uni-forms-item label="客服联系微信" class="copy-phone" label-width="200rpx">
					<view class="phone">
						{{wx}}
					</view>
					<uni-button type="primary" class="uni-btn" @tap="handleCopy('puqzzz')">
						<image src="../../../static/user/fuzhi.png" mode="aspectFit"
							style="width: 26rpx; height: 26rpx;margin-right: 8rpx; ">
						</image>
						复制
					</uni-button>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="footer">
			<u-button text="提交" @click="handleSubmitClick"></u-button>
		</view>
	</view>
</template>

<script>
	import caremaItem from "@/components/camera_item.vue"
	import {
		addAdvice
	} from "@/api/user/index.js"
	import {
		concatJob
	} from "@/api/index/index.js"
	export default {
		components: {
			caremaItem
		},
		options: {
			styleIsolation: 'shared',
		},
		data() {
			return {
				form: {
					type: [5],
					desc: '',
					phone: ""
				},
				rules: {},
				types: [{
					text: '附近社群',
					value: '附近社群'
				}, {
					text: '兼职',
					value: '兼职'
				}, {
					text: '房屋转让',
					value: '房屋转让'
				}, {
					text: '寻人寻物',
					value: '寻人寻物'
				}, {
					text: '闲置交易',
					value: '闲置交易'
				}, {
					text: '大件清运',
					value: '大件清运'
				}, {
					text: '开锁',
					value: '开锁'
				}, {
					text: '通下水道',
					value: '通下水道'
				}, {
					text: '家电维修',
					value: '家电维修'
				}, {
					text: '维修水电',
					value: '维修水电'
				}, {
					text: '防水漏水',
					value: '防水漏水'
				}],
				imgList: [],
				pageType: "feedback",
				cameraNumber: 3,
				picture: [],
				wx: ""
			}
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules)
		},
		onShow() {
			this.getConcatJob()
		},
		methods: {
			getConcatJob() {
				concatJob().then(res => {
					if (res.code === 200) {
						console.log("concatJob", res.data)
						this.wx = res.data.wx
					}
				})
			},
			// 文件上传
			handleUploadFile(file) {
				this.picture = file
			},
			handleSubmitClick() {
				this.$refs.form.validate().then(valid => {
					if (valid) {
						let params = {
							type: this.form.type.toString(),
							content: this.form.desc,
							phone: this.form.phone,
							picture: this.picture.toString(),
						}
						addAdvice(params).then(res => {
							if (res.code == 200) {
								uni.showToast({
									title: '反馈成功',
									icon: 'success',
									duration: 2000
								})
								uni.switchTab({
									url: "/pages/user/index"
								})
							}
						})
					}
				})
			},
			// 复制
			handleCopy(value) {
				//提示模板
				uni.showModal({
					content: value, //模板中提示的内容
					confirmText: '复制内容',
					showCancel: false,
					success: () => { //点击复制内容的后调函数
						uni.setClipboardData({
							data: value, //要被复制的内容
							success: () => { //复制成功的回调函数
								uni.showToast({ //提示
									title: '复制成功'
								})
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.feedback-page {
		background-color: #ffffff;
		box-sizing: border-box;

		.content {
			margin: 10rpx 32rpx;

			::v-deep .uni-data-checklist .checklist-group .checklist-box.is--tag {
				border-radius: 22rpx;
			}

			::v-deep .is-input-border {
				border: 0 solid #F1F1F1;
				border-radius: 10rpx;
			}

			::v-deep .uni-easyinput__content-textarea {
				background-color: #F1F1F1;
				margin: 0;
				padding: 20rpx;
			}

			::v-deep .uni-easyinput__content-input {
				background-color: #F1F1F1;
			}

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

			::v-deep .uni-forms-item__content {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			::v-deep .uni-btn {
				border: 1rpx solid #D8D8D8;
				border-radius: 42rpx;
				padding: 14rpx 25rpx;
				height: 55rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
			}

			::v-deep .uni-forms-item:last-child {
				flex-direction: row !important;
				align-items: center;
			}

			::v-deep .uni-forms-item__content:last-child {
				padding-bottom: 8rpx;
			}
		}

		.footer {
			text-align: center;
			border-top: 1px solid #D8D8D8;
			padding: 30rpx 0;

			::v-deep .u-button {
				width: 720rpx;
				height: 82rpx;
				background: #FFD100;
				border-radius: 40rpx;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(255, 209, 0, 0.31);
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