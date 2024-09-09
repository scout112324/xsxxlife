<template>
	<view class="list-item">
		<block v-if="itemData.picture">
			<image
				v-if="imgType.includes(itemData.picture.split(',')[0].substr(itemData.picture.split(',')[0].lastIndexOf('.') + 1, itemData.picture.split(',')[0].length).toLowerCase())"
				class="image" :src="itemData.picture.split(',')[0]" mode="">
			</image>
			<video v-else class="image" :src="itemData.picture.split(',')[0]" controls></video>
		</block>
		<image class="image" v-else src="../../../static/chat/avatar.png" mode=""></image>
		<view class="content">
			<view class="sub-header">
				<view v-if="itemData.title" class="title" :class="{'mul-title': !(type!==0 && type!==2 && type!==4)}">
					{{itemData.title}}
				</view>
				<view v-else-if="itemData.content" class="title"
					:class="{'mul-title': !(type!==0 && type!==2 && type!==4)}">
					{{itemData.content}}
				</view>
				<view class="status" v-if="itemData.payStatus || itemData.payStatus==0">
					{{itemData.payStatus | statusFliter}}
				</view>
			</view>
			<view class="footer">
				<view class="price" v-if="type!==0 && type!==2 && type!==4">
					<text class="unit">¥</text>
					<text>{{itemData.price}}</text>
				</view>
				<view class="price" v-else></view>
				<view class="btn" v-if="type!==0">
					<button class="btn-item delete" @click.stop="handleDeleteClick(itemData.id)">删除</button>
					<button class="btn-item" @click.stop="handleEditClick(itemData)">编辑</button>
				</view>
			</view>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog :type="msgType" cancelText="关闭" confirmText="同意" title="提示" content="确认要删除这条发布内容吗？"
				@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {
		deleteHouse,
		deleteFind,
		deleteUnused,
		deleteActivity,
		deleteBig
	} from "@/api/user/index.js"
	export default {
		options: {
			styleIsolation: 'shared',
		},
		props: {
			itemData: {
				type: Object
			},
			type: {
				type: Number,
				default: 0
			}
		},
		created() {
			this.pictureList = this.itemData.picture ? this.itemData.picture.split(',') : []
			this.pictureUrl = this.itemData.picture ? this.pictureList[0] : ""
		},
		data() {
			return {
				imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
				videoType: ['mp4'],
				pictureList: [],
				pictureUrl: "",
				itemId: "",
			}
		},
		methods: {
			// 删除
			handleDeleteClick(id) {
				this.$refs.alertDialog.open()
				this.itemId = id
			},
			// 编辑
			handleEditClick(item) {
				switch (this.type) {
					case 1:
						uni.navigateTo({
							url: `/pages/index/service/modules/houseTransferPublish/houseTransferPublish?itemData=${encodeURIComponent(JSON.stringify(item))}`
						})
						break
					case 2:
						uni.navigateTo({
							url: `/pages/index/service/modules/lookForPeoplePublish/lookForPeoplePublish?itemData=${encodeURIComponent(JSON.stringify(item))}`
						})
						break
					case 3:
						uni.navigateTo({
							url: `/pages/unused/addUnused/addUnused?itemData=${encodeURIComponent(JSON.stringify(item))}`
						})
						break
					case 4:
						uni.navigateTo({
							url: `/pages/index/service/modules/intraCityPublish/intraCityPublish?itemData=${encodeURIComponent(JSON.stringify(item))}`
						})
						break
					case 5:
						uni.navigateTo({
							url: `/pages/index/service/modules/largeShipmentPublish/largeShipmentPublish?itemData=${encodeURIComponent(JSON.stringify(item))}`
						})
						break
				}
			},
			dialogClose() {
				this.$refs.alertDialog.close()
				this.itemId = ""
			},
			dialogConfirm() {
				this.$refs.alertDialog.close()
				console.log('item', this.itemId, this.type)
				if (this.type == 1) {
					let params = {
						id: this.itemId
					}
					deleteHouse(params).then(res => {
						if (res.code === 200) {
							this.$emit('handleDataChange')
							uni.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 2000
							})
						}
					})
				} else if (this.type == 2) {
					let params = {
						id: this.itemId
					}
					deleteFind(params).then(res => {
						if (res.code === 200) {
							this.$emit('handleDataChange')
							uni.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 2000
							})
						}
					})
				} else if (this.type == 3) {
					let params = {
						id: this.itemId
					}
					deleteUnused(params).then(res => {
						if (res.code === 200) {
							this.$emit('handleDataChange')
							uni.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 2000
							})
						}
					})
				} else if (this.type == 4) {
					let params = {
						id: this.itemId
					}
					deleteActivity(params).then(res => {
						if (res.code === 200) {
							this.$emit('handleDataChange')
							uni.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 2000
							})
						}
					})
				} else if (this.type == 5) {
					let params = {
						id: this.itemId
					}
					deleteBig(params).then(res => {
						if (res.code === 200) {
							this.$emit('handleDataChange')
							uni.showToast({
								title: '删除成功',
								icon: 'success',
								duration: 2000
							})
						}
					})
				}
			},
		},
		filters: {
			statusFliter(val) {
				switch (val) {
					case 0:
						return "在售";
					case 1:
						return "已支付";
					case 2:
						return "待收货";
					case 3:
						return "已收货";
					case 4:
						return "已退款";
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-item {
		display: flex;
		margin-bottom: 20rpx;

		.image {
			width: 158rpx;
			height: 158rpx;
			border-radius: 10rpx;

			margin-right: 21rpx;
		}

		.content {
			flex: 1;
			font-family: PingFangSC-Regular, PingFang SC;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.sub-header {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.status {
					font-size: 26rpx;
					font-weight: 400;
					color: #707070;
				}
			}

			.title {
				font-size: 28rpx;
				font-weight: 400;
				color: #232624;
				// width: 521rpx;

				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2; //第几行
				-webkit-box-orient: vertical;
			}



			.footer {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.price {
					// margin: 20rpx;
					font-size: 30rpx;
					font-weight: 500;
					color: #D30303;

					.unit {
						font-size: 20rpx;
					}
				}

				.btn {
					display: flex;
					align-items: center;

					::v-deep .btn-item {
						&.delete {
							margin-right: 10rpx;
						}

						&::after {
							border: none
						}

						width: 126rpx;
						height: 58rpx;
						line-height: 58rpx;
						background: #FFFFFF;
						border-radius: 29rpx;
						border: 2rpx solid #D8D8D8;

						padding: 0;
						font-size: 25rpx;
						font-family: PingFangSC-Regular,
						PingFang SC;
						font-weight: 400;
						color: #4D504F;
					}
				}
			}
		}
	}
</style>