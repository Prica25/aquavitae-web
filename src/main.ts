import { createApp } from 'vue'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { Quasar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/svg-fontawesome-v6'

import router from './router'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import Base from './components/Base.vue'
import Search from './components/search.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .component('BasePage', Base)
  .component('Search', Search)
  .use(Quasar, {
    plugins: {},
    iconSet: quasarIconSet,
  })
  .use(pinia)
  .use(router)
  .mount('#app')
