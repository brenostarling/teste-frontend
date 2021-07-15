<template>
  <div class="map-container">
    <div id="map"></div>
    <GlobalLoading v-if="dataIsLoading" />
    <AccessibilityVehiclesFilter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import leaflet, { Map, LayerGroup } from 'leaflet';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

import { Stop, Vehicle } from '@/types';
import GlobalLoading from '../GlobalLoading/GlobalLoading.vue';
import AccessibilityVehiclesFilter from '../AccessibilityVehiclesFilter/AccessibilityVehiclesFilter.vue';

export default defineComponent({
  name: 'Map',
  components: {
    GlobalLoading,
    AccessibilityVehiclesFilter,
  },
  data: () => ({
    mapRef: {} as Map,
    markers: {} as LayerGroup,
    vehiclesList: [] as Vehicle[],
    stopsList: [] as Stop[],
    timer: null as null | number,
  }),
  computed: {
    ...mapState([
      'dataIsLoading',
      'stops',
      'vehicles',
      'accessibilityFilter',
      'pathCode',
      'stopsIds',
      'automaticRefresh',
    ]),
    ...mapGetters(['filterVehicles', 'filterStops']),
  },
  methods: {
    ...mapMutations(['setPathCode']),
    ...mapActions(['fetchData']),
    updateMarkers() {
      const vehicleMarker = leaflet.icon({
        iconUrl: require('@/assets/vehicleMarker.svg'),
        iconSize: [30, 30],
      });

      const stopMarker = leaflet.icon({
        iconUrl: require('@/assets/stopMarker.svg'),
        iconSize: [30, 30],
      });

      this.markers = new leaflet.LayerGroup();

      this.vehiclesList.forEach((vehicle: Vehicle, index: number) => {
        if (index < 500) {
          const marker = leaflet
            .marker([vehicle.position.lat, vehicle.position.long], {
              icon: vehicleMarker,
              alt: 'vehicleMarker',
            })
            .addTo(this.mapRef as Map);

          this.markers.addLayer(marker);
        }
      });

      this.stopsList.forEach((stop: Stop, index: number) => {
        // if (index < 500) {
        const marker = leaflet
          .marker([stop.position.lat, stop.position.long], {
            icon: stopMarker,
            alt: 'stopMarker',
          })
          .addTo(this.mapRef as Map);

        this.markers.addLayer(marker);
        // }
      });
    },
    removeMarkers() {
      const markers = document.getElementsByClassName('leaflet-marker-pane');
      markers[0].innerHTML = '';
    },
  },
  watch: {
    accessibilityFilter() {
      this.vehiclesList = this.filterVehicles;
      this.stopsList = this.filterStops;
      this.removeMarkers();
      this.updateMarkers();
    },
    pathCode() {
      this.vehiclesList = this.filterVehicles;
      this.stopsList = this.filterStops;
      this.removeMarkers();
      this.updateMarkers();
    },
    stops(newStopsList: Stop[], oldStopsList: Stop[]) {
      this.stopsList = newStopsList;
      this.removeMarkers();
      this.updateMarkers();
    },
    vehicles(newVehiclesList: Vehicle[], oldVehiclesList: Vehicle[]) {
      this.vehiclesList = newVehiclesList;
      this.removeMarkers();
      this.updateMarkers();
    },
    automaticRefresh() {
      if (this.automaticRefresh === true) {
        this.timer = setInterval(async () => {
          await this.fetchData();
        }, 30000);
      } else {
        clearInterval(this.timer as number);
      }
    },
  },
  beforeUnmount() {
    clearInterval(this.timer as number);
  },
  async mounted() {
    const map = new leaflet.Map('map', {
      center: leaflet.latLng(-23.5539729, -46.634565),
      zoom: 13,
    });

    leaflet
      .tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/dark-v9',
          tileSize: 512,
          zoomOffset: -1,
          accessToken:
            'pk.eyJ1IjoibWF5Y29ucnIxMyIsImEiOiJja2c2bTZzb3MwbWMzMnVuemdsYjN1NWRlIn0.CyexrwSYo_fD7MPLBRipiw',
        },
      )
      .addTo(map);

    this.mapRef = map;
    await this.fetchData();

    this.markers = new leaflet.LayerGroup();
    this.updateMarkers();
  },
});
</script>

<style src="./styles.scss" scoped lang="scss"></style>
