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
    if (this.stocks == []) {
      this.$swal({
        icon: 'info',
        title: 'Opss...',
        text: 'Parece que você não tem nenhuma ação no momento',
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
