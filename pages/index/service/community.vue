<template>
	<view class="community-page">
		<view class="community-list">
			<view class="community-item" v-for="item in communityData" :key="item.id">
				<view class="left">
					{{item.address}}
				</view>
				<view class="right">
					<text>点击加入</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				communityData: [
					{
						id: 1,
						address: "松江九亭生活圈"
					},
					{
						id: 2,
						address: "松江生活圈"
					},
					{
						id: 3,
						address: "上海本地社区生活圈"
					},
					{
						id: 4,
						address: "松江九亭生活圈"
					},
					{
						id: 5,
						address: "青浦生活圈"
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.community-page {
	.community-list {
		margin: 20rpx;
		.community-item {
			margin: 20rpx 0;
			padding: 20rpx;
			background-color: #ccc;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
}
</style>
