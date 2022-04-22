<template>
  <div class="pageContainer">
    <NavBar />
    <div class="innerAppContainer" v-if="!loading">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <FooterView />
  </div>
</template>

<script setup>
  import FooterView from "./components/FooterView.vue";
  import NavBar from "./components/NavBar.vue";
  import { onMounted, ref } from "vue";
  import { useStore } from "vuex";
  const loading = ref(true);
  const store = useStore();
  onMounted(async () => {
    if (sessionStorage.getItem("userid")) {
      await store.dispatch("refreshLogin");
      loading.value = false;
    } else {
      loading.value = false;
    }
  });
</script>

<style>
  * {
    font-family: "DM Sans", sans-serif;
    box-sizing: border-box;
    margin: 0px;
  }

  .innerAppContainer {
    min-height: 95vh;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.35s;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  a {
    color: inherit;
  }
</style>
