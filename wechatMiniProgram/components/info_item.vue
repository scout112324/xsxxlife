<template>
	<view class="item" @click="handleClick">
		<view class="avatar" v-if="showPrice">
			<image v-if="itemData.photo" class="image" :src="itemData.photo" mode="">
			</image>
			<image v-else class="image" src="../static/avatar.png" mode="">
			</image>
		</view>
		<view class="info">
			<view class="title" v-if="!showPrice">
				{{itemData.title}}
			</view>
			<view class="header" v-if="showPrice">
				<view class="left">
					<view class="nickname">
						{{itemData.nickname || '暂无'}}
					</view>
					<view class="address">
						{{itemData.place || '暂无'}}
					</view>
				</view>
				<view class="price" v-if="pageType!='findPeople'">
					<text class="unit">￥</text>
					<text>{{itemData.price || '暂无'}}</text>
				</view>
			</view>
			<view v-if="itemData.content" class="content" v-html="itemData.content"></view>
			<view v-else class="content">
				'暂无'
			</view>
			<view class="image-list" v-if="pictureList && pictureList.length>0" @click.stop>
				<block v-for="(item,index) in pictureList" :key="index">
					<image v-if="imgType.includes(item.substr(item.lastIndexOf('.') + 1, item.length).toLowerCase())"
						class="good" :src="item" mode="">
					</image>
					<video v-else class="good" :src="item" controls></video>
				</block>
			</view>
			<view class="footer">
				<view class="item" @click.stop="handleSupport(itemData)">
					<image v-if="itemData.support" class="image" src="../static/components/dianzan_set.png" mode="">
					</image>
					<image v-else class="image" src="../static/components/dianzan.png" mode=""></image>
					<text class="num">{{itemData.supportCount}}</text>
				</view>
				<view class="item" @click.stop="handleStar(itemData)">
					<image v-if="itemData.star" class="image" src="../static/components/shoucang_set.png" mode="">
					</image>
					<image v-else class="image" src="../static/components/shoucang.png" mode=""></image>
					<text class="num">{{itemData.starCount}}</text>
				</view>
				<view class="item">
					<image class="image" src="../static/components/pinglun.png" mode=""></image>
					<text class="num">{{itemData.commentCount}}</text>
				</view>
				<view class="item" @click.stop>
					<button class="share" open-type="share">
						<image class="image" src="../static/components/zhuanfa.png" mode=""></image>
						<text class="num">{{itemData.giveCount}}</text>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		addSupport,
		cancelSupport,
		addStar,
		cancelStar,
		addComment,
		addGive
	} from "@/api/common.js"
	export default {
		props: {
			pageType: String,
			showPrice: {
				type: Boolean,
				default: true
			},
			itemData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
				pictureList: [],
				supportParams: {},
				starParams: {}
			}
		},
		created() {
			console.log('this.itemData.picture', this.itemData)
			if (this.itemData && !this.itemData.picture) {
				this.pictureList = []
			} else if (this.itemData.picture.split(',').length > 2) {
				this.pictureList = this.itemData.picture.split(',').slice(0, 3)
			} else if (this.itemData.picture.split(',').length > 1) {
				this.pictureList = this.itemData.picture.split(',').slice(0, 2)
			} else {
				this.pictureList = this.itemData.picture.split(',')
			}
		},
		methods: {
			handleClick() {
				if (this.pageType == 'unused') {
					this.$emit('handleJumpDetail')
				} else if (this.pageType == 'message') {
					this.$emit('handleJumpMessageDetail')
				} else if (this.pageType == 'houseTransfer') {
					this.$emit('handleJumpHouseDetail')
				} else if (this.pageType == 'findPeople') {
					this.$emit('handleJumpFindDetail')
				} else if (this.pageType == 'largeShipmentTransfer') {
					this.$emit('handleJumpLargeDetail')
				}
			},
			// 点赞
			handleSupport(item) {
				if (this.pageType == 'unused') {
					this.supportParams = {
						type: 3,
						moduleId: item.id
					}
				} else if (this.pageType == 'message') {
					this.supportParams = {
						type: 6,
						moduleId: item.id
					}
				} else if (this.pageType == 'houseTransfer') {
					this.supportParams = {
						type: 1,
						moduleId: item.id
					}
				} else if (this.pageType == 'findPeople') {
					this.supportParams = {
						type: 2,
						moduleId: item.id
					}
				} else if (this.pageType == 'largeShipmentTransfer') {
					this.supportParams = {
						type: 5,
						moduleId: item.id
					}
				}
				if (!!item.support) {
					cancelSupport(this.supportParams).then(res => {
						if (res.code === 200) {
							this.$emit(`${this.pageType}ChangeStatus`)
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
							this.$emit(`${this.pageType}ChangeStatus`)
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
				if (this.pageType == 'unused') {
					this.starParams = {
						type: 3,
						moduleId: item.id
					}
				} else if (this.pageType == 'message') {
					this.starParams = {
						type: 6,
						moduleId: item.id
					}
				} else if (this.pageType == 'houseTransfer') {
					this.starParams = {
						type: 1,
						moduleId: item.id
					}
				} else if (this.pageType == 'findPeople') {
					this.starParams = {
						type: 2,
						moduleId: item.id
					}
				} else if (this.pageType == 'largeShipmentTransfer') {
					this.starParams = {
						type: 5,
						moduleId: item.id
					}
				}
				if (!!item.star) {
					cancelStar(this.starParams).then(res => {
						if (res.code === 200) {
							this.$emit(`${this.pageType}ChangeStatus`)
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
							this.$emit(`${this.pageType}ChangeStatus`)
							uni.showToast({
								title: '收藏成功',
								icon: 'success',
								duration: 2000
							})
						}
					})
				}
			}
		},
		// 分享到页面
		onShareAppMessage() {
			console.log("分享当前页面")
		},
		// 分享到朋友圈
		onShareTimeline() {
			console.log("分享到朋友圈")
		},
	}
</script>

<style lang="scss" scoped>
	.item {
		display: flex;
		margin: 31rpx 10rpx;

		.avatar {
			margin-right: 14rpx;

			.image {
				width: 72rpx;
				height: 72rpx;
				border-radius: 36rpx;
			}
		}

		.info {
			flex: 1;

			.title {
				font-size: 38rpx;
				font-weight: 500;
				color: #222222;
			}

			.header {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					.nickname {
						font-size: 30rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #232624;
						line-height: 42rpx;
						margin-bottom: 6rpx;
					}

					.address {
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #707070;
						line-height: 33rpx;
					}
				}

				.price {
					font-size: 36rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #D30303;
					line-height: 30rpx;

					.unit {
						font-size: 22rpx;
					}
				}
			}

			.content {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #232624;
				line-height: 44rpx;
				margin: 20rpx 0;

				width: 100%;
				overflow: hidden;
				word-break: break-all;
				/* break-all(允许在单词内换行。) */
				text-overflow: ellipsis;
				/* 超出部分省略号 */
				display: -webkit-box;
				/** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical;
				/** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 2;
				/** 显示的行数 **/
			}

			.image-list {
				display: flex;
				justify-content: space-between;
				flex-wrap: nowrap;

				.good {
					width: 184rpx;
					height: 184rpx;
					border-radius: 10rpx;
					border: 1rpx solid rgba(151, 151, 151, 0.17);
				}
			}

			.footer {
				display: flex;
				justify-content: flex-end;
				align-items: center;

				.item {
					display: flex;
					align-items: center;

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