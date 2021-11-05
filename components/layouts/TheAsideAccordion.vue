<template>
  <b-card no-body>
    <b-card-header v-b-toggle="id" header-tag="header" role="tab">
      <strong>{{ name_kor }}</strong>
      <sup>{{ name_eng }}</sup>
    </b-card-header>
    <b-collapse
      :id="id"
      accordion="category"
      :visible="visible == id"
      role="tabpanel"
    >
      <b-card-body>
        <b-link v-if="!isBest" :to="`/category/${id}`">
          전체
          <span class="count">({{ count.toLocaleString() }})</span>
        </b-link>
        <ul class="two-columns-list">
          <li v-for="item of sub" :key="item.id">
            <b-link :to="`/category/${item.id}`">
              {{ item.name_kor }}
              <span class="count">({{ item.count.toLocaleString() }})</span>
            </b-link>
          </li>
        </ul>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  props: {
    id: { type: String, default: '' },
    name_kor: { type: String, default: '' },
    name_eng: { type: String, default: '' },
    count: { type: Number, default: 0 },
    sub: {
      type: Object,
      default() {
        return {
          // '002022': { id: '002022', name_kor: '후드 집업', count: 2567, upper: '002', },
        };
      },
    },
    visible: { type: String, default: 'best' },
  },
  computed: {
    isBest() {
      return (
        this.name_kor === '인기' ||
        this.name_eng === 'Best' ||
        this.id === 'best'
      );
    },
  },
};
</script>

<style scoped>
.card-header {
  cursor: pointer;
}
.two-columns-list {
  columns: 2;
}
</style>
