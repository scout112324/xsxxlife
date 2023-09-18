<template>
	<view class="local-service">
		<view class="local-list">
			<view class="local-item" v-for="item in localService" :key="item.id">
				<view class="avatar">
					<image class="image" :src="item.image" alt=""></image>
					<view class="sub-title">
						{{item.name}}
					</view>
					<view class="range">
						经营范围: 松江区
					</view>
					<view class="phone">
						电话: 16272627262
					</view>
					<view class="address">
						位置: 松江区九里亭
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
				localService: [
					{
						id: 1,
						image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1",
						name: "李师傅",
						range: "松江区",
						address: "九亭青年城"
					},
					{
						id: 2,
						image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1",
						name: "王师傅",
						range: "松江区",
						address: "九亭青年城"
					},
					{
						id: 3,
						image: "https://tse3-mm.cn.bing.net/th/id/OIP-C.W38cHNbpeslJrW3v0DyP4QHaEK?pid=ImgDet&rs=1",
						name: "张师傅",
						range: "松江区",
						address: "九亭青年城"
					},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.local-service {
	.local-list {
		display: flex;
		flex-direction: column;
		.local-item {
			text-align: center;
			margin: 30rpx 0;
			.avatar {
				display: flex;
				flex-direction: column;
				text-align: center;
				align-items: center;
				.image {
					width: 120rpx;
					height: 120rpx;
				}
			}
		}
	}
}
</style>
