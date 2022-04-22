<template>
  <div class="loginPageContainer">
    <form class="loginContainer">
      <h4>Create an Account</h4>
      <div class="issueBox" v-if="creationIssue">
        Error creating your account!
      </div>
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
      <input
        type="password"
        v-model="confirmPassword"
        placeholder="Confirm your password.."
        required
        class="textInput"
      />
      <input type="submit" @click="createAccount" class="submitButton" />
    </form>
  </div>
</template>

<script setup>
  import router from "@/router";
  import { ref, computed } from "vue";

  import { useStore } from "vuex";
  const store = useStore();

  if (store.state.loggedIn) {
    router.push("/");
  }

  const creationIssue = computed(() => {
    return store.getters.getCreationError;
  });

  const email = ref("");
  const username = ref("");
  const password = ref("");
  const confirmPassword = ref("");
  async function createAccount() {
    await store.dispatch("createAccount", {
      username: username.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
  }
</script>

<style scoped></style>
