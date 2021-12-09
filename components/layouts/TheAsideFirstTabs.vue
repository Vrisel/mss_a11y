<template>
  <nav role="navigation" aria-label="품목별, 브랜드별">
    <b-tabs justified no-key-nav class="mt-3" :value="isBrand ? 1 : 0">
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
            v-for="category of categoryList"
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
          <b-list-group-item v-for="brand in brandList" :key="brand.id">
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
  </nav>
</template>

<script>
import TheAsideAccordion from './TheAsideAccordion.vue';
export default {
  components: { TheAsideAccordion },
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      },
    },
    brandList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      brandSearchWord: '',
      brandSearchOption: [],
      brandInitial: '',
      currentAccordion: 'best',
    };
  },
  computed: {
    accordionIds() {
      return this.categoryList.reduce((acc, curr) => {
        acc.push(curr.id);
        return acc;
      }, []);
    },
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
  methods: {
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
            const comp = this.$refs[ref][0];
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
.btn-group {
  display: inline-block;
}
.btn-group >>> label.btn {
  font-size: 0.8rem;
  width: 22px;
  height: 22px;
  padding: 2px 0;
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
</style>
