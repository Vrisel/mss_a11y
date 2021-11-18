<template>
  <div id="__default">
    <TheHeader class="border-bottom" />
    <TheAside @asideExpansion="toggleAside" />
    <div :class="{ 'aside-expanded': isAsideExpanded }" class="border-left">
      <!-- breadcrumb가 main 안에 있으면
      랜드마크를 이용한 탐색 시에 혼동을 줄 수 있음 -->
      <b-breadcrumb
        v-if="breadcrumbs.length > 1"
        :items="breadcrumbs"
        class="ml-5"
      />
      <main>
        <Nuxt />
      </main>
      <TheFooter />
    </div>
    <client-only>
      <TheHovermenu />
    </client-only>
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
#__default > div.aside-expanded {
  margin-left: 270px;
}
.breadcrumb-item + .breadcrumb-item::before {
  content: '〉';
}
</style>
