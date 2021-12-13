<template>
  <b-tabs v-model="tabIndex" justified class="my-3" aria-label="">
    <b-tab title-link-class="px-0">
      <template #title>
        <h3>랭킹</h3>
      </template>
      <TheAsideSubtabs to="" class="card">
        <b-tab title="상품">
          <b-tabs v-model="subtabIndeces[0]" no-nav-style no-key-nav>
            <b-tab
              v-for="c of [
                '전체',
                '상의',
                '아우터',
                '하의',
                '가방',
                '신발',
                '기타',
              ]"
              :key="c"
              :title="c"
              no-body
            >
              <ul class="d-flex flex-wrap justify-content-between">
                <li
                  v-for="rank of 6"
                  :key="`${c}-${rank}`"
                  class="position-relative hover-bg-light"
                  style="width: 70px; padding: 2px"
                >
                  <strong class="position-absolute px-1 bg-white">
                    {{ rank }}
                  </strong>
                  <figure>
                    <img
                      src="https://via.placeholder.com/70x85"
                      :alt="`${c} ${rank}위 상품`"
                    />
                  </figure>
                  <p>
                    <span class="text-truncate">
                      {{ '브랜드명' }}
                    </span>
                    <RankIcon :change="randomList[rank - 1]" without-number />
                  </p>
                  <b-link class="stretched-link d-block text-truncate">{{
                    '상품명상품명상품명상품명'
                  }}</b-link>
                  <p>
                    <strong> {{ `${(99000).toLocaleString()}원` }}</strong>
                  </p>
                </li>
              </ul>
            </b-tab>
          </b-tabs>
        </b-tab>
        <b-tab title="브랜드">
          <ul class="d-flex flex-wrap justify-content-between">
            <li
              v-for="rank of 9"
              :key="`brand-${rank}`"
              class="position-relative hover-bg-light"
            >
              <strong class="position-absolute px-1 bg-white">
                {{ rank }}
              </strong>
              <figure
                class="d-block"
                style="width: 70px; height: 70px; padding: 7.5px"
              >
                <img
                  src="https://via.placeholder.com/55x20"
                  :alt="`${rank}위 브랜드`"
                  class="vertical-middle w-100"
                />
              </figure>
              <p>
                <b-link class="stretched-link text-truncate">
                  {{ '브랜드명' }}
                </b-link>
                <RankIcon :change="randomList[rank - 1]" without-number />
              </p>
            </li>
          </ul>
        </b-tab>
      </TheAsideSubtabs>
    </b-tab>
    <b-tab
      v-for="p of ['업데이트', '세일', '단독']"
      :key="p"
      title-link-class="px-0"
    >
      <template #title>
        <h3>{{ p }}</h3>
      </template>
      <div>준비 중입니다.</div>
    </b-tab>
  </b-tabs>
</template>

<script>
import RankIcon from '../RankIcon.vue';
import TheAsideSubtabs from './TheAsideSubtabs.vue';
export default {
  components: { TheAsideSubtabs, RankIcon },
  data() {
    return {
      tabIndex: 0,
      subtabIndeces: [0, 0, 0, 0],
      randomList: [], // 추후 제거
    };
  },
  watch: {
    tabIndex() {
      this.setRandomNumbers();
    },
    subtabIndeces() {
      this.setRandomNumbers();
    },
  },
  mounted() {
    this.setRandomNumbers(); // 추후 제거
  },
  methods: {
    getRandomNumber() {
      // 추후 제거
      return Math.round(Math.random() * 2) - 1;
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
      ];
    },
  },
};
</script>

<style></style>
