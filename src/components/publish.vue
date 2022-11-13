<template>
	<div v-show="isShow" class="post input-dialog">
		<textarea
			v-model="content"
			class="input-content"
			placeholder="请输入消息"
		></textarea>
		<div class="bottom">
			<div class="buttons">
				<el-button
					type="primary"
					small
					round
					@click="confirm"
					icon="Check"
					>确认</el-button
				><el-button type="info" small round @click="cancel"
					>取消</el-button
				>
			</div>
		</div>
	</div>
	<div @click="show" class="publish">发布</div>
</template>
<script>
export default {
	emits: ["published"],

	data() {
		return {
			isShow: false,
			content: "",
		}
	},
	methods: {
		show() {
			this.isShow = !this.isShow
			window.scrollTo({ top: 0, behavior: "smooth" })
		},
		cancel() {
			this.isShow = false
		},

		async confirm() {
			// this.$el.remove()
			if (this.content.length < 5) {
				this.$alerting.alertWarning("至少 5 个字符。")
				return
			}

			if (this.content.length > 100) {
				this.$alerting.alertWarning("最多 100 个字符。")
				return
			}
			// alert(this.content)

			await this.$api.publishPost(this.content)

			this.$alerting.alertSuccess("发布成功")
			this.isShow = false

			this.$emit("published")
		},
	},
}
</script>
<style scoped>
.post {
	background-color: #0f0f0f;
	padding: 20px;
	border-radius: 16px;

	margin: 20px 0;
}

.post .bottom {
	color: white;
	font-size: 12px;

	display: flex;
	justify-content: space-between;
	align-items: center;
}

.post .bottom .buttons {
	display: flex;
	/* 子项的间距 */
	gap: 10px;

	opacity: 0;

	transition: opacity 0.5s;
}

.post:hover .bottom .buttons {
	opacity: 1;
}

@media (max-width: 560px) {
	.post .bottom .buttons {
		opacity: 0.5;
	}
}

.publish {
	width: 60px;
	height: 60px;

	background-color: teal;
	color: white;

	font-weight: bold;
	border-radius: 50%;

	/* 方法一 */
	/* text-align: center; */
	/* 字会在一行居中 */
	/* line-height: 60px; */

	/* 方法二 */
	display: flex;
	/* 水平 */
	justify-content: center;
	/* 垂直 */
	align-items: center;

	position: fixed;
	bottom: 20px;
	right: 20px;

	cursor: pointer;

	/* 禁止选中文本 */
	user-select: none;
	z-index: 100;
}

.post .input-content {
	width: 100%;
	height: 100px;

	margin-bottom: 20px;

	outline: none;
	border: none;
	background-color: #aaa;

	padding: 10px;

	border-radius: 6px;
}

.input-dialog .bottom .buttons {
	opacity: 1;
}

.input-dialog .bottom {
	justify-content: flex-end;
}
</style>
