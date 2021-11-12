<template>
  <Tutorial />
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
};
</script>
