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
		<view class="content-page">
			<view class="notice">
				<image class="jiebao" src="../../static/home/jiebao.png" mode=""></image>
				<text class="content">发布闲置后支持线上线下交易啦～</text>
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
					<view class="more">
						<text class="check">查看更多</text>
						<image class="tiaozhuan" src="../../static/home/tiaozhuan.png" mode=""></image>
					</view>
				</view>
				<view class="life-list">
					<view class="item">
						<view class="avatar">
							<image class="image"
								src="https://tse4-mm.cn.bing.net/th/id/OIP-C.u1D8WJbUIIXMV2w-qa4r5wAAAA?pid=ImgDet&rs=1"
								mode=""></image>
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
									src="https://tse4-mm.cn.bing.net/th/id/OIP-C.u1D8WJbUIIXMV2w-qa4r5wAAAA?pid=ImgDet&rs=1"
									mode=""></image>
								<image class="good"
									src="https://tse4-mm.cn.bing.net/th/id/OIP-C.u1D8WJbUIIXMV2w-qa4r5wAAAA?pid=ImgDet&rs=1"
									mode=""></image>
								<image class="good"
									src="https://tse4-mm.cn.bing.net/th/id/OIP-C.u1D8WJbUIIXMV2w-qa4r5wAAAA?pid=ImgDet&rs=1"
									mode=""></image>
							</view>
							<view class="footer">
								<view class="item">
									<image class="image" src="../../static/components/dianzan.png" mode=""></image>
									<text class="num">999</text>
								</view>
								<view class="item">
									<image class="image" src="../../static/components/shoucang_set.png" mode=""></image>
									<text class="num">999</text>
								</view>
								<view class="item">
									<image class="image" src="../../static/components/pinglun.png" mode=""></image>
									<text class="num">999</text>
								</view>
								<view class="item">
									<image class="image" src="../../static/components/zhuanfa.png" mode=""></image>
									<text class="num">999</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bgColor: "#FAE54D",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				cityname: "上海市",
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
						uni.navigateTo({
							url: "/pages/index/service/idleTransaction"
						})
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

		.content-page {
			background-color: #F1F1F2;
			padding: 24rpx 15rpx;

			.notice {
				display: flex;
				align-items: center;
				height: 64rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 16rpx;

				.jiebao {
					width: 40rpx;
					height: 32rpx;
					margin: 0 10rpx 0 18rpx;
				}

				.content {
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #855C15;
					line-height: 26rpx;
				}
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

				.life-list {
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
				}
			}
		}
	}
</style>