<template>
  <p class="message">Digite uma {{ searchTerm }} que <br />deseje obter informações</p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NoSearch',
  props: ['searchTerm'],
});
</script>

<style src="./styles.scss" scoped lang="scss"></style>
