<template>
  <div class="border-bottom border-right clearfix">
    <header
      class="float-left"
      style="width: 109px; padding-top: 20px; padding-left: 15px"
    >
      <slot name="title">
        <h3>{{ title }}</h3>
      </slot>
    </header>
    <div style="margin-left: 122px; padding-top: 19px">
      <slot name="default">
        <ul>
          <li
            v-if="linkForAll"
            class="float-left"
            :class="allClass"
            :style="{ height: 33 * Math.ceil(option.length / 5) + 'px' }"
            style="width: 116px; padding-right: 16px; padding-bottom: 15px"
          >
            <b-link>전체</b-link>
          </li>
          <li
            v-for="(item, index) of option"
            :key="title + index"
            class="float-left"
            :class="optionClass"
          >
            <b-link>
              <span class="text-truncate">{{ item.name_kor }}</span>
              <span v-if="item.count">
                ({{ item.count.toLocaleString() }})
              </span>
              <b-badge v-if="item.isExclusive" variant="success">단독</b-badge>
              <sup v-if="item.isSale" class="text-warning">SALE</sup>
              <sup v-if="item.isNew" class="text-danger">NEW</sup>
            </b-link>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      // required: true,
    },
    linkForAll: {
      type: [Boolean],
      default: false,
    },
    allClass: {
      type: [String, Array, Object],
      default: '',
    },
    option: {
      type: Array,
      default() {
        // ex: { name_kor: 브랜드명, count: 상품수, isExclusive: 단독, isSale: 할인, isNew: 신상, }
        return [];
      },
    },
    optionClass: {
      type: [String, Array, Object],
      default: '',
    },
  },
};
</script>

<style></style>
