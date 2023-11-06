<template>
	<view class="user-item">
		<image
			v-if="pictureUrl && imgType.includes(pictureUrl.substr(pictureUrl.lastIndexOf('.') + 1, pictureUrl.length).toLowerCase())"
			class="image" :src="pictureUrl" mode=""></image>
		<video
			v-else-if="pictureUrl && videoType.includes(pictureUrl.substr(pictureUrl.lastIndexOf('.') + 1, pictureUrl.length).toLowerCase())"
			class="image" :src="pictureUrl" controls></video>
		<image v-else class="image" src="../../../static/chat/avatar.png" mode=""></image>
		<view class="content">
			<view v-if="itemData.title" class="title"
				:class="{'mul-title': !(typeStar!==0 && typeStar!==2 && typeStar!==4 && typeStar!==6)}">
				{{itemData.title}}
			</view>
			<view v-else-if="itemData.content" class="title"
				:class="{'mul-title': !(typeStar!==0 && typeStar!==2 && typeStar!==4 && typeStar!==6)}">
				{{itemData.content}}
			</view>
			<view class="price" v-if="typeStar!==0 && typeStar!==2 && typeStar!==4 && typeStar!==6">
				<text class="unit">¥</text>
				<text>{{itemData.price}}</text>
			</view>
			<view class="footer">
				<view class="left">
					<image v-if="itemData.photo" class="avatar" src="../../../static/avatar.png" mode=""></image>
					<image v-else class="avatar" src="../../../static/avatar.png" mode=""></image>
					<view class="nickname">
						{{itemData.nickname || '管理'}}
					</view>
				</view>
				<view class="btn" @click="handleCommuniteClick(itemData.userId)">
					<button class="add" v-if="typeStar==3">联系TA</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		options: {
			styleIsolation: 'shared',
		},
		props: {
			itemData: {
				type: Object
			},
			typeStar: {
				type: Number,
				default: 0
			}
		},
		created() {
			this.pictureList = this.itemData.picture ? this.itemData.picture.split(',') : []
			this.pictureUrl = this.itemData.picture ? this.pictureList[0] : ""
		},
		data() {
			return {
				imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
				videoType: ['mp4'],
				pictureList: [],
				pictureUrl: ""
			}
		},
		methods: {
			// 联系卖家
			handleCommuniteClick(userId) {
				uni.navigateTo({
					url: `/pages/user/chat/chat?userId=${userId}`
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.user-item {
		display: flex;
		margin-bottom: 32rpx;

		.image {
			width: 188rpx;
			height: 188rpx;
			border-radius: 10rpx;

			margin-right: 21rpx;
		}

		.content {
			flex: 1;
			font-family: PingFangSC-Regular, PingFang SC;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 28rpx;
				font-weight: 400;
				color: #232624;
				width: 456rpx;

				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;

				&.mul-title {
					white-space: pre-wrap;
					display: -webkit-box;
					-webkit-line-clamp: 2; //第几行
					-webkit-box-orient: vertical;
				}
			}

			.price {
				margin: 20rpx;
				font-size: 30rpx;
				font-weight: 500;
				color: #D30303;

				.unit {
					font-size: 20rpx;
				}
			}

			.footer {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.left {
					display: flex;
					align-items: center;

					.avatar {
						width: 36rpx;
						height: 36rpx;
						border-radius: 18rpx;
						margin-right: 9rpx;
					}

					.nickname {
						font-size: 22rpx;
						font-weight: 500;
						color: #4D504F;
					}
				}

				.btn {
					::v-deep .add {
						width: 126rpx;
						height: 58rpx;
						background: #FFD100;
						border-radius: 29rpx;

						padding: 0;
						font-size: 25rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #4D504F;
					}
				}
			}
		}
	}
</style>