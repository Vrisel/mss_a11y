<template>
  <div id="__default">
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css"
      rel="stylesheet"
    />
    <TheHeader class="border-bottom" />
    <TheAside @asideExpansion="toggleAside" />
    <div :class="{ 'aside-expanded': isAsideExpanded }" class="border-left">
      <nav role="navigation" aria-label="브레드크럼">
        <!-- breadcrumb가 main 안에 있으면
        랜드마크를 이용한 탐색 시에 혼동을 줄 수 있음 -->
        <b-breadcrumb
          v-if="breadcrumbs.length > 1"
          :items="breadcrumbs"
          class="ml-2 pl-5 py-2 bg-transparent border-bottom"
        />
      </nav>
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
      const dir = this.$route.name.toLowerCase().split('-')[0];
      const rank = this.$route.name.toLowerCase().split('-')[1] || '';
      const bc = this.$store.getters.getBreadcrumbs(dir, rank);
      return bc;
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
