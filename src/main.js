import 'primeicons/primeicons.css'
import './assets/sytle.css'

import PrimeVue from 'primevue/config'
import Noir from './presets/Noir.js'
import Tooltip from 'primevue/tooltip'

import AppState from './plugins/appState.js'
import ThemeSwitcher from './components/ThemeSwitcher.vue'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false
    }
  }
})

app.use(AppState)
app.directive('tooltip', Tooltip)
app.component('ThemeSwitcher', ThemeSwitcher)
app.mount('#app')
