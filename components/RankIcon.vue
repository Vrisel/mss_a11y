<template>
  <span :class="color" :title="title">
    <b-icon :icon="icon" :flip-v="flipV" :scale="scale" aria-hidden="true" />{{
      text
    }}
  </span>
</template>

<script>
export default {
  props: {
    change: {
      type: Number,
      default: 0,
    },
    withoutNumber: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    color() {
      if (this.change > 0) {
        return 'text-danger'; // red
      } else if (this.change < 0) {
        return 'text-primary'; // blue
      } else {
        return 'text-secondary'; // gray
      }
    },
    title() {
      if (this.change > 0) {
        return '랭크 상승';
      } else if (this.change < 0) {
        return '랭크 하락';
      } else {
        return '랭크 유지';
      }
    },
    icon() {
      return this.change ? 'triangle-fill' : 'dash';
    },
    flipV() {
      return this.change < 0;
    },
    scale() {
      return this.change ? 0.7 : 1.2;
    },
    text() {
      return !this.withoutNumber && this.change ? Math.abs(this.change) : '';
    },
  },
};
</script>
