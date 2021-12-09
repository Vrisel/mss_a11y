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
        <ul class="d-flex flex-wrap">
          <!-- <ul v-if="ranking.length" class="d-flex flex-wrap">
          <li
            v-for="(goods, rank) in ranking"
            :key="goods.id"
            class="hover-bg-light"
          > -->
          <li v-for="rank of 10" :key="`goods-${rank}`" class="hover-bg-light">
            <div class="position-relative ranking-item">
              <small class="position-absolute bg-white px-1 py-1">
                <strong>{{ rank }}위</strong>
              </small>
              <template v-if="Math.random() < 0.4">
                <b-badge
                  v-if="Math.random() < 0.4"
                  variant="success"
                  class="item-badge px-2 py-1"
                >
                  {{ '무신사 단독' }}
                </b-badge>
                <b-badge
                  v-else-if="Math.random() < 0.3"
                  variant="primary"
                  class="item-badge px-2 py-1"
                >
                  {{ '부티크' }}
                </b-badge>
                <b-badge
                  v-else-if="Math.random() < 0.1"
                  variant="danger"
                  class="item-badge px-2 py-1"
                >
                  {{ '한정 판매' }}
                </b-badge>
              </template>
              <b-link :to="`/goods/${'1111111'}`">
                <figure class="px-4 pt-4">
                  <b-img
                    src="https://via.placeholder.com/146x175"
                    :alt="'랭킹 상품'"
                  />
                </figure>
              </b-link>
              <b-badge
                v-if="Math.random() < 0.3"
                variant="primary"
                class="coupon"
              >
                쿠폰
              </b-badge>
              <p class="mx-2 mt-2">
                <b-link :to="`/brand/${'samplebrand'}`">
                  {{ `랭킹 ${rank}위 브랜드` }}
                </b-link>
                <br />
                <b-link :to="`/goods/${'1111111'}`">
                  {{
                    `랭킹 ${rank}위 상품명`.replace(/(^.{10}).{4,}/, '$1...')
                  }}
                </b-link>
              </p>
              <p class="mx-2 mt-2">
                <!-- <del v-if="goods.saleprice" class="text-secondary">
                  <span class="sr-only">원가</span>
                  {{ goods.price.toLocaleString() }}원
                </del> -->
                <strong>
                  <span class="sr-only">판매가</span>
                  {{ Math.floor(Math.random() * 1500000).toLocaleString() }}원
                </strong>
              </p>
            </div>
          </li>
        </ul>
        <!-- <div v-else>상품이 없습니다.</div> -->
      </b-tab>
      <b-tab title="브랜드">
        <ul class="d-flex flex-wrap">
          <li v-for="rank of 10" :key="`brand-${rank}`" class="hover-bg-light">
            <div class="position-relative ranking-brand">
              <p class="d-inline-block bg-white px-3 py-1">
                <strong>{{ rank }}위</strong>
                <span v-if="Math.random() < 0.25" class="text-danger">
                  <b-icon
                    icon="triangle-fill"
                    scale="0.8"
                    aria-hidden="true"
                    title="랭크 상승"
                  />
                  {{ Math.ceil(Math.random() * 5) }}
                </span>
                <span v-else-if="Math.random() < 1 / 3" class="text-primary">
                  <b-icon
                    icon="triangle-fill"
                    flip-v
                    scale="0.8"
                    aria-hidden="true"
                    title="랭크 하락"
                  />
                  {{ Math.ceil(Math.random() * 5) }}
                </span>
                <span v-else class="secondary">
                  <b-icon
                    icon="dash"
                    scale="1.2"
                    aria-hidden="true"
                    title="랭크 유지"
                  />
                </span>
              </p>
              <b-link
                to=""
                class="d-block text-center align-middle"
                style="width: 90px; height: 90px; margin: 36px auto"
                :title="`랭킹 ${rank}위 브랜드`"
              >
                <figure class="vertical-middle">
                  <img
                    src="https://via.placeholder.com/90x40"
                    :alt="`랭킹 ${rank}위 브랜드`"
                  />
                </figure>
              </b-link>
            </div>
          </li>
        </ul>
      </b-tab>
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
      if (this.rankingTabIndex === 0) {
        this.stopRankingTimer();
        this.rankingTimer = setTimeout(() => {
          this.getRandomRanking();
        }, 5000);
      }
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
.ranking-item {
  width: 200px;
  height: 287px;
  box-sizing: border-box;
}
.ranking-brand {
  width: 200px;
  height: 221px;
  padding: 15px;
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
