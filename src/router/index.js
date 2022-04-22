import { createRouter, createWebHashHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomePage from "../views/HomePage.vue";
import ProductPage from "../views/ProductPage.vue";
import CartPage from "../views/CartPage.vue";
import CreateAccountView from "@/views/CreateAccountView.vue";
import CheckOut from "@/views/CheckOut.vue";
import OrderHistory from "@/views/OrderHistory.vue";

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
  { path: "/orderHistory", name: "orderHistory", component: OrderHistory },
  { path: "/cart", component: CartPage },
  { path: "/createAccount", component: CreateAccountView },
  { path: "/checkOut", component: CheckOut },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
