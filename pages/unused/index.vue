<template>
	<view class="unused-page">
		<u-navbar title="闲置" :bgColor="bgColor" leftIcon="" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left"></view>
		</u-navbar>
		<view class="unused-container">
			<view class="unused-list">
				<infoItem></infoItem>
				<infoItem></infoItem>
				<infoItem></infoItem>
				<infoItem></infoItem>
			</view>
		</view>
		<view class="publish">
			<u-button icon="plus-circle-fill" text="图标按钮"></u-button>
		</view>
		<!-- <view class="idle-list">
			<view class="idle-item" v-for="item in unusedData" :key="item.id" @click="handleDetail(item)">
				<view class="title">
					<view class="left">
						{{item.desc}}
					</view>
					<view class="right">
						{{item.price}}
					</view>
				</view>
				<view class="content">
					<block v-for="subitem in item.goods" :key="subitem.id">
						<image class="image" :src="subitem.image" alt=""></image>
					</block>
				</view>
				<view class="address">
					地址
				</view>
			</view>
		</view>
		<view class="publish">
			<uni-fab ref="fab" :pattern="pattern" :horizontal="horizontal" :vertical="vertical"
				:direction="direction" @fabClick="fabClick" />
		</view> -->
	</view>
</template>

<script>
	import infoItem from "@/components/info_item.vue"
	export default {
		components: {
			infoItem
		},
		data() {
			return {
				bgColor: "#FBE94E",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
			}
		},
		methods: {
			// handleDetail(item) {
			// 	uni.navigateTo({
			// 		url: "/pages/unused/detailUnused/detail"
			// 	})
			// },
			// fabClick() {
			// 	uni.navigateTo({
			// 		url: "/pages/unused/addUnused/addUnused"
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.unused-page {
		background-color: #F3F6F5;

		.unused-container {
			height: 92rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			border-bottom-left-radius: 30rpx;
			border-bottom-right-radius: 30rpx;
			box-sizing: border-box;

			.unused-list {
				margin: 0rpx 15rpx;
				height: 966rpx;
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