<template>
  <div class="category">
    <h2 class="h4 border-bottom">
      {{ upperCategory.name_eng || category.name_eng }}
    </h2>
    <div class="m-0 hover-bg-light" style="padding: 20px">
      <div class="border-right border-bottom">
        <div class="bg-white border-top border-left" style="height: 42px"></div>
        <div class="bg-white border-top border-left" style="height: 43px"></div>
        <div class="bg-white border-top border-left">
          <div v-if="!goodsList">
            <!-- 왜 class="d-flex justify-content-center"도, class="text-center"도 안 되지? -->
            <b-spinner v-if="loading" label="목록을 불러오는 중" />
            <span v-else>상품이 없습니다.</span>
          </div>
          <ul v-else class="d-flex flex-wrap">
            <li
              v-for="goods of goodsList"
              :key="goods.name"
              class="
                position-relative
                bg-white
                hover-bg-light
                border-bottom border-right
              "
            >
              <CategoryItem
                v-bind="goods"
                class="mx-auto"
                style="width: 125px"
              />
            </li>
          </ul>
        </div>
        <div class="bg-white border-top border-left" style="height: 42px"></div>
        <div class="bg-white border-top border-left" style="height: 42px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryItem from '~/components/CategoryItem.vue';
import LayoutDefault from '~/mixins/LayoutDefault.js';
// import stubGoodsList from '@/test/stub.goodslist.js';

function getRandom(max, unit = 1) {
  return Math.round((Math.random() * max) / unit) * unit;
}

export default {
  components: { CategoryItem },
  mixins: [LayoutDefault],
  asyncData() {
    // const goodsList = stubGoodsList[params.id];
    const goodsList = [];
    for (let i = 0; i < 20; i++) {
      goodsList.push({
        id: '1111111',
        name: '임시 상품 상품명상품명상품명상품명상품명상품명',
        brand: { id: 'samplebrand', name_kor: '임시 브랜드' },
        category: '001001',
        price: getRandom(50000),
        // saleprice: 10000,
        // badge: { text: '무신사 단독', variant: 'success' },
        tag:
          Math.random() < 0.3
            ? ['exclusive', 'income', 'limited'][getRandom(2)]
            : '',
        // coupon: Math.random() < 0.2 ? Math.random() : 0,
        rating: {
          avg: getRandom(5, 0.01),
          count: getRandom(50000),
        },
        favs: getRandom(50000),
        forMen: Math.random() < 0.5,
        forWomen: Math.random() < 0.5,
      });
    }
    return {
      goodsList,
    };
  },
  data() {
    return {
      loading: true,
    };
  },
  computed: {
    category() {
      return this.$store.state.category;
    },
    upperCategory() {
      return this.$store.state.upperCategory;
    },
    title() {
      return [this.upperCategory.name_kor || '', this.category.name_kor]
        .filter(Boolean)
        .join(' > ');
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  font-size: 12px;
  margin-right: -1px;
}
li {
  width: 180px;
  height: 370px;
  padding: 18px 0;
  box-sizing: border-box;
}
li {
  width: 14.28571429%;
}
</style>
