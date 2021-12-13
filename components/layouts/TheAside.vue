<template>
  <aside
    role="complementary"
    aria-labelledby="aside-header"
    class="px-3"
    :class="isAsideExpanded ? 'aside-expanded' : 'aside-collapsed'"
    :aria-expanded="isAsideExpanded ? 'true' : 'false'"
  >
    <h2 id="aside-header" class="sr-only">사이드 메뉴</h2>
    <b-button
      type="button"
      squared
      variant="outline-secondary"
      class="aside-toggler border-top-0 border-left-0 bg-white py-2"
      :title="`사이드 메뉴 ${isAsideExpanded ? '접기' : '펼치기'}`"
      @click="toggleAside"
    >
      <b-iconstack aria-hidden="true">
        <b-icon icon="dash" stacked scale="2" shift-v="-5" />
        <b-icon icon="dash" stacked scale="2" />
        <b-icon icon="dash" stacked scale="2" shift-v="5" />
      </b-iconstack>
      <!-- <b-icon icon="list" aria-hidden="true" scale="1.5" /> -->
    </b-button>

    <TheAsideFirstTabs :category-list="categoryList" :brand-list="brandList" />

    <TheAsideSecondTabs />

    <div aria-label="">
      <div>
        <b-link href="tel:1544-7199" class="phonenumber">
          <span title="대표 전화">
            <b-icon icon="telephone-fill" aria-label="" aria-hidden="true" />
            1544-7199
          </span>
        </b-link>
        <p>
          1번 : 배송 / 교환 / 환불 관련<br />
          2번 : 결제 / 회원 관련<br />
          <time datetime="09:00+09">오전9시</time>~<time datetime="18:00+09"
            >오후6시</time
          >
          운영 / 토,일,휴일 휴무
        </p>
      </div>
      <hr />
      <div>
        <p>
          전화 전 <b-link href="">자주 묻는 질문</b-link>을 확인하세요.<br />
          <b-link to="">1:1문의</b-link>를 통해서도 상담이 가능합니다.<br />
          상품 문의는 각 상품 Q&A를 이용하세요.
        </p>
      </div>
      <div>
        <b-button
          type="button"
          size="sm"
          squared
          to=""
          variant="outline-secondary"
        >
          회원후기
        </b-button>
        <b-button
          type="button"
          size="sm"
          squared
          to=""
          variant="outline-secondary"
        >
          회원 혜택
        </b-button>
        <b-button
          type="button"
          size="sm"
          squared
          to=""
          variant="outline-secondary"
        >
          공지사항
        </b-button>
      </div>
    </div>
  </aside>
</template>

<script>
import TheAsideFirstTabs from './TheAsideFirstTabs.vue';
import TheAsideSecondTabs from './TheAsideSecondTabs.vue';
import stubCategoryBest from '@/test/stub.categorybest.js';
import stubCategoryList from '@/test/stub.categorylist.js';
import stubBrandList from '@/test/stub.brandlist.js';
export default {
  components: { TheAsideFirstTabs, TheAsideSecondTabs },
  data() {
    return {
      isAsideExpanded: true,
    };
  },
  computed: {
    categoryList() {
      const arr = [stubCategoryBest];
      arr.push(...stubCategoryList);
      return arr;
    },
    brandList() {
      return stubBrandList;
    },
    /* 위 항목들을 computed로 둔 이유는
      실제 서비스에서는 비동기로 데이터를 받아올 것이기 때문에..
      근데 생각해보니 asyncData가 더 맞을 것 같기도 하고?
      그치만 page가 아니면 async는 불가능하고?
      그냥 리스트만 뿌릴거면 store에서 처리하는건 어떨지? */
  },
  methods: {
    toggleAside() {
      this.isAsideExpanded = !this.isAsideExpanded;
      this.$emit('asideExpansion', this.isAsideExpanded);
    },
  },
};
</script>

<style scoped>
aside {
  position: absolute;
  width: 270px;
  font-size: 12px;
  z-index: 1;
}
aside.aside-expanded {
  left: 0px;
}
aside.aside-collapsed {
  left: -270px;
}
.aside-toggler {
  position: absolute;
  left: 270px;
}
.aside-toggler:hover {
  color: inherit;
}
.phonenumber {
  font-size: 1.5em;
}
aside >>> .nuxt-link-exact-active {
  font-weight: bold;
}
</style>
