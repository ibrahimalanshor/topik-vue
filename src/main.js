import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupRouter } from './router/setup';
import { setupStore } from './store/setup';
import { setupEmitter } from './common/emitter/setup';

const app = createApp(App);

setupStore(app);
setupRouter(app);
setupEmitter(app);

app.mount('#app');
