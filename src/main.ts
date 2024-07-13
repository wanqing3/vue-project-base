import App from '@/App.vue';
import router from '@/router/index';
import pinia from '@/store/index';
import '@/styles/index.less';
import { createApp } from 'vue';

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#root');
