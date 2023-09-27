<template>
	<view class="parent">
		<view class="comment-num">
			共4条评论
		</view>
		<view class="comment-content">
			<input class="uni-input" placeholder="感兴趣的话可以留下你的评论呦～" :value="commentValue" @input="clearInput" />
		</view>
		<view class="user-info">
			<image class="avatar"
				src="https://bpic.588ku.com/element_origin_min_pic/20/11/04/6b53830d8c8582ddc0f6fc2eabf67cac.jpg"
				mode=""></image>
			<view class="name">
				大美
				<text class="address">江苏</text>
			</view>
		</view>
		<view class="content">
			你好呀，请问租出去了吗？租出去了吗？租出去了吗？租出去了吗？
		</view>
		<view class="btn">
			<view class="time">
				40分钟前
			</view>
			<view class="record">
				回复
			</view>
		</view>
		<view class="children">
			<view class="user-info">
				<image class="avatar"
					src="https://bpic.588ku.com/element_origin_min_pic/20/11/04/6b53830d8c8582ddc0f6fc2eabf67cac.jpg"
					mode=""></image>
				<view class="name">
					大美
				</view>
			</view>
			<view class="content">
				你好呀，请问租出去了吗？租出去了吗？租出去了吗？租出去了吗？
			</view>
			<view class="btn">
				<view class="time">
					40分钟前
				</view>
				<view class="record">
					回复
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentValue: ""
			}
		},
		methods: {
			clearInput() {}
		}
	}
</script>

<style lang="scss" scoped>
	.parent {
		padding: 40rpx 0;

		.comment-num {
			font-size: 30rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #232624;
			line-height: 42rpx;
			margin-bottom: 40rpx;
		}

		.comment-content {
			margin-bottom: 48rpx;

			.uni-input {
				box-sizing: border-box;
				width: 690rpx;
				height: 58rpx;
				background: #F6F4F4;
				border-radius: 29rpx;
				padding: 10rpx 22rpx;
			}
		}
	}

	.parent,
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
					font-size: 18rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #949494;
					line-height: 37rpx;
					background-color: #F6F6F6;
					margin-left: 6rpx;
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