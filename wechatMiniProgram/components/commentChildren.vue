<template>
	<view class="children">
		<view class="user-info">
			<image v-if="itemData.photo" class="avatar" :src="itemData.photo" mode=""></image>
			<image v-else class="avatar" src="../static/avatar.png" mode=""></image>
			<view class="name">
				{{itemData.nickname}}
				<image v-if="itemData.toUsername" class="tiaozhuan" src="../static/home/tiaozhuan.png" mode=""></image>
				<text class="address">{{itemData.toUsername || ''}}</text>
				<text class="seller address" v-if="item.seller">楼主</text>
			</view>
		</view>
		<view class="content">
			{{itemData.content}}
		</view>
		<view class="btn">
			<view class="record" @click="handleChildrenRecord(itemData.id)">
				回复
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			itemData: {
				type: Object
			}
		},
		data() {
			return {}
		},
		methods: {
			handleChildrenRecord(id) {
				this.$emit('childrenRecord', id)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.children {
		margin: 30rpx;

		.user-info {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.avatar {
				width: 58rpx;
				height: 58rpx;
				border-radius: 29rpx;
				margin-right: 14rpx;
			}

			.name {
				font-size: 26rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #949494;
				line-height: 37rpx;


				.address {
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #949494;
					line-height: 37rpx;

					&.seller {
						font-size: 22rpx;
						background-color: #F6F6F6;
					}
				}

				.tiaozhuan {
					width: 10rpx;
					height: 17rpx;
					margin: 0 10rpx;
				}
			}
		}

		.content {
			margin-left: 72rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #232624;
			line-height: 37rpx;
		}

		.btn {
			margin-left: 72rpx;
			font-family: Source Han Sans SC VF;
			font-size: 20rpx;
			font-style: normal;
			font-weight: 400;
			line-height: normal;

			display: flex;
			justify-content: flex-start;
			align-items: center;

			.time {
				color: rgba(147, 153, 163, 0.60);
			}

			.record {
				color: #FFBD3C;
				margin-left: 20rpx;
			}
		}
	}
</style>