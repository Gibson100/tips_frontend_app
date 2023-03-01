<template>
  <div id="container">
    <ion-segment color="primary" value="default" :swipe-gesture="true" @ionChange="segmentChanged($event)" slot="fixed">
        <ion-segment-button value="default">
          <ion-icon color="danger" :icon="heart"></ion-icon>
          Hot
        </ion-segment-button>
        <ion-segment-button value="home">
          <ion-icon color="secondary" :icon="star"></ion-icon>
          Others
        </ion-segment-button>
      </ion-segment>
      <ion-refresher :snapback-duration="`500ms`" slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content>
        </ion-refresher-content>
      </ion-refresher>
        <ion-list lines="inset" overscroll="true">
          <ion-grid v-for="category in Tips" :key="category">
            <ion-row>
              <ion-col size="12">
                <ion-item id="category">
                  <ion-label><h1>{{ category[i].league }}</h1></ion-label>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row class="content" v-for="item in category" :key="item" style="width:100%">
              <ion-col size="5.5">
                <ion-item padding style="float:left">
                  <ion-text><p style="overflow-wrap: anywhere;margin:0px">{{ item.team1 }}</p></ion-text>
                </ion-item>
              </ion-col>
              <ion-col size="1"  style="padding:0;width:100%">
                <div style="width:100%; display:flex; justify-content: center;">
                  <h6 padding style="overflow-wrap: anywhere;text-align: center;display: inline;font-weight: 700;">VS
                  </h6>
                </div>
              </ion-col>
              <ion-col size="5.5">
                <ion-item padding style="float:right">
                  <ion-text><p style="overflow-wrap: anywhere;margin:0px">{{ item.team2 }}</p></ion-text>
                </ion-item>
              </ion-col>
              <ion-col size="12" class="tip">
                <ion-item id="category">
                  <ion-label>Tip : {{ item.tip }}</ion-label>
                  <ion-label class="ion-text-wrap">Scores : {{ item.results }}</ion-label>
                  <ion-label>
                  <div v-if="item.status==='won'">
                    <ion-badge slot="end" color="success"> {{ item.status }}</ion-badge>
                  </div>
                  <div v-else-if="item.status==='lost'">
                    <ion-badge slot="end" color="danger"> {{ item.status }}</ion-badge>
                  </div>
                  <div v-else>
                    <ion-badge slot="end" color="warning"> {{ item.status }}</ion-badge>
                  </div>
                </ion-label>
                </ion-item>
                <hr size="10px" color="white">
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-list>
        <div v-if="loading">
          <ion-spinner color="dark"></ion-spinner>
        </div>
        <div v-if="Tips.length < 1 && !loading" style="width:100%;height:100%">
          <ion-row>
            <ion-col size="12">
                <p class="empty">No data found!</p>
            </ion-col>
          </ion-row>
        </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue';
import { IonList,IonGrid,IonRow,IonCol,IonLabel,IonItem, IonText, IonRefresher, IonRefresherContent, IonBadge, IonSpinner, IonSegment, IonSegmentButton, IonIcon } from '@ionic/vue';
import { myService } from '../service/myService';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, BannerAdPluginEvents, AdMobBannerSize, InterstitialAdPluginEvents, AdOptions, AdLoadInfo } from '@capacitor-community/admob';
import { heart, star } from 'ionicons/icons';

export default defineComponent({
  name: 'ExploreContainer',
  props: {
    name: String,
    category: String,
  },
  components: { IonList, IonGrid, IonRow, IonCol, IonLabel, IonItem, IonText, IonRefresher, IonRefresherContent, IonBadge, IonSpinner, IonSegment, IonSegmentButton, IonIcon  },
  setup() {
    const emitter = inject('emitter')
      return {
        emitter, heart, star
      }
  },
  mounted() {
    console.log('mounted')
    setTimeout(()=> {
      this.interstitial();
    }, 10000)
    setTimeout(()=> {
      this.banner();
    }, 90000)
  },
  data() {
    return {
      Tips: [],
      i:0,
      cat: this.category,
      loading: false,
    }
  },
  created() {
    this.getTips(this.cat);
    this.initialize();
    // this.banner();
    this.emitter.on('search', (term: any) => {
      this.filteredRecords(term);
      console.log(term);
    });
    this.emitter.on('hot', (term: any) => {
      this.getTips(this.cat);
      console.log(term);
    });
    this.emitter.on('others', (term: any) => {
      this.getOther(this.cat);
      console.log(term);
    });
  },
  methods: {
    async getTips(cat:any) {
      this.loading=true;
      try {
        let response = await myService.getBets(cat);
        this.Tips = response.data;
        this.loading=false;
      }
      catch(e) {
        this.loading = false
        alert(e);
      }
    },
    async doRefresh(event: CustomEvent) {
      this.loading = true;
      let response = await myService.getBets(this.cat);
      this.Tips = response.data;
      
      setTimeout(() => {
        console.log('Async operation has ended');
        // @ts-ignore: Object is possibly 'null'.
        event.target.complete();
        this.loading = false;
      }, 2000);
    },
    async initialize() {
      const { status } = await AdMob.trackingAuthorizationStatus();
      console.log(status);
      if (status === 'notDetermined') {
      /**
       * If you want to explain TrackingAuthorization before showing the iOS dialog,
       * you can show the modal here.
       * ex)
      //  * const modal = await this.modalCtrl.create({
      //  *   component: RequestTrackingPage,
      //  * });
      //  * await modal.present();
      //  * await modal.onDidDismiss();  // Wait for close modal
      //  **/
    }
 
    AdMob.initialize({
      requestTrackingAuthorization: true,
      //testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
      initializeForTesting: false,
    });
    },
    async banner() {
      AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      // Subscribe Banner Event Listener
    });

    AdMob.addListener(BannerAdPluginEvents.SizeChanged, (size: AdMobBannerSize) => {
      // Subscribe Change Banner Size
    });

    const options: BannerAdOptions = {
      adId: 'ca-app-pub-4472509337608731/4677363291',
      adSize: BannerAdSize.BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 60,
      isTesting: false
      // npa: true
    };
    AdMob.showBanner(options);
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
    },
    segmentChanged(event: Event) {
      // @ts-ignore: Object is possibly 'null'.
      if (event.detail.value == 'home') {
        this.getOther(this.cat);
        setTimeout(()=> {
          this.interstitial();
        },90000);
      }
      else {
        this.getTips(this.cat);
      }
    },
    async filteredRecords(query: any) {
      if (query.length < 3) return;
      this.loading = true
      // @ts-ignore: Object is possibly 'null'.
      let cat = this.category;
      try {
         // @ts-ignore: Object is possibly 'null'.
        let response = await myService.search(query,cat);
        this.Tips = response.data;
        this.loading = false
        this.banner(); //shoe ad
      }
      catch(e) {
        this.loading = false
        alert(e);
      }
    },
    async getOther(cat:any) {
      this.loading=true;
      try {
        let response = await myService.getOthers(cat);
        this.Tips = response.data;
        this.loading=false;
      }
      catch(e) {
        this.loading = false
        alert(e);
      }
    },
  }
});
</script>
<style scoped>
  ion-col,ion-label {
    text-align: center !important;
  }
 #category {
    padding: 0 !important;
  }
  .content {
    padding: 10px;
  }
  .tip{
    background-color: none !important;
    margin-top: -10px !important;
  }
  .content[data-v-483a685e] {
    background-color: none !important;
  }
  h1 {
    font-weight: 600;
  }
  ion-row .ios > hr {
    display: none !important;
  }
  ion-spinner {
    position: fixed; /* or absolute */
    top: 50%;
    left: 50%;
  }
  .empty {
    position: absolute; /* or absolute */
    top: 50%;
  }

  .fixed {
    position: fixed;
    bottom: 30px;
    right: 0;
    overflow:hidden;
}
</style>
