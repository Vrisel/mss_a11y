<template>
  <section class="px-2 py-3 border-bottom">
    <header
      class="pl-2 position-absolute d-flex side-header"
      :class="headerClass"
    >
      <h2 id="ranking">
        <slot name="heading">
          <strong>
            {{ heading }}
          </strong>
        </slot>
      </h2>
      <b-link v-if="to" :to="to" class="ml-auto mr-1">
        <small>더 보기</small>
      </b-link>
    </header>
    <b-tabs
      v-model="tabIndex"
      vertical
      no-key-nav
      nav-wrapper-class="mt-4 side-header"
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
* >>> .side-header {
  width: 172px;
}
* >>> .nav-tabs {
  border: 0;
}
* >>> .nav-link {
  border: 0;
  font-size: 0.9em;
}
* >>> .nav-link.active {
  font-weight: bold;
}
</style>
