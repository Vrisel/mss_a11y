<template>
  <div role="search" aria-label="상품" style="font-size: 12px">
    <h3 class="sr-only">검색필터</h3>
    <div class="border-bottom border-right clearfix">
      <header
        class="float-left"
        style="width: 109px; padding-top: 20px; padding-left: 15px"
      >
        <h3>캠페인</h3>
      </header>
      <div style="margin-left: 122px; padding-top: 19px">
        <ul>
          <li class="float-left filter-all">
            <b-link>전체</b-link>
          </li>
          <li
            v-for="item of [{ name_kor: '시즌오프', isNew: true }]"
            :key="`campaign-${item.name_kor}`"
            class="float-left filter-item"
          >
            <b-link>
              <span class="text-truncate">{{ item.name_kor }}</span>
              <span v-if="item.count">
                ({{ item.count.toLocaleString() }})
              </span>
              <sup v-if="item.isNew" class="text-danger">NEW</sup>
            </b-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-bottom border-right clearfix">
      <header
        class="float-left"
        style="width: 109px; padding-top: 20px; padding-left: 15px"
      >
        <h3>중분류</h3>
      </header>
      <div style="margin-left: 122px; padding-top: 19px">
        <ul>
          <li
            class="float-left filter-all"
            :style="{
              height: 33 * Math.ceil(subCategory.length / 5) + 'px',
            }"
          >
            <b-link>전체</b-link>
          </li>
          <li
            v-for="(item, index) of subCategory"
            :key="`subcategory-${item.name_kor}-${index}`"
            class="float-left filter-item"
          >
            <b-link>
              <span class="text-truncate">{{ item.name_kor }}</span>
              <span v-if="item.count">
                ({{ item.count.toLocaleString() }})
              </span>
            </b-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-bottom border-right clearfix">
      <header
        class="float-left"
        style="width: 109px; padding-top: 20px; padding-left: 15px"
      >
        <h3>
          브랜드
          <b-form-input
            v-model="brandSearch"
            size="sm"
            type="search"
            aria-label="브랜드"
            style="
              width: 82px;
              height: 26px;
              margin-top: 17px;
              padding: 1px 5px;
              font-size: 12px;
            "
          />
        </h3>
      </header>
      <div style="margin-left: 122px; padding-top: 19px">
        <div class="float-left w-100 divider-horizontal">
          <div v-if="!brandSearch" class="pb-3">
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
                  :title="!expanded.exclusive ? '펼치기' : '접기'"
                  @click="brandExpansionToggle('exclusive')"
                >
                  <b-icon
                    :icon="!expanded.exclusive ? 'plus' : 'dash'"
                    aria-hidden="true"
                  />
                </b-button>
              </div>
              <div class="mt-2 divider">
                <b-link
                  :class="{ active: sort.exclusive === 'count' }"
                  :disabled="sort.exclusive === 'count'"
                  @click="sort.exclusive = 'count'"
                >
                  상품순
                </b-link>
                <b-link
                  :class="{ active: sort.exclusive === 'abc' }"
                  :disabled="sort.exclusive === 'abc'"
                  @click="sort.exclusive = 'abc'"
                >
                  이름순
                </b-link>
              </div>
            </header>
            <ul
              class="d-flex flex-wrap"
              :class="{ 'filter-collapsed': !expanded.exclusive }"
            >
              <li
                v-for="(item, index) of exclusiveBrand"
                :key="`exclusive-${item}-${index}`"
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
                  <sup v-if="item.isSale" class="text-warning">SALE</sup>
                </b-link>
              </li>
            </ul>
          </div>
          <div class="pb-3 d-flex">
            <header class="filter-sub-header">
              <div class="clearfix">
                <h4 class="float-left">
                  <strong>전체</strong>
                </h4>
                <b-button
                  type="button"
                  variant="outline-secondary"
                  squared
                  class="float-left p-0 btn-toggle-expansion"
                  :title="!expanded.whole ? '펼치기' : '접기'"
                  @click="brandExpansionToggle('whole')"
                >
                  <b-icon
                    :icon="!expanded.whole ? 'plus' : 'dash'"
                    aria-hidden="true"
                  />
                </b-button>
              </div>
              <div class="mt-2 divider">
                <b-link
                  :class="{ active: sort.whole === 'count' }"
                  :disabled="sort.whole === 'count'"
                  @click="sort.whole = 'count'"
                >
                  상품순
                </b-link>
                <b-link
                  :class="{ active: sort.whole === 'abc' }"
                  :disabled="sort.whole === 'abc'"
                  @click="sort.whole = 'abc'"
                >
                  이름순
                </b-link>
              </div>
            </header>
            <ul
              class="d-flex flex-wrap"
              :class="{ 'filter-collapsed': !expanded.whole }"
            >
              <li
                v-for="(item, index) of wholeBrand"
                :key="`whole-${item}-${index}`"
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
                </b-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="border-bottom border-right clearfix">
      <header
        class="float-left"
        style="width: 109px; padding-top: 20px; padding-left: 15px"
      >
        <h3>색상</h3>
      </header>
      <div style="margin-left: 122px; padding-top: 7px">
        <ul style="padding-right: 15px; padding-bottom: 5px">
          <li
            v-for="item of [
              { name_kor: '흰색', color: 'white' },
              { name_kor: '검은색', color: 'black' },
            ]"
            :key="`color-${item.name_kor}`"
            class="float-left"
            style="padding: 8px 7px 10px 0"
          >
            <b-link
              class="d-block border"
              style="
                width: 23px;
                height: 23px;
                text-indent: 100%;
                overflow: hidden;
                white-space: nowrap;
              "
              :style="{ 'background-color': item.color }"
            >
              {{ item.name_kor }}
            </b-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="border-bottom border-right clearfix">
      <header
        class="float-left"
        style="width: 109px; padding-top: 20px; padding-left: 15px"
      >
        <h3>가격</h3>
      </header>
      <div style="margin-left: 122px; padding: 12px 15px 9px 0">
        <ul class="d-flex">
          <li class="filter-price">
            <b-link>전체</b-link>
          </li>
          <li
            v-for="(item, index) of [
              '~ 30,000원',
              '30,000원 ~ 70,000원',
              '70,000원 ~ 110,000원',
              '110,000원 ~ 140,000원',
              '140,000원 ~',
            ]"
            :key="`price-${index}`"
            class="filter-price"
          >
            <b-link>
              <span>{{ item }}</span>
            </b-link>
          </li>
          <li class="filter-price">
            <b-form inline class="align-middle">
              <input
                v-model="priceFrom"
                type="number"
                step="1"
                min="0"
                class="border"
                style="
                  width: 70px;
                  height: 29px;
                  padding: 5px 7px 4px 4px;
                  font-size: 12px;
                "
              />
              <span>원 ~ </span>
              <b-form-input
                v-model="priceTo"
                type="number"
                step="1"
                min="0"
                class="border"
                style="
                  width: 70px;
                  height: 29px;
                  padding: 5px 7px 4px 4px;
                  font-size: 12px;
                "
              />
              <span>원</span>
              <b-button
                type="submit"
                style="
                  height: 25px;
                  padding: 5px 5px 3px;
                  margin-left: 4px;
                  font-size: 12px;
                "
                >검색</b-button
              >
            </b-form>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div class="border-bottom border-right clearfix">
      <header
        class="float-left"
        style="width: 109px; padding-top: 20px; padding-left: 15px"
      >
        <h3>실측</h3>
      </header>
      <div style="margin-left: 122px; padding: 12px 15px 9px 0">
        <ul class="d-flex">
          <li class="filter-price">
            <b-button type="button">최근 구매내역</b-button>
          </li>
          <li
            v-for="(item, index) of sizeFilter"
            :key="`size-${index}`"
            style="padding-right:10px;padding-left:25px"
          >
            <b-link>
              <span>{{ item }}</span>
            </b-link>
          </li>
        </ul>
      </div>
    </div> -->
    <div class="border-bottom border-right clearfix">
      <header
        class="float-left"
        style="width: 109px; padding-top: 20px; padding-left: 15px"
      >
        <h3>검색</h3>
      </header>
      <div style="margin-left: 122px; padding: 12px 15px 9px 0">
        <b-form inline>
          <b-form-input
            v-model="keyword"
            name="keyword"
            type="text"
            class="mr-1 rounded-0"
            style="
              width: 142px;
              height: 25px;
              padding: 2px 5px;
              font-size: 12px;
            "
          />
          <b-button
            type="submit"
            variant="outline-secondary"
            class="m-0 rounded-0"
            style="
              width: 52px;
              height: 25px;
              padding: 5px 5px 6px;
              font-size: 12px;
            "
          >
            검색
          </b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
function brandSort(option, a, b) {
  switch (option) {
    case 'count':
      return b.count - a.count || brandSort('abc', a.count, b.count);
    case 'abc':
      if (a.name_kor > b.name_kor) return 1;
      else if (a.name_kor < b.name_kor) return -1;
      else return b.count - a.count;
    default:
      return 0;
  }
}
export default {
  props: {
    subCategory: {
      type: Array,
      default() {
        return [];
      },
    },
    brand: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      selected: { campaign: [], subCategory: [], brand: [] },
      sort: { exclusive: 'count', whole: 'count' },
      expanded: { exclusive: false, whole: false },
      brandSearch: '',
      priceFrom: 0,
      priceTo: 0,
      keyword: '',
    };
  },
  computed: {
    exclusiveBrand() {
      const result = this.brand.filter((e) => e.isExclusive);
      result.sort((a, b) => brandSort(this.sort.exclusive, a, b));
      return result;
    },
    wholeBrand() {
      const result = this.brand.filter((e) =>
        e.name_kor.includes(this.brandSearch)
      );
      result.sort((a, b) => brandSort(this.sort.whole, a, b));
      return result;
    },
    /* sizeFilter() {
      const filter = [];
      switch(this.$route.params.id) {
        default:
          filter.push('총장');
      }
      return filter;
    }, */
  },
  methods: {
    brandExpansionToggle(target) {
      this.expanded[target] = !this.expanded[target];
    },
  },
};
</script>

<style scoped>
.filter-all {
  height: 33px;
  width: 116px;
  padding-right: 16px;
  padding-bottom: 15px;
}
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
.filter-item {
  width: 195px;
  padding-bottom: 15px;
}
.filter-price {
  margin-top: 8px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 14px;
}
.filter-price:first-child {
  padding-left: 0;
}
.filter-collapsed {
  max-height: 132px;
  overflow: hidden;
}
.active {
  font-weight: bold;
}
</style>
