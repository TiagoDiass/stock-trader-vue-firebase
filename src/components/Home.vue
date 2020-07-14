<template>
  <div>
    <h1 class="display-3 font-weight-light mb-4">Negocie e Consulte suas Ações</h1>
    <v-sheet class="px-2 py-3 d-flex align-center" :elevation="6" color="primary">
      <span class="headline white--text font-weight-light">
        <i class="fas fa-info-circle"></i>
        Você pode Salvar & Carregar os Dados
      </span>
    </v-sheet>

    <v-sheet class="px-2 py-3 d-flex align-center mt-3 darken-2" :elevation="6" color="success">
      <span class="headline white--text font-weight-light">
        <i class="fas fa-info-circle"></i>
        Clique em 'Finalizar Dia' para iniciar um novo dia!
      </span>
    </v-sheet>
    <v-divider class="my-4" />
    <p class="display-1"><strong>Seu Saldo: </strong>{{ funds }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      funds: 'getFunds',
    }),
  },
};
</script>

<style></style>
