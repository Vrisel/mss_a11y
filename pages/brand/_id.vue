<template>
  <b-container>
    <b-img :alt="brand.name_eng" :src="brand.logo" />
    <div>준비중입니다.</div>
  </b-container>
</template>

<script>
export default {
  fetch({ route, store }) {
    store.dispatch('setLocation', route);
  },
  head() {
    return {
      title: this.title,
    };
  },
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
