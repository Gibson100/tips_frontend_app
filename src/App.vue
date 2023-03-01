<template>
  <div :class="store.theme">
    <ion-app>
    <ion-router-outlet />
  </ion-app>
  </div>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { store } from './theme/theme';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  data() {
    return {
      theme: localStorage.getItem("themeSet"),
    store,
    }
  },
  methods: {
    setTheme(value: string) {
      // @ts-ignore: Object is possibly 'null'.
      localStorage.setItem("themeSet", value);
      store.setItem();
    }
  }
});
</script>