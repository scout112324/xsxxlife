<template>
	<view class="user-item">
		<image
			v-if="itemData.picture && imgType.includes(pictureList[0].substr(pictureList[0].lastIndexOf('.') + 1, pictureList[0].length).toLowerCase())"
			class="image" :src="pictureList[0]" mode=""></image>
		<image v-else-if="!itemData.picture" class="image" src="../../../static/chat/avatar.png" mode=""></image>
		<video v-else class="image" :src="pictureList[0]" controls></video>
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
				<view class="btn">
					<button class="add">联系TA</button>
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
			this.pictureList = this.itemData?.picture.split(',')
		},
		data() {
			return {
				imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
				pictureList: []
			}
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