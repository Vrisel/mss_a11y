<template>
  <div>
    <MainSection heading="랭킹" to="" header-class="pl-5">
      <b-tab>
        <template #title>
          <h3>상품</h3>
          <ul v-if="ranking">
            <li v-for="(cat, name) in ranking" :key="name">
              <b-link>{{ name }}</b-link>
            </li>
          </ul>
        </template>
        <ul class="d-flex flex-wrap">
          <li v-for="(goods, rank) in ranking.상의" :key="goods.id">
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
                  <s v-if="goods.saleprice">
                    {{ goods.price.toLocaleString() }}원
                  </s>
                  <strong>
                    {{ (goods.saleprice || goods.price).toLocaleString() }}원
                  </strong>
                </p>
              </div>
            </article>
          </li>
        </ul>
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
  fetch({ route, store }) {
    store.dispatch('setLocation', route);
  },
  head() {
    return {
      title: '',
    };
  },
  computed: {
    ranking() {
      return rankingList;
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
</style>
