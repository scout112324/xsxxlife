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
			},
			list: {
				type: Array,
				required: true
			}
		},
		data() {
			return {

			}
		},
		methods: {
			click(item) {
				if (this.pageType == 'star') {
					this.$emit('handleStarTab', item)
				} else if (this.pageType == 'support') {
					this.$emit('handleSupportTab', item)
				} else if (this.pageType == 'publish') {
					this.$emit('handlePublishTab', item)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>