<template>
	<view class="community-page">
		<u-navbar title="附近社群" :bgColor="bgColor" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="community-container">
			<view class="community-list">
				<community-item @joinCommunity="joinCommunity"></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
				<community-item></community-item>
			</view>
		</view>
		<u-modal :show="show" width="630rpx" @confirm="handleConfirm">
			<view class="slot-content">
				<view class="content">
					<image class="community" src="../../../static/chat/avatar.png" mode=""></image>
					<view class="title">
						上海本地生活圈
					</view>
					<image class="code" src="../../../static/chat/avatar.png" mode=""></image>
					<view class="code-info">
						该二维码将在2023年9月20日失效
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import communityItem from "@/components/community_item.vue"
	export default {
		components: {
			communityItem
		},
		data() {
			return {
				bgColor: "#FBE94E",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				show: false,
				content: 'test'
			}
		},
		methods: {
			handleBack() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			joinCommunity() {
				this.show = true
			},
			handleConfirm() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.community-page {
		background-color: #F3F6F5;
		font-family: PingFangSC-Regular, PingFang SC;

		.community-container {
			height: 92rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			border-bottom-left-radius: 30rpx;
			border-bottom-right-radius: 30rpx;
			box-sizing: border-box;

			.community-list {
				margin: 0rpx 15rpx;
				height: 1150rpx;
				overflow-y: auto;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;
				padding: 10rpx 20rpx;
			}
		}

		.slot-content {

			.content {
				display: flex;
				flex-direction: column;
				align-items: center;

				.community {
					width: 128rpx;
					height: 128rpx;
					border-radius: 16rpx;
				}

				.title {
					font-size: 34rpx;
					font-weight: 500;
					color: #232624;
					line-height: 48rpx;
					margin-top: 19rpx;
				}

				.code {
					width: 350rpx;
					height: 350rpx;
					margin: 40rpx 0 35rpx 0;
					background: #D8D8D8;
				}

				.code-info {
					font-size: 22rpx;
					font-weight: 400;
					color: #707070;
				}
			}
		}
	}
</style>