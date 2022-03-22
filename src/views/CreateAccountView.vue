<template>
  <div class="loginPageContainer">
    <div class="loginContainer">
      <h4>Create an Account</h4>
      <input type="text" v-model="email" placeholder="Email Address.." />
      <input type="text" v-model="username" placeholder="Username.." />
      <input type="text" v-model="password" placeholder="Password.." />
      <button @click="createAccount">Create Account</button>
      <div class="issueBox" v-if="loginIssue">
        There was an issue with creating your account
      </div>
      <div class="issueBox" v-if="emailIssue">
        Please check your email address
      </div>
    </div>
  </div>
</template>

<script setup>
  import router from "@/router";
  import { ref } from "vue";
  import axios from "axios";
  import { useStore } from "vuex";
  let store = useStore();
  let loginIssue = ref(false);
  let emailIssue = ref(false);
  if (store.state.loggedIn) {
    router.push("/");
  }

  let email = ref("");
  let username = ref("");
  let password = ref("");
  async function createAccount() {
    if (validateEmail(email.value)) {
      try {
        let response = await axios({
          method: "post",
          url: "http://localhost:5000/api/auth/register",
          data: {
            username: username.value,
            email: email.value,
            password: password.value,
          },
        });
        router.push("/login");
        console.log(response);
      } catch (e) {
        loginIssue.value = true;
        console.log(e);
      }
    } else {
      emailIssue.value = true;
    }
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
</script>

<style scoped></style>
