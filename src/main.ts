import { createApp } from 'vue'
import App from './App.vue'
import * as AppRouter from './AppRouter';
import store from './store/index';

const app = createApp(App)
app.use(AppRouter.routeConfig);
app.use(store);
app.mount('#app')