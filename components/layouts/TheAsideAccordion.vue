<template>
  <b-card no-body :aria-labelledby="`accordion-${id}`">
    <b-card-header
      :id="`accordion-${id}`"
      v-b-toggle="id"
      header-tag="h4"
      role="region"
      @keydown.space.prevent="$emit('click', $event)"
    >
      <strong>{{ name_kor }}</strong>
      <sup lang="en">{{ name_eng }}</sup>
      <!-- <b-icon
        :icon="!visibleModel ? 'plus' : 'dash'"
        :aria-label="!visibleModel ? '펼치기' : '접기'"
        class="float-right"
      /> -->
    </b-card-header>
    <b-collapse :id="id" accordion="category">
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
    visible: { type: String, default: '' },
  },
  /* data() {
    return {
      visibleModel: false,
    };
  }, */
  computed: {
    isBest() {
      return (
        this.name_kor === '인기' ||
        this.name_eng === 'Best' ||
        this.id === 'best'
      );
    },
  },
  /* mounted() {
    this.visibleModel = this.visible === this.id;
  }, */
  /* methods: {
    toggleVisible() {
      this.visibleModel = !this.visibleModel;
    },
  }, */
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
