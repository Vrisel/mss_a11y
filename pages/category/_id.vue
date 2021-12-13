<template>
  <b-container>
    <div class="category">
      <h2>{{ category.name_eng }}</h2>
    </div>
    <b-row no-gutters>
      <div v-if="!goodsList">
        <!-- 왜 class="d-flex justify-content-center"도, class="text-center"도 안 되지? -->
        <b-spinner v-if="loading" label="목록을 불러오는 중" />
        <span v-else>상품이 없습니다.</span>
      </div>
      <ul v-else class="w-100 d-flex flex-wrap">
        <li
          v-for="goods of goodsList"
          :key="goods.name"
          class="position-relative hover-bg-light"
        >
          <CategoryItem v-bind="goods" class="mx-auto" style="width: 125px" />
        </li>
      </ul>
    </b-row>
  </b-container>
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
  data() {
    return {
      loading: true,
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
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  font-size: 12px;
}
li {
  width: 180px;
  height: 370px;
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 18px 0;
}
li {
  width: 14.28571429%;
}
</style>
