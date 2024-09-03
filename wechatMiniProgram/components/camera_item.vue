<template>
	<view class="uni-uploader__files">
		<!-- 图片 -->
		<block v-for="(image,index) in imageList" :key="index">
			<view class="uni-uploader__file">
				<view class="icon-cuo" @tap="delect(index)">
					<image class="close" src="../static/home/guanbi.png" mode=""></image>
				</view>
				<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage">
				</image>
			</view>
		</block>

		<!-- 视频 -->
		<block v-for="(video,index) in videoList" :key="index">
			<view class="uni-uploader__file">
				<view class="icon-cuo" @tap="delectVideo(index)">
					<image class="close" src="../static/home/guanbi.png" mode=""></image>
				</view>
				<video :src="video" class="video"></video>
			</view>
		</block>

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
	import {
		uploadFiles,
		uploadBatchFiles
	} from "@/api/upload.js"
	let sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	export default {
		props: {
			cameraNumber: {
				type: Number,
				default: 3
			},
			mediaList: {
				type: Array,
				default: []
			}
		},
		watch: {
			mediaList: {
				handler(newVal, oldVal) {
					if (newVal.length > 0) {
						newVal.forEach(item => {
							if (this.imgType.includes(item.substr(item.lastIndexOf('.') + 1, item.length)
									.toLowerCase())) {
								return this.imageList.push(item)
							} else {
								return this.videoList.push(item)
							}
						})
						this.fileList = this.imageList.concat(this.videoList)
					}
				},
				immediate: true
			}
		},
		data() {
			return {
				imageList: [], //图片
				videoList: [], //视频存放
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
				fileList: [],
				imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
			}
		},
		onReady() {
			if (this.imageList.length + this.videoList.length >= this.cameraNumber) {
				this.VideoOfImagesShow = false
			} else {
				this.VideoOfImagesShow = true
			}
		},
		onUnload() {
			this.sourceTypeIndex = 2;
			this.sourceType = ['拍摄', '相册', '拍摄或相册'];
		},
		methods: {
			chooseVideoImage() {
				uni.showActionSheet({
					title: "选择上传类型",
					itemList: ['图片', '视频'],
					success: (res) => {
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
					count: this.cameraNumber, //默认9
					// sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						let igmFile = res.tempFilePaths;
						igmFile.forEach(item => {
							return this.uploadImages(item)
						})
					},
					fail: (err) => {
						console.log("err", err)
					}
				});
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
						if (imgData.code === 200) {
							let imgUrl = imgData.data.url
							this.imageList.push(imgUrl); //微信
							this.fileList = this.imageList.concat(this.videoList)
							this.$emit('handleUploadFile', this.fileList)
							if (this.fileList.length >= this.cameraNumber) {
								this.VideoOfImagesShow = false;
							} else {
								this.VideoOfImagesShow = true;
							}
						}
					}
				})
			},
			chooseVideo() {
				// 上传视频
				uni.chooseVideo({
					maxDuration: 60,
					count: 1,
					camera: this.cameraList[this.cameraIndex].value,
					sourceType: ['album'],
					success: (responent) => {
						let videoFile = responent.tempFilePath;
						uni.uploadFile({
							url: uploadFiles().url,
							method: "POST",
							header: {
								'openId': uni.getStorageSync('openId')
							},
							filePath: videoFile,
							name: 'file',
							success: (res) => {
								let videoData = JSON.parse(res.data) //微信和头条支持
								if (videoData.code === 200) {
									let videoUrl = videoData.data.url
									this.videoList.push(videoUrl); //微信
									this.fileList = this.imageList.concat(this.videoList)
									if (this.fileList.length >= this.cameraNumber) {
										this.VideoOfImagesShow = false
									} else {
										this.VideoOfImagesShow = true
									}
									this.$emit('handleUploadFile', this.fileList)
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
							let result = this.imageList.splice(index, 1)
							let resPic = this.fileList.filter(item => {
								return item !== result[0]
							})
							this.$emit('handleUploadFile', resPic)
							if (this.imageList.length + this.videoList.length >= this.cameraNumber) {
								this.VideoOfImagesShow = false
							} else {
								this.VideoOfImagesShow = true
							}
						}
					}
				})
			},
			delectVideo(index) {
				uni.showModal({
					title: "提示",
					content: "是否要删除此视频",
					success: (res) => {
						if (res.confirm) {
							let result = this.videoList.splice(index, 1)
							let resPic = this.fileList.filter(item => {
								return item !== result[0]
							})
							this.$emit('handleUploadFile', resPic)
							if (this.imageList.length + this.videoList.length >= this.cameraNumber) {
								this.VideoOfImagesShow = false
							} else {
								this.VideoOfImagesShow = true
							}
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-uploader__files {
		border-radius: 20rpx;

		display: flex;
		flex-wrap: wrap;

		.uni-uploader__file,
		.uni-uploader__input-box,
		.uni-uploader__input {
			position: relative;
			width: 206rpx;
			height: 212rpx;
			box-sizing: border-box;

			&:nth-child(2),
			&:nth-child(5),
			&:nth-child(8),
			&:nth-child(11),
			&:nth-child(14),
			&:nth-child(17) {
				margin: 0 20rpx;
			}

			margin-bottom: 20rpx;

			.uni-uploader__img,
			.video {
				width: 100%;
				height: 100%;
			}

			.icon-cuo {
				position: absolute;
				right: 0rpx;
				top: 0rpx;
				z-index: 2;

				.close {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		.uni-uploader__input {
			width: 206rpx !important;
			height: 212rpx !important;
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