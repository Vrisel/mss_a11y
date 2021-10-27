<template>
  <div id="__default">
    <TheHeader />
    <TheAside @asideExpansion="toggleAside" />
    <main :class="{ 'aside-expanded': isAsideExpanded }">
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
  data() {
    return {
      isAsideExpanded: true,
    };
  },
  methods: {
    toggleAside(e) {
      this.isAsideExpanded = e;
    },
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
main {
  transition: 0.5s;
}
main.aside-expanded {
  margin-left: 270px;
}
</style>
