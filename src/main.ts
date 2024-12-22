import './assets/css/tailwind.css'
import './assets/css/button.css'
import './assets/css/common.css'
import './assets/css/snippet.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import '@fortawesome/fontawesome-free/css/all.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faVuejs,
  faReact,
  faHtml5,
  faCss3,
  faJs,
  faJava,
  faPython,
} from '@fortawesome/free-brands-svg-icons'
import { faCode, faStar, faMoon } from '@fortawesome/free-solid-svg-icons'

import 'prismjs'
import 'prismjs/themes/prism.css' // 기본 테마
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-css'

library.add(faVuejs, faReact, faHtml5, faCss3, faJs, faJava, faPython, faCode, faStar, faMoon)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

const pinia = createPinia()
pinia.use(persistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
