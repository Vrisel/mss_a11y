<template>
  <b-badge v-if="tag" :variant="variant" class="tag">
    <slot name="default">{{ text }}</slot>
  </b-badge>
</template>

<script>
export default {
  props: {
    tag: { type: String, default: '' },
  },
  computed: {
    text() {
      switch (this.tag) {
        case 'exclusive':
          return '무신사 단독';
        case 'income':
          return '병행 수입';
        case 'limited':
          return '한정 판매';
        default:
          return this.tag;
      }
    },
    variant() {
      switch (this.tag) {
        case 'exclusive':
          return 'success';
        case 'income':
          return 'info';
        case 'limited':
          return 'danger';
        default:
          return 'primary';
      }
    },
  },
};
</script>

<style scoped>
.tag {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
