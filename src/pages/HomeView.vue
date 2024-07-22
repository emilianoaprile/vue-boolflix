<template>
    <Header @searchFilms="fetchFilms" @searchSeries="fetchSeries"></Header>
    <Main></Main>
    <Swiper></Swiper>
</template>

<script>
import Header from '../components/Header.vue';
import Main from '../components/Main.vue';
import Swiper from '../components/Swiper.vue';
import { store } from '../store.js';
import axios from 'axios';
export default {
    components: {
        Header,
        Main,
        Swiper
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
                    console.log('MOVIES DATA', dataResults)
                    this.filmsMapped = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.title,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        language: curr.original_language,
                        vote: curr.vote_average
                    }))
                    // assegno il valore dell'array mappato a quello dello store
                    store.films = this.filmsMapped
                    store.searchInput = ''

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
                    console.log('SERIE DATA:', dataResults)
                    this.seriesMapped = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.name,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        language: curr.original_language,
                        vote: curr.vote_average
                    }))
                    // assegno il valore dell'array mappato a quello dello store
                    store.series = this.seriesMapped
                    store.searchInput = ''

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

<style lang="scss" scoped></style>