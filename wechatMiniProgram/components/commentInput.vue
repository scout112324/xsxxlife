<template>
	<view>
		<view class="submit">
			<view class="submit-chat">
				<!-- 文本框 -->
				<textarea class="chat-send btn" @blur="blur" @focus="focus" auto-focus
					@keyboardheightchange="keyboardheightchange" v-model="msg" :show-confirm-bar="false"
					:adjust-position="false"></textarea>
				<button class="send-message" @tap="messageSend">发送</button>
			</view>
			<view class="occupy" :style="{height: `${keyboardHeight}px`}"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: "",
				keyboardHeight: 0
			};
		},
		created() {
			this.getElementHeight()
		},
		methods: {
			blur() {
				this.$emit('inputs')
			},
			//获取高度方法
			getElementHeight() {
				const query = uni.createSelectorQuery().in(this);
				query.select('.submit').boundingClientRect(data => {
					this.$emit('heights', data.height);
				}).exec();
			},
			keyboardheightchange(e) {
				this.keyboardHeight = e.detail.height
				setTimeout(() => {
					this.getElementHeight()
				}, 10)
			},
			// 输入框聚焦
			focus() {
				setTimeout(() => {
					this.getElementHeight()
				}, 10)
			},
			// 消息发送
			messageSend() {
				this.$emit('inputs', this.msg);
			},
		}
	};
</script>

<style lang="scss" scoped>
	.submit {
		background: rgba(244, 244, 244, 0.96);
		border-top: 1px solid rgba(39, 40, 50, 0.1);
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 100;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.displaynone {
		display: none;
	}

	.submit-chat {
		width: 100%;
		display: flex;
		// align-items: flex-end;
		align-items: center;
		box-sizing: border-box;
		padding: 14rpx 14rpx;

		image {
			width: 56rpx;
			height: 56rpx;
			margin: 0 10rpx;
			flex: auto;
		}

		.send-message {
			margin: 0;
			padding: 0 10rpx;
			background-color: #FFD100;
			width: 100rpx;
			font-size: 24rpx;

			&::after {
				border: none
			}
		}

		.btn {
			flex: auto;
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			max-height: 160rpx;
			margin: 0 10rpx;
		}

		.chat-send {
			line-height: 44rpx;
			height: 44rpx;
		}

		.record {
			line-height: 44rpx;
			text-align: center;
			font-size: 20rpx;
			color: rgba(39, 40, 50, 0.6);
		}
	}
</style>