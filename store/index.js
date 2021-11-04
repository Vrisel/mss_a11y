import categories from '@/test/stub.category.js';
import brands from '@/test/stub.brands.js';

export default {
  state: () => ({
    brand: {},
    upperCategory: {},
    category: {},
  }),
  mutations: {
    mutateBrand(state, brand) {
      state.brand = brand;
    },
    mutateCategories(state, payload) {
      state.category = payload.category || {};
      state.upperCategory = payload.upperCategory || {};
    },
  },
  actions: {
    setLocation(context, route) {
      const dir = route.name.toLowerCase().split('-')[0];
      const id = route.params.id.toLowerCase() || '';

      let brand = {};
      let upperCategory = {};
      let category = {};
      if (dir === 'brand') {
        /* get brands */

        brand = brands[id];
      } else if (dir === 'category') {
        /* get categories */

        category = categories[id];
        upperCategory = category.upper ? categories[category.upper] : {};
      } else if (dir === 'goods') {
        /* get goods */
        const goods = { brand: 'musinsastandard', category: '001001' };
        /* get categories */
        /* get brands */

        brand = brands[goods.brand];
        category = categories[goods.category];
        upperCategory = categories[goods.category.slice(0, 3)];
      }
      context.commit('mutateBrand', brand);
      context.commit('mutateCategories', { upperCategory, category });
    },
  },
  getters: {
    getBreadcrumbs(state) {
      const forBrand = [{ text: '무신사 스토어', href: '/' }];
      const brand = state.brand;
      if (Object.keys(brand).length) {
        forBrand.push({ text: '브랜드숍', href: '/brand' });

        const text = `${brand.name_eng}(${brand.name_kor})`;
        const href = `/brand/${brand.id}`;
        forBrand.push({ text, href });
      }

      const forCategory = [{ text: '무신사 스토어', href: '/' }];
      const upperCategory = state.upperCategory;
      const category = state.category;
      if (Object.keys(upperCategory).length) {
        const text = upperCategory.name_kor;
        const href = `/category/${upperCategory.id}`;
        forCategory.push({ text, href });

        if (Object.keys(category).length) {
          const text = category.name_kor;
          const href = `/category/${category.id}`;
          forCategory.push({ text, href });
        }
      }
      console.log(forBrand);
      console.log(forCategory);
      return { forBrand, forCategory };
    },
  },
};