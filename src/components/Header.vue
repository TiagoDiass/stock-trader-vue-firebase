<template>
  <v-toolbar app>
    <v-toolbar-title class="headline text-uppercase mr-4">
      <span>Stock</span>
      <span class="font-weight-light">Trader</span>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn flat to="/">Início</v-btn>
      <v-btn flat to="/portfolio">Portfólio</v-btn>
      <v-btn flat to="/stocks">Ações</v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn flat @click="endDay">Finalizar Dia</v-btn>
      <v-btn flat class="red--text darken-1" @click="restartApp">Reiniciar aplicação</v-btn>

      <v-layout align-center>
        <span class="text-uppercase gray--text text--darken-2">
          Saldo: {{ funds | currency }}
        </span>
      </v-layout>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import baseStocks from '../data/baseStocks';

export default {
  computed: {
    ...mapGetters({
      funds: 'getFunds',
      stocksPortfolio: 'getStocksPortfolio',
      stocks: 'getStocks',
    }),
  },

  methods: {
    ...mapActions({
      randomizeStocks: 'randomizeStocks',
      loadData: 'loadData',
      initStocks: 'initStocks',
      saveDataAction: 'saveData',
    }),

    endDay() {
      this.$swal({
        icon: 'warning',
        title: 'Tem certeza?',
        text: 'Uma vez que você finalize o dia, o preço das ações mudarão',
        dangerMode: true,
        buttons: {
          cancel: 'Cancelar',
          ok: {
            text: 'Sim, tenho certeza',
            value: true,
          },
        },
      }).then(value => {
        if (value) {
          this.randomizeStocks();

          const globalState = {
            funds: this.funds,
            stocksPortfolio: this.stocksPortfolio,
            stocks: this.stocks,
          };

          this.saveDataAction(globalState);

          this.$swal({
            icon: 'success',
            title: 'Tudo certo',
            text: 'O dia foi finalizado, veja o novo preço das ações',
          });
        } else {
          this.$swal({
            icon: 'info',
            title: 'Okay',
            text: 'O dia não foi finalizado',
          });
        }
      });
    },

    saveData() {
      this.$swal({
        icon: 'warning',
        title: 'Tem certeza?',
        text: 'Uma vez que você salvar os dados, essa ação não poderá ser desfeita',
        dangerMode: true,
        buttons: {
          cancel: 'Cancelar',
          ok: {
            text: 'Sim, tenho certeza',
            value: true,
          },
        },
      }).then(value => {
        if (value) {
          const funds = this.funds;
          const stocksPortfolio = this.stocksPortfolio;
          const stocks = this.stocks;

          this.$httpClient.put('data.json', { funds, stocksPortfolio, stocks });
          this.$swal({
            icon: 'success',
            title: 'Tudo certo',
            text: 'Os dados foram salvos',
          });
        } else {
          this.$swal({
            icon: 'info',
            title: 'Okay',
            text:
              'Os dados não foram salvos, certifique-se de fazer tudo o que quer antes de salvá-los',
          });
        }
      });
    },

    restartApp() {
      this.$swal({
        icon: 'warning',
        title: 'Tem certeza?',
        text: 'Uma vez reiniciada, a aplicação voltará ao seu estado original',
        dangerMode: true,
        buttons: {
          cancel: 'Cancelar',
          ok: {
            text: 'Sim, tenho certeza',
            value: true,
          },
        },
      }).then(value => {
        if (value) {
          const funds = 10000;
          const stocksPortfolio = [];

          this.$httpClient
            .put('data.json', { funds, stocksPortfolio, stocks: baseStocks })
            .then(() => {
              this.loadData();
            });

          this.$swal({
            icon: 'success',
            title: 'Tudo certo',
            text: 'A aplicação foi reiniciada',
          });
        } else {
          this.$swal({
            icon: 'info',
            title: 'Okay',
            text: 'A aplicação não foi reiniciada',
          });
        }
      });
    },
  },
};
</script>

<style></style>
