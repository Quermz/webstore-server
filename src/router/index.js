import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomePage from "../views/HomePage.vue";
import ProductPage from "../views/ProductPage.vue";
import BasketPage from "../views/BasketPage.vue";
import CreateAccountView from "@/views/CreateAccountView.vue";
import CheckOut from "@/views/CheckOut.vue";

const routes = [
  {
    path: "/",
    name: "homepage",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/products/:id",
    name: "products",
    component: ProductPage,
  },
  { path: "/basket", component: BasketPage },
  { path: "/createAccount", component: CreateAccountView },
  { path: "/checkOut", component: CheckOut },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
