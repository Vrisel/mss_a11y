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

    <nav role="navigation" aria-label="품목별, 브랜드별">
      <b-tabs justified class="mt-3" :value="isBrand ? 1 : 0">
        <b-tab>
          <template #title>
            <h3>품목</h3>
          </template>
          <div
            ref="accordion"
            class="accordion"
            role="tablist"
            @keydown.up="accordionFocus($event, 'up')"
            @keydown.down="accordionFocus($event, 'down')"
            @keydown.36="accordionFocus($event, 'home')"
            @keydown.35="accordionFocus($event, 'end')"
          >
            <TheAsideAccordion
              v-bind="best"
              key="best"
              :ref="'accordion-best'"
              :current="currentAccordion"
            />
            <TheAsideAccordion
              v-for="category in categoryList"
              :key="category.id"
              :ref="`accordion-${category.id}`"
              v-bind="category"
              :current="currentAccordion"
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
            @submit.prevent="brandSearch"
          >
            <b-form-group
              label="브랜드명 검색"
              label-for="brandSearch"
              label-cols="auto"
            >
              <b-input-group>
                <b-form-input
                  id="brandSearch"
                  v-model="brandSearchWord"
                  type="search"
                  size="sm"
                  @input="brandInitial = ''"
                />
                <b-input-group-append>
                  <b-button type="submit" size="sm">검색</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <b-form-group>
              <b-form-checkbox-group
                v-model="brandSearchOption"
                buttons
                button-variant="outline-secondary"
                aria-label="브랜드 검색 옵션"
              >
                <b-form-checkbox value="best" class="longer-label-3">
                  BEST</b-form-checkbox
                ><b-form-checkbox value="exclusive" class="longer-label-3">
                  단독</b-form-checkbox
                ><b-form-checkbox value="favorite" class="longer-label-3">
                  <b-iconstack scale="0.9" aria-hidden="true">
                    <b-icon stacked icon="circle-fill" variant="danger" />
                    <b-icon
                      stacked
                      icon="heart-fill"
                      variant="white"
                      scale="0.7"
                      aria-hidden="true"
                      title="즐겨찾기"
                    />
                  </b-iconstack>
                  <span class="sr-only">즐겨찾기</span>
                </b-form-checkbox>
              </b-form-checkbox-group>
              <b-radio-group
                v-model="brandInitial"
                aria-label="브랜드 이니셜"
                buttons
                button-variant="outline-secondary"
              >
                <!-- <template #first>
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
                </template> -->
                <!-- 'A'.charCodeAt(0) == 65, `Z`.charCodeAt(0) == 88 -->
                <b-form-radio
                  v-for="i of 26"
                  :key="i"
                  :value="String.fromCharCode(i + 64)"
                >
                  {{ String.fromCharCode(i + 64) }} </b-form-radio
                ><b-form-radio class="longer-label-2" value="etc">
                  기타
                </b-form-radio>
              </b-radio-group>
            </b-form-group>
          </b-form>
          <b-list-group aria-label="브랜드" role="listbox">
            <b-list-group-item v-for="brand in brands" :key="brand.id">
              <b-row>
                <b-col class="pl-2 pr-1">
                  <b-link :to="`/brand/${brand.id}`" class="stretched-link">
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
        <b-tab title-link-class="px-0">
          <template #title>
            <h3>랭킹</h3>
          </template>
          <TheAsideSubtabs to="" class="card">
            <b-tab title="상품">
              <b-tabs no-nav-style no-key-nav>
                <b-tab
                  v-for="c of [
                    '전체',
                    '상의',
                    '아우터',
                    '하의',
                    '가방',
                    '신발',
                    '기타',
                  ]"
                  :key="c"
                  :title="c"
                  no-body
                >
                  <ul class="d-flex flex-wrap justify-content-between">
                    <li
                      v-for="i of 6"
                      :key="`${c}-${i}`"
                      class="position-relative hover-bg-light"
                    >
                      <strong class="position-absolute px-1 bg-white">
                        {{ i }}
                      </strong>
                      <figure>
                        <img
                          src="https://via.placeholder.com/70x85"
                          :alt="`${c} ${i}위 상품`"
                        />
                      </figure>
                      <p>
                        <span class="text-truncate">
                          {{ '브랜드명' }}
                        </span>
                        <b-icon
                          v-if="i % 3 === 1"
                          icon="triangle-fill"
                          scale="0.9"
                          variant="danger"
                          aria-label="랭크 상승"
                        />
                        <b-icon
                          v-else-if="i % 3 === 2"
                          icon="dash"
                          scale="1.2"
                          variant="secondary"
                          aria-label="랭크 유지"
                        />
                        <b-icon
                          v-else
                          icon="triangle-fill"
                          flip-v
                          scale="0.9"
                          variant="primary"
                          aria-label="랭크 하락"
                        />
                      </p>
                      <b-link class="stretched-link">{{ '상품명' }}</b-link>
                      <p>
                        <strong> {{ `${(99000).toLocaleString()}원` }}</strong>
                      </p>
                    </li>
                  </ul>
                </b-tab>
              </b-tabs>
            </b-tab>
            <b-tab title="브랜드">
              <ul class="d-flex flex-wrap justify-content-between">
                <li
                  v-for="i of 9"
                  :key="`brand-${i}`"
                  class="position-relative hover-bg-light"
                >
                  <strong class="position-absolute px-1 bg-white">
                    {{ i }}
                  </strong>
                  <figure
                    class="d-inline-block align-middle"
                    style="width: 70px; height: 70px; padding: 7.5px"
                  >
                    <img
                      src="https://via.placeholder.com/55x20"
                      class="w-100 d-inline-block align-middle"
                      :alt="`${i}위 브랜드`"
                    />
                  </figure>
                  <p>
                    <b-link class="stretched-link text-truncate">
                      {{ '브랜드명' }}
                    </b-link>
                    <b-icon
                      v-if="i % 3 === 1"
                      icon="triangle-fill"
                      scale="0.9"
                      variant="danger"
                      aria-label="랭크 상승"
                    />
                    <b-icon
                      v-else-if="i % 3 === 2"
                      icon="dash"
                      scale="1.2"
                      variant="secondary"
                      aria-label="랭크 유지"
                    />
                    <b-icon
                      v-else
                      icon="triangle-fill"
                      flip-v
                      scale="0.9"
                      variant="primary"
                      aria-label="랭크 하락"
                    />
                  </p>
                </li>
              </ul>
            </b-tab>
          </TheAsideSubtabs>
        </b-tab>
        <b-tab
          v-for="p of ['업데이트', '세일', '단독']"
          :key="p"
          title-link-class="px-0"
        >
          <template #title>
            <h3>{{ p }}</h3>
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
import TheAsideSubtabs from './TheAsideSubtabs.vue';
import stubCategoryBest from '@/test/stub.categorybest.js';
import stubCategoryList from '@/test/stub.categorylist.js';
import stubBrands from '@/test/stub.brands.js';
export default {
  components: { TheAsideAccordion, TheAsideSubtabs },
  data() {
    return {
      brandSearchWord: '',
      brandSearchOption: [],
      brandInitial: '',
      isAsideExpanded: true,
      currentAccordion: 'best',
    };
  },
  computed: {
    best() {
      return stubCategoryBest;
    },
    categoryList() {
      return stubCategoryList;
    },
    accordionIds() {
      const arr = ['best'];
      arr.push(...Object.keys(this.categoryList));
      return arr;
    },
    brands() {
      return stubBrands;
    },
    /* 위 항목들을 computed로 둔 이유는
      실제 서비스에서는 비동기로 데이터를 받아올 것이기 때문에..
      근데 생각해보니 asyncData가 더 맞을 것 같기도 하고 */
    isBrand() {
      return this.$route.name.split('-')[0].toLowerCase() === 'brand';
    },
  },
  watch: {
    $route(to) {
      let dir = to.name;
      if (dir) {
        dir = dir.split('-')[0].toLowerCase();
        if (dir === 'category') {
          this.currentAccordion = to.params.id.slice(0, 3);
          return;
        } else if (dir === 'goods') {
          this.currentAccordion = this.$store.state.category.id.slice(0, 3);
          return;
        }
      }
      this.currentAccordion = 'best';
    },
  },
  destroyed() {},
  methods: {
    toggleAside() {
      this.isAsideExpanded = !this.isAsideExpanded;
      this.$emit('asideExpansion', this.isAsideExpanded);
    },
    accordionFocus(e, direction) {
      const target = e.target;
      // 헤더에서 동작했는지 확인
      /* 정규식: 'accordion-'으로 시작하고,
         바로 이어서 1개 이상의 숫자 또는 'best'로 끝난다면
         뒷부분을 캡처해서 리턴.
         매치된 전체는 [0], 캡처된 부분은 [1]로 접근 */
      const id = target.id.match(/^accordion-(\d+$|best$)/);
      if (id) {
        const idx = this.accordionIds.findIndex((elem) => elem === id[1]);
        let nextId;
        if (idx >= 0) {
          switch (direction) {
            case 'up':
              nextId = this.accordionIds[idx - 1];
              break;
            case 'down':
              nextId = this.accordionIds[idx + 1];
              break;
            case 'home':
              if (idx === 0) return;
              nextId = this.accordionIds[0];
              break;
            case 'end':
              // eslint-disable-next-line no-case-declarations
              const last = this.accordionIds.length - 1;
              if (idx === last) return;
              nextId = this.accordionIds[last];
              break;
            default:
              return;
          }
          if (nextId) {
            e.preventDefault();
            const ref = `accordion-${nextId}`;
            /* v-for로 만들어진 ref는 array에 들어있는데,
              직접 만든 ref는 바로 나타나기 때문에
              아래와 같은 구분이 필요함 */
            const comp = this.$refs[ref][0] || this.$refs[ref];
            comp.$refs.header.focus();
          }
        }
      }
    },
    brandSearch() {
      alert(
        '검색 기능 준비 중입니다.\n' +
          '현재 조건:\n' +
          `  검색어: ${this.brandSearchWord}\n` +
          `  옵  션: ${this.brandSearchOption}\n` +
          `  이니셜: ${this.brandInitial}`
      );
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
  left: 270px;
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
.longer-label-2 {
  width: 46px !important;
}
.longer-label-3 {
  width: 70px !important;
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
