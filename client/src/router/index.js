import Vue from 'vue'
import Router from 'vue-router'
import Feed from '@/components/feed.vue'
import Photo from '@/components/photo.vue'
import User from '@/components/user.vue'
import Add from '@/components/addphoto.vue'
import Edit from '@/components/edit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'feed',
      component: Feed
    },
    {
      path: '/:username/photo/:photo',
      name: 'photo',
      component: Photo
    },
    {
      path: '/:username',
      name: 'user',
      component: User
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/edit/:photo',
      name: 'edit',
      component: Edit
    },
  ]
})
