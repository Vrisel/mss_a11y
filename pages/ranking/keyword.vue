<template>
  <b-container>준비중입니다.</b-container>
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
    title() {
      return '검색어 랭킹';
    },
  },
};
</script>
