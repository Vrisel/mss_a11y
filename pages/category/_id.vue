<template>
  <b-row>
    <ul>
      <li v-for="item of items" :key="item.goods.name">
        <CategoryItem v-bind="item" />
      </li>
    </ul>
  </b-row>
</template>

<script>
import CategoryItem from '~/components/CategoryItem.vue';
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
