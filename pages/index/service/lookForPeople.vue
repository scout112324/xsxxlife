<template>
	<view class="look-for-page">
		<u-navbar title="寻人寻物" :bgColor="bgColor" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="unused-container">
			<view class="unused-list" :style="{'height':screenHeight}">
				<infoItem :pageType="pageType" @handleJumpPeopleDetail="handleJumpPeopleDetail"></infoItem>
				<infoItem :pageType="pageType"></infoItem>
				<infoItem :pageType="pageType"></infoItem>
				<infoItem :pageType="pageType"></infoItem>
			</view>
		</view>
		<view class="publish">
			<u-button icon="plus-circle-fill" text="发布" @click="handlePublishClick"></u-button>
		</view>
	</view>
</template>

<script>
	import infoItem from "@/components/info_item.vue"
	export default {
		components: {
			infoItem
		},
		onReady() {
			this.screenHeight = uni.getSystemInfoSync().screenHeight * 2 - 380 + 'rpx'
			console.log(this.screenHeight)
		},
		data() {
			return {
				screenHeight: 0,
				pageType: "peopleTransfer",
				bgColor: "#FBE94E",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
			}
		},
		methods: {
			handleBack() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			handleJumpPeopleDetail() {
				uni.navigateTo({
					url: "/pages/index/service/modules/lookForPeopleDetail/lookForPeopleDetail"
				})
			},
			handlePublishClick() {
				uni.navigateTo({
					// url: "/pages/unused/addUnused/addUnused"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.look-for-page {
		background-color: #F3F6F5;
		height: 100vh;

		.unused-container {
			height: 92rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			border-bottom-left-radius: 30rpx;
			border-bottom-right-radius: 30rpx;
			box-sizing: border-box;

			.unused-list {
				margin: 0rpx 15rpx;
				// height: 1006rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;
				overflow-y: auto;
				padding: 10rpx 20rpx;
			}
		}

		.publish {
			position: fixed;
			bottom: 15rpx;
			width: 100%;

			::v-deep .u-button {
				width: 280rpx;
				height: 91rpx;
				background: #FFD100;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(255, 209, 0, 0.31);
				border-radius: 46rpx;
				border: 0 solid rgba(255, 209, 0, 0.31);
			}

			::v-deep .u-button__text {
				margin-left: 6rpx;
				font-size: 30rpx !important;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #232624;
			}
		}
	}
</style>