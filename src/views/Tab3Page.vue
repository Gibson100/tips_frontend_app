<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>    
      <ion-list>
        <ion-item>
          <ion-label>Dark Mode</ion-label>
          <ion-toggle :checked='store.theme == "dark"' value="dark" v-model="theme"  @ionChange="setTheme($event.detail.value,$event.detail.checked)">
          </ion-toggle>
          </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonToggle, IonList, IonItem, IonLabel } from '@ionic/vue';
import { store } from "@/theme/theme";
import { AdMob, AdOptions, AdLoadInfo, InterstitialAdPluginEvents } from '@capacitor-community/admob';

export default defineComponent({
  name: 'Tab3Page',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonToggle, IonList, IonItem, IonLabel },
  data() {
    return {
      theme: store.theme,
      store,
    }
  },
  mounted() {
    this.interstitial();
  },
  created() {
    store.theme !== "" ? console.log('true') : console.log('false');
    console.log(store.theme)
  },
  methods: {
    setTheme(value: string,isChecked: boolean) {
      console.log(store.theme,isChecked)
      if (isChecked) {
          // @ts-ignore: Object is possibly 'null'.
        localStorage.setItem("themeSet", value);
      }
      if(!isChecked) {
        localStorage.removeItem("themeSet");
      }
      store.setItem();
    },
    async interstitial() {
      AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info: AdLoadInfo) => {
        // Subscribe prepared interstitial
      });

    const options: AdOptions = {
        adId: 'ca-app-pub-4472509337608731/8310282705',
        isTesting: false
          // npa: true
      };
        await AdMob.prepareInterstitial(options);
        await AdMob.showInterstitial();
    }
  },

});
</script>
<style>
</style>