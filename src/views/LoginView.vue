<template>
  <form class="loginContainer">
    <h4>Sign In</h4>
    <div class="issueBox" v-if="loginError">
      There was an issue with your login details!
    </div>
    <div v-if="accountCreated">Account Created!</div>
    <input
      type="email"
      v-model="email"
      placeholder="Email Address.."
      required
      class="textInput"
    />
    <input
      type="text"
      v-model="username"
      placeholder="Username.."
      required
      class="textInput"
    />
    <input
      type="password"
      v-model="password"
      placeholder="Password.."
      required
      class="textInput"
    />
    <input type="submit" @click="login" class="submitButton" />
  </form>
</template>

<script setup>
  import { useStore } from "vuex";
  import { ref, computed } from "vue";
  import router from "@/router";
  const store = useStore();

  if (store.state.loggedIn) {
    router.push("/");
  }

  const loginError = computed(() => {
    return store.getters.getLoginError;
  });
  const accountCreated = computed(() => {
    return store.getters.accountCreated;
  });
  const email = ref("");
  const username = ref("");
  const password = ref("");
  async function login() {
    store.dispatch("login", {
      email: email.value,
      username: username.value,
      password: password.value,
    });
  }
</script>

<style>
  .loginContainer {
    padding: 1rem;
    gap: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .loginContainer > * {
    width: 400px;
    max-width: 90%;
    padding: 1rem;
  }

  .loginContainer > h4 {
    text-align: center;
    border-bottom: 1px solid black;
  }

  .submitButton {
    background: inherit;
    font-weight: 600;
    border-radius: 5px;
    color: rgba(6, 24, 44, 0.8);
    border: 2px rgba(6, 24, 44, 0.4) solid;
  }

  .submitButton:hover {
    cursor: pointer;
  }

  .textInput {
    border: none;
    border-bottom: 1px rgba(6, 24, 44, 0.4) solid;
  }

  .textInput:focus {
    outline: none;
    border: none;
    border-bottom: 1px black solid;
  }

  .issueBox {
    padding: 1rem;
    text-align: center;
    background: rgb(240, 128, 128, 0.25);
    border: 1px solid black;
    border-radius: 5px;
  }
</style>
