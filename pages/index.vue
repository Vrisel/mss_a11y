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
          <ul
            v-show="rankingList && rankingTabIndex === 0"
            style="columns: 2"
            class="px-2 pt-1"
          >
            <li v-for="(cat, name) in rankingList" :key="name" class="pt-1">
              <b-link
                :id="name"
                class="nav-link px-0 py-0"
                :class="{ active: currentRanking === name }"
                style="font-size: 12px"
                @click="switchRankingTo(name)"
              >
                {{ name }}
              </b-link>
            </li>
          </ul>
        </template>
        <ul class="d-flex flex-wrap">
          <li v-for="rank of 10" :key="`goods-${rank}`" class="hover-bg-light">
            <div class="position-relative ranking-item">
              <strong class="position-absolute bg-white p-1">
                {{ rank }}위
              </strong>
              <ListTag
                :tag="
                  [
                    'boutique',
                    'exclusive',
                    'income',
                    'limited',
                    'pre',
                    '',
                    '',
                    '',
                    '',
                    '',
                    '',
                  ][randomList[rank - 1] + 5]
                "
                pos="15"
              />
              <b-link :to="`/goods/${'1111111'}`">
                <figure class="px-4 pt-4">
                  <b-img
                    src="https://via.placeholder.com/146x175"
                    :alt="'랭킹 상품'"
                  />
                </figure>
              </b-link>
              <b-badge
                v-if="randomList[rank - 1] >= 3"
                variant="primary"
                class="coupon"
              >
                쿠폰
              </b-badge>
              <p class="mx-2 mt-2">
                <b-link
                  :to="`/brand/${'samplebrand'}`"
                  class="d-block text-truncate"
                >
                  {{ `랭킹 ${rank}위 브랜드` }}
                </b-link>
                <b-link
                  :to="`/goods/${'1111111'}`"
                  class="d-block text-truncate"
                >
                  {{ `랭킹 ${rank}위 상품명상품명상품명상품명` }}
                </b-link>
              </p>
              <p class="mx-2 mt-2">
                <del v-if="false" class="text-secondary">
                  <span class="sr-only">원가</span>
                  {{ (0).toLocaleString() }}원
                </del>
                <strong>
                  <span class="sr-only">판매가</span>
                  {{ Math.floor(Math.random() * 1500000).toLocaleString() }}원
                </strong>
              </p>
            </div>
          </li>
        </ul>
      </b-tab>
      <b-tab title="브랜드">
        <ul class="d-flex flex-wrap">
          <li v-for="rank of 10" :key="`brand-${rank}`" class="hover-bg-light">
            <div class="position-relative ranking-brand">
              <p class="d-inline-block bg-white px-3 py-1">
                <strong>{{ rank }}위</strong>
                <RankIcon :change="randomList[rank - 1]" />
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
      <b-tab
        v-for="tab of ['브랜드 스냅', '코디숍', '코디맵']"
        :key="tab"
        :title="tab"
      >
        <ul class="d-flex flex-wrap overflow-hidden">
          <li
            v-for="i of 4"
            :key="`snap-${i}`"
            class="hover-bg-light"
            style="width: 200px; height: 375px; padding: 15px"
          >
            <b-link>
              <figure class="snap-img">
                <img
                  src="https://via.placeholder.com/170x255"
                  :alt="`스냅 이미지`"
                />
              </figure>
            </b-link>
            <ul class="d-flex flex-column" style="margin-top: 15px">
              <li class="d-flex position-relative" style="height: 76px">
                <figure>
                  <img
                    src="https://via.placeholder.com/50x60"
                    :alt="`스냅 아이템 이미지`"
                  />
                </figure>
                <div style="margin-left: 17px; width: 103px">
                  <p class="text-truncate">
                    <strong>브랜드</strong>
                    <br />
                    <b-link class="stretched-link">
                      상품명상품명상품명상품명
                    </b-link>
                  </p>
                  <p style="margin-top: 7px">
                    <template v-if="true">
                      <del class="text-secondary">
                        <span class="sr-only">원가</span>
                        {{ (23000).toLocaleString() }}원
                      </del>
                      <br />
                    </template>
                    <strong>
                      <span class="sr-only">판매가</span>
                      {{ (19000).toLocaleString() }}원
                    </strong>
                  </p>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </b-tab>
    </MainSection>
  </div>
</template>

<script>
import MainSection from '~/components/MainSection.vue';
import ListTag from '~/components/ListTag.vue';
import RankIcon from '~/components/RankIcon.vue';
import LayoutDefault from '~/mixins/LayoutDefault.js';
import rankingList from '@/test/stub.rankinglist.js';
export default {
  components: {
    MainSection,
    ListTag,
    RankIcon,
  },
  mixins: [LayoutDefault],
  data() {
    return {
      rankingTabIndex: 0,
      rankingTimer: 0,
      currentRanking: '상의',
      randomList: [], // 추후 제거
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
      this.setRandomNumbers(); // 추후 제거
      this.stopRankingTimer();
      if (to === 0) {
        this.setRankingTimer();
      }
    },
    currentRanking() {
      // 추후 제거
      this.setRandomNumbers();
    },
  },
  mounted() {
    this.setRandomNumbers(); // 추후 제거
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
    getRandomNumber() {
      // 추후 제거
      return Math.round(Math.random() * 10) - 5;
    },
    setRandomNumbers() {
      // 추후 제거
      this.randomList = [
        this.getRandomNumber(),
        this.getRandomNumber(),
        this.getRandomNumber(),
        this.getRandomNumber(),
        this.getRandomNumber(),
        this.getRandomNumber(),
        this.getRandomNumber(),
        this.getRandomNumber(),
        this.getRandomNumber(),
        this.getRandomNumber(),
      ];
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
