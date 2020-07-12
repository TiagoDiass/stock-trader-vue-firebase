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
          label="Quantidade"
          type="number"
          v-model.number="quantity"
          hint="Selecione uma quantia inteira"
        ></v-text-field>

        <v-btn
          @click="buyStock"
          class="green darken-3 white--text"
          :disabled="quantity <= 0 || !Number.isInteger(quantity)"
        >
          Comprar
        </v-btn>
      </v-container>
    </v-card>
  </v-flex>
</template>

<script>
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

  methods: {
    buyStock() {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        stockQuantity: this.quantity,
      };

      console.log(order);

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
