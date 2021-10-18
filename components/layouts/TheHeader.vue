<template>
  <header role="banner">
    <a v-if="topBanner" href="#">
      <b-img
        blank
        blank-color="grey"
        width="2600px"
        height="70px"
        alt="top banner"
      />
    </a>

    <b-navbar>
      <b-navbar-brand to="/">MUSINSA</b-navbar-brand>
      <b-nav-form>
        <b-input-group size="sm">
          <b-form-input type="search" name="q"></b-form-input>
          <b-input-group-append>
            <b-input-group-text>
              <b-icon icon="camera" aria-hidden="true" />
              <span class="sr-only">이미지 검색</span>
            </b-input-group-text>
            <b-button type="submit" size="sm">
              <b-icon icon="search" aria-hidden="true" />
              <span class="sr-only">검색</span>
            </b-button>
          </b-input-group-append>
        </b-input-group>
      </b-nav-form>

      <!-- 랭킹 영역 -->

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown no-caret>
          <template #button-content>랭킹</template>
          <b-dropdown-item>상품</b-dropdown-item>
          <b-dropdown-item>브랜드</b-dropdown-item>
          <b-dropdown-item>검색어</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown no-caret>
          <template #button-content>업데이트</template>
          <b-dropdown-item
            >전체 신상품 세일 재입고 이벤트 입점 인기</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item to="/">브랜드</b-nav-item>
        <b-nav-item-dropdown no-caret>
          <template #button-content>스타일</template>
          <b-dropdown-item>코디숍 코디맵 브랜드스냅 스트릿스냅</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown no-caret>
          <template #button-content>스페셜</template>
          <b-dropdown-item>쇼케이스 스페셜이슈 단독상품</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown no-caret>
          <template #button-content>콘텐츠</template>
          <b-dropdown-item>큐레이팅 비디오 회원후기</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown no-caret>
          <template #button-content>세일</template>
          <b-dropdown-item
            >세일 타임세일 클리어런스 기획전 쿠폰</b-dropdown-item
          >
        </b-nav-item-dropdown>
        <b-nav-item-dropdown no-caret>
          <template #button-content>이벤트</template>
          <b-dropdown-item>헐</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown no-caret>
          <template #button-content>매거진</template>
          <b-dropdown-item>뉴스 매거진</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>

    <b-row align-h="start">
      <b-col cols="auto"><b-link>스탠다드</b-link></b-col>
      <b-col cols="auto"><b-link>테라스샵</b-link></b-col>
      <b-col cols="auto"><b-link>셀렉트</b-link></b-col>
    </b-row>

    <b-row>
      <TheHeaderLogin />
      <b-col cols="auto"><b-link>마이페이지</b-link></b-col>
    </b-row>
  </header>
</template>

<script>
import TheHeaderLogin from '@/components/layouts/TheHeaderLogin.vue';
export default {
  components: { TheHeaderLogin },
  data() {
    return {
      topBanner: true,
    };
  },
};
</script>

<style></style>
