<template>
  <p class="message">
    Nenhum resultado entrado para <br />
    a {{ searchTerm }} pesquisada
  </p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EmptyResults',
  props: ['searchTerm'],
});
</script>

<style src="./styles.scss" scoped lang="scss"></style>
