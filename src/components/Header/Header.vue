<template>
  <header class="header">
    <h3>{{ section }}</h3>
    <button type="button" @click="$emit('closeSection')">
      <img src="../../assets/close.svg" alt="Fechar" />
    </button>
  </header>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
  props: ['section'],
});
</script>

<style src="./styles.scss" scoped lang="scss"></style>
