<template>
  <b-container>
    <b-img :alt="brand.name_eng" :src="brand.logo" />

    <article>
      <header>
        <div class="bread">
          <b-link :to="`/category/${upperCategory.id}`">
            {{ upperCategory.name_kor }}
          </b-link>
          >
          <b-link :to="`/category/${category.id}`">
            {{ category.name_kor }}
          </b-link>
          <b-link :to="`/brand/${brand.id}`">({{ brand.name_kor }})</b-link>
        </div>
        <h1>{{ goods.name }}</h1>
        <div>
          <b-link><b-icon icon="facebook" /></b-link>
          <b-link><b-icon icon="twitter" /></b-link>
          <b-button>
            <b-iconstack>
              <b-icon stacked icon="circle-fill" />
              URL
            </b-iconstack>
          </b-button>
        </div>
      </header>
    </article>
  </b-container>
</template>

<script>
export default {
  fetch({ route, store }) {
    store.dispatch('setLocation', route);
  },
  head() {
    return {
      title: this.title,
    };
  },
  computed: {
    brand() {
      return this.$store.state.brand;
    },
    upperCategory() {
      return this.$store.state.upperCategory;
    },
    category() {
      return this.$store.state.category;
    },
    goods() {
      return this.$store.state.goods;
    },
    title() {
      const price = this.goods.saleprice || this.goods.price;
      const title = `${this.brand.name_kor}(${this.brand.name_eng}) ${this.goods.name} - ${price}`;
      return title;
    },
  },
};
</script>

<style></style>
