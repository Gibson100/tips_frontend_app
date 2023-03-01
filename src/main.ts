import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
// @ts-ignore: Object is possibly 'null'.
import VueVirtualScroller from 'vue-virtual-scroller';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';


/* Theme variables */
import './theme/variables.css';

import './theme/variables.scss';

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import mitt from 'mitt';
const emitter = mitt();

const app = createApp(App)
  .use(IonicVue, {
    mode: 'md'
  })
  .use(router)
  .use(VueVirtualScroller)
  .provide('emitter', emitter);
  
app.config.globalProperties.emitter = emitter;

router.isReady().then(() => {
  app.mount('#app');
});