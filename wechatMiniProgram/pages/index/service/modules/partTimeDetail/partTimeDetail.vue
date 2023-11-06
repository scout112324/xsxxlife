<template>
	<view class="detail-page">
		<view class="container">
			<view class="title">
				{{itemData.title}}
			</view>
			<view class="tags">
				<block v-for="(item,index) in label" :key="index">
					<uni-tag :text="item" style="margin-right: 10rpx;" />
				</block>
			</view>
			<view class="price">
				<text class="num">{{itemData.price}}</text>
			</view>
			<view class="header">
				<view class="user-info">
					<image v-if="itemData.photo" class="avatar" :src="itemData.photo" mode=""></image>
					<image v-else class="avatar"
						src="https://tupian.qqw21.com/article/UploadPic/2021-3/202132022173036062.png" mode=""></image>
					<view class="info">
						<view class="nickname">
							{{itemData.nickname}}
						</view>
						<view class="address">
							{{itemData.place}}
						</view>
					</view>
				</view>
				<view class="share">
					<uni-button class="item item_wx" style="margin-right: 20rpx;" @tap="handleCopy(itemData.wx)">
						<image class="icon" src="../../../../../static/home/weixin.png" mode=""></image>
						<text class="title">微信联系</text>
					</uni-button>
					<button class="item item_tel" @click="handlePhoneCall(itemData.phone)">
						<image class="icon" src="../../../../../static/home/dianhua.png" mode=""></image>
						<text class="title">电话联系</text>
					</button>
				</view>
			</view>
			<view class="content">
				<view class="title">
					职位详情
				</view>
				<view class="condition">
					【工作内容】
					<view class="item">
						{{itemData.jobContent}}
					</view>
					【薪资待遇】
					<view class="item">
						{{itemData.priceContent}}
					</view>
					【工作时间】
					<view class="item">
						{{itemData.timeContent}}
					</view>
					【用工要求】
					<view class="item">
						{{itemData.needContent}}
					</view>
				</view>
			</view>
		</view>
		<view class="person-info">
			<view class="address">
				工作地址
			</view>
			<view class="info-item">
				<image class="icon" src="../../../../../static/home/dingwei.png" mode=""></image>
				<view class="item">
					{{itemData.detailsPlace}}
				</view>
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
					<image v-if="itemData.support" class="icon" src="../../../../../static/components/dianzan_set.png"
						mode="">
					</image>
					<image v-else class="icon" src="../../../../../static/components/dianzan.png" mode=""></image>
					<view class="num">
						{{itemData.supportCount || 0}}
					</view>
				</view>
				<view class="item" @click="handleStar(itemData)">
					<image v-if="itemData.star" class="icon" src="../../../../../static/components/shoucang_set.png"
						mode="">
					</image>
					<image v-else class="icon" src="../../../../../static/components/shoucang.png" mode=""></image>
					<view class="num">
						{{itemData.starCount || 0}}
					</view>
				</view>
				<view class="item" @click="handleComment">
					<image class="icon" src="../../../../../static/components/pinglun.png" mode=""></image>
					<view class="num">
						{{itemData.commentCount || 0}}
					</view>
				</view>
			</view>
			<view class="communicate">
				<!-- <u-button text="立即报名" @click="handleCommuniteClick"></u-button> -->
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
			this.label = this.itemData.label ? this.itemData.label.split(',') : []
		},
		data() {
			return {
				itemData: {},
				showCommentInput: false,
				pageType: "partTime",
				level: 0,
				childId: "",
				label: []
			}
		},
		methods: {
			// 拨打电话
			handlePhoneCall(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber: phoneNumber,
					success: (e) => {
						console.log(e)
					},
					fail: (e) => {
						console.log(e)
					}
				});
			},
			// 复制
			handleCopy(value) {
				//提示模板
				uni.showModal({
					content: value, //模板中提示的内容
					confirmText: '复制内容',
					showCancel: false,
					success: (res) => { //点击复制内容的后调函数
						uni.setClipboardData({
							data: value, //要被复制的内容
							success: () => { //复制成功的回调函数
								uni.showToast({ //提示
									title: '复制成功'
								})
							}
						});
					},
					fail: (err) => {
						// console.log(err)
					}
				});
			},
			handleComment() {
				this.$refs.commentRef.handleFocus()
			},
			inputs(e) {
				this.showCommentInput = false
				if (e) {
					if (this.childId) {
						let params = {
							type: 0,
							moduleId: this.itemData.id,
							content: e,
							level: this.level,
							id: this.childId
						}
						addComment(params).then(res => {
							if (res.code === 200) {
								this.$refs.commentRef.getListComment()
								uni.$emit('changeJobList')
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
							type: 0,
							moduleId: this.itemData.id,
							content: e,
							level: this.level,
						}
						addComment(params).then(res => {
							if (res.code === 200) {
								this.$refs.commentRef.getListComment()
								uni.$emit('changeJobList')
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
			handleCommuniteClick() {},
			// 点赞
			handleSupport(item) {
				this.supportParams = {
					type: 0,
					moduleId: item.id
				}
				if (!!item.support) {
					cancelSupport(this.supportParams).then(res => {
						if (res.code === 200) {
							uni.$emit('changeJobList')
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
							uni.$emit('changeJobList')
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
					type: 0,
					moduleId: item.id
				}
				if (!!item.star) {
					cancelStar(this.starParams).then(res => {
						if (res.code === 200) {
							uni.$emit('changeJobList')
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
							uni.$emit('changeJobList')
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
		font-family: PingFangSC-Regular, PingFang SC;

		.container {
			background-color: #ffffff;
			padding: 46rpx 30rpx 20rpx 30rpx;

			.title {
				font-size: 40rpx;
				font-weight: 500;
				color: #232624;
			}

			.tags {
				display: flex;
				align-items: center;
				margin: 36rpx 0;

				::v-deep .uni-tag {
					border-radius: 8rpx;
					border: 1rpx solid #FFD100;
					background-color: #FFF6CE;
					font-size: 24rpx;
					font-weight: 400;
					color: #855C15;
				}
			}

			.price {
				font-size: 40rpx;
				font-weight: 600;
				color: #D30303;
				margin-bottom: 36rpx;
			}

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
							font-weight: 500;
							color: #232624;
							line-height: 42rpx;
						}

						.address {
							margin-top: 6rpx;
							font-size: 24rpx;
							font-weight: 400;
							color: #707070;
							line-height: 33rpx;
						}
					}

				}

				.share {
					display: flex;
					align-items: center;

					.item {
						display: flex;
						flex-direction: column;
						align-items: center;

						.icon {
							width: 56rpx;
							height: 56rpx;
						}

						.title {
							font-size: 24rpx;
							font-weight: 400;
							color: #707070;
							margin-top: 10rpx;
						}
					}

					.item_wx {
						.title {
							margin-top: 20rpx;
						}
					}

					::v-deep .item_tel {
						background-color: transparent;
						margin-top: 18rpx;

						&::after {
							border: none;
						}
					}
				}
			}


			.content {


				.title {
					font-size: 40rpx;
					font-weight: 500;
					color: #232624;
					margin: 36rpx 0;
				}

				.condition {
					font-size: 28rpx;
					font-weight: 400;
					color: #4D504F;
					line-height: 44rpx;
				}
			}
		}

		.person-info {
			height: 208rpx;
			background: #FFFFFF;
			margin-top: 24rpx;
			padding: 36rpx 31rpx;
			box-sizing: border-box;

			.address {
				font-size: 40rpx;
				font-weight: 500;
				color: #232624;
				line-height: 56rpx;
			}

			.info-item {
				display: flex;
				align-items: center;
				margin: 36rpx 0;
				line-height: 44rpx;

				.icon {
					width: 30rpx;
					height: 31rpx;
					font-size: 28rpx;
					font-weight: 400;
					color: #4D504F;
					margin-right: 7rpx;
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
						font-weight: 500;
						color: #232624;
						line-height: 33rpx;
					}
				}
			}

			.communicate {
				::v-deep .u-button {
					width: 300rpx;
					height: 74rpx;
					background: #FFD100;
					border-radius: 46rpx;
					border: 0 solid rgba(255, 209, 0, 0.31);
				}

				::v-deep .u-button__text {
					font-size: 30rpx;
					font-weight: 500;
					color: #232624;
				}
			}
		}
	}
</style>