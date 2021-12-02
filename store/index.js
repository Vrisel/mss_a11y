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
    gender: 'all',
    /* route: {}, */
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
    mutateGender(state, gender) {
      switch (gender.toLowerCase()) {
        case 'male':
          state.gender = 'male';
          break;
        case 'female':
          state.gender = 'female';
          break;
        default:
          state.gender = 'all';
          break;
      }
    },
    /* mutateRoute(state, route) {
      state.route = route;
    }, */
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

        if (id) {
          brand = brands[id];
        }
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
      // context.commit('mutateRoute', route);
    },
  },
  getters: {
    getBreadcrumbs(state) {
      return function (type, rank) {
        const bc = [{ text: '무신사 스토어', to: '/' }];
        switch (type) {
          case 'brand':
          case 'goods':
            bc.push({ text: '브랜드숍', to: '/brand' });
            // const brand = state.brand;
            if (Object.keys(state.brand).length) {
              /* forBrand.push({ text: '브랜드숍', to: '/state.brand' }); */

              const text = `${state.brand.name_eng}(${state.brand.name_kor})`;
              const to = `/brand/${state.brand.id}`;
              bc.push({ text, to });
            }
            break;
          case 'category':
            // const upperCategory = state.upperCategory;
            // const category = state.category;
            if (Object.keys(state.upperCategory).length) {
              const text = state.upperCategory.name_kor;
              const to = `/category/${state.upperCategory.id}`;
              bc.push({ text, to });
            }
            if (Object.keys(state.category).length) {
              const text = state.category.name_kor;
              const to = `/category/${state.category.id}`;
              bc.push({ text, to });
            }
            break;
          case 'ranking': {
            let keyword = '';
            switch (rank) {
              case 'goods':
                keyword = '상품';
                break;
              case 'brand':
                keyword = '브랜드';
                break;
              case 'keyword':
                keyword = '검색어';
                break;
              default:
                break;
            }
            bc.push({ text: `${keyword} 랭킹`, to: '' });
            break;
          }
          default:
            break;
        }
        return bc;
      };
    },
  },
};
