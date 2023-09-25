<template>
	<view class="feedback-page">
		<view class="content">
			<uni-forms :model="form" ref="form" label-position="top" label-width="380rpx">
				<uni-forms-item label="问题分类">
					<uni-data-checkbox mode="tag" selectedColor="#FFD100" selectedTextColor="#353535"
						v-model="form.type" multiple :localdata="types" />
				</uni-forms-item>
				<uni-forms-item label="详情描述">
					<uni-easyinput type="textarea" :maxlength="200" v-model="form.desc"
						placeholder="您在哪个页面，遇到了哪些问题，详细描述有利于更快的解决哦～" />
				</uni-forms-item>
				<uni-forms-item label="上传问题图片/视频(1/3)">
					<u-upload ref="upload" :fileList="imgList" @afterRead="handUpload" @delete="deletePic" name="1"
						multiple :maxCount="9" previewFullImage>
						<view class="image-container">
							<image src="../../../static/unused/tupian.png" mode="" style="width: 80rpx;height: 80rpx;">
							</image>
							<text class="title">添加图片/视频</text>
						</view>
					</u-upload>
				</uni-forms-item>
				<uni-forms-item label="联系方式">
					<uni-easyinput v-model="form.phone" placeholder="请输入联系方式~" />
				</uni-forms-item>
				<uni-forms-item label="客服联系微信" class="copy-phone" label-width="180rpx">
					<view class="phone">
						18909878909
					</view>
					<uni-button type="primary" class="uni-btn" @tap="handleCopy('18909878909')">
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
	export default {
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
				types: [{
					text: '附近社群',
					value: 0
				}, {
					text: '兼职',
					value: 1
				}, {
					text: '房屋转让',
					value: 2
				}, {
					text: '寻人寻物',
					value: 3
				}, {
					text: '闲置交易',
					value: 4
				}, {
					text: '大件清运',
					value: 5
				}, {
					text: '开锁',
					value: 6
				}, {
					text: '通下水道',
					value: 7
				}, {
					text: '家电维修',
					value: 8
				}, {
					text: '维修水电',
					value: 9
				}, {
					text: '放水漏水',
					value: 10
				}],
				imgList: [],
			}
		},
		methods: {
			// 手动上传
			handUpload(event) {
				// if(event.file && event.file.length>0) {
				// 	event.file.forEach(item=>{
				// 		this.imgList.push(item.url)
				// 	})
				// }
				// console.log(event)
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let chooseList = [].concat(event.file) // 当前选中列表
				// 将选中的文件添加到文件列表
				chooseList.map((item) => {
					this.imgList.push({
						...item,
						status: '',
						message: ''
					})
				})
			},
			deletePic(event) {
				this.imgList.splice(event.index, 1);
			},
			handleSubmitClick() {},
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