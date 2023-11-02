<template>
	<u-tabs :list="list" @click="click" lineWidth="41" lineColor="#FFD100" :activeStyle="{
		            color: '#232624',
		            fontWeight: 'bold',
		            transform: 'scale(1.05)'
		        }" :inactiveStyle="{
		            color: '#949494',
		            transform: 'scale(1)'
		        }" itemStyle="padding-left: 28rpx; padding-right: 28rpx; height: 88rpx;"></u-tabs>
</template>

<script>
	export default {
		options: {
			styleIsolation: 'shared',
		},
		props: {
			pageType: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				list: [{
						name: '兼职'
					}, {
						name: '房屋转让'
					}, {
						name: '寻人寻物'
					}, {
						name: '闲置交易'
					}, {
						name: '同城活动'
					},
					{
						name: '大件清运'
					},
					{
						name: '资讯',
					}
				]
			}
		},
		methods: {
			click(item) {
				console.log(item)
				if (this.pageType == 'star') {
					this.$emit('handleStarTab', item)
				} else if (this.pageType == 'support') {
					console.log(item)
					this.$emit('handleSupportTab', item)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>