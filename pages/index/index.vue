<template>
	<view class="home-page">
		<u-navbar title="线上线下" :bgColor="bgColor" placeholder leftIcon="" :titleStyle="titleStyle">
			<view class="u-nav-slot" slot="left">
				<view class="address">
					<image class="dingwei" src="../../static/home/dingwei.png" mode=""></image>
					<view class="select-address" @click="handleAddress">
						<text>{{ cityname }}</text>
						<image class="xiala" src="../../static/home/xiala.png" mode=""></image>
					</view>
				</view>
			</view>
		</u-navbar>
		<view class="occupy"></view>
		<view class="content-page">
			<view class="notice">
				<!-- <image class="jiebao" src="../../static/home/jiebao.png" mode=""></image> -->
				<!-- <text class="content">发布闲置后支持线上线下交易啦～</text> -->
				<u-notice-bar :text="text"></u-notice-bar>
			</view>
			<view class="service">
				<view class="item" v-for="item in serviceData" :key="item.id" @click="handleClickService(item.name)">
					<image class="icon" :src="item.icon" mode=""></image>
					<view class="title">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="life-circle">
				<view class="title">
					<image class="life" src="../../static/home/shenghuoquanbiaoti.png" mode=""></image>
					<view class="more" @click="handleMoreClick">
						<text class="check">查看更多</text>
						<image class="tiaozhuan" src="../../static/home/tiaozhuan.png" mode=""></image>
					</view>
				</view>
				<view class="life-list">
					<info-item></info-item>
					<info-item></info-item>
				</view>
			</view>
			<view class="attachment-community">
				<view class="title">
					<image class="life" src="../../static/home/shequnbiaoti.png" mode=""></image>
					<view class="more"></view>
				</view>
				<view class="community-list">
					<community-item></community-item>
					<community-item></community-item>
					<community-item></community-item>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import infoItem from "@/components/info_item.vue"
	import communityItem from "@/components/community_item.vue"
	export default {
		components: {
			infoItem,
			communityItem
		},
		data() {
			return {
				bgColor: "#FAE54D",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				cityname: "上海市",
				text: "发布闲置后支持线上线下交易啦～",
				serviceData: [{
						id: 1,
						name: "综合服务",
						icon: "../../static/home/zonghefuwu.png"
					},
					{
						id: 2,
						name: "附近社群",
						icon: "../../static/home/fujinshequn.png"
					},
					{
						id: 3,
						name: "兼职入口",
						icon: "../../static/home/jianzhirukou.png"
					},
					{
						id: 4,
						name: "房屋转让",
						icon: "../../static/home/fangwuzhuanrang.png"
					},
					{
						id: 5,
						name: "寻人寻物",
						icon: "../../static/home/xunrenxunwu.png"
					},
					{
						id: 6,
						name: "闲置交易",
						icon: "../../static/home/xianzhijiaoyi.png"
					},
					{
						id: 7,
						name: "同城活动",
						icon: "../../static/home/tongchenghuodong.png"
					},
					{
						id: 8,
						name: "大件清运",
						icon: "../../static/home/dajianqingyun.png"
					}
				],
			}
		},
		onShow() {
			if (this.$store.state.changeCity) {
				this.cityname = this.$store.state.storeCityName
			}
		},
		onHide() {},
		methods: {
			// 点击更多跳转到闲置列表
			handleMoreClick() {
				uni.switchTab({
					url: "/pages/unused/index"
				})
			},
			handleAddress() {
				uni.navigateTo({
						url: "/pages/index/area/area"
					}),
					this.changeCity = true
			},
			// 点击不同的服务切换到不同的服务界面
			handleClickService(name) {
				switch (name) {
					case "综合服务":
						uni.navigateTo({
							url: "/pages/index/service/service"
						})
						break;
					case "附近社群":
						uni.navigateTo({
							url: "/pages/index/service/community"
						})
						break;
					case "兼职入口":
						uni.navigateTo({
							url: "/pages/index/service/partTime"
						})
						break;
					case "房屋转让":
						uni.navigateTo({
							url: "/pages/index/service/houseTransfer"
						})
						break;
					case "寻人寻物":
						uni.navigateTo({
							url: "/pages/index/service/lookForPeople"
						})
						break;
					case "闲置交易":
						uni.switchTab({
							url: "/pages/unused/index"
						})
						// uni.navigateTo({
						// 	url: "/pages/index/service/idleTransaction"
						// })
						break;
					case "同城活动":
						uni.navigateTo({
							url: "/pages/index/service/intraCityActivity"
						})
						break;
					case "大件清运":
						uni.navigateTo({
							url: "/pages/index/service/largeShipmentClearance"
						})
						break;
					default:
						return
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-page {


		.address {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.dingwei {
				width: 30rpx;
				height: 34rpx;
				margin-right: 4rpx;
			}

			.select-address {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.xiala {
					width: 16rpx;
					height: 9rpx;
					margin-left: 9rpx;
				}
			}
		}
		.occupy {
			height: 50rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}
		.content-page {
			margin-top: -50rpx;
			background-color: #F1F1F2;
			padding: 24rpx 15rpx;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;

			.notice {
				display: flex;
				align-items: center;
				height: 64rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 16rpx;
				
				::v-deep .u-notice-bar {
					background: #FFFFFF !important;
					box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0,0,0,0.04);
					border-radius: 16rpx;
					
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #855C15;
				}

				// .jiebao {
				// 	width: 40rpx;
				// 	height: 32rpx;
				// 	margin: 0 10rpx 0 18rpx;
				// }

				// .content {
				// 	font-size: 26rpx;
				// 	font-family: PingFangSC-Regular, PingFang SC;
				// 	font-weight: 400;
				// 	color: #855C15;
				// 	line-height: 26rpx;
				// }
			}

			.service {
				display: flex;
				flex-shrink: 1;
				flex-wrap: wrap;
				align-items: center;
				margin: 20rpx 0;
				height: 348rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 25%;

					.icon {
						width: 68rpx;
						height: 60rpx;
						margin-bottom: 17rpx;
					}
				}
			}

			.life-circle {
				height: 1088rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;
				padding: 33rpx 20rpx;

				.title {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.life {
						width: 155rpx;
						height: 58rpx;
					}

					.more {
						.check {
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #707070;
							line-height: 37rpx;
							margin-right: 8rpx;
						}

						.tiaozhuan {
							width: 10rpx;
							height: 17rpx;
						}
					}
				}

				.life-list {}
			}

			.attachment-community {
				margin-top: 20rpx;
				height: 711rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 16rpx;
				padding: 33rpx 20rpx;
				box-sizing: border-box;

				.title {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.life {
						width: 155rpx;
						height: 58rpx;
					}
				}

				.community-list {
					margin-top: 30rpx;	
				}
			}
		}
	}
</style>