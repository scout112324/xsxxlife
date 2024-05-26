<template>
	<view class="detail-page">
		<view class="container">
			<view class="title">
				{{itemData.title}}
			</view>
			<view class="content" v-html="itemData.content"></view>
			<view class="product-image" v-if="pictureList && pictureList.length>0">
				<block v-for="(item,index) in pictureList" :key="index">
					<image v-if="imgType.includes(item.substr(item.lastIndexOf('.') + 1, item.length).toLowerCase())"
						class="image" :src="item" mode="widthFix">
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
				<view class="item" @click.stop>
					<button class="share" open-type="share">
						<image class="image" src="../../../static/components/zhuanfa.png" mode=""></image>
						<text class="num">{{itemData.giveCount || 0}}</text>
					</button>
				</view>
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
			this.pictureList = this.itemData.picture ? this.itemData.picture.split(',') : []
		},
		data() {
			return {
				imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
				itemData: {},
				showCommentInput: false,
				pageType: "message",
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
							type: 6,
							moduleId: this.itemData.id,
							content: e,
							level: this.level,
							id: this.childId
						}
						addComment(params).then(res => {
							if (res.code === 200) {
								this.$refs.commentRef.getListComment()
								this.itemData.commentCount += 1
								uni.$emit('changeMessage')
								uni.showToast({
									title: '评论成功',
									icon: 'success',
									duration: 2000
								})
							}
						})
					} else {
						let params = {
							type: 6,
							moduleId: this.itemData.id,
							content: e,
							level: this.level,
						}
						addComment(params).then(res => {
							if (res.code === 200) {
								this.$refs.commentRef.getListComment()
								this.itemData.commentCount += 1
								uni.$emit('changeMessage')
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
			// 点赞
			handleSupport(item) {
				this.supportParams = {
					type: 6,
					moduleId: item.id
				}
				if (!!item.support) {
					cancelSupport(this.supportParams).then(res => {
						if (res.code === 200) {
							uni.$emit('changeMessage')
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
							uni.$emit('changeMessage')
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
					type: 6,
					moduleId: item.id
				}
				if (!!item.star) {
					cancelStar(this.starParams).then(res => {
						if (res.code === 200) {
							uni.$emit('changeMessage')
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
							uni.$emit('changeMessage')
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
		}
	}
</script>

<style lang="scss" scoped>
	.detail-page {
		background-color: #F3F6F5;
		font-family: PingFangSC-Medium, PingFang SC;

		.container {
			background-color: #ffffff;
			padding: 32rpx 30rpx 20rpx 30rpx;

			.title {
				font-size: 38rpx;
				font-weight: bold;
				color: #000000;
				margin-bottom: 32rpx;
			}

			.content {
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #232624;
				line-height: 44rpx;
				margin: 25rpx 0;
				min-height: 650rpx;
			}

			.product-image {
				display: flex;
				flex-direction: column;
				align-items: center;

				.image {
					width: 689rpx;
					// height: 659rpx;
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
				justify-content: space-between;
				width: 100%;

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
						font-weight: 500;
						color: #232624;
						line-height: 33rpx;
					}

					.share {
						display: flex;
						align-items: center;
						background-color: transparent;
						padding: 0;

						&::after {
							border: none;
						}

						.image {
							width: 40rpx;
							height: 40rpx;
							margin-right: 12rpx;
						}

						.num {
							font-size: 24rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #232624;
							line-height: 33rpx;
						}
					}
				}
			}
		}
	}
</style>