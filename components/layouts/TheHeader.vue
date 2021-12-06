<template>
  <header role="banner">
    <div
      v-if="topBanner"
      aria-label="top banner"
      class="position-relative bg-black d-flex justify-content-center"
    >
      <b-link to="">
        <figure>
          <b-img src="https://via.placeholder.com/1600x70" alt="빈 배너" />
          <!-- 위 alt에 배너 내용을 넣어야 함 -->
        </figure>
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
        <b-nav-item to="/brand/musinsastandard">스탠다드</b-nav-item>
        <b-nav-item to="">테라스샵</b-nav-item>
        <b-nav-item to="">셀렉트</b-nav-item>
      </b-nav>
    </nav>

    <nav role="navigation" aria-label="마이 링크">
      <b-nav class="py-2">
        <b-nav-item
          v-if="!logged"
          link-classes="btn btn-sm btn-outline-secondary rounded-0 mx-3 py-1 my-1"
          @click="login"
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
          <b-nav-item @click="logout">로그아웃</b-nav-item>
        </template>
      </b-nav>
    </nav>
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
    login() {
      /* if (
        confirm(
          '준비중입니다.\n' +
            '확인을 누르시면 로그인 동작을 확인할 수 있습니다.'
        )
      ) { */
      this.logged = true;
      // }
    },
    logout() {
      if (confirm('로그아웃 하시겠습니까?')) {
        this.logged = false;
      }
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
