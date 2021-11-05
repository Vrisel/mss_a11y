<template>
  <header role="banner">
    <div v-if="topBanner">
      <a href="#">
        <b-img
          blank
          blank-color="grey"
          width="1580px"
          height="100px"
          alt="top banner"
        />
      </a>
      <b-button
        type="button"
        squared
        size="sm"
        variant="dark"
        class="topbanner-close"
        @click="closeTopBanner"
      >
        <b-icon icon="x" />
        <span class="sr-only">배너 닫기</span>
      </b-button>
    </div>

    <TheHeaderNavbar class="bg-primary py-2" />

    <b-row align-h="start" class="px-3 py-3 bg-light">
      <b-col cols="auto"><b-link>스탠다드</b-link></b-col>
      <b-col cols="auto"><b-link>테라스샵</b-link></b-col>
      <b-col cols="auto"><b-link>셀렉트</b-link></b-col>
    </b-row>

    <b-row class="px-3 py-3">
      <TheHeaderLogin />
      <b-col cols="auto"><b-link>마이페이지</b-link></b-col>
      <b-col cols="auto">
        <b-link>장바구니<b-badge pill variant="primary">0</b-badge></b-link>
      </b-col>
    </b-row>
  </header>
</template>

<script>
import TheHeaderNavbar from '@/components/layouts/TheHeaderNavbar.vue';
import TheHeaderLogin from '@/components/layouts/TheHeaderLogin.vue';
export default {
  components: { TheHeaderNavbar, TheHeaderLogin },
  data() {
    return {
      topBanner: true,
    };
  },
  methods: {
    closeTopBanner() {
      this.topBanner = false;
    },
  },
};
</script>

<style scoped>
.topbanner-close {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
