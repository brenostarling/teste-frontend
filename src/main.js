import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import App from "./App.vue";
import GmapCluster from "vue2-google-maps/dist/components/cluster";
import vuetify from "@/plugins/vuetify"; // path to vuetify export

Vue.component("GmapCluster", GmapCluster);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDYkmsi_Glqw2JxSaRALLa-BJx1YIunat8",
  },
});

new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
