<template>
  <header role="banner">
    <div v-if="topBanner" aria-label="top banner">
      <b-link to="">
        <b-img
          blank
          blank-color="grey"
          width="1580px"
          height="100px"
          alt="빈 배너"
        />
        <!-- 위 alt에 배너 내용을 넣어야 함 -->
      </b-link>
      <b-button
        type="button"
        squared
        size="sm"
        variant="dark"
        class="topbanner-close"
        aria-label="배너 닫기"
        @click="closeTopBanner"
      >
        <b-icon icon="x" aria-hidden="true" />
        <!-- <span class="sr-only">배너 닫기</span> -->
      </b-button>
    </div>

    <TheHeaderNavbar aria-label="메인" class="bg-primary py-2" />

    <nav role="navigation" aria-label="채널">
      <b-nav class="py-2 bg-light">
        <b-nav-item to="">스탠다드</b-nav-item>
        <b-nav-item to="">테라스샵</b-nav-item>
        <b-nav-item to="">셀렉트</b-nav-item>
      </b-nav>
    </nav>

    <nav role="navigation" aria-label="마이 링크">
      <b-nav class="py-2">
        <b-nav-item
          v-if="!logged"
          link-classes="btn btn-sm btn-outline-secondary rounded-0 mx-3 py-1 my-1"
        >
          로그인
        </b-nav-item>
        <b-nav-item v-else to="">
          <strong>Lv.{{ level }} {{ name }}</strong>
        </b-nav-item>
        <template v-if="logged">
          <b-nav-item>마이페이지</b-nav-item>
          <b-nav-item class="text-danger">좋아요</b-nav-item>
        </template>
        <b-nav-item>최근 본 상품</b-nav-item>
        <b-nav-item>
          장바구니
          <b-badge pill variant="primary">0</b-badge>
        </b-nav-item>
        <b-nav-item>고객센터</b-nav-item>
        <template v-if="logged">
          <b-nav-item>로그아웃</b-nav-item>
        </template>
      </b-nav>
    </nav>

    <!-- <ul class="px-3 py-3 clearfix">
      <li class="float-left mx-2"></li>
      <template v-if="logged">
        <li class="float-left mx-2"><b-link>마이페이지</b-link></li>
        <li class="float-left mx-2">
          <b-link class="text-danger">좋아요</b-link>
        </li>
      </template>
      <li class="float-left mx-2"><b-link>최근 본 상품</b-link></li>
      <li class="float-left mx-2">
        <b-link>
          장바구니
          <b-badge pill variant="primary">0</b-badge>
        </b-link>
      </li>
      <li class="float-left mx-2"><b-link>고객센터</b-link></li>
      <template v-if="logged">
        <li class="float-left mx-2"><b-link>로그아웃</b-link></li>
      </template>
    </ul> -->
  </header>
</template>

<script>
import TheHeaderNavbar from '@/components/layouts/TheHeaderNavbar.vue';
export default {
  components: { TheHeaderNavbar },
  data() {
    return {
      logged: false,
      level: 3,
      name: '아무개',
    };
  },
  computed: {
    topBanner() {
      return this.$store.state.topBanner;
    },
  },
  methods: {
    closeTopBanner() {
      this.$store.commit('closeTopBanner');
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
