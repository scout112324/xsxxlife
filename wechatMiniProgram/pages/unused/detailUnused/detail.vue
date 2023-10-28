<template>
	<view class="detail-page">
		<view class="container">
			<view class="header">
				<view class="user-info">
					<image v-if="itemData.photo" class="avatar" :src="itemData.photo" mode=""></image>
					<image v-else class="avatar"
						src="https://tupian.qqw21.com/article/UploadPic/2021-3/202132022173036062.png" mode=""></image>
					<view class="info">
						<view class="nickname">
							{{itemData.nickname || '暂无'}}
						</view>
						<view class="address">
							{{itemData.place || '暂无'}}
						</view>
					</view>
				</view>
				<view class="share">
					<uni-button type="primary" class="uni-btn" @click="handleShareClick">
						<image src="../../../static/components/zhuanfa.png" mode="aspectFit"
							style="width: 25rpx; height: 25rpx;margin-right: 8rpx; ">
						</image>
						分享
					</uni-button>
				</view>
			</view>
			<view class="price">
				<text class="unit">¥</text>
				<text class="num">{{itemData.price || '暂无'}}</text>
			</view>
			<view class="content">
				{{itemData.content || '暂无'}}
			</view>
			<view class="product-image" v-if="pictureList && pictureList.length>0">
				<block v-for="(item,index) in pictureList" :key="index">
					<image v-if="imgType.includes(item.substr(item.lastIndexOf('.') + 1, item.length).toLowerCase())"
						class="image" :src="item" mode="">
					</image>
					<video v-else class="image" :src="item" controls></video>
				</block>
			</view>
		</view>
		<view class="comments" v-if="itemData.id">
			<comment :pageType="pageType" :moduleId="itemData.id" ref="commentRef" @focusInput="focusInput">
			</comment>
		</view>
		<commentInput @inputs="inputs" v-if="showCommentInput"></commentInput>
		<view class="footer">
			<view class="btns">
				<view class="item" @click="handleSupport(itemData)">
					<image v-if="itemData.support" class="icon" src="../../../static/components/dianzan_set.png"
						mode="">
					</image>
					<image v-else class="icon" src="../../../static/components/dianzan.png" mode=""></image>
					<view class="num">
						{{itemData.supportCount || 0}}
					</view>
				</view>
				<view class="item" @click="handleStar(itemData)">
					<image v-if="itemData.star" class="icon" src="../../../static/components/shoucang_set.png" mode="">
					</image>
					<image v-else class="icon" src="../../../static/components/shoucang.png" mode=""></image>
					<view class="num">
						{{itemData.starCount || 0}}
					</view>
				</view>
				<view class="item" @click="handleComment">
					<image class="icon" src="../../../static/components/pinglun.png" mode=""></image>
					<view class="num">
						{{itemData.commentCount || 0}}
					</view>
				</view>
			</view>
			<view class="communicate">
				<u-button text="立即下单" @click="handleCommuniteClick"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import comment from "@/components/comment.vue"
	import commentInput from "@/components/commentInput.vue"
	import {
		addSupport,
		cancelSupport,
		addStar,
		cancelStar,
		addComment,
		addGive
	} from "@/api/common.js"
	export default {
		components: {
			comment,
			commentInput
		},
		onLoad(options) {
			this.itemData = JSON.parse(decodeURIComponent(options.itemData))
			this.pictureList = this.itemData?.picture.split(',')
		},
		data() {
			return {
				imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
				itemData: {},
				showCommentInput: false,
				pageType: "unused",
				level: 0,
				childId: "",
				pictureList: [],
			}
		},
		methods: {
			handleComment() {
				this.$refs.commentRef.handleFocus()
			},
			inputs(e) {
				this.showCommentInput = false
				if (e) {
					if (this.childId) {
						let params = {
							type: 3,
							moduleId: this.itemData.id,
							content: e,
							level: this.level,
							id: this.childId
						}
						addComment(params).then(res => {
							if (res.code === 200) {
								this.$refs.commentRef.getListComment()
								uni.$emit('changeUnused')
								this.itemData.commentCount += 1
								uni.showToast({
									title: '评论成功',
									icon: 'success',
									duration: 2000
								})
							}
						})
					} else {
						let params = {
							type: 3,
							moduleId: this.itemData.id,
							content: e,
							level: this.level,
						}
						addComment(params).then(res => {
							if (res.code === 200) {
								this.$refs.commentRef.getListComment()
								uni.$emit('changeUnused')
								this.itemData.commentCount += 1
								uni.showToast({
									title: '评论成功',
									icon: 'success',
									duration: 2000
								})
							}
						})
					}
				}

			},
			focusInput(level, id) {
				this.showCommentInput = true
				this.level = level
				this.childId = id
			},
			handleShareClick() {},
			handleCommuniteClick() {},
			// 点赞
			handleSupport(item) {
				this.supportParams = {
					type: 3,
					moduleId: item.id
				}
				if (!!item.support) {
					cancelSupport(this.supportParams).then(res => {
						if (res.code === 200) {
							uni.$emit('changeUnused')
							this.itemData.support = !this.itemData.support
							this.itemData.supportCount -= 1
							uni.showToast({
								title: '取消点赞',
								icon: 'success',
								duration: 2000
							})
						}
					})
				} else {
					addSupport(this.supportParams).then(res => {
						if (res.code === 200) {
							uni.$emit('changeUnused')
							this.itemData.support = !this.itemData.support
							this.itemData.supportCount += 1
							uni.showToast({
								title: '点赞成功',
								icon: 'success',
								duration: 2000
							})
						}
					})
				}
			},
			// 收藏
			handleStar(item) {
				this.starParams = {
					type: 3,
					moduleId: item.id
				}
				if (!!item.star) {
					cancelStar(this.starParams).then(res => {
						if (res.code === 200) {
							uni.$emit('changeUnused')
							this.itemData.star = !this.itemData.star
							this.itemData.starCount -= 1
							uni.showToast({
								title: '取消收藏',
								icon: 'success',
								duration: 2000
							})
						}
					})
				} else {
					addStar(this.starParams).then(res => {
						if (res.code === 200) {
							uni.$emit('changeUnused')
							this.itemData.star = !this.itemData.star
							this.itemData.starCount += 1
							uni.showToast({
								title: '收藏成功',
								icon: 'success',
								duration: 2000
							})
						}
					})
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.detail-page {
		background-color: #F3F6F5;

		.container {
			background-color: #ffffff;
			padding: 46rpx 30rpx 20rpx 30rpx;

			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.user-info {
					display: flex;
					align-items: center;

					.avatar {
						width: 72rpx;
						height: 72rpx;
						border-radius: 36rpx;
					}

					.info {
						margin-left: 14rpx;

						.nickname {
							font-size: 30rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #232624;
							line-height: 42rpx;
						}

						.address {
							margin-top: 6rpx;
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #707070;
							line-height: 33rpx;
						}
					}

				}

				.share {
					::v-deep .uni-btn {
						height: 59rpx;
						background: #FFD100;
						border-radius: 30rpx;

						padding: 14rpx 25rpx;
						box-sizing: border-box;
						display: flex;
						align-items: center;
					}
				}
			}

			.price {
				padding-top: 25rpx;
				font-size: 26rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #D30303;

				.num {
					font-size: 46rpx;
				}
			}

			.content {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #232624;
				line-height: 44rpx;
				margin: 25rpx 0;
			}

			.product-image {
				display: flex;
				flex-direction: column;
				align-items: center;

				.image {
					width: 689rpx;
					height: 659rpx;
					border-radius: 10rpx;
					margin-bottom: 20rpx;
				}
			}
		}

		.comments {
			background-color: #ffffff;
		}

		.footer {
			background-color: #ffffff;
			padding: 0 34rpx;
			margin-top: 24rpx;
			height: 157rpx;

			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #D8D8D;

			.btns {
				display: flex;
				align-items: center;

				.item {
					display: flex;
					align-items: center;
					margin-right: 43rpx;

					.icon {
						width: 33rpx;
						height: 35rpx;
					}

					.num {
						margin-left: 15rpx;
						font-size: 24rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #232624;
						line-height: 33rpx;
					}
				}
			}

			.communicate {
				::v-deep .u-button {
					width: 224rpx;
					height: 74rpx;
					background: #FFD100;
					border-radius: 46rpx;
					border: 0 solid rgba(255, 209, 0, 0.31);
				}

				::v-deep .u-button__text {
					font-size: 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #232624;
				}
			}
		}
	}
</style>