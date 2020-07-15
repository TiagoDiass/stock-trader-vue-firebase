import Vue from 'vue';

export default {
  loadData({ commit }) {
    Vue.prototype.$httpClient.get('data.json').then(resp => {
      const data = resp.data;
      if (data) {
        console.log(data);
        commit('setStocks', data.stocks);

        commit('setPortfolio', {
          funds: data.funds,
          stocksPortfolio: data.stocksPortfolio,
        });
      }
    });
  },
};