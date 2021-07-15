<template>
  <v-app>
    <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
      <v-app-bar color="info" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <h1>Transporte Publico de São Paulo</h1>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-container>
          <div>
            <v-select
              v-model="stopSelected"
              :items="stopsName"
              label="Selecionar Parada."
              solo
              attach
              hint="Selecione a parada desejada."
              persistent-hint
              @change="getEstimatedArrival()"
              style="width: 100%"
            ></v-select>
          </div>

          <div
            style="max-height: 40vh"
            overflow-y="scroll"
            v-if="stopSelected !== undefined"
          >
            <v-alert
              :key="index"
              v-for="(m, index) in estimatedArrival.p.l"
              border="left"
              color="info"
              dense
              dark
              >A linha {{ m.c }} chegará aproximadamente
              {{ m.vs[0].t }}</v-alert
            >
          </div>
        </v-container>
      </v-navigation-drawer>

      <v-main>
        <v-row>
          <v-col cols="12">
            <v-btn
              style="margin: 5px"
              color="info"
              @click="disableBusMarkers()"
            >
              Esconder Onibus
            </v-btn>
            <v-btn style="margin: 5px" color="info" @click="getBusPositions()">
              Mostrar Onibus
            </v-btn>
            <v-btn
              style="margin: 5px"
              color="info"
              @click="disableStopMarkers()"
            >
              Esconder Paradas
            </v-btn>
            <v-btn style="margin: 5px" color="info" @click="getStops()">
              Mostrar Paradas
            </v-btn>
          </v-col>
        </v-row>

        <GmapMap
          :center="{ lat: -23.55443411252053, lng: -46.64483213968414 }"
          :zoom="13"
          map-type-id="terrain"
          style="width: 100%; height: 85vh"
        >
          <GmapCluster
            :imagePath="busStopIcon"
            :maxZoom="16"
            :zoomOnClick="true"
          >
            <GmapMarker
              :key="index"
              v-for="(m, index) in stopsMarkers"
              :position="{ lat: m.py, lng: m.px }"
              :label="m.np"
              @click="
                (center = { lat: m.py, lng: m.px }),
                  (stopSelected = m.np),
                  getEstimatedArrival()((drawer = !drawer))
              "
              :icon="busStopIcon"
            />
          </GmapCluster>
          <GmapCluster :imagePath="busIcon" :maxZoom="16" :zoomOnClick="true">
            <GmapMarker
              :key="index"
              v-for="(m, index) in busesMarkers.l"
              :position="{ lat: m.vs[0].py, lng: m.vs[0].px }"
              :label="m.c"
              @click="center = { lat: m.vs[0].py, lng: m.vs[0].px }"
              :icon="busIcon"
            />
          </GmapCluster>
        </GmapMap>
      </v-main>

      <v-footer app color="info"> </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import bus from "../services/bus.js";

export default {
  name: "mapGoogle",
  data() {
    return {
      busStopIcon: "https://i.imgur.com/u5q7VcH.png",
      busIcon: "https://i.imgur.com/kxhygA0.png",
      stops: [],
      stopsMarkers: [],
      stopsName: [],
      stopSelected: undefined,
      buses: [],
      busesMarkers: [],
      busesNumber: [],
      busSelected: undefined,
      estimatedArrival: [],
      stopEstimatedArrival: undefined,
      drawer: false,
    };
  },

  created() {
    bus.auth();
    let that = this;
    this.getStops();
    this.getBusPositions();
    setInterval(() => {
      that.getBusPositions();
    }, 60000);
  },

  computed: {
    rBusPositions() {
      return bus.busPositions;
    },
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },

  methods: {
    async getStops() {
      this.stops = await bus.getStops();
      this.stopsMarkers = await bus.getStops();
      for (let i = 0; i < this.stops.length; i++) {
        this.stopsName.push(this.stops[i].np);
      }
    },

    async getBusPositions() {
      this.busesMarkers = await bus.getBusPositions();
      this.buses = await bus.getBusPositions();
      for (let i = 0; i < this.buses.l.length; i++) {
        this.busesNumber.push(this.buses.l[i].c);
      }
    },

    async getEstimatedArrival() {
      await this.filterLine();
      this.estimatedArrival = await bus.getEstimatedArrival(
        this.stopEstimatedArrival[0].cp
      );
    },

    filterLine() {
      this.stopEstimatedArrival = this.stops.filter(
        (s) => s.np == this.stopSelected
      );
    },

    disableBusMarkers() {
      this.busesMarkers = [];
    },

    disableStopMarkers() {
      this.stopsMarkers = [];
    },
  },
};
</script>
