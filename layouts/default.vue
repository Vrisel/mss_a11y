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
      /* const bc = [{ text: '무신사 스토어', href: '/' }];
      if (this.$route.path.includes('category')) {
        const categoryId = this.$route.params.id;
        const upperId = categoryId.slice(0, 3);
        const upperName = this.category[upperId].name_kor;
        bc.push({ text: `${upperName}`, href: `/category/${upperId}` });

        if (categoryId.length > 3) {
          const categoryName = this.category[upperId].sub[categoryId].name_kor;
          bc.push({ text: `${categoryName}`, href: `/category/${categoryId}` });
        }
      } else if (this.$route.path.includes('brand')) {
        bc.push({ text: '브랜드숍', href: '/brands' });
        const brandId = this.$route.params.id;
        if (brandId) {
          const brandName = this.brands[brandId].name_eng;
          bc.push({ text: `${brandName}`, href: `/brand/${brandId}` });
        }
      }
      return bc; */

      const bc = this.$store.getters.getBreadcrumbs;
      const dir = this.$route.name.toLowerCase().split('-')[0];
      if (dir === 'category') {
        console.log('category!');
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
