<template>
	<view class="home-page">
		<u-navbar title="线上线下" placeholder leftIcon="" :titleStyle="titleStyle">
			<view class="u-nav-slot" slot="left">
				<view class="address">
					<image @click="handleAddressClick" class="dingwei" src="../../static/home/dingwei.png" mode="">
					</image>
					<view class="select-address">
						<uni-data-picker style="width: 220rpx;" ellipsis popup-title="请选择所在地区" :localdata="areaTree"
							v-model="areas" @change="onchange" @nodeclick="onnodeclick" @popupclosed="chageClosed"
							@popupopened="changeOpened" :clear-icon="false">
						</uni-data-picker>
						<!-- <image class="xiala" src="../../static/home/xiala.png" mode=""></image> -->
					</view>
				</view>
			</view>
		</u-navbar>
		<view class="occupy"></view>
		<view class="content-page">
			<view class="notice">
				<u-notice-bar :text="text" :step="true" duration="5000" @click="handleClickNotice"></u-notice-bar>
			</view>
			<view class="service">
				<view class="item" v-for="item in serviceData" :key="item.id" @click="handleClickService(item)">
					<image class="icon" :src="item.url" mode=""></image>
					<view class="title">
						{{item.name}}
					</view>
					<view class="free" v-if="item.name=='闲置专区'">
						免费
					</view>
				</view>
			</view>
			<view class="attachment-community" v-if="showDataPicker">
				<view class="title">
					<image class="life" src="../../static/home/shequnbiaoti.png" mode=""></image>
					<view class="more"></view>
				</view>
				<view class="community-list">
					<block v-for="item in communityList" :key="item.id">
						<community-item :itemData="item" @joinCommunity="joinCommunity"></community-item>
					</block>
				</view>
			</view>
			<view class="life-circle" v-if="showDataPicker">
				<view class="title">
					<image class="life" src="../../static/home/shenghuoquanbiaoti.png" mode=""></image>
					<view class="more" @click="handleMoreClick">
						<text class="check">查看更多</text>
						<image class="tiaozhuan" src="../../static/home/tiaozhuan.png" mode=""></image>
					</view>
				</view>
				<view class="life-list" v-if="unusedList.length>0">
					<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
						:interval="interval" :duration="duration">
						<swiper-item v-for="item in unusedList" :key="item.id">
							<view class="swiper-item">
								<view class="lift-item">
									<info-item :pageType="pageType" :itemData="item"
										@unusedChangeStatus="unusedChangeStatus"
										@handleJumpDetail="handleJumpDetail(item)"></info-item>
								</view>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<!-- <view class="life-list" v-if="unusedList.length>0">
					<view class="lift-item" v-for="item in unusedList" :key="item.id">
						<info-item :pageType="pageType" :itemData="item" @unusedChangeStatus="unusedChangeStatus"
							@handleJumpDetail="handleJumpDetail(item)"></info-item>
					</view>
				</view> -->
				<view class="occupy-text" v-else>
					当前区域没有内容，请切换区域或发布内容。
				</view>
			</view>
		</view>
		<u-modal :show="show" width="630rpx" @confirm="handleConfirm">
			<view class="slot-content">
				<view class="content">
					<image class="community" :src="communityInfo.url" mode=""></image>
					<view class="title">
						{{communityInfo.title}}
					</view>
					<image class="code" :src="communityInfo.qrCode" mode=""></image>
					<view class="code-info">
						请保存二维码后用微信客户端扫码入群
					</view>
				</view>
			</view>
		</u-modal>
		<u-modal :show="showHomeUrl" width="630rpx" @confirm="handleConfirm">
			<view class="slot-content">
				<view class="content">
					<view class="title">
						{{homeUrlInfo.url}}
					</view>
					<image class="code" :src="homeUrlInfo.picUrl" mode=""></image>
				</view>
			</view>
		</u-modal>

		<view class="publish">
			<u-button icon="plus-circle-fill" text="发布闲置" @click="handlePublishClick"></u-button>
		</view>
	</view>
</template>

<script>
	import request from "@/utils/request/index.js"
	import infoItem from "@/components/info_item.vue"
	import communityItem from "@/components/community_item.vue"
	import {
		areaData
	} from "@/utils/area.js"
	import {
		login,
		getNotice,
		tabList,
		getUnused,
		getCrowd,
		placeUser,
		homeUrl
	} from '@/api/index/index.js'
	import {
		mapState
	} from 'vuex' //引入mapState

	export default {
		components: {
			infoItem,
			communityItem
		},
		onLoad() {
			uni.$on('changeUnused', this.getUnusedList)
		},
		onUnload() {
			uni.$off('changeUnused')
		},
		data() {
			return {
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				text: [],
				newText: [],
				serviceData: [],
				areas: [],
				areaTree: [],
				show: false,
				unusedList: [],
				communityList: [],
				communityInfo: {},
				pageType: "unused",
				nodeData: {},
				isUserSelectedArea: false, // 用户是否修改过定位区域
				showDataPicker: true,
				homeUrlInfo: {},
				showHomeUrl: false,

				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		onShow() {
			// 微信授权登录
			let openId = uni.getStorageSync('openId')
			if (openId) {
				this.getCrowdList()
				this.getUnusedList()
				this.getHomeUrl()
			} else {
				// 没有值
				uni.showLoading({
					title: '加载中'
				});
				this.goLogin()
			}
		},
		created() {
			this.areaTree = areaData
			this.areas = [{
					text: `${uni.getStorageSync('province')}`,
					value: `${uni.getStorageSync('province')}`
				},
				{
					text: `${uni.getStorageSync('district')}`,
					value: `${uni.getStorageSync('district')}`
				}
			]
			// 获取公告数据
			this.getNoticeData()
			this.getTabList()
		},
		computed: {
			...mapState({
				province: state => state.app.province,
				district: state => state.app.district,
				defaultAreas: state => state.app.defaultAreas,
			}),
		},
		watch: {
			defaultAreas(newVal, oldVal) {
				console.log(newVal, oldVal)

				if (!this.isUserSelectedArea) {
					// 用户没有修改定位，则设置默认定位地址
					this.areas = newVal;
					this.changePlaceUser()
				}
			},
		},
		onShareAppMessage() {
			return {
				title: "线上线下",
				path: "/pages/index/index",
			}
		},
		methods: {
			getHomeUrl() {
				homeUrl({}).then(res => {
					if (res.code === 200) {
						if (res.data) {
							this.homeUrlInfo = res.data
							this.showHomeUrl = true
						}
					}
				})
			},
			handleAddressClick() {
				this.areas = [{
						text: `${uni.getStorageSync('province')}`,
						value: `${uni.getStorageSync('province')}`
					},
					{
						text: `${uni.getStorageSync('district')}`,
						value: `${uni.getStorageSync('district')}`
					}
				]
				let areaAddress = this.areas.map(item => {
					return item.value
				}).toString()
				uni.showToast({
					title: `系统已为您自动定位到${areaAddress}`,
					duration: 2000,
					icon: 'none',
				});
			},
			// 位置修改
			changePlaceUser() {
				uni.setStorageSync('place', this.areas.map(item => {
					return item.value
				}).toString());
				placeUser({
					place: this.areas.map(item => {
						return item.value
					}).toString()
				}).then(res => {
					if (res.code === 200) {
						this.getCrowdList()
						this.getUnusedList()

						uni.$emit('getUnusedListChange')
						uni.$emit('getChangeMessage')
					}
				})
			},
			// 点赞,收藏状态改变
			unusedChangeStatus() {
				this.getUnusedList()
			},
			handleJumpDetail(item) {
				uni.navigateTo({
					url: `/pages/unused/detailUnused/detail?itemData=${encodeURIComponent(JSON.stringify(item))
}`
				})
			},
			// 微信授权登录
			goLogin() {
				let that = this;
				uni.login({
					provider: 'weixin',
					success(res) {
						let code = res.code
						login({
							code: code
						}).then(res => {
							if (res.code === 200) {
								uni.setStorageSync('openId', res.data)
								uni.hideLoading();
								request.header.openId = res.data;
								that.changePlaceUser();

								// 使用登录凭证获取用户信息
								uni.getUserInfo({
									provider: 'weixin',
									success: function(infoRes) {
										console.log("infoRes", infoRes, infoRes
											.userInfo); // 打印用户信息
										uni.setStorageSync('nickName', infoRes.userInfo
											.nickName)
										uni.setStorageSync('avatarUrl', infoRes.userInfo
											.avatarUrl)
									}
								});
							}
						})
					}
				})
			},
			// 获取公告
			getNoticeData() {
				getNotice().then(res => {
					if (res.code === 200) {
						this.newText = res.data
						this.text = res.data.map(item => {
							return item.content
						})
					}
				})
			},
			handleClickNotice(item) {
				if (this.newText[item].url == null) {
					return
				} else {
					console.log('handleClickNotice', item, this.newText[item])
					// uni.switchTab({
					// 	url: `${this.newText[item].url}`,
					// 	fail(err) {
					// 		console.log(err)
					// 	}
					// })
					uni.navigateTo({
						url: "/pages/index/service/notice/notice"
					})
				}
			},
			// 获取跳转路径和图标
			getTabList() {
				tabList().then(res => {
					if (res.code === 200) {
						this.serviceData = res.data
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
			// 获取附近社群
			getCrowdList() {
				getCrowd({
					isShow: true
				}).then(res => {
					if (res.code === 200) {
						this.communityList = res.data
					}
				})
			},
			// 点击加入社群
			joinCommunity(item) {
				this.communityInfo = item
				this.show = true
			},
			handleConfirm() {
				this.show = false
				this.showHomeUrl = false
			},
			changeOpened() {
				this.showDataPicker = false
			},
			chageClosed() {
				this.isUserSelectedArea = true;
				this.showDataPicker = true
				//处理不同步
				this.$nextTick(() => {
					if (this.nodeData.parent_value) {
						if (this.nodeData.parent_value == '上海市') {
							this.areas = [{
								text: this.nodeData.parent_value,
								value: this.nodeData.parent_value
							}, {
								text: this.nodeData.text,
								value: this.nodeData.value
							}]
						}
					} else {
						this.areas = [this.nodeData]
					}
					this.changePlaceUser()
				});
			},
			onnodeclick(node) {
				this.nodeData = node
			},
			onchange(e) {
				this.isUserSelectedArea = true;
				this.areas = e.detail.value
				let place = e.detail.value.map(item => {
					return item.value
				})
				let params = {
					place: place
				}
				placeUser(params).then(res => {
					if (res.code === 200) {
						this.getCrowdList()
						this.getUnusedList()
					}
				})
			},
			// 点击更多跳转到闲置列表
			handleMoreClick() {
				uni.switchTab({
					url: "/pages/unused/index"
				})
			},
			// 点击不同的服务切换到不同的服务界面
			handleClickService(item) {
				if (item.name == '闲置交易') {
					uni.switchTab({
						url: item.iconTo
					})
				} else {
					uni.navigateTo({
						url: item.iconTo
					})
				}
			},
			handlePublishClick() {
				uni.navigateTo({
					url: "/pages/unused/addUnused/addUnused"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-page {

		::v-deep .uni-data-tree-dialog {
			top: 45%;
		}

		::v-deep .dialog-close {
			visibility: hidden;

			&:after {
				content: '确定';
				color: #007aff;
				visibility: visible;
			}
		}

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

				::v-deep .uni-data-tree-input {
					.selected-list {
						overflow-x: auto;

						.selected-item {
							display: none;

							&:last-child {
								display: block !important;
							}
						}
					}
				}

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
			border-top-left-radius: 25rpx;
			border-top-right-radius: 25rpx;

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
						width: 78rpx;
						height: 78rpx;
						margin-bottom: 7rpx;
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
				background: #FFFFFF;
				box-shadow: 0rpx 2rpx 24rpx 0rpx rgba(0, 0, 0, 0.04);
				border-radius: 20rpx;
				padding: 33rpx 20rpx;

				.occupy-text {
					text-align: center;
					height: 280rpx;
					line-height: 280rpx;

					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #4D504F;
				}

				.title {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.life {
						width: 130rpx;
						height: 50rpx;
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
			}

			.attachment-community {
				margin-bottom: 20rpx;
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
						width: 140rpx;
						height: 50rpx;
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


		.swiper {
			height: 620rpx;

			.swiper-item {
				display: block;
				height: 620rpx;
			}
		}

		.swiper-list {
			margin-top: 40rpx;
			margin-bottom: 0;
		}

		.uni-common-mt {
			margin-top: 60rpx;
			position: relative;
		}

		.info {
			position: absolute;
			right: 20rpx;
		}

		.uni-padding-wrap {
			width: 550rpx;
			padding: 0 100rpx;
		}
	}
</style>