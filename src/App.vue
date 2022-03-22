<template>
  <div class="pageContainer">
    <NavBar />
    <div class="innerAppContainer">
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
</script>

<style>
  * {
    font-family: "Source Sans Pro", sans-serif;
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
</style>
