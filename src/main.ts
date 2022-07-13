import axios from './https'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import{ store }from './store/index';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

// 创建vue实例

const app = createApp(App)

app.config.globalProperties.$axios = axios;
app.use(store)
app.use(router)
// 挂载pinia

app.use(ElementPlus);
// 挂载实例

app.mount('#app');
