<template>
	<view class="publish-page">
		<view class="wrap-card">
			<scroll-view scroll-y class="scroll_view">
				<textarea adjust-position='false' auto-height @keyboardheightchange="keyboardheightchange"
					class="con-text" maxlength='-1' v-model="textContent" placeholder="请用几句话描述一下你要发布的内容…"></textarea>
			</scroll-view>
			<!-- 上传图片 -->
			<view class="wrap-img">
				<u-upload ref="upload" :fileList="imgList" @afterRead="handUpload" @delete="deletePic" name="1" multiple
					:maxCount="9" previewFullImage>
					<view class="image-container">
						<image src="../../../static/unused/tupian.png" mode="" style="width: 80rpx;height: 80rpx;">
						</image>
						<text class="title">添加图片/视频</text>
					</view>
				</u-upload>
			</view>
			<view class="address">
				<image class="dingwei" src="../../../static/home/dingwei.png" mode=""></image>
				<text class="address-name">上海市静安区</text>
				<image class="tiaozhuan" src="../../../static/unused/tiaozhuan.png" mode=""></image>
			</view>
		</view>
		<view class="message">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				textContent: "",
				imgList: []
			}
		},
		methods: {
			keyboardheightchange(event) {
				this.bottomHeight = event.detail.height
			},
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.publish-page {
		background-color: #F3F6F5;
		padding: 24rpx 15rpx;

		.wrap-card {
			min-height: 603rpx;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			border-radius: 20rpx;
			padding: 34rpx 30rpx;

			.scroll_view {
				height: 309rpx;

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

			
		}
	}
</style>