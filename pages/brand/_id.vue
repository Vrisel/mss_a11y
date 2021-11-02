<template>
  <div>
    <b-img :alt="brand.name_eng" :src="brand.logo" />
  </div>
</template>

<script>
import stubBrands from '@/test/stub.brands.js';
export default {
  asyncData({ params }) {
    return {
      brand: stubBrands[params.id],
    };
  },
  head() {
    return {
      title: `${this.brand.name_kor} (${this.brand.name_eng})`,
    };
  },
};
</script>

<style scoped></style>
