<template>
  <b-badge v-if="tag" :variant="variant" class="tag" :class="posClass">
    <slot name="default">{{ text }}</slot>
  </b-badge>
</template>

<script>
export default {
  props: {
    tag: { type: String, default: '' },
    pos: { type: [String, Number], default: 10 },
  },
  computed: {
    text() {
      switch (this.tag) {
        case 'boutique':
          return '부티크';
        case 'exclusive':
          return '무신사 단독';
        case 'income':
          return '병행 수입';
        case 'limited':
          return '한정 판매';
        case 'pre':
          return '선발매';
        default:
          return this.tag;
      }
    },
    variant() {
      switch (this.tag) {
        case 'boutique':
          return 'primary';
        case 'exclusive':
          return 'success';
        case 'income':
          return 'info';
        case 'limited':
          return 'danger';
        case 'pre':
          // choral에 가까운 색이지만 bootstrap에는 없는 색이라..
          return 'warning';
        default:
          return 'primary';
      }
    },
    posClass() {
      switch (this.pos) {
        case 0:
        case 5:
        case 15:
        case '0':
        case '5':
        case '15':
          return `pos-${this.pos}`;
        default:
          return '';
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
.tag.pos-0 {
  top: 0;
  right: 0;
}
.tag.pos-5 {
  top: 5px;
  right: 5px;
}
.tag.pos-15 {
  top: 15px;
  right: 15px;
}
</style>
