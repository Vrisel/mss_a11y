<template>
  <div>
    <div class="category">
      <h2>{{ category.name_eng }}</h2>
    </div>
    <b-row>
      <div v-if="!goodsList">상품이 없습니다.</div>
      <ul v-else>
        <li v-for="goods of goodsList" :key="goods.name">
          <CategoryItem v-bind="goods" />
        </li>
      </ul>
    </b-row>
  </div>
</template>

<script>
import CategoryItem from '~/components/CategoryItem.vue';
import stubGoodsList from '@/test/stub.goodslist.js';
export default {
  components: { CategoryItem },
  layout: 'default',
  asyncData({ params }) {
    const goodsList = stubGoodsList[params.id];
    return {
      goodsList,
    };
  },
  fetch({ route, store }) {
    store.dispatch('setLocation', route);
  },
  head() {
    return {
      title: this.title,
    };
  },
  computed: {
    category() {
      return this.$store.state.category;
    },
    upperCategory() {
      return this.$store.state.upperCategory;
    },
    title() {
      return [this.upperCategory.name_kor || '', this.category.name_kor]
        .filter(Boolean)
        .join(' > ');
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  font-size: 0.9rem;
}
li {
  float: left;
  position: relative;
  width: 180px;
  height: 450px;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 0.5em;
}
</style>
