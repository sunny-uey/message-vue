<template>
	<div class="search-box">
		<input
			type="text"
			class="search-input"
			placeholder="输入你要搜索的内容"
			v-model="searchContent"
		/>
		<button class="button search" @click="find">
			<Search
				style="width: 1em; height: 1em; margin-right: 8px"
				color="black"
			/>搜索
		</button>

		<button class="button clean" @click="clean">
			<Delete style="width: 1em; height: 1em; margin-right: 8px" />清除
		</button>
	</div>
</template>
<script>
export default {
	emits: ["search"],
	data() {
		return {
			searchContent: "",
		}
	},
	methods: {
		find() {
			this.$emit("search", this.searchContent)
		},
		clean() {
			this.searchContent = ""
			this.$emit("search", "")
		},
	},
}
</script>
<style scoped>
.search-box {
	display: flex;
	gap: 10px;
}

.search-input {
	flex: 1;

	padding: 5px 10px;

	border: none;
	outline: none;

	/* 两端变圆 */
	border-radius: 999999px;
}
</style>
