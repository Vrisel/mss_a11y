<template>
  <div class="category">
    <div class="border-bottom pl-2 d-flex">
      <h2 class="h4 mr-4">
        {{ upperCategory.name_eng || category.name_eng }}
      </h2>
      <b-checkbox-group
        buttons
        button-variant="outline-secondary"
        :options="['#아무', '#샘플', '#태그']"
        class="hashtags"
      />
    </div>
    <div role="search" aria-labelledby="categoryFilter" style="font-size: 12px">
      <h3 id="categoryFilter" class="sr-only">검색필터</h3>
      <ListFilter
        title="캠페인"
        link-for-all="true"
        :option="[{ name_kor: '시즌오프', isNew: true }]"
        option-class="filter-item"
      />
      <ListFilter
        title="중분류"
        link-for-all="true"
        :option="subCategoryFilter"
        option-class="filter-item"
      />
      <ListFilter link-for-all="false" option-class="filter-item">
        <template #title>
          브랜드
          <b-form-input size="sm" type="search" aria-label="브랜드" />
        </template>
        <div class="float-left w-100 divider-horizontal">
          <div class="pb-3">
            <header class="d-flex flex-wrap filter-sub-header">
              <h4>
                <strong>인기</strong>
              </h4>
            </header>
          </div>
          <div class="pb-3 d-flex">
            <header class="filter-sub-header">
              <div class="clearfix">
                <h4 class="float-left">
                  <strong>단독</strong>
                </h4>
                <b-button
                  type="button"
                  variant="outline-secondary"
                  squared
                  class="float-left p-0 btn-toggle-expansion"
                  title="펼치기"
                >
                  <b-icon icon="plus" aria-hidden="true" />
                </b-button>
              </div>
              <div class="mt-2 divider">
                <b-link>상품순</b-link>
                <b-link>이름순</b-link>
              </div>
            </header>
            <ul class="d-flex flex-wrap">
              <li
                v-for="(item, index) of brandFilter"
                :key="'브랜드' + index"
                class="filter-item"
              >
                <b-link>
                  <span
                    class="d-inline-block align-middle text-truncate"
                    style="max-width: 90px"
                  >
                    {{ item.name_kor }}
                  </span>
                  <span v-if="item.count">
                    ({{ item.count.toLocaleString() }})
                  </span>
                  <b-badge v-if="item.isExclusive" variant="success">
                    단독
                  </b-badge>
                  <sup v-if="item.isSale" class="text-warning">SALE</sup>
                  <sup v-if="item.isNew" class="text-danger">NEW</sup>
                </b-link>
              </li>
            </ul>
          </div>
          <!-- "전체"로 한 번 더 반복 -->
        </div>
      </ListFilter>
    </div>
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
          <ul v-else class="d-flex flex-wrap goods-list">
            <li
              v-for="(goods, i) of goodsList"
              :key="`${i}${goods.name}`"
              class="
                position-relative
                bg-white
                hover-bg-light
                border-bottom border-right
                list-item
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
import ListFilter from '~/components/ListFilter.vue';
import CategoryItem from '~/components/CategoryItem.vue';
import LayoutDefault from '~/mixins/LayoutDefault.js';
// import stubGoodsList from '@/test/stub.goodslist.js';

function getRandom(max, unit = 1) {
  return Math.round((Math.random() * max) / unit) * unit;
}

export default {
  components: { ListFilter, CategoryItem },
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
        price: getRandom(50000, 100),
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
    const subCategoryFilter = [];
    let randomCount = getRandom(15);
    for (let i = 0; i < randomCount; i++) {
      subCategoryFilter.push({
        name_kor: '품목명',
        count: getRandom(1000),
      });
    }
    const brandFilter = [];
    randomCount = getRandom(30);
    for (let i = 0; i < randomCount; i++) {
      brandFilter.push({
        name_kor: '브랜드명',
        count: getRandom(1000),
        isExclusive: Math.random() < 0.2,
        isSale: Math.random() < 0.8,
      });
    }
    return {
      goodsList,
      subCategoryFilter,
      brandFilter,
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
.filter-sub-header {
  min-width: 116px;
  padding-right: 16px;
}
.btn-toggle-expansion {
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  margin-left: 6px;
}
* >>> .filter-item {
  width: 195px;
  padding-bottom: 15px;
}
.goods-list {
  list-style: none;
  font-size: 12px;
  margin-right: -1px;
}
.list-item {
  width: 180px;
  height: 370px;
  padding: 18px 0;
  box-sizing: border-box;
}
.list-item {
  width: 14.28571429%;
}
.hashtags >>> .btn {
  font-size: 12px;
  height: 31px;
  margin-right: 1px;
  margin-bottom: 5px;
  padding-right: 10px;
  padding-left: 9px;
  border-radius: 0;
}
</style>
