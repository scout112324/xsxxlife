<template>
	<view class="content">
		<!-- 聊天内容 -->
		<scroll-view class="chat" scroll-y="true" scroll-with-animation="true" :scroll-into-view="scrollToView">
			<view class="chat-main" :style="{paddingBottom:inputh+'rpx'}">
				<view v-if="chatList.length>0" class="chat-ls" v-for="(item,index) in chatList" :key="index"
					:id="'msg'+ index">
					<view class="chat-time" v-if="item.time != ''">{{item.time}}</view>
					<view class="msg-m msg-left" v-if="item.sendType ==  0">
						<image v-if="item.sendPhoto" class="user-img" src="../../../static/chat/avatar.png"></image>
						<image v-else class="user-img" src="../../../static/chat/avatar.png"></image>
						<view class="message" v-if="item.type == 0">
							<!-- 文字 -->
							<view class="msg-text">{{item.msg}}</view>
						</view>
						<view class="message" v-if="item.type == 1" @tap="previewImg(item.msg)">
							<!-- 图像 -->
							<image v-if="JSON.parse(item.msg).fileType=='image'"
								:src="JSON.parse(item.msg).tempFilePath" class="msg-img" mode="widthFix"
								@tap="previewImg(JSON.parse(item.msg))"></image>
							<video v-if="JSON.parse(item.msg).fileType=='video'"
								:src="JSON.parse(item.msg).tempFilePath" class="msg-img" mode="widthFix"></video>
							<!-- <image :src="item.msg" class="msg-img" mode="widthFix"></image> -->
						</view>
					</view>
					<view class="msg-m msg-right" v-if="item.sendType != 0">
						<image v-if="item.myPhoto" class="user-img" :src="item.myPhoto"></image>
						<image v-else class="user-img" src="../../../static/chat/avatar.png"></image>
						<view class="message" v-if="item.type == 0">
							<view class="msg-text">{{item.msg}}</view>
						</view>
						<view class="message" v-if="item.type == 1">
							<image v-if="JSON.parse(item.msg).fileType=='image'"
								:src="JSON.parse(item.msg).tempFilePath" class="msg-img" mode="widthFix"
								@tap="previewImg(JSON.parse(item.msg))"></image>
							<video v-if="JSON.parse(item.msg).fileType=='video'"
								:src="JSON.parse(item.msg).tempFilePath" class="msg-img" mode="widthFix"></video>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<submit @inputs="inputs" @heights="heights"></submit>
	</view>
</template>

<script>
	import dateTime from '../../../common/dateTime.js';
	import submit from '../../../components/submit.vue';

	import {
		msgChat,
	} from "@/api/user/index.js"


	//音频播放
	const innerAudioContext = uni.createInnerAudioContext();

	export default {
		onReady() {
			this.getMsgChat()
		},
		onLoad(options) {
			this.userId = options.userId
			console.log('userId', this.userId)

			// socket初始化
			this.init()
			// 定时器，定时判断socket有没有掉线
			this.timer = setInterval(() => {
				this.isSocketConnct()
			}, 2000)

		},
		destroyed() {
			uni.$emit('changeReadStatus', this.userId)
		},
		data() {
			return {
				// socket是否开启
				socketOpen: false,
				// 定时器
				timer: null,
				userId: "",
				pageNum: 1,
				pageSize: 1000,
				msg: [],
				// 反转数据接收
				chatList: [],
				imgMsg: [],
				scrollToView: '',
				oldTime: new Date(),
				inputh: '120'
			}
		},
		onShow() {
			// 跳转到最后一条数据 与前面的:id进行对照
			this.$nextTick(function() {
				this.scrollToView = 'msg' + (this.chatList.length - 1)
			})
		},
		components: {
			submit,
		},
		beforeDestroy() {
			// 关闭定时器
			clearInterval(this.timer)
			// 关闭Socket
			this.closeSocket()
		},
		methods: {
			// 初始化
			init() {
				this.connect()
				this.openSocket()
				this.onclose()
				this.onSocketMessage()
				this.onSocketError()
			},
			// 打开Soceket
			openSocket() {
				let that = this
				uni.onSocketOpen((res) => {
					that.socketOpen = true
					console.log('WebSocket连接已打开！');
				});
			},
			// 判断是否连接
			isSocketConnct() {
				if (!this.socketOpen) {
					console.log("WebSocket 再次连接！");
					this.init()
				}
			},
			// 建立连接
			connect() {
				let openId = uni.getStorageSync('openId')
				uni.connectSocket({
					url: `wss://www.lionjj.club/websocketxian/${openId}`,
					// url: `ws://43.138.111.70:6001/websocket/${openId}`,
					header: {
						'content-type': 'application/json'
					},
					method: 'POST',
					success(res) {
						console.log('res', res)
					}
				})
			},
			// 监听关闭
			onclose() {
				let that = this
				uni.onSocketClose((res) => {
					that.socketOpen = false
					console.log('WebSocket 已关闭！');
				});
			},
			// 关闭
			closeSocket() {
				uni.closeSocket();
			},
			onSocketError() {
				uni.onSocketError(res => {
					console.log('onSocketError', res)
				})
			},
			// 接收事件
			onSocketMessage() {
				let that = this
				uni.onSocketMessage((res) => {
					let obj = JSON.parse(res.data)
					console.log("接收事件", obj);
					this.chatList.push({
						...obj,
						sendType: 0
					})
					// 跳转到最后一条数据 与前面的:id进行对照
					this.$nextTick(function() {
						this.scrollToView = 'msg' + (this.chatList.length - 1)
					})
					if (obj.type == 1) {
						let msgInfo = JSON.parse(obj.msg)
						if (msgInfo.fileType == 'image') {
							this.imgMsg.push(msgInfo.tempFilePath);
						}
					}
				});
			},
			// 获取聊天记录
			getMsgChat() {
				let params = {
					userId: this.userId,
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}
				msgChat(params).then(res => {
					if (res.code === 200) {
						let msgList = res.data
						if (msgList.length > 0) {
							// 数组倒叙 主要是应对后端传过来的数据
							msgList.forEach(item => {
								if (item.type == 1) {
									let msgInfo = JSON.parse(item.msg)
									if (msgInfo.fileType == 'image') {
										this.imgMsg.unshift(msgInfo.tempFilePath);
									}
								}
								return this.chatList.unshift(item)
							})
						} else {
							this.chatList = msgList
						}
						this.goBottom()
					}
				})
			},
			changeTime(date) {
				return dateTime.dateTime1(date);
			},
			// 进行图片的预览
			previewImg(e) {
				let index = 0;
				for (let i = 0; i < this.imgMsg.length; i++) {
					if (this.imgMsg[i] == e.tempFilePath) {
						index = i;
					}
				}
				// 预览图片
				uni.previewImage({
					current: index,
					urls: this.imgMsg,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			//接受输入内容
			inputs(e) {
				console.log('e', e)
				//时间间隔处理
				let data = {
					type: e.type,
					msg: e.type == 1 ? JSON.stringify(e.message) : e.message,
					acceptUserId: this.userId,
				};
				// 发送给服务器消息
				if (this.socketOpen) {
					let that = this
					uni.sendSocketMessage({
						data: JSON.stringify(data),
						success() {
							that.chatList.push({
								...data,
								time: `${new Date().getHours() > 9 ? new Date().getHours() : '0' + new Date().getHours()}:${new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes()}`,
								sendType: 1
							})
							console.log('发送成功', data, that.chatList)
						},
						fail(err) {
							console.log(err)
						}
					})
				} else {
					// Socket没有开启，重新连接并重新发送消息
					this.init()
					setTimeout(() => {
						this.inputs(data)
					}, 2000)
				}

				// 跳转到最后一条数据 与前面的:id进行对照
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.chatList.length - 1)
				})
				if (e.type == 1) {
					let msgInfo = JSON.parse(e.msg)
					if (msgInfo.fileType == 'image') {
						this.imgMsg.push(msgInfo.tempFilePath);
					}
				}
			},
			//输入框高度
			heights(e) {
				this.inputh = Number(e * 2 + 20).toString();
				this.goBottom();
			},
			// 滚动到底部
			goBottom() {
				this.scrollToView = '';
				this.$nextTick(function() {
					this.scrollToView = 'msg' + (this.chatList.length - 1)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		background-color: rgba(244, 244, 244, 1);

		.chat {
			height: 100%;

			.chat-main {
				padding: 32rpx;
				display: flex;
				flex-direction: column;
			}

			.chat-ls {
				.chat-time {
					font-size: 24rpx;
					color: rgba(39, 40, 50, 0.3);
					line-height: 34rpx;
					padding: 10rpx 0rpx;
					text-align: center;
				}

				.msg-m {
					display: flex;
					padding: 20rpx 0;

					.user-img {
						flex: none;
						width: 51rpx;
						height: 52rpx;
						border-radius: 26rpx;
					}

					.message {
						flex: none;
						max-width: 480rpx;
					}

					.msg-text {
						font-size: 32rpx;
						color: rgba(39, 40, 50, 1);
						line-height: 44rpx;
						padding: 18rpx 24rpx;
					}

					.msg-img {
						max-width: 200rpx;
						border-radius: 20rpx;
					}

					.voice {
						// width: 200rpx;
						min-width: 100rpx;
						max-width: 400rpx;
					}

					.voice-img {
						width: 28rpx;
						height: 36rpx;
					}
				}

				.msg-left {
					flex-direction: row;

					.msg-text {
						margin-left: 16rpx;
						background-color: #fff;
						border-radius: 0rpx 20rpx 20rpx 20rpx;
					}

					.ms-img {
						margin-left: 16rpx;
					}

					.msh-map {
						margin-left: 16rpx;
						border-radius: 0rpx 20rpx 20rpx 20rpx;
					}

					.voice {
						text-align: right;

					}

					.voice-img {
						float: left;
						transform: rotate(180deg);
						width: 28rpx;
						height: 36rpx;
						padding-bottom: 4rpx;
					}
				}

				.msg-right {
					flex-direction: row-reverse;

					.msg-text {
						margin-right: 16rpx;
						background-color: rgba(255, 228, 49, 0.8);
						border-radius: 20rpx 0rpx 20rpx 20rpx;
					}

					.ms-img {
						margin-right: 16rpx;
					}

					.msh-map {
						margin-left: 16rpx;
						border-radius: 20rpx 0rpx 20rpx 20rpx;
					}

					.voice {
						text-align: left;

					}

					.voice-img {
						float: right;
						padding: 4rpx;
						width: 28rpx;
						height: 36rpx;
					}
				}
			}
		}
	}
</style>