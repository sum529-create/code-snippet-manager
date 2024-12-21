import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '@/views/CreateView.vue'
import DetailView from '@/views/DetailView.vue'
import EditView from '@/views/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView,
    },
    {
      path: '/snippets/:id',
      name: 'SnippetDetail',
      component: DetailView,
      props: true,
    },
    {
      path: '/snippets/:id/edit',
      name: 'SnippetEdit',
      component: EditView,
      props: true,
    },
  ],
})

export default router
