<template>
	<view class="publish-page">
		<u-navbar title="我的发布" :titleStyle="titleStyle" placeholder>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="18" @click="handleBack"></u-icon>
			</view>
		</u-navbar>
		<view class="publish-container">
			<uni-easyinput prefixIcon="search" v-model="keyword" placeholder="请输入搜索关键字" @confirm="handleConfirm">
			</uni-easyinput>
		</view>
		<view class="tabs">
			<tab :list="list" :pageType="pageType" @handlePublishTab="handlePublishTab"></tab>
		</view>
		<view class="list-container">
			<block v-for="item in publishListInfo" :key="item.id">
				<view class="list-item">
					<block v-if="item.picture">
						<image
							v-if="imgType.includes(item.picture.split(',')[0].substr(item.picture.split(',')[0].lastIndexOf('.') + 1, item.picture.split(',')[0].length).toLowerCase())"
							class="image" :src="item.picture.split(',')[0]" mode="">
						</image>
						<video v-else class="image" :src="item.picture.split(',')[0]" controls></video>
					</block>
					<image class="image" v-else src="../../../static/chat/avatar.png" mode=""></image>
					<view class="content">
						<view v-if="item.title" class="title"
							:class="{'mul-title': !(type!==0 && type!==2 && type!==4)}">
							{{item.title}}
						</view>
						<view v-else-if="item.content" class="title"
							:class="{'mul-title': !(type!==0 && type!==2 && type!==4)}">
							{{item.content}}
						</view>
						<view class="footer">
							<view class="price" v-if="type!==0 && type!==2 && type!==4">
								<text class="unit">¥</text>
								<text>{{item.price}}</text>
							</view>
							<view class="price" v-else></view>
							<view class="btn" v-if="type!==0" @click="handleEditClick(item)">
								<button class="edit">编辑</button>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import tab from "@/components/tab.vue"
	import {
		myPublic
	} from "@/api/user/index.js"
	export default {
		components: {
			tab
		},
		data() {
			return {
				keyword: "",
				titleStyle: {
					fontWeight: 500,
					color: "#131313"
				},
				imgType: ['bmp', 'jpg', 'jpeg', 'png', 'gif'],
				type: 0,
				pageNum: 1,
				pageSize: 10,
				publishListInfo: [],
				pageType: "publish",
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
					}
				]
			}
		},
		onShow() {
			this.getMyPublic()
		},
		methods: {
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
			handlePublishTab(item) {
				this.type = item.index
				this.getMyPublic()
			},
			getMyPublic() {
				let params = {
					search: this.keyword,
					type: this.type,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				myPublic(params).then(res => {
					if (res.code === 200) {
						this.publishListInfo = res.data
					}
				})
			},
			// 搜索
			handleConfirm() {
				this.getMyPublic()
			},
			handleBack() {
				uni.switchTab({
					url: "/pages/user/index"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.publish-page {
		background-color: #F3F6F5;
		height: 100vh;

		::v-deep .u-status-bar,
		::v-deep .u-navbar__content {
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
		}

		.publish-container {
			background-color: #F3F6F5;
			height: 110rpx;
			background: linear-gradient(90deg, #FBE94E 0%, #F9DC4A 100%);
			box-sizing: border-box;
			padding: 19rpx 0;

			::v-deep .uni-easyinput {
				height: 72rpx;
				width: 694rpx;
				margin: 0 28rpx;

			}

			::v-deep .is-input-border {
				border-radius: 36rpx;
			}
		}

		.tabs {
			background-color: #ffffff;
			margin-bottom: 20rpx;
		}

		.list-container {
			background-color: #ffffff;
			padding: 32rpx 28rpx 30rpx 28rpx;

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

					.title {
						font-size: 28rpx;
						font-weight: 400;
						color: #232624;
						width: 521rpx;

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
							::v-deep .edit {
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
		}
	}
</style>