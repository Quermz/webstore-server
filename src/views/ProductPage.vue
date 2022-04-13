<template>
  <div class="productPageContainer">
    <div class="productContainer">
      <div class="productImageContainer">
        <img :src="product.img" alt="" class="productImage" />
      </div>
      <h2 class="productTitle">{{ product.title }}</h2>
      <p class="productDescription">{{ product.description }}</p>
      <h4 class="productPrice">£{{ product.price }}</h4>
      <button @click="addProduct" class="addToBasket">Add To Basket</button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import axios from "axios";
  import { useRoute } from "vue-router";
  import { useStore } from "vuex";

  const store = useStore();

  let product = ref();
  const route = useRoute();
  async function retrieveProduct() {
    console.log(route.params.id);
    try {
      product.value = await axios({
        method: "post",
        url: "https://cowebstore.herokuapp.com/api/products/single",
        data: {
          id: route.params.id,
        },
      });
      product.value = product.value.data;
      console.log(product.value);
    } catch (err) {
      console.log(err);
    }
  }
  retrieveProduct();

  async function addProduct() {
    store.commit("addToBasket", {
      productId: product.value.productId,
      title: product.value.title,
      img: product.value.img,
      price: product.value.price,
    });
    if (store.state.loggedIn) {
      let returnBasket = { data: { products: "none" } };
      try {
        console.log(store.state.basket);
        returnBasket = await axios({
          method: "put",
          url: `http://localhost:5000/api/cart/${store.state.userId}`,
          data: {
            products: store.state.basket,
          },
          headers: {
            token: `${store.state.jsonToken}`,
          },
        });
        console.log(returnBasket);
        store.commit("setBasket", returnBasket.data.updatedCart.products);
      } catch (err) {
        console.log(err);
      }
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
  }

  .addToBasket {
    width: 15rem;
    grid-area: button;
    justify-self: end;
  }

  @media screen and (max-width: 800px) {
    .productImageContainer {
      grid-area: img;
      height: 600px;
      justify-self: center;
    }

    .productImage {
      height: 100%;
    }

    .addToBasket {
      justify-self: center;
    }
    .productPrice {
      justify-self: center;
    }

    .productDescription {
      max-width: 550px;
    }
    .productContainer {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "img img"
        "title title"
        "description description"
        "button price";
    }
  }
</style>
