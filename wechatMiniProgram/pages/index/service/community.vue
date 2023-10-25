<template>
	<view class="community-page">
		<u-navbar title="附近社群" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="community-container">
			
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
			height: 85rpx;
			background: #FFFDF3;
			box-sizing: border-box;

			
		}
		.community-list {
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