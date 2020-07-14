<template>
  <v-layout row wrap>
    <Stock v-for="stock in stocks" :key="stock.id" :stock="stock" />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import Stock from './Stock';

export default {
  components: { Stock },

  mounted() {
    if (!this.stocks.length) {
      this.$swal({
        icon: 'error',
        title: 'Ops...',
        text:
          'Parece que você não tem nenhuma ação, compre algumas e depois volte aqui para vê-lás',
      });
    }
  },

  computed: {
    ...mapGetters({
      stocks: 'getStocksPortfolio',
    }),
  },
};
</script>

<style></style>
