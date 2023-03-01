<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Yesterday</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar :debounce="1500" @ionChange="search($event)" animated="true" show-cancel-button="focus" placeholder="Search"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" ref="iconContent">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Yesterday</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <ExploreContainer name="Tab 1 page" category="today" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default  defineComponent({
  name: 'Tab1Page',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSearchbar },
  methods: {
    search(event:Event) {
      var delayTimer;
      clearTimeout(delayTimer);
      this.emitter.emit('search', '');
      delayTimer = setTimeout(()=> {
        // @ts-ignore: Object is possibly 'null'.
        const query = event.target.value.toLowerCase();
        // @ts-ignore: Object is possibly 'null'.
        this.emitter.emit('search', query);
      }, 2000)
    }
  }
});
</script>
