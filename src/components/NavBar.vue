<template>
  <div class="navBarContainer">
    <nav>
      <router-link to="/" class="homeLink">Home</router-link>
      <div class="buttonsContainer">
        <router-link to="/login" v-if="!loggedIn"> Sign In</router-link>
        <router-link to="/createAccount" v-if="!loggedIn"
          >Create Account</router-link
        >
        <div v-if="loggedIn">Hello, {{ store.state.username }}</div>
        <button v-if="loggedIn" @click="logout" class="button">Sign Out</button>
        <router-link to="/basket" class="basketLink">Basket</router-link>
      </div>
    </nav>
  </div>
</template>

<script setup>
  import { useStore } from "vuex";
  import { computed } from "vue";
  import router from "@/router";

  const store = useStore();
  function logout() {
    store.commit("setJsonToken", "");
    store.commit("setUserId", "");
    store.commit("setUsername", "");
    store.commit("login", false);
    store.commit("setBasket", []);
    router.push("/");
  }

  const loggedIn = computed(() => {
    return store.state.loggedIn;
  });
</script>

<style scoped>
  * {
    text-decoration: none;
    overflow: hidden;
  }

  *:visited {
    color: black;
  }
  .navBarContainer {
    padding: 0.5rem;
    background: #f8f9fa;
    display: flex;
    justify-content: center;
  }

  nav {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;
  }

  .buttonsContainer {
    display: flex;
    align-items: center;
  }

  .buttonsContainer > * {
    margin: 1rem;
  }

  .homeLink {
    margin: 1rem;
  }
</style>
