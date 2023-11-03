<template>
	<view class="part-time-item">
		<view class="leaflet" v-if="pictureList.length>0">
			<image
				v-if="imgType.includes(pictureList[0].substr(pictureList[0].lastIndexOf('.') + 1, pictureList[0].length).toLowerCase())"
				class="image" :src="pictureList[0]" mode="">
			</image>
			<video v-else class="image" :src="pictureList[0]" controls></video>
		</view>
		<view class="leaflet" v-else>
			<image class="image" src="../../../../static/home/load.png" mode=""></image>
		</view>
		<view class="content">
			<view class="title">
				{{itemData.title}}
			</view>
			<view class="item">
				<view class="circle circle1"></view>
				<view class="type">
					报名截止时间: {{itemData.endTime}}
				</view>
			</view>
			<view class="item">
				<view class="circle circle2"></view>
				<view class="type">
					发布地点: {{itemData.place}}
				</view>
			</view>
			<view class="item">
				<view class="circle circle3"></view>
				<view class="type">
					活动开始时间: {{itemData.startTime}}
				</view>
			</view>
			<view class="item">
				<view class="circle circle4"></view>
				<view class="type">
					活动地点: {{itemData.detailsPlace}}
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="left">
				<image class="icon" src="../../../../static/home/tishi.png" mode=""></image>
				<text class="rule">限{{itemData.limitPeople}}人报名参加</text>
			</view>
			<view class="right" @click="handleJumpDetail">
				<text>进入活动</text>
				<uni-icons type="forward" size="13"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			itemData: {
				type: Object,
				default: () => {}
			}
		},
		options: {
			styleIsolation: 'shared', // 解除样式隔离
		},
		data() {
			return {
				pictureList: [],
				imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
			}
		},
		created() {
			this.pictureList = this.itemData.picture ? this.itemData.picture.split(',') : []
		},
		methods: {
			handleJumpDetail() {
				this.$emit('jumpIntraCityDetail')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.part-time-item {
		height: 730rpx;
		background-color: #ffffff;
		border-radius: 24rpx;
		margin-bottom: 20rpx;
		box-sizing: border-box;

		.leaflet {

			.image {
				height: 294rpx;
				width: 100%;
				border-radius: 20rpx 20rpx 0rpx 0rpx;
			}
		}

		.content {
			box-sizing: border-box;
			margin: 20rpx 30rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			border-bottom: 2px solid rgba(216, 216, 216, 0.5);

			.title {
				font-size: 30rpx;
				font-weight: 500;
				color: #232624;
			}

			.item {
				display: flex;
				align-items: center;
				font-size: 26rpx;
				font-weight: 400;
				color: #4D504F;
				line-height: 42rpx;
				margin: 18rpx 0;

				.circle {
					width: 10rpx;
					height: 10rpx;
					border-radius: 10rpx;
					margin-right: 12rpx;
				}

				.circle1 {
					background: #D30303;
				}

				.circle2 {
					background: #008CC2;
				}

				.circle3 {
					background: #FFD100;
				}

				.circle4 {
					background: #2ABD6F;
				}
			}

		}

		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 30rpx;

			.left {
				display: flex;
				align-items: center;

				.icon {
					width: 26rpx;
					height: 26rpx;
					margin-right: 8rpx;
				}
			}

			.right {
				display: flex;
				align-items: center;

				font-size: 26rpx;
				font-weight: 400;
				color: #D9B928;

				::v-deep .uni-icons {
					color: #D9B928 !important;
				}
			}
		}
	}
</style>