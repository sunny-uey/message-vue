import { createApp } from "vue"
import App from "./App.vue"

import "./assets/main.css"
import "./assets/alert.css"

import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

import api from "./plugins/api"
import alert from "./plugins/alert"
// 引入图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

const app = createApp(App)
app.use(api)
app.use(alert)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
// 绑定到app的实例上

// 挂载
app.mount("#app")
