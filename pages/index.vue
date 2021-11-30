<template>
  <div>
    <MainSection
      v-model="rankingTabIndex"
      heading="랭킹"
      :to="`/ranking/${
        rankingTabIndex === 0 ? `goods/${currentRanking}` : 'brand'
      }`"
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
          <li v-for="(goods, rank) in ranking" :key="goods.id">
            <article>
              <div class="d-flex flex-column">
                <span>{{ rank + 1 }}위</span>
                <b-badge
                  v-if="goods.badge"
                  :variant="goods.badge.variant"
                  class="ml-auto px-2 py-1"
                >
                  {{ goods.badge.text }}
                </b-badge>
                <b-link :to="`/goods/${goods.id}`">
                  <b-img
                    width="146px"
                    height="175.2px"
                    blank-color="gray"
                    class="mx-4"
                  />
                </b-link>
                <span>{{ goods.brand.name_kor }}</span>
                <b-link :to="`/goods/${goods.id}`">
                  {{ goods.name.replace(/(^.{13}).+/, '$1...') }}
                </b-link>
                <p>
                  <del v-if="goods.saleprice">
                    <span class="sr-only">원가</span>
                    {{ goods.price.toLocaleString() }}원
                  </del>
                  <strong>
                    <span class="sr-only">판매가</span>
                    {{ (goods.saleprice || goods.price).toLocaleString() }}원
                  </strong>
                </p>
              </div>
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
      rankingTimer: this.setRankingTimer(),
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
      if (to === 0) {
        this.rankingTimer = this.setRankingTimer();
      } else {
        this.stopRankingTimer();
      }
    },
  },
  methods: {
    getRandomRanking() {
      const key = Object.keys(this.rankingList);
      const rand = Math.floor(Math.random() * key.length);
      this.currentRanking = key[rand];
      this.rankingTimer = this.setRankingTimer();
    },
    setRankingTimer() {
      return setTimeout(() => {
        this.getRandomRanking();
      }, 5000);
    },
    stopRankingTimer() {
      window.clearTimeout(this.rankingTimer);
    },
    switchRankingTo(to) {
      this.currentRanking = to;
    },
  },
};
</script>

<style scoped>
* >>> .badge {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}
* >>> .nav-link.active > ul {
  font-weight: initial;
}
</style>
