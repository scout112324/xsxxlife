<template>
	<view class="parent">
		<view class="comment-num">
			共{{total || 0}}条评论
		</view>
		<view class="comment-content">
			<!-- <input v-if="showInput" class="uni-input" placeholder="感兴趣的话可以留下你的评论呦～" @focus="handleFocus" /> -->
		</view>
		<block v-for="(item,index) in parentList" :key="item.id">
			<view class="user-info">
				<image v-if="item.photo" class="avatar" :src="item.photo" mode=""></image>
				<image v-else class="avatar" src="../static/avatar.png" mode=""></image>
				<view class="name">
					{{item.nickname}}
					<text class="seller address" v-if="item.seller">楼主</text>
				</view>
			</view>
			<view class="content">
				{{item.content}}
			</view>
			<view class="btn">
				<text class="time">{{item.place}}</text>
				<view class="record" @click="handleRecord(item.id)">
					回复
				</view>
			</view>
			<block v-if="activeIndex==index" v-for="childItem in childrenList" :key="childItem.id">
				<commentChildren :itemData="childItem" @childrenRecord="childrenRecord"></commentChildren>
			</block>
			<view class="more" @click="handleMoreComment(item.id,index)" v-if="item.count!=0">
				<view class="unfold">
					共{{item.count}}条回复--
				</view>
				<!-- <uni-icons type="bottom" size="13" v-if="childrenList.length==0"></uni-icons>
				<uni-icons type="top" size="13" v-else></uni-icons> -->
			</view>
		</block>
	</view>
</template>

<script>
	import commentChildren from "@/components/commentChildren.vue"
	import {
		listComment,
		childrenListComment
	} from "@/api/common.js"
	export default {
		components: {
			commentChildren
		},
		props: {
			pageType: {
				type: String,
				required: true
			},
			moduleId: {
				type: Number,
				required: true
			},
		},
		data() {
			return {
				// showInput: true,
				pageNum: 1,
				pageSize: 1000,
				type: 0,
				total: 0,
				parentList: [],
				pageNum1: 1,
				pageSize1: 1000,
				childrenList: [],
				activeIndex: 0,
			}
		},
		created() {
			this.getListComment()
		},
		methods: {
			childrenRecord(id) {
				this.$emit('focusInput', 1, id)
			},
			// 回复
			handleRecord(id) {
				this.$emit('focusInput', 1, id)
			},
			handleMoreComment(id, index) {
				this.activeIndex = index
				if (this.childrenList.length > 0) {
					this.childrenList = []
				} else {
					let params = {
						id: id,
						pageNum: this.pageNum1,
						pageSize1: this.pageSize1
					}
					childrenListComment(params).then(res => {
						if (res.code == 200) {
							this.childrenList = res.data
						}
					})
				}
			},
			handleFocus() {
				// this.showInput = false
				this.$emit('focusInput', 0)
			},
			getListComment() {
				if (this.pageType == "unused") {
					this.type = 3
				} else if (this.pageType == "message") {
					this.type = 6
				} else if (this.pageType == 'houseTransfer') {
					this.type = 1
				} else if (this.pageType == 'findPeople') {
					this.type = 2
				} else if (this.pageType == 'largeShipmentTransfer') {
					this.type = 5
				} else if (this.pageType == 'intraActivity') {
					this.type = 4
				} else if (this.pageType == 'partTime') {
					this.type = 0
				}
				let params = {
					type: this.type,
					moduleId: this.moduleId,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				listComment(params).then(res => {
					if (res.code == 200) {
						this.total = res.data.count
						this.parentList = res.data.list
						console.log(res.data)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.parent {
		padding: 40rpx 0;
		font-family: PingFangSC-Medium, PingFang SC;

		.comment-num {
			font-size: 30rpx;
			font-weight: 500;
			color: #232624;
			line-height: 42rpx;
			margin-bottom: 40rpx;
		}

		.comment-content {
			margin-bottom: 48rpx;

			.uni-input {
				box-sizing: border-box;
				width: 690rpx;
				height: 58rpx;
				background: #F6F4F4;
				border-radius: 29rpx;
				padding: 10rpx 22rpx;
			}
		}
	}

	.parent {
		margin: 30rpx;

		.user-info {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.avatar {
				width: 58rpx;
				height: 58rpx;
				border-radius: 29rpx;
				margin-right: 14rpx;
			}

			.name {
				font-size: 26rpx;
				font-weight: 500;
				color: #949494;
				line-height: 37rpx;


				.address {
					font-size: 28rpx;
					font-weight: 400;
					color: #232624;
					line-height: 37rpx;
					background-color: #F6F6F6;
					margin-left: 6rpx;
					padding: 10rpx;
					border-radius: 30rpx;

					&.seller {
						font-size: 22rpx;
					}
				}
			}
		}

		.content {
			margin-left: 72rpx;
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #232624;
			line-height: 37rpx;
		}

		.btn {
			margin-left: 72rpx;
			font-family: Source Han Sans SC VF;
			font-size: 20rpx;
			font-style: normal;
			font-weight: 400;
			line-height: normal;

			display: flex;
			justify-content: flex-start;
			align-items: center;

			.time {
				color: #949494;
			}

			.record {
				color: #FFBD3C;
				margin-left: 10rpx;
			}
		}

		.more {
			display: flex;
			align-items: center;

			.unfold {
				margin-left: 72rpx;
				font-size: 26rpx;
				color: #949494;
				line-height: 37rpx;
			}
		}
	}
</style>