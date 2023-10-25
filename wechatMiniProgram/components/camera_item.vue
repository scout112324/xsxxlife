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
			}
		},
		data() {
			return {
				imageList: [
					"https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0",
					"https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0"
				], //图片
				videoList: ["http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"], //视频存放
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
						uni.uploadFile({
							url: uploadFiles().url,
							method: "POST",
							header: {
								'Content-Type': 'multipart/form-data'
							},
							filePath: igmFile[0],
							name: 'files',
							success: (res) => {
								console.log('chooseImage',res)
								let imgUrls = JSON.parse(res.data); //微信和头条支持
								this.imagesUrlPath = this.imagesUrlPath.concat(imgUrls.result
									.filePath);
								this.imageList = this.imageList.concat(imgUrls.result
									.filePath); //微信
								if (this.imageList.length + this.videoList.length >= this
									.cameraNumber) {
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
								if(videoData.code===200) {
									let videoUrl = videoData.data.url
									this.videoList.push(videoUrl); //微信
									if (this.videoList.length + this.imageList.length >= this
										.cameraNumber) {
										this.VideoOfImagesShow = false
									} else {
										this.VideoOfImagesShow = true
									}
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
							this.videoList.splice(index, 1)
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
			&:nth-child(8) {
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