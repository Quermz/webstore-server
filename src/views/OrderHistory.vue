<template>
  <div class="pageInnerContainer" v-if="!loading">
    <div class="orderContainer" v-for="order in orders" :key="order._id">
      <h3>Order {{ order._id }}</h3>
      <div>Order placed on {{ order.createdAt.split("T")[0] }}</div>
      <div class="">Total Price: £{{ order.totalPrice }}</div>
      <div class="">Post Code: {{ order.postCode }}</div>
      <h4>Product List</h4>
      <div class="productList">
        <div
          class="product"
          v-for="product in order.products"
          :key="product._id"
        >
          {{ product.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref, computed } from "vue";
  import { useStore } from "vuex";
  const store = useStore();
  const loading = ref(true);
  const orders = computed(() => {
    return store.getters.getOrders;
  });

  onMounted(async () => {
    await store.dispatch("fetchOrders");
    loading.value = false;
  });
</script>

<style scoped>
  .pageInnerContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }

  .orderContainer {
    border: 2px solid black;
    padding: 1rem;
    width: 600px;
    max-width: 100%;
  }

  h3 {
    text-align: center;
  }
</style>
