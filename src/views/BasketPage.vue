<template>
  <div class="basketPageContainer">
    <div class="basketPageInnerContainer" v-if="price != 0">
      <div class="basketItemsContainer">
        <div
          class="basketItem"
          v-for="(item, index) in store.state.basket"
          :key="item.productId"
        >
          <img :src="item.img" alt="" />
          <h4>{{ item.title }}</h4>
          <button @click="deleteProduct(index)">Remove from Basket</button>
        </div>
      </div>
      <div class="checkOutBox">
        <h3 class="price">Your total is: £{{ price }}</h3>
        <router-link to="/checkOut" class="checkOutButton"
          ><button>Checkout</button></router-link
        >
      </div>
    </div>
    <div class="" v-else>
      Your basket is empy.
      <router-link to="/"><button>Return to homepage.</button></router-link>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from "vuex";
  import { computed } from "vue";
  import axios from "axios";
  const store = useStore();

  async function deleteProduct(index) {
    store.commit("removeFromBasket", index);
    if (store.state.loggedIn) {
      try {
        let returnBasket = { data: { products: "none" } };
        returnBasket = await axios({
          method: "put",
          url: `https://cowebstore.herokuapp.com/${store.state.userId}`,
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

  let price = computed(() => {
    return store.getters.getPrice;
  });
</script>

<style scoped>
  .basketPageContainer {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
  .basketPageInnerContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 1200px;
  }
  .basketItemsContainer {
  }

  .checkOutBox {
  }

  .checkOutBox > h3 {
    margin-right: 1rem;
  }
  .checkOutButton > button {
    width: 100%;
  }

  .basketItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
  }

  .basketItem > button {
    width: 100%;
  }

  .basketItem > img {
    width: 150px;
  }

  .break {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.7);
    margin-bottom: 1rem;
    margin-top: 0.5rem;
  }
</style>
