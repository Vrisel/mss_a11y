<template>
  <article>
    <p class="text-center">
      <b-link :to="`/goods/${id}`">
        <b-img
          :src="imgsrc"
          blank
          blank-color="secondary"
          width="125px"
          height="150px"
        />
      </b-link>
    </p>
    <header>
      <p class="mb-0">
        <b-link :to="`/brand/${brand.id}`" class="brand d-block">
          {{ brand.name_kor }}
        </b-link>
        <b-link :to="`/goods/${id}`" class="text-truncate-2">
          {{ name }}
        </b-link>
      </p>
    </header>
    <p class="price">
      <del v-if="sale > 0">
        <span class="sr-only">원가</span>
        {{ price.toLocaleString() }}원
      </del>
      <strong>
        <span class="sr-only">판매가</span>
        {{ sale > 0 ? saleprice.toLocaleString() : price.toLocaleString() }}원
      </strong>
    </p>
    <b-badge v-if="sale" class="sale" variant="danger">
      SALE {{ sale }}%
    </b-badge>
    <b-badge v-if="badge.text" class="tag" :variant="badge.variant">
      {{ badge.text }}
    </b-badge>
    <b-dropdown size="sm" variant="outline-secondary">
      <template #button-content>MEMBERSHIP PRICE</template>
      <b-dropdown-text>
        <span class="float-left">무신사 회원가</span>
        <span class="float-right">
          <b-button type="button" variant="outline-secondary">
            <b-icon icon="x" />
          </b-button>
        </span>
      </b-dropdown-text>
      <b-dropdown-divider />
      <b-dropdown-text v-for="(percent, level) in levels" :key="level">
        <span class="float-left">{{ level }}</span>
        <span class="float-right">
          {{ `${(price * percent).toLocaleString()}원` }}
        </span>
      </b-dropdown-text>
    </b-dropdown>
    <p>
      <b-rating
        size="sm"
        inline
        :value="rating.avg"
        readonly
        variant="warning"
      />
      <span class="text-warning">
        {{ rating.count.toLocaleString() }}
      </span>
    </p>
    <p>
      <b-iconstack>
        <b-icon stacked icon="circle-fill" variant="danger" />
        <b-icon stacked icon="heart-fill" variant="white" scale="0.7" />
      </b-iconstack>
      {{ favs.toLocaleString() }}
    </p>
    <div class="men-women">
      <span v-if="forMen" title="남성">M</span>
      <span v-if="forWomen" title="여성">W</span>
    </div>
    <b-dropdown class="sizeOption" size="sm">
      <template #button-content>OPTION</template>
      <b-dropdown-text></b-dropdown-text>
    </b-dropdown>
  </article>
</template>

<script>
export default {
  props: {
    id: { type: String, default: '' },
    name: { type: String, default: '' },
    price: { type: Number, default: 0 },
    saleprice: { type: Number, default: 0 },
    badge: {
      type: Object,
      default() {
        return { text: '', variant: '' };
      },
    },
    imgsrc: { type: String, default: '' },
    brand: {
      type: Object,
      default() {
        return { name: '', id: '' };
      },
    },
    rating: {
      type: Object,
      default() {
        return { avg: 0, count: 0 };
      },
    },
    favs: { type: Number, default: 0 },
    forMen: { type: Boolean, default: false },
    forWomen: { type: Boolean, default: false },
  },
  data() {
    return {
      levels: {
        비회원: 1,
        뉴비: 0.94,
        루키: 0.94,
        멤버: 0.93,
        브론즈: 0.93,
        실버: 0.92,
        골드: 0.92,
        플래티넘: 0.91,
        다이아몬드: 0.91,
      },
    };
  },
  computed: {
    sale() {
      return this.saleprice
        ? Math.round((1 - this.saleprice / this.price) * 100)
        : 0;
    },
  },
};
</script>

<style scoped>
.sale {
  position: absolute;
  top: 0;
  left: 0;
}
.tag {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
}
.men-women {
  position: absolute;
  bottom: 0.5em;
  left: 0.5em;
}
.sizeOption {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
