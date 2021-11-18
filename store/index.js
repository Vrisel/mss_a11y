import categories from '@/test/stub.category.js';
import brands from '@/test/stub.brands.js';
import stubGoods from '@/test/stub.goods.js';

export default {
  state: () => ({
    topBanner: true,
    brand: {},
    upperCategory: {},
    category: {},
    goods: {},
  }),
  mutations: {
    closeTopBanner(state) {
      state.topBanner = false;
    },
    mutateBrand(state, brand) {
      state.brand = brand;
    },
    mutateCategories(state, payload) {
      state.category = payload.category || {};
      state.upperCategory = payload.upperCategory || {};
    },
    mutateGoods(state, goods) {
      state.goods = goods;
    },
  },
  actions: {
    setLocation(context, route) {
      const dir = route.name.toLowerCase().split('-')[0];
      const id = route.params.id ? route.params.id.toLowerCase() : '';

      let brand = {};
      let upperCategory = {};
      let category = {};
      let goods = {};
      if (dir === 'brand') {
        /* get brands */

        brand = brands[id];
      } else if (dir === 'category') {
        /* get categories */

        category = categories[id];
        upperCategory = category.upper ? categories[category.upper] : {};
      } else if (dir === 'goods') {
        /* get goods */
        goods = stubGoods[id];
        /* get categories */
        category = categories[goods.category];
        upperCategory = categories[goods.category.slice(0, 3)];
        /* get brands */
        brand = brands[goods.brand];
      }
      context.commit('mutateBrand', brand);
      context.commit('mutateCategories', { upperCategory, category });
      context.commit('mutateGoods', goods);
    },
  },
  getters: {
    getBreadcrumbs(state) {
      const forBrand = [{ text: '무신사 스토어', to: '/' }];
      const brand = state.brand;
      if (Object.keys(brand).length) {
        forBrand.push({ text: '브랜드숍', to: '/brand' });

        const text = `${brand.name_eng}(${brand.name_kor})`;
        const to = `/brand/${brand.id}`;
        forBrand.push({ text, to });
      }

      const forCategory = [{ text: '무신사 스토어', to: '/' }];
      const upperCategory = state.upperCategory;
      const category = state.category;
      if (Object.keys(upperCategory).length) {
        const text = upperCategory.name_kor;
        const to = `/category/${upperCategory.id}`;
        forCategory.push({ text, to });
      }
      if (Object.keys(category).length) {
        const text = category.name_kor;
        const to = `/category/${category.id}`;
        forCategory.push({ text, to });
      }
      return { forBrand, forCategory };
    },
  },
};
