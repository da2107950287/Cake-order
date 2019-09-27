import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import axios from 'axios'
import deShad from "@/components/deshad.vue";
import SIdentify from '@/components/s-identify.vue';
import TopHeader from "@/components/TopHeader.vue"
import BottomFooter from "@/components/BottomFooter.vue"
import SystemHead from "@/components/SystemHead.vue"
import SystemSaid from "@/components/SystemSaid.vue"
Vue.use(ElementUI);
Vue.config.productionTip = false
axios.defaults.baseURL = "http://192.168.2.107:81"
Vue.prototype.axios = axios;
//定义全局组件
Vue.component("deshad", deShad)
Vue.component("s-identify", SIdentify)
Vue.component("top-header", TopHeader);
Vue.component("bottom-footer", BottomFooter);
Vue.component("system-head", SystemHead);
Vue.component("system-said", SystemSaid);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')