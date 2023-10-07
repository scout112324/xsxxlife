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
					<!-- <u-upload ref="upload" :fileList="imgList" @afterRead="handUpload" @delete="deletePic" name="1"
						multiple :maxCount="9" previewFullImage>
						<view class="image-container">
							<image src="../../../static/unused/tupian.png" mode="" style="width: 80rpx;height: 80rpx;">
							</image>
							<text class="title">添加图片/视频</text>
						</view>
					</u-upload> -->
				</view>
				<view class="address">
					<image class="dingwei" src="../../../static/home/dingwei.png" mode=""></image>
					<text class="address-name">上海市静安区</text>
					<image class="tiaozhuan" src="../../../static/unused/tiaozhuan.png" mode=""></image>
				</view>
			</view>
			<view class="message">
				<u--form labelPosition="left" :model="model1" :rules="rules" ref="uForm" labelWidth="240rpx">
					<u-form-item label="闲置类型" prop="userInfo.type" borderBottom @click="showType = true;">
						<u--input v-model="model1.userInfo.type" disabled disabledColor="#ffffff" placeholder="请选择"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="产品价格" prop="userInfo.price" borderBottom>
						<u--input v-model="model1.userInfo.price" border="none" placeholder="请填写产品价格"></u--input>
					</u-form-item>
					<u-form-item label="选择交易方式" prop="userInfo.way" borderBottom labelPosition="top">
						<u-checkbox-group v-model="checkboxValue" @change="checkboxChange">
							<u-checkbox :customStyle="{marginRight: '16rpx'}" v-for="(item, index) in checkboxList"
								:key="index" :label="item.name" :name="item.name">
							</u-checkbox>
						</u-checkbox-group>
					</u-form-item>
					<u-form-item label="手机号" prop="userInfo.phone" borderBottom>
						<u--input v-model="model1.userInfo.phone" border="none" placeholder="请填写你的手机号码"></u--input>
					</u-form-item>
				</u--form>
				<u-action-sheet :show="showType" :actions="actions" title="请选择闲置类型" @close="showType = false"
					@select="typeSelect">
				</u-action-sheet>
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
				// imgList: [],
				showType: false,
				model1: {
					userInfo: {
						price: '',
						phone: '',
						type: '',
					},
				},
				actions: [{
						name: '男',
					},
					{
						name: '女',
					}
				],
				checkboxValue: [],
				checkboxList: [{
						name: '通过平台',
						disabled: false
					},
					{
						name: '线下个人交易',
						disabled: false
					}
				],
				rules: {
					'userInfo.price': {
						required: true,
						message: '请填写产品价格',
						// blur和change事件触发检验
						trigger: ['blur', 'change'],
					},
					'userInfo.phone': [{
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
					'userInfo.type': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择闲置类型',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false
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
			// 手动上传
			// handUpload(event) {
			// 	// if(event.file && event.file.length>0) {
			// 	// 	event.file.forEach(item=>{
			// 	// 		this.imgList.push(item.url)
			// 	// 	})
			// 	// }
			// 	// console.log(event)
			// 	// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			// 	let chooseList = [].concat(event.file) // 当前选中列表
			// 	// 将选中的文件添加到文件列表
			// 	chooseList.map((item) => {
			// 		this.imgList.push({
			// 			...item,
			// 			status: '',
			// 			message: ''
			// 		})
			// 	})
			// },
			// deletePic(event) {
			// 	this.imgList.splice(event.index, 1);
			// },
			// 发布
			handlePublish() {
				console.log("fabu")
			},
			typeSelect(e) {
				this.model1.userInfo.type = e.name
				this.$refs.uForm.validateField('userInfo.type')
			},
			checkboxChange(n) {
				console.log('change', n);
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
				height: 479rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;
				margin: 20rpx 0;
				padding: 0 30rpx;

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