<template>
  <div id="__main">
    <MainSection
      v-model="rankingTabIndex"
      heading="랭킹"
      :to="`/ranking/${
        rankingTabIndex === 0 ? `goods/${currentRanking}` : 'brand'
      }`"
      :aria-desc="currentRanking"
      header-class="pl-5"
      @mouseenter="stopRankingTimer"
      @mouseleave="setRankingTimer"
    >
      <b-tab>
        <template #title>
          <h3>상품</h3>
          <ul v-show="rankingList && rankingTabIndex === 0" style="columns: 2">
            <li v-for="(cat, name) in rankingList" :key="name">
              <b-link
                :id="name"
                class="nav-link px-0 py-0"
                :class="{ active: currentRanking === name }"
                @click="switchRankingTo(name)"
              >
                {{ name }}
              </b-link>
            </li>
          </ul>
        </template>
        <ul v-if="ranking.length" class="d-flex flex-wrap">
          <li
            v-for="(goods, rank) in ranking"
            :key="goods.id"
            class="hover-bg-light"
          >
            <article class="position-relative ranking_item">
              <small class="position-absolute bg-white px-1 py-1">
                <strong>{{ rank + 1 }}위</strong>
              </small>
              <b-badge
                v-if="goods.badge"
                :variant="goods.badge.variant"
                class="item-badge px-2 py-1"
              >
                {{ goods.badge.text }}
              </b-badge>
              <b-link :to="`/goods/${goods.id}`">
                <figure class="px-4 pt-4">
                  <b-img
                    src="https://via.placeholder.com/146x175"
                    :alt="goods.name"
                  />
                </figure>
              </b-link>
              <b-badge v-if="goods.coupon" variant="primary" class="coupon">
                쿠폰
              </b-badge>
              <p class="mx-2 mt-2">
                <b-link :to="`/brand/${goods.brand.id}`">
                  {{ goods.brand.name_kor }}
                </b-link>
                <br />
                <b-link :to="`/goods/${goods.id}`">
                  {{ goods.name.replace(/(^.{13}).+/, '$1...') }}
                </b-link>
              </p>
              <p class="mx-2 mt-2">
                <del v-if="goods.saleprice" class="text-secondary">
                  <span class="sr-only">원가</span>
                  {{ goods.price.toLocaleString() }}원
                </del>
                <strong>
                  <span class="sr-only">판매가</span>
                  {{ (goods.saleprice || goods.price).toLocaleString() }}원
                </strong>
              </p>
            </article>
          </li>
        </ul>
        <div v-else>상품이 없습니다.</div>
      </b-tab>
      <b-tab title="브랜드">준비중입니다.</b-tab>
    </MainSection>
    <MainSection heading="스타일" to="">
      <b-tab title="브랜드 스냅">준비중입니다.</b-tab>
      <b-tab title="코디숍">준비중입니다.</b-tab>
      <b-tab title="코디맵">준비중입니다.</b-tab>
    </MainSection>
  </div>
</template>

<script>
import MainSection from '~/components/MainSection.vue';
import rankingList from '~/test/stub.rankinglist.js';
export default {
  components: {
    MainSection,
  },
  data() {
    return {
      rankingTabIndex: 0,
      rankingTimer: 0,
      currentRanking: '상의',
    };
  },
  fetch({ route, store }) {
    store.dispatch('setLocation', route);
  },
  head() {
    return {
      title: '',
    };
  },
  computed: {
    rankingList() {
      return rankingList;
    },
    ranking() {
      return this.rankingList[this.currentRanking];
    },
  },
  watch: {
    rankingTabIndex(to) {
      this.stopRankingTimer();
      if (to === 0) {
        this.setRankingTimer();
      }
    },
  },
  mounted() {
    this.setRankingTimer();
  },
  methods: {
    getRandomRanking() {
      const key = Object.keys(this.rankingList);
      const rand = Math.floor(Math.random() * key.length);
      this.currentRanking = key[rand];
      this.setRankingTimer();
    },
    setRankingTimer() {
      this.stopRankingTimer();
      this.rankingTimer = setTimeout(() => {
        this.getRandomRanking();
      }, 5000);
    },
    stopRankingTimer() {
      window.clearTimeout(this.rankingTimer);
      this.rankingTimer = 0;
    },
    switchRankingTo(to) {
      this.currentRanking = to;
    },
  },
};
</script>

<style scoped>
* >>> .nav-link.active > ul {
  font-weight: initial;
}
.hover-bg-light:hover {
  background-color: #f8f9fa;
}
.ranking_item {
  width: 200px;
  height: 287px;
  box-sizing: border-box;
}
.item-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
}
.coupon {
  position: absolute;
  left: 1rem;
  top: 184px;
}
</style>
