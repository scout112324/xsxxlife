<template>
	<view class="home-page">
		<u-navbar title="线上线下" placeholder leftIcon="" :titleStyle="titleStyle">
			<view class="u-nav-slot" slot="left">
				<view class="address">
					<image class="dingwei" src="../../static/home/dingwei.png" mode=""></image>
					<view class="select-address">
						<uni-data-picker popup-title="请选择所在地区" :localdata="dataTree" v-model="classes"
							@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened"
							@popupclosed="onpopupclosed" :clear-icon="false">
						</uni-data-picker>
						<image class="xiala" src="../../static/home/xiala.png" mode=""></image>
					</view>
				</view>
			</view>
		</u-navbar>
		<view class="occupy"></view>
		<view class="content-page">
			<view class="notice">
				<u-notice-bar :text="text" :step="true"></u-notice-bar>
			</view>
			<view class="service">
				<view class="item" v-for="item in serviceData" :key="item.id" @click="handleClickService(item.name)">
					<image class="icon" :src="item.icon" mode=""></image>
					<view class="title">
						{{item.name}}
					</view>
					<view class="free" v-if="item.name=='闲置专区'">
						免费
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
					<view class="lift-item" v-for="item in unusedList" :key="item.id">
						<info-item :itemData="item"></info-item>
					</view>
				</view>
			</view>
			<view class="attachment-community">
				<view class="title">
					<image class="life" src="../../static/home/shequnbiaoti.png" mode=""></image>
					<view class="more"></view>
				</view>
				<view class="community-list">
					<community-item @joinCommunity="joinCommunity"></community-item>
					<community-item></community-item>
					<community-item></community-item>
				</view>
			</view>
		</view>
		<u-modal :show="show" width="630rpx" @confirm="handleConfirm">
			<view class="slot-content">
				<view class="content">
					<image class="community" src="../../static/chat/avatar.png" mode=""></image>
					<view class="title">
						上海本地生活圈
					</view>
					<image class="code" src="../../static/chat/avatar.png" mode=""></image>
					<view class="code-info">
						该二维码将在2023年9月20日失效
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import infoItem from "@/components/info_item.vue"
	import communityItem from "@/components/community_item.vue"
	import {
		login,
		getNotice,
		tabList,
		getUnused
	} from '@/api/index/index.js'
	export default {
		components: {
			infoItem,
			communityItem
		},
		onLoad() {},
		data() {
			return {
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				cityname: "上海市",
				text: ["发布闲置后支持线上线下交易啦～", "111"],
				tabListInfo: [],
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
					},
					{
						id: 9,
						name: "闲置专区",
						icon: "../../static/home/mianfeixianzhijiaoyi.png"
					}
				],

				classes: '1-2',
				dataTree: [{
						text: "一年级",
						value: "1-0",
						children: [{
								text: "1.1班",
								value: "1-1"
							},
							{
								text: "1.2班",
								value: "1-2"
							}
						]
					},
					{
						text: "二年级",
						value: "2-0",
						children: [{
								text: "2.1班",
								value: "2-1"
							},
							{
								text: "2.2班",
								value: "2-2"
							}
						]
					},
					{
						text: "三年级",
						value: "3-0",
						disable: true
					}
				],
				show: false,
				unusedList: []
			}
		},
		onShow() {
			// 微信授权登录
			let openId = uni.getStorageSync('openId')
			if (openId) {
				return
			} else {
				this.goLogin()
			}

			if (this.$store.state.changeCity) {
				this.cityname = this.$store.state.storeCityName
			}
		},
		onHide() {},
		created() {
			// 获取位置信息
			uni.getLocation({
				type: 'gcj02',
				success(res) {
					console.log(res)
					uni.setStorageSync('latitude', res.latitude);
					uni.setStorageSync('longitude', res.longitude);
				},
				fail(e) {
					// empty
				}
			})
			// 获取公告数据
			this.getNoticeData()
			this.getTabList()
			// 获取闲置列表
			this.getUnusedList()
		},
		methods: {
			// 微信授权登录
			goLogin() {
				uni.login({
					provider: 'weixin',
					success(res) {
						let code = res.code
						login({
							code: code
						}).then(res => {
							if (res.code === 200) {
								uni.setStorageSync('openId', res.data)
							}
						})
					}
				})
			},
			// 获取公告
			getNoticeData() {
				getNotice().then(res => {
					if (res.code === 200) {
						this.text = res.data
					}
				})
			},
			// 获取跳转路径和图标
			getTabList() {
				tabList().then(res => {
					if (res.code === 200) {
						this.tabListInfo = res.data
					}
				})
			},
			// 获取闲置物品
			getUnusedList() {
				getUnused().then(res => {
					if (res.code === 200) {
						this.unusedList = res.data
					}
				})
			},
			joinCommunity() {
				this.show = true
			},
			handleConfirm() {
				this.show = false
			},
			onnodeclick(e) {
				console.log(e);
			},
			onpopupopened(e) {
				console.log('popupopened');
			},
			onpopupclosed(e) {
				console.log('popupclosed');
			},
			onchange(e) {
				console.log('onchange:', e);
			},
			// 点击更多跳转到闲置列表
			handleMoreClick() {
				uni.switchTab({
					url: "/pages/unused/index"
				})
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
						break;
					case "闲置专区":
						uni.switchTab({
							url: "/pages/unused/index"
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

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.address {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.dingwei {
				width: 30rpx;
				height: 34rpx;
			}

			.select-address {
				display: flex;
				align-items: center;

				::v-deep .input-value-border {
					border: none;
					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #232624;
				}

				::v-deep .arrow-area {
					display: none;
				}

				// display: flex;
				// justify-content: space-between;
				// align-items: center;

				.xiala {
					width: 16rpx;
					height: 9rpx;
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
					box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
					border-radius: 16rpx;

					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #855C15;
				}
			}

			.service {
				display: flex;
				flex-shrink: 1;
				flex-wrap: wrap;
				align-items: center;
				margin: 20rpx 0;
				padding: 30rpx 20rpx 0 20rpx;
				// height: 498rpx;
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 20%;
					position: relative;
					margin-bottom: 33rpx;

					.icon {
						width: 68rpx;
						height: 60rpx;
						margin-bottom: 17rpx;
					}

					.free {
						position: absolute;
						right: 15rpx;
						top: -20rpx;
						width: 58rpx;
						height: 35rpx;
						background: #EA3D5E;
						border-radius: 8rpx;
						border: 1rpx solid #FFFFFF;
						text-align: center;

						font-size: 22rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 35rpx;
					}
				}
			}

			.life-circle {
				height: 601rpx;
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