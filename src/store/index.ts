import api from '@/services/api';
import { Stop, Vehicle } from '@/types';
import { createStore } from 'vuex';

const store = createStore({
  state: {
    section: '',
    dataIsLoading: false,
    authenticate: false,
    vehicles: [] as Vehicle[],
    stops: [] as Stop[],
    accessibilityFilter: false,
    pathCode: null as null | number,
    stopsIds: [] as number[],
    automaticRefresh: false,
  },
  getters: {
    filterVehicles(state) {
      return state.vehicles
        .filter(item => {
          if (state.accessibilityFilter === true) {
            return item.accessibility === true;
          }
          return item;
        })
        .filter(item => {
          if (state.pathCode !== null) {
            return item.path === state.pathCode;
          }
          return item;
        });
    },
    filterStops: state => {
      if (state.pathCode === null) {
        return state.stops;
      }

      const filteredStops = state.stops.filter((stop: Stop) => {
        if (state.stopsIds.includes(stop.id)) {
          return stop;
        }
      });

      return filteredStops;
    },
  },
  mutations: {
    setSection: (state, { section }) => {
      const choosenSection = state.section === section ? '' : section;
      state.section = choosenSection;
    },
    setAuthenticateStatus: (state, { response }) => {
      state.authenticate = response;
    },
    setInitialResults: (state, { vehicles, stops }) => {
      state.vehicles = vehicles;
      state.stops = stops;
    },
    toggleAccessbilityVehiclesFilter: state => {
      state.accessibilityFilter = !state.accessibilityFilter;
    },
    setPathCode: (state, { path }) => {
      state.pathCode = path;
    },
    setStopsIds: (state, { stopsIds }) => {
      state.stopsIds = stopsIds;
    },
    toggleAutomaticRefresh: state => {
      state.automaticRefresh = !state.automaticRefresh;
    },
  },
  actions: {
    async authenticateConnection({ commit }) {
      try {
        const response = await api.post(
          '/Login/Autenticar?token=f83ea40456e41706cd40dc9ca84ff7a90e8cc14fc4218e1f09110cc06719a581',
        );

        commit('setAuthenticateStatus', { response: response.data });
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      }
    },
    async fetchData({ state, commit, dispatch }) {
      this.state.dataIsLoading = true;

      try {
        await dispatch('authenticateConnection');

        if (state.authenticate === true) {
          const stopsResults = await api.get('/Parada/Buscar?termosBusca=');
          const vehiclesResults = await api.get('/Posicao');

          const vehiclesList: Vehicle[] = [];
          const stopsList: Stop[] = [];

          vehiclesResults.data.l.map((item: any) => {
            item.vs.map((vehicle: any) => {
              vehiclesList.push({
                id: vehicle.p,
                name: vehicle.p,
                accessibility: vehicle.a,
                path: item.cl,
                position: {
                  long: vehicle.px,
                  lat: vehicle.py,
                },
              });
            });
          });

          stopsResults.data.map((stop: any) => {
            stopsList.push({
              id: stop.cp,
              name: stop.np,
              address: stop.ed,
              position: {
                long: stop.px,
                lat: stop.py,
              },
            });
          });

          commit('setInitialResults', { vehicles: vehiclesList, stops: stopsList });
        }
      } catch (error) {
        throw new Error(`Error: ${error.message}`);
      } finally {
        this.state.dataIsLoading = false;
      }
    },
  },
});

export default store;
