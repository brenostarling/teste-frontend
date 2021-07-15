<template>
  <div class="global-loading">
    <Loading />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Loading from '../SearchResultsStates/Loading/Loading.vue';

export default defineComponent({
  name: 'GlobalLoading',
  components: {
    Loading,
  },
});
</script>

<style src="./styles.scss" scoped lang="scss"></style>
