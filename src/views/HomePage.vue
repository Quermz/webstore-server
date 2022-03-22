<template>
  <div class="homeContainer">
    <div class="productsContainer">
      <router-link
        v-for="product in products"
        :key="product._id"
        :to="{ name: 'products', params: { id: product._id } }"
      >
        <div class="product">
          <img :src="product.img" />
          <div class="productInfo">
            <h4 class="productTitle">{{ product.title }}</h4>
            <h4 class="price">£{{ product.price }}</h4>
          </div>
        </div></router-link
      >
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import axios from "axios";
  let products = ref([]);
  async function retrieveProducts() {
    try {
      products.value = await axios({
        method: "get",
        url: "http://localhost:5000/api/products/",
      });
      products.value = products.value.data;
      console.log(products.value);
    } catch (e) {
      console.log(e);
    }
  }
  retrieveProducts();
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

  .product > img {
    width: 100%;
    transition: all 0.25s;
  }

  .product > img:hover {
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
      rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
      rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  }

  .productInfo {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .productTitle {
    margin-right: 1rem;
  }

  .price {
  }
  @media screen and (max-width: 600px) {
    .productsContainer {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
