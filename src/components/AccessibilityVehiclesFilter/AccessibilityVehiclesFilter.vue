<template>
  <button
    type="button"
    :class="['accessibility-button', accessibilityFilter && 'active']"
    @click="toggleAccessbilityVehiclesFilter"
  >
    <img src="../../assets/accessibilityButton.svg" alt="Filtro de veículos acessíveis" />
  </button>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';

export default defineComponent({
  name: 'AccessibilityVehiclesFilter',
  computed: {
    ...mapState(['accessibilityFilter']),
  },
  methods: {
    ...mapMutations(['toggleAccessbilityVehiclesFilter']),
  },
});
</script>

<style src="./styles.scss" scoped lang="scss"></style>
