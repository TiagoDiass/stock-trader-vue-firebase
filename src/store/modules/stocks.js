import stocks from '../../data/stocks';

export default {
  state: {
    stocks: [],
  },

  mutations: {
    setStocks(state, data) {
      state.stocks = data;
    },
  },

  actions: {
    buyStock({ commit }, order) {
      commit();
    },

    initStocks({ commit }) {
      commit('setStocks', stocks);
    },
  },

  getters: {
    getStocks(state) {
      return state.stocks;
    },
  },
};
