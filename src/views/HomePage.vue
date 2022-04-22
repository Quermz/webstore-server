<template>
  <div class="homeContainer">
    <div class="productsContainer" v-if="!loading">
      <router-link
        v-for="product in products"
        :key="product._id"
        :to="{ name: 'products', params: { id: product._id } }"
      >
        <div class="product">
          <img :src="product.img" />
          <div class="productInfo">
            <div class="productTitle">{{ product.title }}</div>
            <h4 class="price">£{{ product.price }}</h4>
          </div>
        </div></router-link
      >
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useStore } from "vuex";

  const store = useStore();
  const loading = ref("true");

  const products = computed(() => {
    return store.getters.getProducts;
  });

  onMounted(async () => {
    await store.dispatch("fetchProducts");
    loading.value = false;
  });
</script>

<style scoped>
  * {
    text-decoration: none;
  }

  *:visited {
    color: black;
  }
  .homeContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .productsContainer {
    margin: 1rem;
    max-width: 1200px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;

    gap: 1rem;
  }

  .product {
    justify-self: start;
    align-self: start;
  }
  .product > img {
    width: 100%;
    transition: all 0.25s;
    justify-self: start;
    align-self: start;
  }

  .product > img:hover {
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
      rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }

  .productTitle {
    margin-right: 0.5rem;
  }

  .productInfo {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  @media (max-width: 800px) {
    .productsContainer {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
