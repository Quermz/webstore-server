<template>
  <div class="loginPageContainer">
    <div class="loginContainer">
      <h4>Sign In</h4>
      <input type="text" v-model="email" placeholder="Email Address.." />
      <input type="text" v-model="username" placeholder="Username.." />
      <input type="text" v-model="password" placeholder="Password.." />
      <button @click="login">Submit</button>
      <div class="issueBox" v-if="loginIssue">
        There was an issue with your login details!
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useStore } from "vuex";
  import { ref } from "vue";
  import axios from "axios";
  import router from "@/router";
  const store = useStore();
  if (store.state.loggedIn) {
    router.push("/");
  }
  let email = ref("");
  let username = ref("");
  let password = ref("");
  let loginIssue = ref(false);
  async function login() {
    try {
      let response = await axios({
        method: "post",
        url: "http://localhost:5000/api/auth/login",
        data: {
          username: username.value,
          email: email.value,
          password: password.value,
        },
      });
      console.log("ok");
      console.log(response);
      store.commit("setJsonToken", response.data.accessToken);
      store.commit("setUserId", response.data.user._id);
      store.commit("setUsername", response.data.user.username);
      store.commit("login", true);
      store.commit("setBasket", response.data.cart.products);
      router.push("/");
    } catch (e) {
      loginIssue.value = true;
      console.log(e);
    }
  }
</script>

<style>
  .loginPageContainer {
    padding: 1rem;
    display: flex;
    justify-content: center;
  }
  .loginContainer {
    gap: 1rem;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .loginContainer > * {
    padding: 1rem;
    width: 100%;
  }

  .loginContainer > h4 {
    text-align: center;
    border-bottom: 1px solid black;
  }

  .loginContainer > button {
    font-weight: bold;
  }

  .issueBox {
    text-align: center;
    background: lightcoral;
    border: 1px solid black;
  }
</style>
