<template>
  <div id="__default">
    <nav id="shortcut">
      <a href="#main">본문 바로가기</a>
    </nav>
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
      <main id="main">
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
import TheHeader from '~/components/layouts/TheHeader.vue';
import TheAside from '~/components/layouts/TheAside.vue';
import TheHovermenu from '~/components/layouts/TheHovermenu.vue';
import TheFooter from '~/components/layouts/TheFooter.vue';
import category from '@/test/stub.category.js';
import brands from '@/test/stub.brands.js';
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
  min-width: 1600px;
}
#shortcut {
  position: absolute;
  text-align: center;
  font-size: 0;
  height: 0;
  border: 0;
  z-index: -1;
}
#shortcut:focus-within {
  font-size: 1.5rem;
  font-weight: bolder;
  padding: 1em 2em;
  height: 3em;
  background-color: pink;
  z-index: 10;
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
.hover-bg-light:hover {
  background-color: #f8f9fa !important;
}
.vertical-middle {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.text-truncate-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.5em;
  height: 3em;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.font-12 {
  font-size: 12px;
}
.divider > * {
  display: inline-block;
}
.divider > :not(:last-child) {
  border-right: 1px solid gray;
  margin-right: 0.5em;
  padding-right: 0.5em;
}
.divider-horizontal > :not(:last-child) {
  border-bottom: 1px solid gray;
  margin-bottom: 1.5em;
}
</style>
