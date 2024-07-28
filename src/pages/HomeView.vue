<template>
    <Header @searchFilms="fetchFilms" @searchSeries="fetchSeries"></Header>
    <Main 
        :loadingMain="loading" 
        :films="filteredFilms" 
        :series="filteredSeries"
        :noResults="noResults">
    </Main>
</template>

<script>
import Header from '../components/Header.vue';
import Main from '../components/Main.vue';
import { store } from '../store.js';
import axios from 'axios';
export default {
    components: {
        Header,
        Main,
    },
    data() {
        return {
            store,
            filmsMapped: [],
            seriesMapped: [],
            loading: false,
            searchMode: false
        }
    },
    methods: {
        fetchFilms(showLoader = true) {
            if(showLoader) {this.loading = true}
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
                    this.loading = false
                    console.log('Array films mapped:', store.films)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        fetchSeries(showLoader = true) {
            if(showLoader) {this.loading = true}
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
                    this.loading = false
                    console.log('Array series mapped:', store.series)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    },
    computed: {
        filteredFilms() {
            return this.filmsMapped.filter(film =>
                film.title.toLowerCase().includes(store.searchInput.toLowerCase())
            )
        },  
        filteredSeries() {
            return this.seriesMapped.filter(serie =>
                serie.title.toLowerCase().includes(store.searchInput.toLowerCase())
            )
        },
        noResults() {
            return this.searchMode && this.filteredFilms.length === 0 && this.filteredSeries.length === 0
        }
    },
    watch: {
        'store.searchInput' : function(value) {
            if(value){
                this.searchMode = true
                this.fetchFilms()
                this.fetchSeries()
            } else {
                this.searchMode = false
            }
        }
    },
    created() {
        this.fetchFilms(false)
        this.fetchSeries(false)
    }
}
</script>

<style lang="scss" scoped></style>