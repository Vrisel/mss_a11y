<template>
  <div id="__default">
    <TheHeader />
    <TheAside @asideExpansion="toggleAside" />
    <main :class="{ 'aside-expanded': isAsideExpanded }">
      <b-breadcrumb
        v-if="breadcrumbs.length > 1"
        :items="breadcrumbs"
        class="ml-5"
      />
      <Nuxt />
    </main>
    <client-only>
      <TheHovermenu />
    </client-only>
    <TheFooter :class="{ 'aside-expanded': isAsideExpanded }" />
  </div>
</template>

<script>
import TheHeader from '@/components/layouts/TheHeader.vue';
import TheAside from '@/components/layouts/TheAside.vue';
import TheHovermenu from '@/components/layouts/TheHovermenu.vue';
import TheFooter from '@/components/layouts/TheFooter.vue';
import category from '@/test/stub.category.js';
import brands from '~/test/stub.brands.js';
export default {
  components: {
    TheHeader,
    TheAside,
    TheHovermenu,
    TheFooter,
  },
  data() {
    return {
      isAsideExpanded: true,
      category,
      brands,
    };
  },
  computed: {
    breadcrumbs() {
      const bc = this.$store.getters.getBreadcrumbs;
      const dir = this.$route.name.toLowerCase().split('-')[0];
      if (dir === 'category') {
        return bc.forCategory;
      } else {
        return bc.forBrand;
      }
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
