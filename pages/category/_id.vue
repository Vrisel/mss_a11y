<template>
  <div>
    <div class="category">
      <h2>{{ name_kor }}</h2>
    </div>
    <b-row>
      <ul>
        <li v-for="item of items" :key="item.goods.name">
          <CategoryItem v-bind="item" />
        </li>
      </ul>
    </b-row>
  </div>
</template>

<script>
import CategoryItem from '~/components/CategoryItem.vue';
import stubCategories from '@/test/stub.category.js';
import stubItems from '@/test/stub.items.js';
export default {
  components: { CategoryItem },
  layout: 'default',
  data() {
    return {
      // stubItems,
    };
  },
  computed: {
    category() {
      return stubCategories[this.$route.params.id];
    },
    items() {
      return stubItems[this.$route.params.id];
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
