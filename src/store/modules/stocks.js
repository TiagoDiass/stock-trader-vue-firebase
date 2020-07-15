import stocks from '../../data/baseStocks';

export default {
  state: {
    stocks: [],
  },

  mutations: {
    setStocks(state, data) {
      state.stocks = data;
    },

    setRandomStocks(state) {
      state.stocks.forEach(stock => {
        stock.price = Math.round(stock.price * (1 + Math.random() - 0.42));
      });
    },
  },

  actions: {
    buyStock({ commit }, order) {
      commit('buyStock', order);
    },

    initStocks({ commit }) {
      commit('setStocks', stocks);
    },

    randomizeStocks({ commit }) {
      commit('setRandomStocks');
    },
  },

  getters: {
    getStocks(state) {
      return state.stocks;
    },
  },
};
