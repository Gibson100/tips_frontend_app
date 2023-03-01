<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Today</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar :debounce="1500" @ionChange="search($event)" animated="true" show-cancel-button="focus" placeholder="Search"></ion-searchbar>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" scrollEvents="true" @ionScroll="handleOverscroll($event)" @ionScrollEnd="handleOverscrollEnd($event)" @ionScrollStart="handleOverscrollStart($event)">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Today</ion-title>
        </ion-toolbar>
      </ion-header>
      <ExploreContainer name="Tomorrow page" category="tomorrow" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';

export default defineComponent({
  name: 'Tab2Page',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonSearchbar },
  data() {
    return { stretchFactor: 0 }
  },
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
    },
    handleOverscrollStart(event: Event) {
      // @ts-ignore: Object is possibly 'null'.
      event.target.style.backgroundColor = '#ddd';
    },
    handleOverscroll(event: Event) {
      // @ts-ignore: Object is possibly 'null'.
      if (event.detail.deltaY > 0) {
        this.stretchFactor = Math.min(1, this.stretchFactor + 0.05);
      }
      else {
        this.stretchFactor = Math.min(0, this.stretchFactor - 0.05);
      }
      // @ts-ignore: Object is possibly 'null'.
      event.target.style.transform = `scaleY(${1 + this.stretchFactor})`;
    },
    handleOverscrollEnd(event: Event) {
      // @ts-ignore: Object is possibly 'null'.
      event.target.style.backgroundColor = '';
      // @ts-ignore: Object is possibly 'null'.
      event.target.style.transform = '';
      this.stretchFactor = 0;
    }
  },
});
</script>
