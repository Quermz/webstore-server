<template>
  <div class="checkOutPageContainer">
    <form class="checkOutInnerContainer" v-if="inProgress">
      <h4 class="price">Your total is: £{{ price }}</h4>
      <div v-if="checkOutError" class="issueBox">
        There was an issue checking out!
      </div>
      <input
        type="text"
        v-model="addressLineOne"
        placeholder="Address Line 1"
        required
        class="textInput"
      />
      <input
        type="text"
        v-model="addressLineTwo"
        placeholder="Address Line 2"
        required
        class="textInput"
      />
      <input
        type="text"
        v-model="postCode"
        placeholder="Post Code"
        required
        class="textInput"
      />
      <input type="submit" @click="checkout" class="submitButton" />
    </form>
    <div class="completeContainer" v-if="!inProgress">
      Checkout successful
      <router-link to="/"><button>Return to homepage.</button></router-link>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useStore } from "vuex";

  const checkOutError = computed(() => {
    return store.getters.getCheckOutError;
  });
  let price = computed(() => {
    return store.getters.getPrice;
  });
  let store = useStore();
  let addressLineOne = ref("");
  let addressLineTwo = ref("");
  let postCode = ref("");
  let inProgress = ref(true);

  // if (store.getters.getPrice == 0) {
  //   router.push("/");
  // }
  async function checkout() {
    await store.dispatch("createOrder", {
      addressLineOne: addressLineOne.value,
      addressLineTwo: addressLineTwo.value,
      postcode: postCode.value,
    });
    if (!checkOutError.value) {
      inProgress.value = false;
    }
  }
</script>

<style scoped>
  .checkOutPageContainer {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
  .checkOutInnerContainer {
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 100%;
    gap: 1rem;
  }

  .checkOutInnerContainer > input {
    padding: 1rem;
  }

  .error {
    padding: 1rem;
    text-align: center;
    background: lightcoral;
    border: 1px solid black;
  }
</style>
