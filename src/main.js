// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Goods from 'src/components/goods/goods'
import Rating from 'src/components/rating/rating'
import Seller from 'src/components/seller/seller'
import 'src/common/stylus/index.styl'
Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  {path: '/', component: Goods},
  {path: '/goods', component: Goods},
  {path: '/rating', component: Rating},
  {path: '/seller', component: Seller}
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  ...App
})
