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
            :key="`campaign-${item}`"
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
            v-for="item of subCategory"
            :key="`subcategory-${item}`"
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
          <b-form-input size="sm" type="search" aria-label="브랜드" />
        </h3>
      </header>
      <div style="margin-left: 122px; padding-top: 19px">
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
                  :title="brandExpanded !== 'exclusive' ? '펼치기' : '접기'"
                  @click="brandExpansionToggle('exclusive')"
                >
                  <b-icon
                    :icon="brandExpanded !== 'exclusive' ? 'plus' : 'dash'"
                    aria-hidden="true"
                  />
                </b-button>
              </div>
              <div class="mt-2 divider">
                <b-link>상품순</b-link>
                <b-link>이름순</b-link>
              </div>
            </header>
            <ul
              class="d-flex flex-wrap"
              :class="{ 'filter-collapsed': brandExpanded !== 'exclusive' }"
            >
              <li
                v-for="(item, index) of exclusiveBrand"
                :key="'단독' + index"
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
                  :title="brandExpanded !== 'all' ? '펼치기' : '접기'"
                  @click="brandExpansionToggle('all')"
                >
                  <b-icon
                    :icon="brandExpanded !== 'all' ? 'plus' : 'dash'"
                    aria-hidden="true"
                  />
                </b-button>
              </div>
              <div class="mt-2 divider">
                <b-link>상품순</b-link>
                <b-link>이름순</b-link>
              </div>
            </header>
            <ul
              class="d-flex flex-wrap"
              :class="{ 'filter-collapsed': brandExpanded !== 'all' }"
            >
              <li
                v-for="(item, index) of brand"
                :key="'전체' + index"
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
          <!-- "전체"로 한 번 더 반복 -->
        </div>
      </div>
    </div>
    <!-- <ListFilter title="색상"></ListFilter>
    <ListFilter title="가격" :link-for-all="true">
      <ul style="padding: 12px 15px 9px 12px">
        <li style="padding-right: 24px; margin: 8px 0 10px"></li>
      </ul>
    </ListFilter>
    <ListFilter title="실측"></ListFilter>
    <ListFilter title="검색"></ListFilter> -->
  </div>
</template>

<script>
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
      brandExpanded: '',
    };
  },
  computed: {
    exclusiveBrand() {
      return this.brand.filter((e) => e.isExclusive);
    },
  },
  methods: {
    brandExpansionToggle(target) {
      if (this.brandExpanded === target) {
        this.brandExpanded = '';
      } else {
        this.brandExpanded = target;
      }
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
.filter-collapsed {
  max-height: 132px;
  overflow: hidden;
}
</style>
