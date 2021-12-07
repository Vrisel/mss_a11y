<template>
  <b-tabs no-nav-style no-key-nav class="p-2" nav-wrapper-class="my-1">
    <template #tabs-end>
      <b-link :to="to" class="ml-auto nav-link">더 보기</b-link>
      <b-button-group>
        <b-button type="button" variant="outline-secondary" title="이전 페이지">
          <b-icon icon="chevron-left" aria-hidden="true" />
        </b-button>
        <b-button type="button" variant="outline-secondary" title="다음 페이지">
          <b-icon icon="chevron-right" aria-hidden="true" />
        </b-button>
      </b-button-group>
    </template>
    <hr class="my-2" />
    <slot name="default"></slot>
  </b-tabs>
</template>

<script>
export default {
  props: {
    to: { type: String, default: '' },
  },
  data() {
    return {
      currentPage: 0,
    };
  },
};
</script>

<style scoped>
.btn {
  font-size: 0.8em;
  padding: 0 0.5em;
}
* >>> .nav-link {
  padding: 0 0.5em 0 0;
}
* >>> .nav-link:hover {
  text-decoration: underline;
}
* >>> .nav-link.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
