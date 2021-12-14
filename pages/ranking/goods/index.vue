<template>
  <b-container>준비중입니다.</b-container>
</template>

<script>
import LayoutDefault from '~/mixins/LayoutDefault.js';
export default {
  mixins: [LayoutDefault],
  computed: {
    title() {
      return '상품 랭킹';
    },
  },
};
</script>
