export default {
  state: {
    funds: 10000,
    stocks: [],
  },

  mutations: {
    buyStock(state, { stockId, stockQuantity, stockPrice }) {
      const record = state.stocks.find(element => element.id == stockId);

      if (record) {
        record.quantity += stockQuantity;
      } else {
        state.stocks.push({
          id: stockId,
          quantity: stockQuantity,
        });
      }

      state.funds -= stockPrice * stockQuantity;
    },

    sellStock(state, { stockId, stockQuantity, stockPrice }) {
      const record = state.stocks.find(element => element.id == stockId);

      if (record.quantity > stockQuantity) {
        record.quantity -= stockQuantity;
      } else {
        state.stocks.splice(state.stocks.indexOf(record), 1);
      }

      state.funds += stockPrice * stockQuantity;
    },

    setPortfolio(state, portfolio) {
      state.funds = portfolio.funds;
      state.stocks = portfolio.stocksPortfolio ? portfolio.stocksPortfolio : [];
    },
  },

  actions: {
    sellStock({ commit }, order) {
      commit('sellStock', order);
    },
  },

  getters: {
    getStocksPortfolio(state, getters) {
      return state.stocks.map(stock => {
        const record = getters.getStocks.find(element => element.id == stock.id);

        return {
          id: stock.id,
          quantity: stock.quantity,
          name: record.name,
          price: record.price,
        };
      });
    },

    getFunds(state) {
      return state.funds;
    },
  },
};
