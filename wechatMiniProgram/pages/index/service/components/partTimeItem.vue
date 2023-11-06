<template>
	<view class="part-time-item">
		<view class="header">
			<view class="name">
				{{itemData.title}}
			</view>
			<view class="price">
				{{itemData.price}}
			</view>
		</view>
		<view class="address">
			<image class="icon" src="../../../../static/home/dingwei.png" mode=""></image>
			<text class="address-name">{{itemData.detailsPlace}}</text>
		</view>
		<view class="tags">
			<block v-for="(item,index) in label" :key="index">
				<uni-tag :text="item" style="margin-right: 10rpx;" />
			</block>
		</view>
		<view class="footer">
			<view class="user">
				<image v-if="itemData.photo" class="avatar" :src="itemData.photo" mode=""></image>
				<image v-else class="avatar"
					src="https://tupian.qqw21.com/article/UploadPic/2021-3/202132022173036062.png" mode=""></image>
				<view class="nickname">
					{{itemData.nickname}}
				</view>
			</view>
			<view class="right">
				<button class="add" @click="handlePart">进入详情</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			itemData: {
				type: Object,
				default: () => {}
			}
		},
		options: {
			styleIsolation: 'shared', // 解除样式隔离
		},
		created() {
			this.label = this.itemData.label ? this.itemData.label.split(',') : []
		},
		data() {
			return {
				label: []
			}
		},
		methods: {
			handlePart() {
				this.$emit('jumpPartTimeDetail')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.part-time-item {
		height: 282rpx;
		background-color: #ffffff;
		border-radius: 24rpx;
		margin-bottom: 20rpx;
		padding: 30rpx 30rpx 22rpx 30rpx;
		box-sizing: border-box;

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;

			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			line-height: 45rpx;

			.name {
				color: #232624;
			}

			.price {
				color: #D30303;
			}
		}

		.address {
			margin: 15rpx 0;

			.icon {
				width: 23rpx;
				height: 26rpx;
				margin-right: 7rpx;
			}

			.address-name {
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #4D504F;
				line-height: 40rpx;
			}
		}

		.tags {
			display: flex;
			align-items: center;
			margin: 15rpx 0;

			::v-deep .uni-tag {
				border-radius: 8rpx;
				border: 1rpx solid #FFD100;
				background-color: #FFF6CE;
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #855C15;
			}
		}

		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.user {
				display: flex;
				align-items: center;

				.avatar {
					width: 44rpx;
					height: 43rpx;
					border-radius: 22rpx;
					margin-right: 16rpx;
				}

				.nickname {
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #232624;
				}
			}

			.right {
				::v-deep .add {
					width: 168rpx;
					height: 63rpx;
					background: #FFD100;
					border-radius: 32rpx;

					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #232624;
					line-height: 63rpx;
					padding: 0;
				}
			}
		}
	}
</style>