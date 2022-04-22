<template>
  <div class="productPageContainer">
    <div class="productContainer" v-if="!loading">
      <div class="productImageContainer">
        <img :src="product.img" alt="" class="productImage" />
      </div>
      <h2 class="productTitle">{{ product.title }}</h2>
      <p class="productDescription">{{ product.description }}</p>
      <h4 class="productPrice">£{{ product.price }}</h4>
      <button @click="addProduct" class="addToBasket" v-if="!loadingAdd">
        Add To Cart
      </button>
      <div class="loaderContainer" v-if="loadingAdd">
        <div class="loader"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, computed } from "vue";

  import { useRoute } from "vue-router";
  import { useStore } from "vuex";

  const store = useStore();
  const route = useRoute();
  const loading = ref("true");
  const product = computed(() => {
    return store.getters.getProduct;
  });
  onMounted(async () => {
    await store.dispatch("fetchProduct", route.params.id);
    loading.value = false;
  });

  const loadingAdd = ref(false);

  async function addProduct() {
    if (store.state.loggedIn) {
      loadingAdd.value = true;
      await store.dispatch("addToCart", product);
      setTimeout(() => {
        loadingAdd.value = false;
      }, 250);
    }
    if (!store.state.loggedIn) {
      loadingAdd.value = true;
      store.commit("addItemToCart", {
        productId: product.value.productId,
        title: product.value.title,
        img: product.value.img,
        price: product.value.price,
      });
      setTimeout(() => {
        loadingAdd.value = false;
      }, 250);
    }
  }
</script>

<style scoped>
  .productPageContainer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .productContainer {
    max-width: 1200px;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "img img . ."
      "img img title title"
      "img img description description"
      "img img button price"
      "img img . .";
    gap: 1rem;
  }

  img {
  }

  .productImageContainer {
    grid-area: img;
  }
  .productImage {
    width: 500px;
    max-width: 100%;
  }

  .productTitle {
    justify-self: center;
    align-self: end;
    grid-area: title;
  }
  .productDescription {
    max-width: 500px;
    align-self: center;
    justify-self: center;
    grid-area: description;
  }

  .productPrice {
    grid-area: price;
    align-self: center;
  }

  .addToBasket {
    height: 2rem;
    width: 15rem;
    grid-area: button;
    justify-self: end;
    background: inherit;
    font-weight: 600;
    border-radius: 5px;
    color: rgba(6, 24, 44, 0.8);
    border: 2px rgba(6, 24, 44, 0.4) solid;
  }

  .addToBasket:hover {
    cursor: pointer;
  }

  .loaderContainer {
    grid-area: button;

    width: 15rem;
  }

  .loader {
    border: 2px solid #f3f3f3; /* Light grey */
    border-top: 2px solid #3498db; /* Blue */
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    animation: spin 2s linear infinite;
    margin: auto;
    justify-self: center;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @media screen and (max-width: 800px) {
    .productImageContainer {
      grid-area: img;
      justify-self: center;
    }

    .productImage {
    }

    .addToBasket {
      justify-self: center;
    }
    .productPrice {
      justify-self: center;
      align-self: center;
    }

    .productDescription {
      max-width: 550px;
    }
    .productContainer {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "title title"
        "img img"
        "button price"
        "description description";
    }
  }
</style>
