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
      class="aside-toggler bg-white"
      @click="toggleAside"
    >
      <b-icon icon="list" aria-labelledby="aside-toggle-label" />
      <span id="aside-toggle-label" class="sr-only">
        사이드 메뉴 {{ isAsideExpanded ? '접기' : '펼치기' }}
      </span>
    </b-button>

    <nav role="navigation" aria-label="품목별, 브랜드별">
      <b-tabs justified class="mt-3" :value="isBrand ? 1 : 0">
        <b-tab>
          <template #title>
            <h3>품목</h3>
          </template>
          <div ref="accordion" class="accordion" role="tablist">
            <TheAsideAccordion v-bind="best" />
            <TheAsideAccordion
              v-for="category in categoryList"
              :key="category.id"
              v-bind="category"
              :visible="visible"
            />
          </div>
        </b-tab>

        <b-tab>
          <template #title>
            <h3>브랜드</h3>
          </template>
          <b-form
            role="search"
            aria-label="브랜드"
            class="my-3"
            @submit.prevent
          >
            <b-form-group
              label="브랜드명 검색"
              label-for="brandSearch"
              label-cols="auto"
            >
              <b-input-group>
                <b-form-input
                  id="brandSearch"
                  v-model="brandSearch"
                  type="search"
                  size="sm"
                />
                <b-input-group-append>
                  <b-button type="submit" size="sm">검색</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-radio-group
                v-model="brandSearchOption"
                aria-label="브랜드 검색 옵션"
                buttons
                button-variant="outline-secondary"
              >
                <template #first>
                  <b-form-radio class="longer-label" value="best">
                    BEST
                  </b-form-radio>
                  <b-form-radio class="longer-label" value="exclusive">
                    단독
                  </b-form-radio>
                  <b-form-radio class="longer-label" value="favorite">
                    <b-iconstack scale="0.9" aria-label="즐겨찾기">
                      <b-icon stacked icon="circle-fill" variant="danger" />
                      <b-icon
                        stacked
                        icon="heart-fill"
                        variant="white"
                        scale="0.7"
                      />
                    </b-iconstack>
                  </b-form-radio>
                  <b-form-radio v-for="i of 26" :key="i">
                    <!-- 'A'.charCodeAt(0) == 65, `Z`.charCodeAt(0) == 88 -->
                    {{ String.fromCharCode(i + 64) }}
                  </b-form-radio>
                  <b-form-radio class="longer-label" value="etc">
                    etc.
                  </b-form-radio>
                </template>
              </b-radio-group>
            </b-form-group>
          </b-form>
          <b-list-group aria-label="브랜드" role="listbox">
            <b-list-group-item v-for="brand in brands" :key="brand.id">
              <b-row>
                <b-col class="pl-2 pr-1">
                  <b-link :to="`/brand/${brand.id}`">
                    <strong lang="en">
                      {{ brand.name_eng.toUpperCase() }}
                    </strong>
                    <br />
                    <span class="">
                      {{ brand.name_kor }}
                      <span class="count">
                        {{ brand.count.toLocaleString() }}
                        <span class="sr-only">개 상품</span>
                      </span>
                    </span>
                  </b-link>
                </b-col>
                <b-col cols="auto" class="pr-1">
                  <b-checkbox
                    v-model="brand.isFav"
                    :value="true"
                    button
                    button-variant="outline-danger"
                  >
                    <b-icon
                      aria-label="즐겨찾기"
                      :icon="brand.isFav ? 'heart-fill' : 'heart'"
                    />
                  </b-checkbox>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-tab>
      </b-tabs>

      <b-tabs justified class="my-3" aria-label="">
        <b-tab>
          <template #title>
            <h3>랭킹</h3>
          </template>
          <div>준비 중입니다.</div>
        </b-tab>
        <b-tab>
          <template #title>
            <h3>업데이트</h3>
          </template>
          <div>준비 중입니다.</div>
        </b-tab>
        <b-tab>
          <template #title>
            <h3>세일</h3>
          </template>
          <div>준비 중입니다.</div>
        </b-tab>
        <b-tab>
          <template #title>
            <h3>단독</h3>
          </template>
          <div>준비 중입니다.</div>
        </b-tab>
      </b-tabs>
    </nav>

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
import TheAsideAccordion from './TheAsideAccordion.vue';
import stubCategoryBest from '@/test/stub.categorybest.js';
import stubCategoryList from '@/test/stub.categorylist.js';
import stubBrands from '@/test/stub.brands.js';
export default {
  components: { TheAsideAccordion },
  data() {
    return {
      brandSearch: '',
      brandSearchOption: '',
      isAsideExpanded: true,
    };
  },
  computed: {
    best() {
      return stubCategoryBest;
    },
    categoryList() {
      return stubCategoryList;
    },
    brands() {
      return stubBrands;
    },
    isBrand() {
      return this.$route.name.split('-')[0].toLowerCase() === 'brand';
    },
    visible() {
      const dir = this.$route.name.split('-')[0].toLowerCase();
      let result = 'best';
      if (dir === 'category') {
        result = this.$route.params.id.slice(0, 3);
      } else if (dir === 'goods') {
        result = this.$store.state.category.id.slice(0, 3);
      }
      return result;
    },
  },
  mounted() {
    const acc = this.$refs.accordion;
    acc.addEventListener('keydown', function (e) {
      const key = e.which.toString();
      const target = e.target;
      // 헤더에서 동작
      if (target.classList.contains('card-header')) {
        // Up(38), Down(40)
        if (key.match(/38|40/)) {
          e.preventDefault();
          // const current = target.querySelector('strong').innerText;
          console.log(acc.getElementsByTagName('h3'));
        }
      }
    });
  },
  destroyed() {},
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
  font-size: 0.8rem;
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
  left: 269px;
}
.aside-toggler:hover {
  color: inherit;
}
.btn-group {
  display: inline-block;
}
.btn-group >>> label.btn {
  vertical-align: middle;
  font-size: 0.8rem;
  width: 22px;
  height: 22px;
  padding: 0;
  margin: 0 2px 2px 0;
  border-radius: 0;
}
.longer-label {
  width: 46px !important;
}
.favorite-label {
  width: 188px !important;
}
.list-group {
  max-height: 1511px;
  overflow: auto;
}
.count::before {
  content: '(';
}
.count::after {
  content: ')';
}
.phonenumber {
  font-size: 1.5em;
}
aside >>> .nuxt-link-exact-active {
  font-weight: bold;
}
</style>
