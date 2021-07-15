<template>
  <section class="details-section">
    <Header section="Configurações" @close-section="closeSection" />

    <main class="content">
      <div class="update">
        <span>Atualização automática</span>
        <button
          type="button"
          @click="toggleAutomaticRefresh"
          :class="['switchButton', automaticRefresh ? 'on' : 'off']"
        >
          <span />
        </button>
      </div>
    </main>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';
import Header from '../Header/Header.vue';

export default defineComponent({
  name: 'Config',
  components: {
    Header,
  },
  computed: {
    ...mapState(['automaticRefresh']),
  },
  methods: {
    ...mapMutations(['toggleAutomaticRefresh', 'setSection']),
    closeSection() {
      this.setSection('');
    },
  },
});
</script>

<style src="./styles.scss" scoped lang="scss"></style>
