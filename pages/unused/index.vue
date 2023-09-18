<template>
	<view class="unused-page">
		<view class="idle-list">
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				unusedData: [{
						id: 11,
						desc: "房屋转租房屋转租房屋转租房屋转租房屋转租房屋转租",
						price: "2000",
						goods: [{
								id: 1,
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							},
							{
								id: 2,
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							},
							{
								id: 3,
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							},
							{
								id: 4,
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							},
						]
					},
					{
						id: 12,
						desc: "房屋转租房屋转租房屋转租房屋转租房屋转租房屋转租",
						price: "2000",
						goods: [{
								id: 1,
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							},
							{
								id: 2,
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							},
							{
								id: 3,
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							},
							{
								id: 4,
								image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1"
							},
						]
					}
				],
				title: 'uni-fab',
				directionStr: '垂直',
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				is_color_type: false,
			}
		},
		methods: {
			handleDetail(item) {
				uni.navigateTo({
					url: "/pages/unused/detailUnused/detail"
				})
			},
			fabClick() {
				uni.navigateTo({
					url: "/pages/unused/addUnused/addUnused"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.unused-page {
		.idle-list {
			.idle-item {
				background-color: #ccc;
				margin: 20rpx;
				padding: 20rpx;

				.title {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.content {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;

					.image {
						margin: 20rpx 0;
						width: 30%;
						height: 220rpx;
					}
				}
			}
		}
	}
</style>