import { createStore } from "vuex";

export default createStore({
  state: {
    jsonToken: "",
    username: "",
    userId: "",
    loggedIn: false,
    basket: [],
  },
  getters: {
    getPrice(state) {
      let price = 0;
      if (state.basket.length != 0) {
        state.basket.forEach((item) => {
          price += item.price;
        });
      }
      price = Math.round(price * 100) / 100;
      return price;
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
    login(state, value) {
      state.loggedIn = value;
    },
    setBasket(state, newBasket) {
      state.basket = newBasket;
    },
    addToBasket(state, item) {
      state.basket.push(item);
    },
    removeFromBasket(state, index) {
      state.basket.splice(index, 1);
    },
  },

  actions: {},
  modules: {},
});
