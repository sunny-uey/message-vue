<template>
	<div class="post">
		<template v-if="isEdit">
			<!-- 编辑状态 -->
			<textarea
				class="input-content"
				placeholder="请输入消息"
				v-if="isEdit"
				v-model="current"
			></textarea>

			<div class="content" v-else>{{ content }}</div>
			<div class="bottom">
				<p class="time">{{ formatTime(publishTime) }}</p>
				<div class="buttons">
					<el-button
						type="primary"
						small
						round
						@click="confirmEdit"
						icon="Check"
						>确认</el-button
					><el-button type="info" small round @click="cancel"
						>取消</el-button
					>
				</div>
			</div>
		</template>
		<template v-else>
			<!-- 正常状态 -->
			<textarea
				class="input-content"
				placeholder="请输入消息"
				v-if="isEdit"
				v-model="content"
			></textarea>

			<div class="content" v-else>{{ content }}</div>
			<div class="bottom">
				<p class="time">{{ formatTime(publishTime) }}</p>
				<div class="buttons">
					<el-button
						type="primary"
						small
						round
						@click="edit"
						icon="Edit"
						>编辑</el-button
					>
					<el-popconfirm
						title="Are you sure to delete this?"
						@confirm="remove"
						width="fit-content"
					>
						<template #reference>
							<!-- <el-button>Delete</el-button> -->
							<el-button type="warning" small round icon="Delete"
								>删除</el-button
							>
						</template>
					</el-popconfirm>
				</div>
			</div>
		</template>
	</div>
</template>
<script>
// import { api } from "../plugins/api.js"

export default {
	props: ["postId", "content", "publishTime"],
	data() {
		return {
			isEdit: false,
			// show: false,
			isRemove: true,
			current: this.content,
		}
	},
	methods: {
		edit() {
			this.isEdit = true
			// this.show = true
		},
		async remove() {
			await this.$api.deletePost(this.postId)
			this.$el.remove()
			this.$alerting.alertSuccess("删除成功")

			// this.isRemove = false

			// console.log(this.$el)
		},
		async confirmEdit() {
			// 确认编辑
			await this.$api.updatePost(this.postId, this.current)
			this.isEdit = false

			this.$alerting.alertSuccess("修改成功")

			// await api.updatePost(this.postId, inputElement.value)
		},
		cancel() {
			// 取消编辑
			this.isEdit = false
		},
		formatTime(timestamp) {
			// 时间戳转成时间
			const time = new Date(timestamp * 1000)
			return `${time.getFullYear()}-${this.fillZero(
				time.getMonth() + 1
			)}-${time.getDate()} ${this.fillZero(
				time.getHours()
			)}:${this.fillZero(time.getMinutes())}`
		},
		fillZero(n) {
			return n < 10 ? `0${n}` : n
		},
	},
}
</script>
<!-- scoped会限制sfc文件的样式只能作用于当前文件 -->
<style scoped>
.post {
	background-color: #252323;
	padding: 20px;
	border-radius: 16px;

	margin: 20px 0;
}

.content {
	color: white;

	margin-bottom: 20px;
}
p {
	margin: 0;
}

.bottom {
	color: white;
	font-size: 12px;

	display: flex;
	justify-content: space-between;
	align-items: center;
}

.bottom .buttons {
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
	.bottom .buttons {
		opacity: 0.5;
	}
}

.time {
	color: #aaa;
}

.input-content {
	width: 100%;
	height: 100px;

	margin-bottom: 20px;

	outline: none;
	border: none;
	background-color: #aaa;

	padding: 10px;

	border-radius: 6px;
}
</style>
