<template>
  <div id="__default">
    <TheHeader />
    <TheAside />
    <main>
      <Nuxt />
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader.vue';
import TheAside from '@/components/layouts/TheAside.vue';
import TheFooter from '@/components/layouts/TheFooter.vue';
export default {
  components: {
    TheHeader,
    TheAside,
    TheFooter,
  },
};
</script>

<style>
#__default {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
