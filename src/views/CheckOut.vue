<template>
  <div class="loginPageContainer">
    <div class="loginContainer" v-if="inProgress">
      <input
        type="text"
        v-model="addressLineOne"
        placeholder="Address Line 1"
      />
      <input
        type="text"
        v-model="addressLineTwo"
        placeholder="Address Line 2"
      />
      <input type="text" v-model="postCode" placeholder="Post Code" />
      <button @click="checkout">checkout</button>
      <div class="issueBox" v-if="checkoutIssue">
        There was an issue checking out
      </div>
    </div>
    <div class="completeContainer" v-else>
      Checkout successful
      <router-link to="/"><button>Return to homepage.</button></router-link>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useStore } from "vuex";
  import axios from "axios";
  import router from "@/router";
  let checkoutIssue = ref(false);
  let store = useStore();
  let addressLineOne = ref("");
  let addressLineTwo = ref("");
  let postCode = ref("");
  let inProgress = ref(true);

  if (store.getters.getPrice == 0) {
    router.push("/");
  }
  async function checkout() {
    if (store.state.loggedIn) {
      try {
        console.log(store.state.userId);
        let response = await axios({
          method: "put",
          url: `http://localhost:5000/api/orders/${store.state.userId}`,
          data: {
            addressLineOne: addressLineOne.value,
            addressLineTwo: addressLineTwo.value,
            postCode: postCode.value,
          },
          headers: {
            token: `${store.state.jsonToken}`,
          },
        });
        store.commit("setBasket", response.data.updatedCart.products);
        console.log(response);
        inProgress.value = false;
      } catch (err) {
        checkoutIssue.value = true;
        console.log(err);
        inProgress.value = false;
      }
    } else {
      try {
        console.log("Ok");
        let response = await axios({
          method: "put",
          url: `http://localhost:5000/api/orders/`,
          data: {
            addressLineOne: addressLineOne.value,
            addressLineTwo: addressLineTwo.value,
            postCode: postCode.value,
            products: store.state.basket,
          },
          headers: {
            token: `${store.state.jsonToken}`,
          },
        });
        store.commit("setBasket", []);
        console.log("ok");
        console.log(response);
        inProgress.value = false;
      } catch (err) {
        checkoutIssue.value = true;
        console.log(err);
      }
    }
  }
</script>

<style lang="scss" scoped></style>
