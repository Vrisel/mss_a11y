<template>
  <b-card no-body>
    <b-card-header v-b-toggle="english" header-tag="header" role="tab">
      <strong>{{ title }}</strong>
      <sup>{{ english }}</sup>
    </b-card-header>
    <b-collapse :id="english" accordion="category" visible role="tabpanel">
      <b-card-body>
        <b-link v-if="!isBest">
          전체
          <span class="total">({{ total.toLocaleString() }})</span>
        </b-link>
        <b-row>
          <b-col cols="6">
            <b-link
              v-for="item of left"
              :key="item.name"
              :to="`/category/${item.category}`"
            >
              {{ item.name }}
              <span class="count">({{ item.count.toLocaleString() }})</span>
            </b-link>
          </b-col>
          <b-col cols="6" data-test="right">
            <b-link
              v-for="item of right"
              :key="item.name"
              :to="`/category/${item.category}`"
            >
              {{ item.name }}
              <span class="count">({{ item.count.toLocaleString() }})</span>
            </b-link>
          </b-col>
        </b-row>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  props: {
    title: String,
    english: String,
    items: {
      type: Array,
      default() {
        return [
          /* { name: '후드 집업', category: '002022', count: 2567 },
            { name: '데님 팬츠', category: '003002', count: 6217 }, */
        ];
      },
    },
  },
  computed: {
    isBest() {
      return this.title === '인기' || this.english === 'Best';
    },
    total() {
      if (this.isBest) {
        return 0;
      } else {
        let sum = 0;
        for (const item of this.items) {
          sum += item.count;
        }
        return sum;
      }
    },
    left() {
      const length = this.items.length;
      return this.items.slice(0, length / 2);
    },
    right() {
      const length = this.items.length;
      return this.items.slice(length / 2);
    },
  },
};
</script>

<style></style>
