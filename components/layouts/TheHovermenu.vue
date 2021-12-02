<template>
  <div class="hover-menu">
    <b-radio-group
      v-model="gender"
      buttons
      stacked
      button-variant="outline-secondary"
      class="gender bg-white"
      :options="genderOptions"
      aria-label="성별 선택"
    />

    <b-button-group vertical class="utility mt-3 bg-white">
      <b-button type="button" variant="outline-secondary" title="즐겨찾기">
        <b-iconstack aria-hidden="true">
          <b-icon stacked icon="circle-fill" variant="danger" />
          <b-icon stacked icon="heart-fill" scale="0.6" variant="white" />
        </b-iconstack>
      </b-button>
      <b-button type="button" variant="outline-secondary" title="장바구니">
        <b-icon icon="cart" aria-hidden="true" />
      </b-button>
      <b-button
        v-b-modal.share
        type="button"
        variant="outline-secondary"
        title="공유하기"
      >
        <b-icon icon="share" aria-hidden="true" />
      </b-button>
      <b-button
        type="button"
        variant="outline-secondary"
        :disabled="isTop"
        title="맨 위로"
        @click="scrollTop"
      >
        <b-icon icon="chevron-bar-up" scale="1.4" aria-hidden="true" />
      </b-button>
      <b-button
        type="button"
        variant="outline-secondary"
        :disabled="isBottom"
        title="화면 내리기"
        @click="pageDown"
      >
        <b-icon icon="chevron-down" aria-hidden="true" />
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
        <b-link target="_blank" :href="shareFacebook" title="페이스북으로 공유">
          <b-icon icon="facebook" font-scale="3" aria-hidden="true" />
        </b-link>
        <b-link target="_blank" :href="shareTwitter" title="트위터로 공유">
          <b-icon icon="twitter" font-scale="3" aria-hidden="true" />
        </b-link>
      </p>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollY: 0,
      gender: this.$store.state.gender,
      genderOptions: [
        { text: '전체', value: 'all' },
        { text: '남성', value: 'male' },
        { text: '여성', value: 'female' },
      ],
    };
  },
  computed: {
    isTop() {
      return this.scrollY === 0;
    },
    isBottom() {
      return this.scrollY + window.innerHeight >= document.body.offsetHeight;
    },
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
  watch: {
    gender(to, from) {
      console.log(`store: ${this.$store.state.gender}`);
      console.log(`from:${from} > to:${to}`);
      if (from) this.$store.commit('mutateGender', to);
    },
  },
  mounted() {
    // this.gender = this.$store.state.gender;
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrollY = window.scrollY;
    },
    scrollTop() {
      window.scroll({ top: 0, behavior: 'smooth' });
    },
    pageDown() {
      const targetY = scrollY + window.innerHeight * 0.9;
      window.scroll({ top: targetY, behavior: 'smooth' });
    },
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
