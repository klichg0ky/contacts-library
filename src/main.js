import Vue from 'vue'
import App from './App.vue'
import store from './store'

import ContactsList from './components/ContactsList.vue'

Vue.component('ContactsList', ContactsList)

Vue.config.productionTip = false



new Vue({
    store,
    render: h => h(App)
}).$mount('#app')