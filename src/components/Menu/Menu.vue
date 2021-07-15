<template>
  <aside class="menu">
    <img src="../../assets/logo.svg" alt="logo" />

    <ul class="menu__navigation">
      <li class="menu__item" :class="{ selected: section === 'path' }">
        <button type="button" @click="setSection({ section: 'path' })">
          <img src="../../assets/path.svg" alt="Linhas" />
          <span>Linhas</span>
        </button>
      </li>
      <li class="menu__item" :class="{ selected: section === 'stop' }">
        <button type="button" @click="setSection({ section: 'stop' })">
          <img src="../../assets/stop.svg" alt="Paradas" />
          <span>Paradas</span>
        </button>
      </li>
      <li class="menu__item" :class="{ selected: section === 'config' }">
        <button type="button" @click="setSection({ section: 'config' })">
          <img src="../../assets/config.svg" alt="Configurações" />
          <span>Config</span>
        </button>
      </li>
    </ul>
  </aside>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState, mapMutations } from 'vuex';

export default defineComponent({
  name: 'Menu',
  computed: {
    ...mapState({
      section: state => state.section,
    }),
  },
  methods: {
    ...mapMutations(['setSection']),
  },
});
</script>

<style src="./styles.scss" scoped lang="scss"></style>
