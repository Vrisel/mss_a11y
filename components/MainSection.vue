<template>
  <section
    class="px-2 py-3 border-bottom"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <header
      class="pl-2 position-absolute d-flex side-header"
      :class="headerClass"
    >
      <h2 :id="`heading-${heading}`" class="h6">
        <slot name="heading">
          <strong>
            {{ heading }}
          </strong>
        </slot>
      </h2>
      <b-link
        v-if="to"
        :to="to"
        class="ml-auto pr-2"
        :aria-describedby="`${ariaDesc} heading-${heading}`"
      >
        더 보기
      </b-link>
    </header>
    <b-tabs
      v-model="tabIndex"
      vertical
      no-key-nav
      class="no-gutters"
      nav-wrapper-class="mt-4 pr-1 side-header"
      content-class="border-left px-3 py-2"
    >
      <slot name="default">
        <!-- <b-tab> 컴포넌트 사용 -->
      </slot>
    </b-tabs>
  </section>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    heading: {
      type: String,
      required: true,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
    headerClass: {
      type: [String, Object, Array],
      default: '',
    },
    ariaDesc: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tabIndex: 0,
    };
  },
  watch: {
    tabIndex(newVal) {
      this.$emit('input', newVal);
    },
  },
};
</script>

<style scoped>
section {
  font-size: 12px;
}
* >>> .side-header {
  width: 172px;
}
* >>> .nav-tabs {
  border: 0;
  width: 172px;
}
* >>> .nav-link {
  border: 0;
  font-size: 14px;
}
* >>> .nav-link.active {
  font-weight: bold;
}
</style>
