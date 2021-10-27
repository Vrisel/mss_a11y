<template>
  <div id="__default">
    <TheHeader />
    <TheAside @asideExpansion="toggleAside" />
    <main :class="{ 'aside-expanded': isAsideExpanded }">
      <b-breadcrumb :items="breadcrumbs" class="ml-5" />
      <Nuxt />
    </main>
    <TheFooter :class="{ 'aside-expanded': isAsideExpanded }" />
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
  computed: {
    breadcrumbs() {
      return [
        { text: '무신사 스토어', href: '/' },
        { text: '상의', href: '#' },
      ];
    },
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
main,
footer {
  transition: 0.5s;
}
main.aside-expanded,
footer.aside-expanded {
  margin-left: 270px;
}
.breadcrumb-item + .breadcrumb-item::before {
  content: '〉';
}
</style>
