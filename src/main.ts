import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/svg-fontawesome-v6'

// Import icon libraries
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'
import Base from './components/base.vue'
import Search from './components/search.vue'

const app = createApp(App)

app.component('BasePage', Base)
app.component('Search', Search)

app.use(Quasar, {
  plugins: {},
  iconSet: quasarIconSet,
})

app.use(createPinia())
app.use(router)

app.mount('#app')
