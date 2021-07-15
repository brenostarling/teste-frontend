<template>
  <Menu />

  <main class="content">
    <Paths v-if="section === 'path'" />
    <Stops v-if="section === 'stop'" />
    <Config v-if="section === 'config'" />
    <Map />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

import Menu from './components/Menu/Menu.vue';
import Paths from './components/Paths/Paths.vue';
import Stops from './components/Stops/Stops.vue';
import Config from './components/Config/Config.vue';
import Map from './components/Map/Map.vue';

export default defineComponent({
  name: 'App',
  components: {
    Menu,
    Map,
    Paths,
    Stops,
    Config,
  },
  computed: {
    ...mapState(['section']),
  },
});
</script>

<style lang="scss">
#app {
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;

  display: flex;

  > main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100vh;
    width: calc(100vw - 80px);
  }

  @media (min-width: 768px) {
    > main {
      flex-direction: row;
    }
  }
}
</style>
