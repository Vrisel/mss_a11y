<template>
  <aside>
    <b-button v-b-toggle:sidebar type="button">
      <span class="navbar-toggler-icon"></span>
    </b-button>
    <b-collapse id="sidebar" visible>
      <b-tabs justified>
        <b-tab title="품목">
          <div class="accordion" role="tablist">
            <TheAsideAccordion
              v-for="category in categories"
              :key="category.english"
              v-bind="category"
            />
          </div>
        </b-tab>

        <b-tab title="브랜드"></b-tab>
      </b-tabs>
    </b-collapse>
  </aside>
</template>

<script>
import TheAsideAccordion from './TheAsideAccordion.vue';
export default {
  components: { TheAsideAccordion },
  data() {
    return {
      categories: [
        {
          title: '인기',
          english: 'Best',
          items: [
            { name: '후드 집업', category: '002022', count: 2567 },
            { name: '데님 팬츠', category: '003002', count: 6217 },
            { name: '캔버스/단화', category: '018002', count: 4587 },
          ],
        },
        {
          title: '상의',
          english: 'Top',
          items: [
            { name: '반팔 티셔츠', category: '001001', count: 39377 },
            { name: '긴팔 티셔츠', category: '001010', count: 9246 },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
aside {
  width: 270px;
  float: left;
}
* {
  font-size: 0.8rem;
}
</style>
