import { createStore } from "vuex";
import axios from "axios";
import router from "@/router";

// Set up environment variables and base url for Axios

console.log(process.env);
axios.defaults.baseURL = "https://cowebstore.herokuapp.com/api";

export default createStore({
  state: {
    jsonToken: "",
    username: "",
    userId: "",
    loggedIn: false,
    cart: [],
    orders: [],
    products: [],
    product: {},
    checkOutError: false,
    accountCreated: false,
    creationError: false,
    loginError: false,
  },
  getters: {
    getPrice(state) {
      let price = 0;
      if (state.cart.length != 0) {
        state.cart.forEach((item) => {
          price += item.price;
        });
      }
      price = Math.round(price * 100) / 100;
      return price;
    },
    getProduct(state) {
      return state.product;
    },
    getProducts(state) {
      return state.products;
    },
    getCheckOutError(state) {
      return state.checkOutError;
    },
    getCreationError(state) {
      return state.creationError;
    },
    accountCreated(state) {
      return state.accountCreated;
    },
    getLoginError(state) {
      return state.loginError;
    },
    getOrders(state) {
      return state.orders;
    },
  },
  mutations: {
    setJsonToken(state, token) {
      state.jsonToken = token;
    },
    setUsername(state, newUsername) {
      state.username = newUsername;
    },
    setUserId(state, newId) {
      state.userId = newId;
    },
    setLogin(state, value) {
      state.loggedIn = value;
    },
    setCart(state, newCart) {
      state.cart = newCart;
    },
    addItemToCart(state, item) {
      state.cart.push(item);
    },
    removeItemFromCart(state, index) {
      state.cart.splice(index, 1);
    },
    setProducts(state, newProducts) {
      state.products = newProducts;
    },
    setProduct(state, newProduct) {
      state.product = newProduct;
    },
    setOrders(state, newOrders) {
      state.orders = newOrders;
    },
    setCheckOutError(state, newError) {
      state.checkOutError = newError;
    },
    setAccountCreated(state, newAccount) {
      state.accountCreated = newAccount;
    },
    setCreationError(state, newError) {
      state.creationError = newError;
    },
    setLoginError(state, newError) {
      state.loginError = newError;
    },
  },

  actions: {
    async login({ commit }, user) {
      try {
        let response = await axios({
          method: "post",
          url: "/auth/login",
          data: {
            username: user.username,
            email: user.email,
            password: user.password,
          },
        });
        console.log(response);
        commit("setJsonToken", response.data.accessToken);
        commit("setUserId", response.data.user._id);
        commit("setUsername", response.data.user.username);
        commit("setLogin", true);
        commit("setCart", response.data.cart.products);
        commit("setLoginError", false);
        sessionStorage.setItem("token", response.data.accessToken);
        sessionStorage.setItem("userid", response.data.user._id);

        router.push("/");
      } catch (error) {
        commit("setLoginError", true);
        console.log(error);
      }
    },
    async refreshLogin({ commit }) {
      try {
        let refresh = await axios({
          method: "post",
          url: "/auth/refreshLogin",
          data: {},
          headers: {
            token: sessionStorage.getItem("token"),
            userid: sessionStorage.getItem("userid"),
          },
        });
        commit("setJsonToken", sessionStorage.getItem("token"));
        commit("setUserId", sessionStorage.getItem("userid"));
        commit("setUsername", refresh.data.user.username);
        commit("setLogin", true);
        commit("setCart", refresh.data.cart.products);
      } catch (error) {
        sessionStorage.clear();
        console.log(error);
      }
    },

    async createAccount({ commit }, user) {
      try {
        // eslint-disable-next-line no-unused-vars
        let createAccount = await axios({
          method: "post",
          url: "/auth/register",
          data: {
            username: user.username,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
          },
        });
        commit("setAccountCreated", true);
        router.push("/login");
      } catch (error) {
        console.log(error);
        commit("setCreationError", true);
      }
    },

    logout({ commit }) {
      commit("setJsonToken", "");
      commit("setUserId", "");
      commit("setUsername", "");
      commit("setLogin", false);
      commit("setCart", []);
      commit("setOrders", false);
      sessionStorage.clear();
      router.push("/");
    },
    async fetchProducts({ commit }) {
      try {
        let newProducts = await axios({
          method: "get",
          url: "/products/",
        });
        console.log(newProducts);
        commit("setProducts", newProducts.data);
      } catch (error) {
        console.log(error);
        error;
      }
    },
    async fetchProduct({ commit }, productid) {
      try {
        let newProduct = await axios({
          method: "get",
          url: "/products/single",
          headers: { productid: productid },
        });
        commit("setProduct", newProduct.data);
      } catch (error) {
        error;
      }
    },

    async createOrder({ commit, state }, address) {
      if (state.loggedIn) {
        try {
          // eslint-disable-next-line no-unused-vars
          let response = await axios({
            method: "post",
            url: "/api/orders/createOrder",
            data: {
              addressLineOne: address.addressLineOne,
              addressLineTwo: address.addressLineTwo,
              postCode: address.postcode,
            },
            headers: {
              token: state.jsonToken,
              userid: state.userId,
            },
          });
          commit("setCheckOutError", false);
          commit("setCart", []);
        } catch (error) {
          commit("setCheckOutError", true);
        }
      } else if (!state.loggedIn) {
        try {
          // eslint-disable-next-line no-unused-vars
          let response = await axios({
            method: "post",
            url: "/orders/createAnonOrder",
            data: {
              addressLineOne: address.addressLineOne,
              addressLineTwo: address.addressLineTwo,
              postCode: address.postcode,
              products: state.basket,
            },
          });
          commit("setCheckOutError", false);
          commit("setCart", []);
        } catch (error) {
          commit("setCheckOutError", true);
        }
      }
    },
    async fetchOrders({ commit, state }) {
      try {
        let newOrders = await axios({
          method: "get",
          url: "/orders/getOrders",
          headers: {
            token: state.jsonToken,
            userid: state.userId,
          },
        });
        commit("setOrders", newOrders.data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCart({ commit, state }) {
      try {
        let newCart = await axios({
          method: "get",
          url: "/cart/getCart",
          headers: {
            token: state.jsonToken,
            userid: state.userId,
          },
        });
        commit("setCart", newCart);
      } catch (error) {
        error;
      }
    },
    async addToCart({ commit, state }, newItem) {
      try {
        commit("addItemToCart", newItem.value);
        let newCart = await axios({
          method: "put",
          url: "/cart/updateCart",
          headers: {
            token: state.jsonToken,
            userid: state.userId,
          },
          data: {
            products: state.cart,
          },
        });
        console.log(newCart);
        commit("setCart", newCart.data.updatedCart.products);
      } catch (error) {
        console.log(error);
        error;
      }
    },
    async removeFromCart({ commit, state }, index) {
      commit("removeItemFromCart", index);
      console.log(state.cart);
      try {
        let newCart = await axios({
          method: "put",
          url: "/cart/updateCart",
          headers: {
            token: state.jsonToken,
            userid: state.userId,
          },
          data: {
            products: state.cart,
          },
        });
        console.log(newCart);
        commit("setCart", newCart.data.updatedCart.products);
      } catch (error) {
        error;
      }
    },
  },
  modules: {},
});
