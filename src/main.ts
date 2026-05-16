import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './main.css'
import i18n from '@/i18n'
import { I18nManager } from '@/i18n/manager.ts'

const app = createApp(App)

app.use(router)
app.use(i18n)

I18nManager.init(i18n as never)

app.mount('#app')
