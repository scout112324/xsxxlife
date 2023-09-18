<template>
	<view class="service-page">
		<view class="notice">
			<text>公告:(****************)</text>
		</view>
		<view class="content">
			<view class="title">
				选择服务类别
			</view>
			<view class="service-type">
				<view class="item" v-for="item in serviceType" :key="item.id" @click="handleServiceType(item.name)">
					<image class="image" :src="item.image" alt=""></image>
					<view class="sub-title">
						{{item.name}}
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
				serviceType: [
					{
						id: 1,
						name: "通下水道",
						image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
					},
					{
						id: 2,
						name: "家电维修",
						image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
					},
					{
						id: 3,
						name: "大件清运",
						image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
					},
					{
						id: 4,
						name: "维修水电",
						image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
					},
					{
						id: 5,
						name: "放水漏水",
						image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
					},
					{
						id: 6,
						name: "开锁",
						image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
					}
				]
			}
		},
		methods: {
			handleServiceType(type) {
				uni.navigateTo({
					url: "/pages/index/service/modules/serviceDetail/serviceDetail"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.service-page {
	margin: 20rpx;
	.content {
		.service-type {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			.item {
				display: flex;
				flex-direction: column;
				width: 25%;
				.image {
					width: 120rpx;
					height: 120rpx;
					border-radius: 50%;
				}
			}
		}
	}
}
</style>
