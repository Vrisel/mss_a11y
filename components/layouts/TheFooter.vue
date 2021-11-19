<template>
  <footer role="contentinfo">
    <nav class="my-3 mx-3" aria-label="내부 링크">
      <b-nav class="divider">
        <b-nav-item to="" link-classes="px-1 py-0">회사소개</b-nav-item>
        <b-nav-item to="" link-classes="px-1 py-0">공지사항</b-nav-item>
        <b-nav-item to="" link-classes="px-1 py-0">스토어공지</b-nav-item>
        <b-nav-item to="" link-classes="px-1 py-0">
          입점/제휴/대량구매
        </b-nav-item>
        <b-nav-item to="" link-classes="px-1 py-0">
          <strong>개인정보처리방침</strong>
        </b-nav-item>
        <b-nav-item to="" link-classes="px-1 py-0">이용약관</b-nav-item>
        <b-nav-item to="" link-classes="px-1 py-0">로고 다운로드</b-nav-item>
      </b-nav>
    </nav>
    <b-card-group class="mx-3" aria-label="주소 및 연락처">
      <b-card tag="address" aria-labelledby="mss-edit">
        <b-card-title id="mss-edit" title-tag="h2">
          <strong>무신사 편집팀</strong>
        </b-card-title>
        <b-card-text text-tag="div">
          <p class="word-keep">
            (06017) 서울특별시 강남구 언주로174길 30 로빈명품관 지하1층, 무신사
            편집팀
          </p>
          <p class="text-danger">
            (무신사 스토어 반송지 아님, 해당주소 반송불가)
          </p>
        </b-card-text>
      </b-card>
      <b-card tag="address" aria-labelledby="mss-store">
        <b-card-title id="mss-store" title-tag="h2">
          <strong>무신사 스토어</strong>
        </b-card-title>
        <b-card-text text-tag="div">
          <p class="word-keep">
            (17759) 경기도 평택시 신장로 55 CJ대한통운 평택합정집배점 내 무신사
            물류센터
          </p>
          <p class="text-primary">
            (무신사 스토어 자체 배송 상품 물류센터)
            <br />
            (배송센터 직접 물건 수령 불가)
          </p>
          <p class="text-danger border border-danger mt-1 px-1 py-1">
            <strong>
              각 브랜드마다 물류센터가 다릅니다.<br />
              교환/환불 시 주문 조회 메뉴를 통해 해당 제품이 출고된 곳으로
              반송하셔야 합니다.
            </strong>
          </p>
        </b-card-text>
      </b-card>
      <b-card tag="address" aria-labelledby="customer-center">
        <b-card-title id="customer-center" title-tag="h2">
          <strong>고객센터</strong>
        </b-card-title>
        <b-card-text text-tag="div">
          <strong>
            <b-link href="tel:1544-7199">대표전화 1544-7199</b-link>
          </strong>
          <b-link to="">
            <b-badge variant="success" class="text-light">
              전화문의 전 <span class="text-white" lang="en">FAQ</span>
            </b-badge>
          </b-link>
          <p>
            1번 : 배송 / 교환 / 환불 관련<br />
            2번 : 결제 / 회원 관련<br />
            ※상품 문의는 각 상품 Q&A 이용
          </p>
          <p><strong>오전 9시 ~ 오후 6시(토,일, 공휴일 휴무)</strong></p>
          <p class="bracket divider">
            <b-link to="">FAQ</b-link>
            <b-link to="">1:1질문하기</b-link>
            <b-link href="mailto:cs@musinsa.com">이메일문의</b-link>
          </p>
        </b-card-text>
      </b-card>
    </b-card-group>
    <div class="my-5 mx-3">
      <nav class="mb-3" aria-label="외부 링크">
        <b-nav>
          <b-nav-item
            target="_blank"
            href="https://www.youtube.com/musinsatv"
            :link-attrs="{ title: '유튜브' }"
          >
            <b-icon icon="youtube" font-scale="4" aria-hidden="true" />
          </b-nav-item>
          <b-nav-item
            target="_blank"
            href="https://www.instagram.com/musinsacom"
            :link-attrs="{ title: '인스타그램' }"
          >
            <b-icon icon="instagram" font-scale="4" aria-hidden="true" />
          </b-nav-item>
          <b-nav-item
            target="_blank"
            href="https://www.facebook.com/musinsa"
            :link-attrs="{ title: '페이스북' }"
          >
            <b-icon icon="facebook" font-scale="4" aria-hidden="true" />
          </b-nav-item>
          <b-nav-item
            target="_blank"
            href="https://www.twitter.com/musinsacom"
            :link-attrs="{ title: '트위터' }"
          >
            <b-icon icon="twitter" font-scale="4" aria-hidden="true" />
          </b-nav-item>
        </b-nav>
      </nav>
      <div aria-labelledby="copyright">
        <h2 id="copyright" class="mb-2" lang="en">
          <strong>COPYRIGHT &copy; MUSINSA ALL RIGHTS RESERVED.</strong>
        </h2>
        <b-link>
          무신사닷컴 내 매거진, 스트리트스냅, 스토어 등 무신사 자체 생성
          콘텐츠는 무신사닷컴 및 무신사 계약업체에 저작권이 있습니다.<br />
          이러한 콘텐츠는 출처를 밝히고(무신사닷컴 표기 및 www.musinsa.com 링크
          포함 필수) 비상업적인 용도에서만 활용하실 수 있습니다.
        </b-link>

        <p class="mt-2">
          커뮤니티 및 중고장터, 댓글 등 무신사 회원이 올린 이미지가 저작권에
          위배될 경우 <b-link><strong>신고</strong></b-link> 하시면 검토 후
          삭제하겠습니다.
        </p>
      </div>
      <hr class="my-3" />
      <div aria-label="회사 정보">
        <div>
          <p class="h2">
            <strong>100% AUTHENTIC</strong>
          </p>
          <p class="h3 mb-2">
            <strong>
              무신사스토어에서 판매되는 모든 브랜드 제품은 정식제조,
              정식수입원을 통해 유통되는 100% 정품임을 보증합니다.
            </strong>
          </p>
        </div>
        <address class="mb-3 divider">
          <span>주식회사 무신사 (MUSINSA Co., Ltd.)</span>
          <span>서울특별시 강남구 신사동 640-2 로빈명품관 지하1층</span>
          <span>사업자등록번호 : 211-88-79575</span>
          <span>통신판매업 : 2012-서울강남-01897</span>
          <span>대표 : 강정구, 한문일</span>
          <span>
            <b-link href="mailto:help@musinsa.com">
              개인정보관리책임자 : 이진우(help@musinsa.com)
            </b-link>
          </span>
          <span>호스팅사업자 : (주)무신사</span>
        </address>
        <p>
          일부 상품의 경우 주식회사 무신사는 통신판매의 당사자가 아닌
          통신판매중개자로서 상품, 상품정보, 거래에 대한 책임이 제한될 수
          있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기 바랍니다.
        </p>
      </div>
    </div>
    <div class="bg-dark text-light px-3 py-2">
      FASHION WEB MAGAZINE / LIFE STYLE SELECT SHOP
      <span class="text-white">
        <strong>WWW.MUSINSA.COM</strong>
      </span>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  font-size: 0.8rem;
}
.bracket::before {
  content: ' [ ';
}
.bracket::after {
  content: ' ] ';
}
.divider > * {
  display: inline-block;
}
.divider > :not(:last-child) {
  border-right: 1px solid gray;
  margin-right: 0.5em;
  padding-right: 0.5em;
}
.word-keep {
  word-break: keep-all;
}
</style>
