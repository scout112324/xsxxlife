<template>
	<view class="uni-uploader__files">
		<!-- 图片 -->
		<block v-for="(image,index) in imageList" :key="index">
			<view class="uni-uploader__file">
				<view class="icon iconfont icon-cuo" @tap="delect(index)"></view>
				<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage">
				</image>
			</view>
		</block>
		<!-- 视频 -->
		<view class="uni-uploader__file" v-if="src">
			<view class="uploader_video">
				<view class="icon iconfont icon-cuo" @tap="delectVideo"></view>
				<video :src="src" class="video"></video>
			</view>
		</view>
		<view class="uni-uploader__input-box" v-if="VideoOfImagesShow">
			<view class="uni-uploader__input" @tap="chooseVideoImage">
				<image src="../../../static/unused/tupian.png" mode="" style="width: 80rpx;height: 80rpx;">
				</image>
				<text class="title">添加图片/视频</text>
			</view>
		</view>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	export default {
		data() {
			return {
				imageList: [], //图片
				src: "", //视频存放
				sourceTypeIndex: 2,
				checkedValue: true,
				checkedIndex: 0,
				sourceType: ['拍摄', '相册', '拍摄或相册'],
				cameraList: [{
						value: 'back',
						name: '后置摄像头',
						checked: 'true'
					},
					{
						value: 'front',
						name: '前置摄像头'
					},
				],
				cameraIndex: 0,
				VideoOfImagesShow: true,
			}
		},
		onUnload() {
			this.src = '',
				this.sourceTypeIndex = 2,
				this.sourceType = ['拍摄', '相册', '拍摄或相册'];
		},
		methods: {
			chooseVideoImage() {
				console.log("选择文件类型")
				uni.showActionSheet({
					title: "选择上传类型",
					itemList: ['图片', '视频'],
					success: (res) => {
						console.log(res)
						if (res.tapIndex == 0) {
							this.chooseImages()
						} else {
							this.chooseVideo()
						}
					}
				})
			},
			chooseImages() {
				// 上传图片
				uni.chooseImage({
					count: 3, //默认9
					// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						console.log(res)
						let igmFile = res.tempFilePaths;
						uni.uploadFile({
							url: this.config.fileUrl,
							method: "POST",
							header: {
								'Authorization': 'bearer ' + uni.getStorageSync('token'),
								'Content-Type': 'multipart/form-data'
							},
							filePath: igmFile[0],
							name: 'file',
							success: (res) => {
								let imgUrls = JSON.parse(res.data); //微信和头条支持
								this.imagesUrlPath = this.imagesUrlPath.concat(imgUrls.result
									.filePath);
								this.imageList = this.imageList.concat(imgUrls.result
									.filePath); //微信
								if (this.imageList.length >= 4) {
									this.VideoOfImagesShow = false;
								} else {
									this.VideoOfImagesShow = true;
								}
							}
						})
					},
				});
			},
			chooseVideo() {
				// 上传视频
				uni.chooseVideo({
					maxDuration: 60,
					count: 1,
					camera: this.cameraList[this.cameraIndex].value,
					sourceType: ['album'],
					success: (responent) => {
						console.log(responent)
						let videoFile = responent.tempFilePath;
						uni.uploadFile({
							url: this.config.fileUrl,
							method: "POST",
							header: {
								'Authorization': 'bearer ' + uni.getStorageSync('token')
							},
							filePath: videoFile,
							name: 'file',
							success: (res) => {
								let videoUrls = JSON.parse(res.data) //微信和头条支持
								this.imagesUrlPath = this.imagesUrlPath.concat(videoUrls.result
									.filePath);
								this.src = videoUrls.result.filePath; //微信
								if (this.src) {
									this.itemList = ['图片']
								} else {
									this.itemList = ['图片', '视频']
								}

							}
						})
					}
				})
			},
			previewImage: function(e) {
				//预览图片
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			delect(index) {
				uni.showModal({
					title: "提示",
					content: "是否要删除该图片",
					success: (res) => {
						if (res.confirm) {
							this.imageList.splice(index, 1)
						}
					}
				})
			},
			delectVideo() {
				uni.showModal({
					title: "提示",
					content: "是否要删除此视频",
					success: (res) => {
						if (res.confirm) {
							this.src = ''
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-uploader__files {
		width: 212rpx;
		height: 212rpx;
		background: #F1F1F1;
		border-radius: 20rpx;

		.uni-uploader__file,
		.uni-uploader__input-box,
		.uni-uploader__input {
			width: 100%;
			height: 100%;
		}

		.uni-uploader__input {
			width: 200rpx !important;
			height: 200rpx !important;
			background: #F1F1F1;
			border-radius: 20rpx !important;
			align-items: center;

			display: flex;
			flex-direction: column;
			justify-content: center;

			.title {
				margin-top: 15rpx;
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #707070;
				line-height: 30rpx;
			}
		}
	}
</style>