<template>
  <div class="navBarContainer">
    <nav>
      <div class="buttonsContainer" v-if="!loggedIn">
        <router-link to="/" class="homeLink">Home</router-link>
        <div class="linksContainer">
          <router-link to="/login"> Sign In</router-link>
          <router-link to="/createAccount">Create Account</router-link>
          <router-link to="/cart" class="cartLink">Cart</router-link>
        </div>
      </div>

      <div class="dropDownContainer" v-if="loggedIn">
        <router-link to="/" class="homeLink">Home</router-link>
        <i class="fa-solid fa-user" @click="dropDown()"></i>
        <div class="dropDownContent" :class="{ visible: dropDownMenu }">
          <h4>Hello, &#160;{{ store.state.username }}</h4>
          <router-link to="/cart" class="cartLink" @click="dropDown()"
            >Cart</router-link
          >
          <router-link to="/orderHistory" @click="dropDown()"
            >Order History</router-link
          >
          <button @click="logout" class="button">Sign Out</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
  import { useStore } from "vuex";
  import { computed, ref } from "vue";

  const store = useStore();
  function logout() {
    store.dispatch("logout");
  }

  const dropDownMenu = ref(false);

  function dropDown() {
    dropDownMenu.value = !dropDownMenu.value;
  }

  const loggedIn = computed(() => {
    return store.state.loggedIn;
  });
</script>

<style scoped>
  * {
    text-decoration: none;
  }

  *:visited {
    color: black;
  }
  .navBarContainer {
    padding: 0.5rem 1rem;
    background: #f8f9fa;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 5px 15px 0px;
    display: flex;
    justify-content: center;
  }

  nav {
    width: 1200px;
    max-width: 100%;
    min-height: 3rem;
  }

  .buttonsContainer {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  .linksContainer {
    display: flex;
    gap: 1rem;
  }

  .buttonsContainer > * {
    margin: 1rem;
  }

  .homeLink {
    margin: 1rem;
  }

  .dropDownContainer {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .fa-user {
    width: 1.5rem;
  }

  .fa-user:hover {
    cursor: pointer;
  }

  .dropDownContent {
    display: none;
    flex-direction: column;
    gap: 1rem;
    background: #f8f9fa;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    position: absolute;
    width: 250px;
    padding: 0.5rem;
    right: 0px;
    top: 3.5rem;
    opacity: 0;
    transition: 0.25s all;
  }

  .dropDownContent > button {
    padding: 0.5rem;
    background: inherit;
    font-weight: 600;
    border-radius: 5px;
    color: rgba(6, 24, 44, 0.8);
    border: 2px rgba(6, 24, 44, 0.4) solid;
  }

  .dropDownContent > button:hover {
    cursor: pointer;
  }

  .visible {
    display: flex;
    opacity: 1;
  }

  @media (max-width: 600px) {
    .dropDownContent {
      width: 100%;
    }
  }

  @media (max-width: 350px) {
    * {
      font-size: 0.9rem;
    }
  }
</style>
