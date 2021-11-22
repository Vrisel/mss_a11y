<template>
  <b-navbar print>
    <b-navbar-brand tag="h1">
      <router-link to="/">MUSINSA</router-link>
    </b-navbar-brand>
    <b-nav-form>
      <b-input-group size="sm">
        <b-form-input type="search" name="q"></b-form-input>
        <b-input-group-append>
          <b-button title="이미지 검색">
            <b-icon icon="camera" aria-hidden="true" />
          </b-button>
          <b-button type="submit" size="sm" title="검색">
            <b-icon icon="search" aria-hidden="true" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-nav-form>

    <!-- 랭킹 영역 -->

    <b-navbar-nav class="ml-auto mr-3">
      <template v-for="n of navItems">
        <b-nav-item v-if="n.to" :key="n.name" :to="n.to">
          {{ n.name }}
        </b-nav-item>
        <b-nav-dropdown v-else :key="n.name" no-caret>
          <template #button-content>{{ n.name }}</template>
          <b-dropdown-item
            v-for="i of n.items"
            :key="i.name"
            :to="i.to"
            disabled
          >
            {{ i.name }}
          </b-dropdown-item>
        </b-nav-dropdown>
      </template>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        {
          name: '랭킹',
          items: [
            { name: '상품', to: '#' },
            { name: '브랜드', to: '#' },
            { name: '검색어', to: '#' },
          ],
        },
        {
          name: '업데이트',
          items: [
            { name: '신상품', to: '#' },
            { name: '재입고', to: '#' },
            { name: '세일 소식', to: '#' },
            { name: '이벤트', to: '#' },
            { name: '입점', to: '#' },
          ],
        },
        {
          name: '코디',
          items: [
            { name: '코디숍', to: '#' },
            { name: '코디맵', to: '#' },
            { name: '브랜드 스냅', to: '#' },
            { name: '스트릿 스냅', to: '#' },
          ],
        },
        {
          name: '세일',
          items: [
            { name: '쿠폰', to: '#' },
            { name: '세일', to: '#' },
            { name: '타임세일', to: '#' },
            { name: '클리어런스', to: '#' },
            { name: '기획전', to: '#' },
          ],
        },
        {
          name: '스페셜',
          items: [
            { name: '쇼케이스', to: '#' },
            { name: '스페셜 이슈', to: '#' },
            { name: '단독 상품', to: '#' },
          ],
        },
        {
          name: '이벤트',
          items: [
            { name: '래플', to: '#' },
            { name: '랜덤 이벤트', to: '#' },
          ],
        },
        {
          name: '브랜드',
          to: '/brand',
        },
        {
          name: '매거진',
          items: [
            { name: '뉴스', to: '#' },
            { name: '매거진', to: '#' },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
* {
  font-size: 1.2rem;
  font-weight: 600;
}
* >>> .dropdown-menu {
  min-width: 2em;
  left: 50%;
  transform: translateX(-50%);
}
</style>
