<template>
  <div class="basketPageInnerContainer" v-if="price != 0">
    <div class="checkOutBox">
      <h3 class="price">Your total is: £{{ price }}</h3>
      <router-link to="/checkOut" class="checkOutButton"
        ><button>Checkout</button></router-link
      >
    </div>
    <div class="basketItemsContainer">
      <div
        class="basketItem"
        v-for="(item, index) in store.state.cart"
        :key="item.productId"
      >
        <img :src="item.img" alt="" />
        <h4>{{ item.title }}</h4>
        <div>£{{ item.price }}</div>
        <div @click="deleteProduct(index)" class="removeItem">
          Remove from Cart
        </div>
      </div>
    </div>
  </div>
  <div class="emptyBasket" v-else>
    Your basket is empy.
    <router-link to="/">Return to homepage.</router-link>
  </div>
</template>

<script setup>
  import { useStore } from "vuex";
  import { computed } from "vue";

  const store = useStore();

  function deleteProduct(index) {
    if (store.state.loggedIn) {
      store.dispatch("removeFromCart", index);
    }
    if (!store.state.loggedIn) {
      store.commit("removeItemFromCart", index);
    }
  }

  let price = computed(() => {
    return store.getters.getPrice;
  });
</script>

<style scoped>
  .basketPageInnerContainer {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .basketItemsContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 800px;
    max-width: 100%;
    grid-template-rows: auto;
  }

  .checkOutBox {
    width: 400px;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .checkOutBox > h3 {
    margin-right: 1rem;
  }
  .checkOutButton > button {
    padding: 0.5rem;
    width: 100%;
    background: inherit;
    font-weight: 600;
    border-radius: 5px;
    color: rgba(6, 24, 44, 0.8);
    border: 2px rgba(6, 24, 44, 0.4) solid;
  }

  .checkOutButton > button:hover {
    cursor: pointer;
  }

  .basketItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .basketItem > img {
    width: 300px;
    max-width: 100%;
  }

  .removeItem {
    text-decoration: underline;
  }

  .removeItem:hover {
    cursor: pointer;
  }

  .emptyBasket {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 0.5rem;
  }

  @media (max-width: 600px) {
    .basketItemsContainer {
      grid-template-columns: 1fr;
      width: 400px;
    }
  }
</style>
