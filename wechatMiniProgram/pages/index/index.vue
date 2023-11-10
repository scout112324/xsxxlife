<template>
	<view class="home-page">
		<u-navbar title="线上线下" placeholder leftIcon="" :titleStyle="titleStyle">
			<view class="u-nav-slot" slot="left">
				<view class="address">
					<image class="dingwei" src="../../static/home/dingwei.png" mode=""></image>
					<view class="select-address">
						<uni-data-picker style="width: 220rpx;" ellipsis popup-title="请选择所在地区" :localdata="areaTree"
							v-model="areas" @change="onchange" @nodeclick="onnodeclick" @popupclosed="chageClosed"
							:clear-icon="false">
						</uni-data-picker>
						<!-- <image class="xiala" src="../../static/home/xiala.png" mode=""></image> -->
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
						<info-item :pageType="pageType" :itemData="item" @unusedChangeStatus="unusedChangeStatus"
							@handleJumpDetail="handleJumpDetail(item)"></info-item>
					</view>
				</view>
			</view>
			<view class="attachment-community">
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
		</view>
		<u-modal :show="show" width="630rpx" @confirm="handleConfirm">
			<view class="slot-content">
				<view class="content">
					<image class="community" :src="communityInfo.url" mode=""></image>
					<view class="title">
						{{communityInfo.title}}
					</view>
					<image class="code" :src="communityInfo.qrCode" mode=""></image>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
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
		placeUser
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
				text: ["发布闲置后支持线上线下交易啦～", "111"],
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
		},
		created() {
			this.areaTree = areaData
			this.changePlaceUser()
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

				if (!this.isUserSelectedArea) {
					// 用户没有修改定位，则设置默认定位地址
					this.areas = newVal;
				}
			},
		},
		methods: {
			// 位置修改
			changePlaceUser() {
				placeUser({
					place: this.areas.map(item => {
						return item.value
					}).toString()
				}).then(res => {
					if (res.code === 200) {
						this.getCrowdList()
						this.getUnusedList()
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
			},
			chageClosed() {
				this.isUserSelectedArea = true;
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
				if (item.name == '闲置交易' || item.name == '闲置专区') {
					uni.switchTab({
						url: item.iconTo
					})
				} else {
					uni.navigateTo({
						url: item.iconTo
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .uni-data-tree-dialog {
		top: 50%;
	}

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
			}

			.attachment-community {
				margin-top: 20rpx;
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
			}
		}
	}
</style>