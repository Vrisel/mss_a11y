<template>
  <div class="hover-menu">
    <b-radio-group
      buttons
      stacked
      button-variant="outline-secondary"
      class="gender"
      :options="['전체', '남성', '여성']"
    />

    <b-button-group vertical class="utility mt-3">
      <b-button type="button" variant="outline-secondary">
        <b-iconstack>
          <b-icon stacked icon="circle-fill" variant="danger" />
          <b-icon stacked icon="heart-fill" scale="0.7" variant="white" />
        </b-iconstack>
        <span class="sr-only">좋아요</span>
      </b-button>
      <b-button type="button" variant="outline-secondary">
        <b-icon icon="cart" />
        <span class="sr-only">장바구니</span>
      </b-button>
      <b-button v-b-modal.share type="button" variant="outline-secondary">
        <b-icon icon="share" />
        <span class="sr-only">공유하기</span>
      </b-button>
      <b-button type="button" variant="outline-secondary">
        <b-icon icon="chevron-bar-up" scale="1.4" />
        <span class="sr-only">맨 위로</span>
      </b-button>
      <b-button type="button" variant="outline-secondary">
        <b-icon icon="chevron-down" />
        <span class="sr-only">화면 내리기</span>
      </b-button>
    </b-button-group>

    <b-modal id="share" no-stacking centered lazy>
      <template #modal-ok />
      <template #modal-cancel />
      <p>현재 보고 있는 페이지를 공유합니다.</p>
      <b-input-group>
        <b-input v-model="shareUrl" type="text" readonly />
        <b-input-group-append>
          <b-button type="button" @click="copyUrl">URL복사</b-button>
        </b-input-group-append>
      </b-input-group>
      <p class="text-center mt-3">
        <b-link target="_blank" :href="shareFacebook" title="페이스북">
          <b-icon icon="facebook" font-scale="3" />
        </b-link>
        <b-link target="_blank" :href="shareTwitter" title="트위터">
          <b-icon icon="twitter" font-scale="3" />
        </b-link>
      </p>
    </b-modal>
  </div>
</template>

<script>
export default {
  computed: {
    shareUrl() {
      return process.env.baseUrl + this.$route.fullPath;
    },
    shareFacebook() {
      return `https://www.facebook.com/sharer/sharer.php?u=${this.shareUrl}`;
    },
    shareTwitter() {
      return `https://twitter.com/intent/tweet?text=${document.title}&url=${this.shareUrl}`;
    },
  },
  methods: {
    copyUrl() {
      navigator.clipboard.writeText(this.shareUrl).then(function () {
        alert('복사되었습니다!');
      });
    },
  },
};
</script>

<style scoped>
.hover-menu {
  position: fixed;
  bottom: 0;
  right: 0;
  display: grid;
  width: 51px;
  font-size: 0.8rem;
  z-index: 999;
}
.hover-menu >>> .btn {
  padding: 0 !important;
  height: 51px;
}
* >>> #share .modal-footer {
  display: none;
}
</style>
