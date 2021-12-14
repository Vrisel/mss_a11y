<template>
  <b-container>
    <b-img :alt="brand.name_eng" :src="brand.logo" />
    <div>준비중입니다.</div>
  </b-container>
</template>

<script>
import LayoutDefault from '~/mixins/LayoutDefault.js';
export default {
  mixins: [LayoutDefault],
  computed: {
    brand() {
      return this.$store.state.brand;
    },
    title() {
      return `${this.brand.name_kor} (${this.brand.name_eng})`;
    },
  },
};
</script>

<style scoped></style>
