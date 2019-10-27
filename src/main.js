import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

// 1.导入某一个目录，默认回去找索引文件(index.js,index.vue,index.json)基于webpack
// 2 @是别名 指定的是/src 路径 一个绝对路径基于webpack
import router from '@/router'

import axios from '@/api'
Vue.prototype.$http = axios

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
