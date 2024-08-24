import 'primeicons/primeicons.css'
import './assets/main.css'

import PrimeVue from 'primevue/config'
import Noir from './presets/Noir.js';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Noir,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false,
    }
  }
})

app.mount('#app')
