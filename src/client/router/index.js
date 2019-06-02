import Vue from 'vue'
import Router from 'vue-router'
import home from './../views/home.vue'
import visualData from './../views/visualData.vue'
import preset from './../views/preset.vue'
import progress from './../views/progress.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: home,
      meta: {
        index: 1,
      }
    },
    {
      path: '/visualData',
      name: 'visualData',
      component: visualData,
      meta: {
        index: 1,
      }
    },
    {
      path: '/preset',
      name: 'preset',
      component: preset,
      meta: {
        index: 1,
      }
    },
    {
      path: '/progress',
      name: 'progress',
      component: progress,
      meta: {
        index: 1,
      }
    }
  ]
})