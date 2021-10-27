<template>
  <aside
    class="px-3"
    :class="isAsideExpanded ? 'aside-expanded' : 'aside-collapsed'"
  >
    <b-button
      type="button"
      squared
      variant="outline-secondary"
      class="aside-toggler"
      @click="toggleAside"
    >
      <b-icon icon="list" />
    </b-button>

    <div>
      <b-tabs justified class="mt-3">
        <b-tab title="품목">
          <div class="accordion" role="tablist">
            <TheAsideAccordion
              v-for="category in categories"
              :key="category.english"
              v-bind="category"
            />
          </div>
        </b-tab>

        <b-tab title="브랜드">
          <b-form>
            <b-form-group
              label="브랜드명 입력"
              label-for="brandSearch"
              label-cols="auto"
            >
              <b-form-input
                id="brandSearch"
                v-model="brandSearch"
                type="text"
                size="sm"
              />
            </b-form-group>
            <b-form-group>
              <b-radio-group
                v-model="brandSearchOption"
                :options="['A', 'B', 'C', 'D', 'E', 'F']"
                size="sm"
                buttons
                button-variant="outline-secondary"
              />
              <b-radio-group
                v-model="brandSearchOption"
                :options="['G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']"
                size="sm"
                buttons
                button-variant="outline-secondary"
              />
              <b-radio-group
                v-model="brandSearchOption"
                :options="['Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']"
                size="sm"
                buttons
                button-variant="outline-secondary"
              />
            </b-form-group>
          </b-form>
          <b-list-group>
            <b-list-group-item v-for="brand in brands" :key="brand.name">
              <b-row>
                <b-col>
                  <b-link :to="`/display/brands/${brand.to}`">
                    <strong>{{ brand.name.toUpperCase() }}</strong>
                    <br />
                    <span class=""
                      >{{ brand.kor }}
                      <span class="count"
                        >({{ brand.count.toLocaleString() }})</span
                      ></span
                    >
                  </b-link>
                </b-col>
                <b-col cols="auto">
                  <b-checkbox
                    v-model="brand.isFav"
                    :value="true"
                    button
                    button-variant="outline-danger"
                    ><b-icon :icon="brand.isFav ? 'heart-fill' : 'heart'"
                  /></b-checkbox>
                </b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group>
        </b-tab>
      </b-tabs>

      <b-tabs justified class="mt-3">
        <b-tab title="랭킹"></b-tab>
        <b-tab title="업데이트"></b-tab>
        <b-tab title="세일"></b-tab>
        <b-tab title="단독"></b-tab>
      </b-tabs>

      <div>
        <b-link href="tel:1544-7199" class="phonenumber">
          <b-icon icon="telephone-fill" />
          1544-7199
        </b-link>
        <div>
          <p>1번 : 배송 / 교환 / 환불 관련</p>
          <p>2번 : 결제 / 회원 관련</p>
          <p>오전9시~오후6시 운영 / 토,일,휴일 휴무</p>
        </div>
        <hr />
        <div>
          <p>전화 전 <b-link href="">자주 묻는 질문</b-link>을 확인하세요.</p>
          <p><b-link href="">1:1문의</b-link>를 통해서도 상담이 가능합니다.</p>
          <p>상품 문의는 각 상품 Q&A를 이용하세요.</p>
        </div>
        <div>
          <b-button size="sm" squared href="" variant="outline-secondary"
            >회원후기</b-button
          >
          <b-button size="sm" squared href="" variant="outline-secondary"
            >회원 혜택</b-button
          >
          <b-button size="sm" squared href="" variant="outline-secondary"
            >공지사항</b-button
          >
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import TheAsideAccordion from './TheAsideAccordion.vue';
import stubCategories from '@/test/stub.category.js';
import stubBrands from '@/test/stub.brands.js';
export default {
  components: { TheAsideAccordion },
  data() {
    return {
      categories: stubCategories,
      brands: stubBrands,
      brandSearch: '',
      brandSearchOption: '',
      isAsideExpanded: true,
    };
  },
  methods: {
    toggleAside() {
      this.isAsideExpanded = !this.isAsideExpanded;
      this.$emit('asideExpansion', this.isAsideExpanded);
    },
  },
};
</script>

<style>
aside {
  position: absolute;
  width: 270px;
  float: left;
  transition: 0.5s;
  font-size: 0.8rem;
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
  z-index: 1;
}
.phonenumber {
  font-size: 1.5em;
}
</style>
