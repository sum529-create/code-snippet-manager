import './assets/css/tailwind.css'
import './assets/css/button.css'
import './assets/css/common.css'
import './assets/css/snippet.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

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
import { faCode } from '@fortawesome/free-solid-svg-icons'

library.add(faVuejs, faReact, faHtml5, faCss3, faJs, faJava, faPython, faCode)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
