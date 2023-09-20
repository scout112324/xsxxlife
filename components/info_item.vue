<template>
	<view class="item" @click="handleClick">
		<view class="avatar">
			<image class="image"
				src="https://tse4-mm.cn.bing.net/th/id/OIP-C.u1D8WJbUIIXMV2w-qa4r5wAAAA?pid=ImgDet&rs=1" mode="">
			</image>
		</view>
		<view class="info">
			<view class="header">
				<view class="left">
					<view class="nickname">
						Jummy
					</view>
					<view class="address">
						上海市静安区
					</view>
				</view>
				<view class="price">
					<text class="unit">￥</text>
					<text>279000</text>
				</view>
			</view>
			<view class="content">
				出闲置全新Apple/IPhone15一台，国行版内存128G，手机无任何维修记录，没有任何划痕！
			</view>
			<view class="image-list">
				<image class="good"
					src="https://tse4-mm.cn.bing.net/th/id/OIP-C.u1D8WJbUIIXMV2w-qa4r5wAAAA?pid=ImgDet&rs=1" mode="">
				</image>
				<image class="good"
					src="https://tse4-mm.cn.bing.net/th/id/OIP-C.u1D8WJbUIIXMV2w-qa4r5wAAAA?pid=ImgDet&rs=1" mode="">
				</image>
				<image class="good"
					src="https://tse4-mm.cn.bing.net/th/id/OIP-C.u1D8WJbUIIXMV2w-qa4r5wAAAA?pid=ImgDet&rs=1" mode="">
				</image>
			</view>
			<view class="footer">
				<view class="item">
					<image class="image" src="../static/components/dianzan.png" mode=""></image>
					<text class="num">999</text>
				</view>
				<view class="item">
					<image class="image" src="../static/components/shoucang_set.png" mode=""></image>
					<text class="num">999</text>
				</view>
				<view class="item">
					<image class="image" src="../static/components/pinglun.png" mode=""></image>
					<text class="num">999</text>
				</view>
				<view class="item">
					<image class="image" src="../static/components/zhuanfa.png" mode=""></image>
					<text class="num">999</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pageType: String
		},
		data() {
			return {}
		},
		methods: {
			handleClick() {
				if (this.pageType == 'unused') {
					this.$emit('handleJumpDetail')
				} else if (this.pageType == 'message') {
					this.$emit('handleJumpMessageDetail')
				}
			}
		}
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
				}
			}
		}
	}
</style>