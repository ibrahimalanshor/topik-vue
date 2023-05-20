import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupRouter } from './router/setup';
import { setupStore } from './store/setup';
import { setupEmitter } from './common/emitter/setup';
import { useCickOutsidePlugin } from './common/plugins/click-outside';

const app = createApp(App);

useCickOutsidePlugin(app);

setupStore(app);
setupRouter(app);
setupEmitter(app);

app.mount('#app');
