<template>
	<div class="container">
		<h1 class="title">三眼鸭的消息墙</h1>

		<search @search="onsearch"></search>
		<publish @published="getPosts(true)"></publish>
		<div class="posts">
			<post
				v-for="post of posts"
				:postId="post.post_id"
				:content="post.content"
				:publishTime="post.publish_time"
			></post>
		</div>
		<el-empty description="这里没有消息哟" />

		<p v-show="isFinished" class="empty">已经没有更多消息了~</p>
	</div>
</template>
<script>
import post from "./components/post.vue"
import publish from "./components/publish.vue"
import search from "./components/search.vue"
// import { api } from "./plugins/api.js"

export default {
	components: { post, publish, search },
	data() {
		return {
			isLoading: false,
			isFinished: false,

			page: 1,
			limit: 5,
			search: "",
			posts: [],
		}
	},
	mounted() {
		console.log("页面载入")
		this.getPosts()
		// 监听滚动事件
		window.addEventListener("scroll", this.onscroll)

		// console.log(this.posts)
	},
	unmounted() {
		// 移除滚动事件
		window.removeEventListener("scroll", this.onscroll)
	},
	computed: {
		isNothing() {
			return this.posts.length === 0
		},
	},
	methods: {
		async getPosts(refresh = false) {
			//     const result = await api.getPosts()
			// 	// console.log(result)
			// this.posts = result.results
			// console.log(this.posts)

			if (refresh) {
				// 刷新页面
				this.isFinished = false
				this.page = 1
				this.posts = []
				// this.getPosts()
				// this.$api.getPosts
			}

			if (this.isLoading || this.isFinished) {
				// 如果存在正在读取的数据
				// 或者数据已经拿完
				// 结束
				return
			}

			// 标记为正在读取中
			this.isLoading = true
			const { results } = await this.$api.getPosts({
				page: this.page,
				limit: this.limit,
				search: this.search,
			})

			this.isLoading = false

			if (results.length === 0) {
				// 数据拿完了
				this.isFinished = true
				return
			}
			// this.posts = this.posts.concat(results)
			this.posts = [...this.posts, ...results]

			// 下一页
			this.page++

			// 如果没有出现滚动条， 那么继续加载数据

			if (!this.isScroll()) {
				return this.getPosts()
			}
		},
		isScroll() {
			// 是否有滚动条
			return (
				document.documentElement.scrollHeight !=
				document.documentElement.clientHeight
			)
		},

		onscroll() {
			console.log("页面滚动")
			const bottomOfWindowHeight =
				document.documentElement.scrollHeight -
				document.documentElement.scrollTop -
				document.documentElement.clientHeight

			// 距离底部 100px
			if (bottomOfWindowHeight < 100) {
				this.getPosts()
			}
		},
		onsearch(searchContent) {
			this.search = searchContent
			this.getPosts(true)
		},
	},
}
</script>

<style scoped>
.container {
	max-width: 500px;
	min-width: 300px;
	margin: 0 auto;
	padding: 0 20px;
}

.container .search-box {
	display: flex;
	gap: 10px;
}

.container .search-input {
	flex: 1;

	padding: 5px 10px;

	border: none;
	outline: none;

	/* 两端变圆 */
	border-radius: 999999px;
}

.container .input-dialog .bottom .buttons {
	opacity: 1;
}

.container .input-dialog .bottom {
	justify-content: flex-end;
}

.container .title {
	color: white;
}

.container .empty {
	color: #aaa;
	font-size: 20px;

	margin: 80px 0;

	text-align: center;
}
</style>
