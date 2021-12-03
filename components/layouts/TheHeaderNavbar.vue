<template>
  <b-navbar print :variant="color" type="dark">
    <b-navbar-brand tag="h1">
      <router-link to="/">
        {{ h1 }}
      </router-link>
    </b-navbar-brand>
    <b-form inline @submit="submitSearch">
      <b-input-group size="sm">
        <b-form-input type="search" name="q" :value="q"></b-form-input>
        <b-input-group-append>
          <b-button type="button" title="이미지 검색" class="border">
            <b-icon icon="camera" aria-hidden="true" />
          </b-button>
          <b-button type="submit" title="검색" class="border">
            <b-icon icon="search" aria-hidden="true" />
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form>

    <!-- <div style="width: 150; position: relative; overflow: hidden">
      <b-carousel background="gray">
        <b-carousel-slide
          v-for="(keyword, rank) in [
            '숏패딩',
            '후드티',
            '니트',
            '맨투맨',
            '패딩',
          ]"
          :key="rank"
        >
          <template #img>
            <b-img width="150" height="31" blank alt="" />
          </template>
          <p style="font-size: 1rem">{{ rank + 1 }}위: {{ keyword }}</p>
        </b-carousel-slide>
      </b-carousel>
    </div> -->

    <b-navbar-nav class="ml-auto mr-3">
      <template v-for="n of navItems">
        <b-nav-item v-if="n.to" :key="n.name" :to="n.to">
          {{ n.name }}
        </b-nav-item>
        <b-nav-dropdown
          v-else
          :key="n.name"
          menu-class="rounded-0 py-1 text-center"
        >
          <template #button-content>{{ n.name }}</template>
          <b-dropdown-item
            v-for="i of n.items"
            :key="i.name"
            :to="i.to"
            :disabled="!i.enabled"
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
  /* props: {
    q: {
      type: String,
      default: '',
    },
  }, */
  data() {
    return {
      q: this.$route.query.q,
      navItems: [
        {
          name: '랭킹',
          items: [
            { name: '상품', to: '/ranking/goods', enabled: true },
            { name: '브랜드', to: '/ranking/brand', enabled: true },
            { name: '검색어', to: '/ranking/keyword', enabled: true },
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
  computed: {
    color() {
      switch (this.$store.state.gender) {
        case 'male':
          return 'primary';
        case 'female':
          return 'secondary';
        case 'all':
        default:
          return 'dark';
      }
    },
    h1() {
      switch (this.$store.state.gender) {
        case 'male':
          return 'MUSINSA MEN';
        case 'female':
          return 'WUSINSA';
        case 'all':
        default:
          return 'MUSINSA STORE';
      }
    },
  },
  watch: {
    $route(to) {
      this.q = to.query.q;
    },
  },
  methods: {
    submitSearch() {
      alert('검색 기능 준비중입니다.');
    },
  },
};
</script>

<style scoped>
.navbar {
  font-size: 1.2rem;
  font-weight: 600;
}
/* .b-nav-dropdown > ul > li:not(:last-child) {
  border-bottom: 1px solid gray;
  padding-bottom: 4px;
  margin-bottom: 4px;
} */
* >>> .carousel-caption {
  text-align: start !important;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 0.5em;
}
* >>> .dropdown-menu {
  min-width: 2em;
  left: 50%;
  transform: translateX(-50%);
}
</style>
