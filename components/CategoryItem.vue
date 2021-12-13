<template>
  <div :aria-labelledby="id">
    <p class="text-center">
      <b-link :to="`/goods/${id}`" class="w-100 text-center">
        <figure class="d-inline-block mx-auto">
          <b-img-lazy src="https://via.placeholder.com/125x150" :alt="name" />
        </figure>
      </b-link>
    </p>
    <header :id="id">
      <p class="mb-0">
        <b-link :to="`/brand/${brand.id}`" class="brand d-block">
          <strong>{{ brand.name_kor }}</strong>
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
    <b-dropdown
      :ref="`dd-${id}`"
      size="sm"
      variant="outline-secondary"
      block
      style="font-size: 10px"
    >
      <template #button-content>
        <span style="font-size: 1em">MEMBERSHIP PRICE</span>
      </template>
      <b-dropdown-text class="font-12">
        <span class="float-left">무신사 회원가</span>
        <span class="float-right">
          <b-button-close class="font-12" @click="$refs[`dd-${id}`].hide(true)">
            <template #default>
              <b-icon icon="x" font-scale="1.5" />
              <span class="sr-only">닫기</span>
            </template>
          </b-button-close>
        </span>
      </b-dropdown-text>
      <b-dropdown-divider class="mb-2" />
      <b-dropdown-text
        v-for="(percent, level) in levels"
        :key="level"
        class="font-12"
      >
        <span class="float-left">{{ level }}</span>
        <strong class="float-right">
          {{ `${(price * percent).toLocaleString()}원` }}
        </strong>
      </b-dropdown-text>
    </b-dropdown>
    <p class="text-warning align-middle" style="font-size: 11px">
      <b-rating
        size="sm"
        inline
        no-border
        readonly
        :value="rating.avg"
        variant="warning"
      />
      <span>
        {{ rating.count.toLocaleString() }}
      </span>
    </p>
    <p class="text-danger">
      <b-iconstack aria-hidden="true">
        <b-icon stacked icon="circle-fill" variant="danger" />
        <b-icon stacked icon="heart-fill" variant="white" scale="0.7" />
      </b-iconstack>
      <strong>{{ favs.toLocaleString() }}</strong>
    </p>
    <div class="men-women px-2">
      <span v-if="forMen" title="남성">M</span>
      <span v-if="forWomen" title="여성">W</span>
    </div>
    <b-dropdown class="sizeOption" size="sm" variant="outline-secondary">
      <template #button-content>
        <strong>OPTION</strong>
      </template>
      <b-dropdown-text>
        <ul class="d-flex flex-column" style="font-size: 11px">
          <li v-for="size of ['S', 'M', 'L', 'XL']" :key="size">
            <span class="float-left">{{ size }}</span>
            <b-icon
              v-if="Math.random() < 0.7"
              icon="circle"
              class="float-right"
            />
            <b-icon v-else icon="x" scale="1.6" class="float-right" />
          </li>
        </ul>
      </b-dropdown-text>
    </b-dropdown>
  </div>
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
  bottom: 0;
  left: 0;
}
.sizeOption {
  position: absolute;
  bottom: -1px;
  right: -1px;
}
output.form-control {
  padding: 0;
  background-color: transparent;
}
.b-dropdown-text {
  padding: 0 1.5em;
}
.dropdown-divider {
  padding: 0;
}
.b-dropdown >>> button.btn {
  border-radius: 0;
  font-size: 10px;
  padding: 3px;
  margin-top: 3px;
}
.b-rating >>> .b-rating-star {
  padding: 0;
}
</style>
