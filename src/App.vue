<script>
import Header from './components/Header.vue';
import Main from './components/Main.vue';
import { store } from '../src/store.js';
import axios from 'axios';

export default {
  components: {
    Header,
    Main
  },
  data() {
    return {
      store,
      dataMapped: null
    }
  },
  methods: {
    fetchData() {
      axios
        .get(store.API_URL, {
          // al metodo GET passiamo l'url e un oggetto (params) che ha una proprietà (query) che prende il valore dell'input memorizzato nello store
          params: {
            query: store.searchInput
          }
        })
        .then(res => {
          // mappo i risultati della chiamata per avere un oggetto con le sole proprietà che mi servono attualmente
          const dataResults = res.data.results
          console.log('API result:', dataResults)
          this.dataMapped = dataResults.map(curr => ({
            id: curr.id,
            title: curr.name,
            original_title: curr.original_name,
            language: curr.original_language,
            vote: curr.vote_average
          }))
          // assegno il valore dell'array mappato a quello dello store
          store.films = this.dataMapped

          console.log('Array mapped:', store.films)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  created() {
    this.fetchData()
  }

}
</script>
<template>
  <!-- collegamento dell' $emit dove al click recuperiamo i dati che vengono ritornati dalla chiamata axios -->
  <Header @search="fetchData"></Header>
  <Main></Main>
</template>

<style lang="scss">
@use './styles/general.scss';
@use './styles/partials/variables' as *;
@use './styles/partials/mixins' as *;
</style>