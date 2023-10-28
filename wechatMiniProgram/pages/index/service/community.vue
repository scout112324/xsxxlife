<template>
	<view class="community-page">
		<u-navbar title="附近社群" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="community-container">
			<view class="left">
				<view class="line"></view>
				<view class="transmit">
					请在首页切换定位以切换附近社群
				</view>
			</view>
			<view class="right">
				<button class="right-btn" @click="handleTransmit">去切换</button>
			</view>
		</view>
		<view class="community-list">
			<block v-for="item in communityList" :key="item.id">
				<community-item :itemData="item" @joinCommunity="joinCommunity"></community-item>
			</block>
		</view>
		<u-modal :show="show" width="630rpx" @confirm="handleConfirm">
			<view class="slot-content">
				<view class="content">
					<image class="community" :src="communityInfo.url" mode=""></image>
					<view class="title">
						{{communityInfo.title}}
					</view>
					<image class="code" :src="communityInfo.qrCode" mode=""></image>
					<!-- <view class="code-info">
						该二维码将在2023年9月20日失效
					</view> -->
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import communityItem from "@/components/community_item.vue"
	import {
		getCrowd
	} from "@/api/index/index.js"
	export default {
		components: {
			communityItem
		},
		data() {
			return {
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				show: false,
				content: 'test',
				communityList: [],
				communityInfo: {}
			}
		},
		created() {
			this.getCrowdList()
		},
		methods: {
			handleBack() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			handleTransmit() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			joinCommunity(item) {
				this.communityInfo = item
				this.show = true
			},
			handleConfirm() {
				this.show = false
			},
			// 获取附近社群
			getCrowdList() {
				getCrowd({
					isShow: false
				}).then(res => {
					if (res.code === 200) {
						this.communityList = res.data
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.community-page {
		background-color: #F3F6F5;
		font-family: PingFangSC-Regular, PingFang SC;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.community-container {
			position: fixed;
			z-index: 2;
			height: 85rpx;
			width: 100%;
			background: #FFFFFF;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 28px;

			.left {
				display: flex;
				align-items: center;

				.line {
					width: 4rpx;
					height: 29rpx;
					background: #855C15;
					margin-right: 14rpx;
				}

				.transmit {
					font-size: 28rpx;
					font-weight: 400;
					color: #353535;
				}
			}

			.right {
				text-align: right;

				::v-deep .right-btn {
					width: 137rpx;
					height: 56rpx;
					background: #FFD100;
					border-radius: 26rpx;

					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #4D504F;
					line-height: 52rpx;
					padding: 0;
				}
			}
		}

		.community-list {
			margin-top: 85rpx;
			overflow-y: auto;
			background: #FFFFFF;
			box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
			padding: 0rpx 20rpx;
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