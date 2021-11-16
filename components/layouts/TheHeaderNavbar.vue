<template>
  <b-navbar print>
    <b-navbar-brand href="/" class="h1 text-white">MUSINSA</b-navbar-brand>
    <b-nav-form>
      <b-input-group size="sm">
        <b-form-input type="search" name="q"></b-form-input>
        <b-input-group-append>
          <b-button>
            <b-icon icon="camera" aria-hidden="true" />
            <span class="sr-only">이미지 검색</span>
          </b-button>
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
        <b-dropdown-item v-for="n of nav.ranking" :key="n.name" :to="n.to">
          {{ n.name }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown no-caret>
        <template #button-content>업데이트</template>
        <b-dropdown-item v-for="n of nav.update" :key="n.name" :to="n.to">
          {{ n.name }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown no-caret>
        <template #button-content>코디</template>
        <b-dropdown-item v-for="n of nav.coordi" :key="n.name" :to="n.to">
          {{ n.name }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown no-caret>
        <template #button-content>세일</template>
        <b-dropdown-item v-for="n of nav.sale" :key="n.name" :to="n.to">
          {{ n.name }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown no-caret>
        <template #button-content>스페셜</template>
        <b-dropdown-item v-for="n of nav.special" :key="n.name" :to="n.to">
          {{ n.name }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown no-caret>
        <template #button-content>이벤트</template>
        <b-dropdown-item v-for="n of nav.event" :key="n.name" :to="n.to">
          {{ n.name }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item to="/">브랜드</b-nav-item>
      <b-nav-item-dropdown no-caret>
        <template #button-content>매거진</template>
        <b-dropdown-item v-for="n of nav.magazine" :key="n.name" :to="n.to">
          {{ n.name }}
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      nav: {
        ranking: [
          { name: '상품', to: '#' },
          { name: '브랜드', to: '#' },
          { name: '검색어', to: '#' },
        ],
        update: [
          { name: '신상품', to: '#' },
          { name: '재입고', to: '#' },
          { name: '세일 소식', to: '#' },
          { name: '이벤트', to: '#' },
          { name: '입점', to: '#' },
        ],
        coordi: [
          { name: '코디숍', to: '#' },
          { name: '코디맵', to: '#' },
          { name: '브랜드 스냅', to: '#' },
          { name: '스트릿 스냅', to: '#' },
        ],
        sale: [
          { name: '쿠폰', to: '#' },
          { name: '세일', to: '#' },
          { name: '타임세일', to: '#' },
          { name: '클리어런스', to: '#' },
          { name: '기획전', to: '#' },
        ],
        special: [
          { name: '쇼케이스', to: '#' },
          { name: '스페셜 이슈', to: '#' },
          { name: '단독 상품', to: '#' },
        ],
        event: [
          { name: '래플', to: '#' },
          { name: '랜덤 이벤트', to: '#' },
        ],
        magazine: [
          { name: '뉴스', to: '#' },
          { name: '매거진', to: '#' },
        ],
      },
    };
  },
};
</script>

<style scoped>
* {
  font-size: 1.2rem;
  font-weight: 600;
}
</style>
