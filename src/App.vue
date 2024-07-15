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
      filmsMapped: null,
      seriesMapped: null
    }
  },
  methods: {
    fetchFilms() {
      axios
        .get(store.API_URL_MOVIES, {
          // al metodo GET passiamo l'url e un oggetto (params) che ha una proprietà (query) che prende il valore dell'input memorizzato nello store
          params: {
            query: store.searchInput
          }
        })
        .then(res => {
          // mappo i risultati della chiamata per avere un array di oggetti con le sole proprietà che mi servono
          const dataResults = res.data.results
          this.filmsMapped = dataResults.map(curr => ({
            id: curr.id,
            title: curr.title,
            original_title: curr.original_title,
            language: curr.original_language,
            vote: curr.vote_average
          }))
          // assegno il valore dell'array mappato a quello dello store
          store.films = this.filmsMapped

          console.log('Array films mapped:', store.films)
        })
        .catch(err => {
          console.error(err)
        })
    },
    fetchSeries() {
      axios
        .get(store.API_URL_SERIES, {
          // al metodo GET passiamo l'url e un oggetto (params) che ha una proprietà (query) che prende il valore dell'input memorizzato nello store
          params: {
            query: store.searchInput
          }
        })
        .then(res => {
          // mappo i risultati della chiamata per avere un array di oggetti con le sole proprietà che mi servono
          const dataResults = res.data.results
          this.seriesMapped = dataResults.map(curr => ({
            id: curr.id,
            title: curr.name,
            original_title: curr.original_name,
            language: curr.original_language,
            vote: curr.vote_average
          }))
          // assegno il valore dell'array mappato a quello dello store
          store.series = this.seriesMapped

          console.log('Array series mapped:', store.series)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  created() {
    this.fetchFilms()
    this.fetchSeries()
  }

}
</script>
<template>
  <!-- collegamento dell' $emit dove al click recuperiamo i dati che vengono ritornati dalla chiamata axios -->
  <Header @searchFilms="fetchFilms" @searchSeries="fetchSeries"></Header>
  <Main></Main>
</template>

<style lang="scss">
@use './styles/general.scss';
@use './styles/partials/variables' as *;
@use './styles/partials/mixins' as *;
</style>