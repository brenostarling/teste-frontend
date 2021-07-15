<template>
  <section class="details-section">
    <Header section="Paradas" @close-section="closeSection" />

    <form class="search-box" @submit.prevent="fetchStopDetails">
      <input type="text" placeholder="Parada" v-model="term" />
      <button type="button" :disabled="term === ''">
        <img src="../../assets/search.svg" alt="Pesquisar" />
      </button>
    </form>

    <main class="content" v-show="results.id !== '' && wasFetched">
      <div class="stop__details">
        <span>Parada {{ results.id }}</span>
        <div>
          <img src="../../assets/origin.svg" alt="Parada" />
          <p>{{ results.name }}</p>
        </div>
        <div>
          <img src="../../assets/destiny.svg" alt="Endereço" />
          <p>{{ results.address }}</p>
        </div>
      </div>

      <div class="vehicles__list">
        <span>Veículos operando na linha</span>
        <ul>
          <li class="vehicle" v-for="vehicle in results.vehicles" :key="vehicle.id">
            <span>
              <img src="../../assets/bus.svg" alt="ônibus" />
            </span>
            <div>
              <div>
                <p>
                  Veículo: <em>{{ vehicle.id }}</em>
                </p>
                <img
                  src="../../assets/accessibility.svg"
                  alt="Acessível"
                  v-if="vehicle.accessbility"
                />
              </div>
              <p>
                Previsão: <em>{{ vehicle.arrival }}</em>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </main>

    <EmptyResults searchTerm="parada" v-show="results.id === '' && wasFetched" />

    <Loading v-show="isLoading" style="marginTop: 5rem" />

    <NoSearch searchTerm="parada" v-show="results.id === '' && !wasFetched && !isLoading" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import api from '../../services/api';

import { Stop, Vehicle } from '../../types';

import Header from '../Header/Header.vue';
import EmptyResults from '../SearchResultsStates/EmptyResults/EmptyResults.vue';
import Loading from '../SearchResultsStates/Loading/Loading.vue';
import NoSearch from '../SearchResultsStates/NoSearch/NoSearch.vue';

export default defineComponent({
  name: 'Stops',
  components: {
    Header,
    EmptyResults,
    Loading,
    NoSearch,
  },
  data: () => ({
    term: '',
    results: {},
    isLoading: false,
    wasFetched: false,
  }),
  computed: {
    ...mapState(['authenticate', 'stops']),
  },
  methods: {
    ...mapMutations(['setSection', 'setPathCode']),
    ...mapActions(['authenticateConnection']),
    async fetchStopDetails() {
      this.isLoading = true;
      this.wasFetched = false;

      await this.authenticateConnection();

      try {
        if (this.authenticate === true) {
          const stopDetails = await api.get(`/Parada/Buscar?termosBusca=${this.term}`);

          if (stopDetails.data.length === 0 || stopDetails.data.length === this.stops.length) {
            this.results = { id: '' };
            return;
          }

          const formattedStop: Stop = {
            id: stopDetails.data[0].cp,
            name: stopDetails.data[0].np,
            address: stopDetails.data[0].ed,
            position: {
              lat: stopDetails.data[0].px,
              long: stopDetails.data[0].py,
            },
          };

          const vehiclesOnTheWay = await api.get(
            `/Previsao/Parada?codigoParada=${stopDetails.data[0].cp}`,
          );

          if (vehiclesOnTheWay.data.length === 0) {
            return;
          }

          const vehiclesList: Vehicle[] = [];

          vehiclesOnTheWay.data.p.l.map((path: any) => {
            path.vs.map((vehicle: any) => {
              vehiclesList.push({
                id: vehicle.p,
                name: vehicle.p,
                accessibility: vehicle.a,
                path: path.cl,
                arrival: vehicle.t,
                position: {
                  lat: vehicle.px,
                  long: vehicle.y,
                },
              });
            });
          });

          this.results = {
            ...formattedStop,
            vehicles: vehiclesList,
          };
        }
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      } finally {
        this.isLoading = false;
        this.wasFetched = true;
      }
    },
    closeSection() {
      this.setSection('');
      this.term = '';
      this.results = {};
      this.wasFetched = false;
      this.isLoading = false;
      this.setPathCode({ path: null });
    },
  },
});
</script>

<style src="./styles.scss" scoped lang="scss"></style>
