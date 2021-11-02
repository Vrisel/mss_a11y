<template>
  <div>
    <div class="category">
      <h2>{{ category.name_eng }}</h2>
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
  asyncData({ params }) {
    const categoryId = params.id;
    const upperId = categoryId.slice(0, 3);
    const category =
      stubCategories[upperId].sub[categoryId] || stubCategories[upperId];
    return {
      category,
      items: stubItems[params.id],
      title: [
        stubCategories[upperId].name_kor,
        categoryId.length > 3 ? category.name_kor : '',
      ]
        .filter(Boolean)
        .join(' > '),
    };
  },
  head() {
    return {
      title: this.title,
    };
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
