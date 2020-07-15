<template>
  <v-flex class="pr-3 pb-3" xs12 md6 lg4>
    <v-card class="blue darken-3 white--text">
      <v-card-title class="headline">
        <strong
          >{{ stock.name }}
          <small>(Preço: {{ stock.price | currency }} | Qtde: {{ stock.quantity }})</small>
        </strong>
      </v-card-title>
    </v-card>

    <v-card>
      <v-container fill-height>
        <v-text-field
          @keydown.enter="sellStock"
          label="Quantidade"
          type="number"
          v-model.number="quantity"
          hint="Selecione uma quantia inteira"
          :error="insufficientQuantity || !Number.isInteger(quantity)"
        ></v-text-field>

        <v-btn
          @click="sellStock"
          class="blue darken-3 white--text"
          :disabled="insufficientQuantity || quantity <= 0 || !Number.isInteger(quantity)"
        >
          {{ insufficientQuantity ? 'Insuficiente' : 'Vender' }}
        </v-btn>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    stock: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    quantity: 0,
  }),

  computed: {
    ...mapGetters({
      funds: 'getFunds',
      stocksPortfolio: 'getStocksPortfolio',
      stocks: 'getStocks',
    }),

    insufficientQuantity() {
      return this.quantity > this.stock.quantity;
    },
  },

  methods: {
    ...mapActions({
      sellStockAction: 'sellStock',
      saveData: 'saveData',
    }),

    sellStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        stockQuantity: this.quantity,
      };

      this.sellStockAction(order);

      const globalState = {
        funds: this.funds,
        stocksPortfolio: this.stocksPortfolio,
        stocks: this.stocks,
      };

      this.saveData(globalState);

      this.$swal({
        icon: 'success',
        title: 'Tudo certo',
        text: `Você vendeu ${this.quantity} ações do(a) ${this.stock.name}`,
      });

      this.quantity = 0;
    },
  },
};
</script>

<style></style>
