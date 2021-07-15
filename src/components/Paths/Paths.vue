<template>
  <section class="details-section">
    <Header section="Linhas" @close-section="closeSection" />

    <form class="search-box" @submit.prevent="fetchPathDetails">
      <input type="text" placeholder="Linhas" v-model="term" />
      <button type="submit" :disabled="term === ''">
        <img src="../../assets/search.svg" alt="Pesquisar" />
      </button>
    </form>

    <main class="content" v-show="results.id !== '' && wasFetched">
      <div class="path">
        <span>Linha {{ results.id }}</span>
        <div>
          <img src="../../assets/origin.svg" alt="Origem" />
          <p>{{ results.origin }}</p>
        </div>
        <div>
          <img src="../../assets/destiny.svg" alt="Destino" />
          <p>{{ results.destiny }}</p>
        </div>
      </div>

      <div class="path__vehicles">
        <span>Veículos operando na linha</span>
        <ul>
          <li class="vehicle" v-for="vehicle in results.vehicles" :key="vehicle.id">
            <span>
              <img src="../../assets/bus.svg" alt="ônibus" />
            </span>
            <p>
              Veículo: <em>{{ vehicle.id }}</em>
            </p>
            <img
              src="../../assets/accessibility.svg"
              alt="Acessível"
              v-if="vehicle.accessibility"
            />
          </li>
        </ul>
      </div>

      <div class="path__stops">
        <span>Pontos de parada</span>
        <ul>
          <li class="stop" v-for="stop in results.stops" :key="stop.id">
            <span>
              <img src="../../assets/stop.svg" alt="Parada" />
            </span>
            <div>
              <span>{{ stop.name }}</span>
              <span>{{ stop.address }}</span>
            </div>
          </li>
        </ul>
      </div>
    </main>

    <EmptyResults searchTerm="linha" v-show="results.id === '' && wasFetched" />

    <Loading v-show="isLoading" style="marginTop: 5rem" />

    <NoSearch searchTerm="linha" v-show="results.id === '' && !wasFetched && !isLoading" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import api from '../../services/api';

import Header from '../Header/Header.vue';
import EmptyResults from '../SearchResultsStates/EmptyResults/EmptyResults.vue';
import Loading from '../SearchResultsStates/Loading/Loading.vue';
import NoSearch from '../SearchResultsStates/NoSearch/NoSearch.vue';

export default defineComponent({
  name: 'Paths',
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
    ...mapState(['stops', 'vehicles', 'authenticate']),
    ...mapGetters(['filterVehicles', 'filterStops']),
  },
  methods: {
    ...mapMutations(['setSection', 'setPathCode', 'setStopsIds']),
    ...mapActions(['authenticateConnection']),
    async fetchPathDetails() {
      this.isLoading = true;
      this.wasFetched = false;

      await this.authenticateConnection();

      try {
        if (this.authenticate === true) {
          const pathDetails = await api.get(
            `/Linha/BuscarLinhaSentido?termosBusca=${this.term}&sentido=1`,
          );

          if (pathDetails.data.length === 0) {
            this.results = { id: '' };
            return;
          }

          const stopsOnPath = await api.get(
            `/Parada/BuscarParadasPorLinha?codigoLinha=${pathDetails.data[0].cl}`,
          );
          console.log(pathDetails.data[0].cl);
          console.log(stopsOnPath);
          const stopsIds = stopsOnPath.data.map((stop: any) => stop.cp);

          this.setStopsIds({ stopsIds });
          this.setPathCode({ path: pathDetails.data[0].cl });

          this.results = {
            id: pathDetails.data[0].cl,
            cod: pathDetails.data[0].lt,
            origin: pathDetails.data[0].tp,
            destiny: pathDetails.data[0].ts,
            stops: this.filterStops,
            vehicles: this.filterVehicles,
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
