import Vue from 'vue'
import Router from 'vue-router'
import EventCreate from './views/EventCreate.vue'
import EventList from './views/EventList.vue'
import EventShow from './views/EventShow.vue'
import NProgress from 'nprogress'
import store from './store/store'
import NotFound from './views/NotFound'
import NetworkIssue from './views/NetworkIssue';
import Register from './views/Register.vue'
import Login from './views/Login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventList,
      props: true,
      meta: {requiresAuth: true}
    },
    {
      path: '/event/create',
      name: 'event-create',
      component: EventCreate,
      meta: {requiresAuth: true}
    },
    {
      path: '/event/:id',
      name: 'event-show',
      component: EventShow,
      props: true,
      meta: {requiresAuth: true},
      beforeEnter(to, from, next) {
        store.dispatch('event/fetchEvent', to.params.id).then(event => {
          to.params.event = event
          next()
        }).catch(error => {
          if(error.response && error.response.status == 404) {
            next({name: '404', params: {resource: 'event'}})
          } else {
            next({name: 'network-issue'})
          }
        })
      },
    },
    {
      path: '/404',
      name: '404',
      component: NotFound,
      props: true
    },
    {
      path: '/network-issue',
      name: 'network-issue',
      component: NetworkIssue,
      props: true
    },
    {
      path: '*',
      redirect: {name: '404', resource: 'page'}
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      
    },
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!loggedIn) {
      next('/login')
    } else {
      NProgress.start()
      next()
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router