import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
//导入插件
import TreeTable  from 'vue-table-with-tree-grid'


//导入全局样式表
import './assets/css/global.css'
import './assets/fonts/iconfont.css'

Vue.config.productionTip = false
// Vue.component('tree',TreeTable)
Vue.component('tree-table', TreeTable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

