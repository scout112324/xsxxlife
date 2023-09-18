<template>
	<view class="home-page">
		<view class="address">
			<view class="select-address" @click="handleAddress">
				<text>{{ cityname }}</text>
				<uni-icons type="bottom" size="16"></uni-icons>
			</view>
		</view>
		<view class="notice">
			<text>公告:</text>
			<text>******</text>
		</view>
		<view class="service">
			<block v-for="item in serviceData" :key="item.id">
				<button @click="handleClickService(item.name)">{{item.name}}</button>
			</block>	
			<button class="occupy">宠物寄养</button>
		</view>
		<view class="life">
			<text class="left">生活圈</text>
			<text class="right">查看更多</text>
		</view>
		<view class="life-list">
			<block v-for="(item,index) in lifeDate" :key="item.id">
				<view class="life-title">{{item.title}}</view>
				<view class="life-item">
					<block v-for="subitem in item.list" :key="subitem.id">
						<image class="image" :src="subitem.image" alt=""></image>
					</block>
				</view>
			</block>
		</view>
		<view class="communities">
			<view class="title">
				附近社区
			</view>
			<view class="commu-item">
				<block v-for="item in communitiesData" :key="item.id">
					<view class="container">
						<view class="left">
							{{item.name}}
						</view>
						<view class="right">
							点击加入
						</view>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: "",
				cityname: "上海",
				lifeDate: [{
						id: 1,
						title: "闲置：****",
						list: [{
								id: 11,
								name: "测试1",
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							},
							{
								id: 12,
								name: "测试2",
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							},
							{
								id: 13,
								name: "测试3",
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							}
						]
					},
					{
						id: 2,
						title: "转租：****",
						list: [{
								id: 21,
								name: "测试1",
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							},
							{
								id: 22,
								name: "测试2",
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							},
							{
								id: 23,
								name: "测试3",
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							}
						]
					}
				],
				communitiesData: [{
						id: 1,
						name: "松江九亭生活圈"
					},
					{
						id: 2,
						name: "松江九亭生活圈"
					},
					{
						id: 3,
						name: "松江九亭生活圈"
					}
				],
				serviceData: [
					{
						id: 1,
						name: "综合服务"
					},
					{
						id: 2,
						name: "附近社区"
					},
					{
						id: 3,
						name: "兼职入口"
					},
					{
						id: 4,
						name: "房屋转让"
					},
					{
						id: 5,
						name: "寻人寻物"
					},
					{
						id: 6,
						name: "闲置交易"
					},
					{
						id: 7,
						name: "同城活动"
					},
					{
						id: 8,
						name: "大件清运"
					}
				]
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
			search() {},
			// 点击不同的服务切换到不同的服务界面
			handleClickService(name) {
				switch(name) {
					case "综合服务":
						uni.navigateTo({
							url:"/pages/index/service/service"
						})
						break;
					case "附近社区":
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
							url:"/pages/index/service/lookForPeople"
						})
						break;
					case "闲置交易":
						uni.navigateTo({
							url:"/pages/index/service/idleTransaction"
						})
						break;
					case "同城活动":
						uni.navigateTo({
							url: "/pages/index/service/intraCityActivity"
						})
						break;
					case "大件清运":
						uni.navigateTo({
							url:"/pages/index/service/largeShipmentClearance"
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
		margin: 10rpx;

		.address {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 100rpx;

			.select-address {
				display: flex;
				justify-content: space-between;
			}
		}

		.notice {
			display: flex;
			justify-content: center;
		}

		.service {
			display: flex;
			flex-shrink: 1;
			flex-wrap: wrap;

			::v-deep button {
				width: 30%;
				margin: 10rpx;
				font-size: 28rpx;
			}

			.occupy {
				visibility: hidden;
			}
		}

		.life {
			display: flex;
			justify-content: space-between;
			align-content: center;
		}

		.life-list {
			.life-item {
				display: flex;
				flex-wrap: nowrap;

				.image {
					margin: 20rpx;
					display: inline-block;
					width: 120rpx;
					height: 120rpx;
				}
			}
		}

		.communities {
			.container {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>