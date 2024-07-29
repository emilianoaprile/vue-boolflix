<template>
    <Header @searchFilms="fetchFilms" @searchSeries="fetchSeries"></Header>
    <HomePageHero :popularMovies="popularMoviesMap"></HomePageHero>
    <Main :loadingMain="loading" :films="filteredFilms" :series="filteredSeries" :noResults="noResults">
    </Main>
</template>

<script>
import Header from '../components/Header.vue';
import Main from '../components/Main.vue';
import HomePageHero from '../components/HomePageHero.vue';
import { store } from '../store.js';
import axios from 'axios';
export default {
    components: {
        Header,
        Main,
        HomePageHero,
    },
    data() {
        return {
            store,
            filmsMap: [],
            seriesMap: [],
            popularMoviesMap: [],
            popularSeriesMap: [],
            loading: false,
            searchMode: false
        }
    },
    methods: {
        fetchFilms(showLoader = true) {
            if (showLoader) { this.loading = true }
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
                    // console.log('MOVIES DATA', dataResults)
                    this.filmsMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.title,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        language: curr.original_language,
                        vote: curr.vote_average
                    }))
                    // assegno il valore dell'array mappato a quello dello store
                    store.films = this.filmsMap
                    this.loading = false
                    // console.log('Array films Map:', store.films)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        fetchSeries(showLoader = true) {
            if (showLoader) { this.loading = true }
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
                    // console.log('SERIE DATA:', dataResults)
                    this.seriesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.name,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        language: curr.original_language,
                        vote: curr.vote_average
                    }))
                    // assegno il valore dell'array mappato a quello dello store
                    store.series = this.seriesMap
                    this.loading = false
                    // console.log('Array series Map:', store.series)
                })
                .catch(err => {
                    console.error(err)
                })
        },
        fetchPopularMovies() {
            axios
                .get(`https://api.themoviedb.org/3/movie/popular?api_key=${store.api_key}&page=1`)
                .then((res) => {
                    const dataResults = res.data.results
                    this.popularMoviesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.title,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        language: curr.original_language,
                        vote: curr.vote_average
                    }))
                    store.popularMovies = this.popularMoviesMap
                    console.log('popular movies store:',store.popularMovies)

                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    computed: {
        filteredFilms() {
            return this.filmsMap.filter(film =>
                film.title.toLowerCase().includes(store.searchInput.toLowerCase())
            )
        },
        filteredSeries() {
            return this.seriesMap.filter(serie =>
                serie.title.toLowerCase().includes(store.searchInput.toLowerCase())
            )
        },
        noResults() {
            return this.searchMode && this.filteredFilms.length === 0 && this.filteredSeries.length === 0
        }
    },
    watch: {
        'store.searchInput': function (value) {
            if (value) {
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
        this.fetchPopularMovies()
    }
}
</script>

<style lang="scss" scoped></style>