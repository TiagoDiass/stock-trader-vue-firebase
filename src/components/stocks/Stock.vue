<template>
  <v-flex class="pr-3 pb-3" xs12 md6 lg4>
    <v-card class="green darken-3 white--text">
      <v-card-title class="headline">
        <strong
          >{{ stock.name }} <small>(Preço: {{ stock.price }})</small></strong
        >
      </v-card-title>
    </v-card>

    <v-card>
      <v-container fill-height>
        <v-text-field
          @keydown.enter="buyStock"
          label="Quantidade"
          type="number"
          v-model.number="quantity"
          :error="insufficientFunds || !Number.isInteger(quantity)"
          hint="Selecione uma quantia inteira"
        ></v-text-field>

        <v-btn @click="buyStock" class="green darken-3 white--text" :disabled="validateStyle">
          {{ insufficientFunds ? 'Insuficiente' : 'Comprar' }}
        </v-btn>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex';
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
    }),

    insufficientFunds() {
      return this.quantity * this.stock.price > this.funds;
    },

    validateStyle() {
      return this.insufficientFunds || this.quantity <= 0 || !Number.isInteger(this.quantity);
    },
  },

  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        stockQuantity: this.quantity,
      };

      this.$store.dispatch('buyStock', order);

      this.$swal({
        icon: 'success',
        title: 'Tudo certo',
        text: `Você comprou ${this.quantity} ações do(a) ${this.stock.name}`,
      });

      this.quantity = 0;
    },
  },
};
</script>

<style></style>
