<template>
  <b-tabs justified class="my-3" aria-label="">
    <b-tab title-link-class="px-0">
      <template #title>
        <h3>랭킹</h3>
      </template>
      <TheAsideSubtabs to="" class="card">
        <b-tab title="상품">
          <b-tabs no-nav-style no-key-nav>
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
                  v-for="i of 6"
                  :key="`${c}-${i}`"
                  class="position-relative hover-bg-light"
                >
                  <strong class="position-absolute px-1 bg-white">
                    {{ i }}
                  </strong>
                  <figure>
                    <img
                      src="https://via.placeholder.com/70x85"
                      :alt="`${c} ${i}위 상품`"
                    />
                  </figure>
                  <p>
                    <span class="text-truncate">
                      {{ '브랜드명' }}
                    </span>
                    <RankIcon
                      :change="
                        Math.random() > 0.3
                          ? Math.round((Math.random() - 0.5) * 10)
                          : 0
                      "
                      without-number
                    />
                  </p>
                  <b-link class="stretched-link">{{ '상품명' }}</b-link>
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
              v-for="i of 9"
              :key="`brand-${i}`"
              class="position-relative hover-bg-light"
            >
              <strong class="position-absolute px-1 bg-white">
                {{ i }}
              </strong>
              <figure
                class="d-block"
                style="width: 70px; height: 70px; padding: 7.5px"
              >
                <img
                  src="https://via.placeholder.com/55x20"
                  :alt="`${i}위 브랜드`"
                  class="vertical-middle w-100"
                />
              </figure>
              <p>
                <b-link class="stretched-link text-truncate">
                  {{ '브랜드명' }}
                </b-link>
                <RankIcon
                  :change="
                    Math.random() > 0.3
                      ? Math.round((Math.random() - 0.5) * 10)
                      : 0
                  "
                  without-number
                />
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
};
</script>

<style></style>
