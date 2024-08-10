<template>
    <div class="home_view">
        <Header class="header" :class="{ scrolled: scrolled}" @searchFilms="fetchFilms" @searchSeries="fetchSeries"></Header>
        <MainContent v-if="showHero && store.searchInput.length === 0" 
        :popularMovies="store.popularMovies"
        :popularSeries="store.popularSeries"
        :topRatedMovies="store.topRatedMovies"
        :topRatedSeries="store.topRatedSeries"
        :trendingSeries="store.trendingSeries"
        :upcomingMovies="store.upcomingMovies"
        >
        </MainContent>
        <SearchResults 
        :loadingMain="loading" 
        :films="filteredFilms" 
        :series="filteredSeries" 
        :noResults="noResults">
        </SearchResults>
    </div>
</template>



<script>
import Header from '../components/Header.vue';
import SearchResults from '../components/SearchResults.vue';
import MainContent from '../components/MainContent.vue';
import { store } from '../store.js';
import axios from 'axios';
export default {
    components: {
        Header,
        SearchResults,
        MainContent,
    },
    data() {
        return {
            store,
            filmsMap: [],
            seriesMap: [],
            popularMoviesMap: [],
            popularSeriesMap: [],
            trendingSeriesMap: [],
            topRatedMoviesMap: [],
            topRatedSeriesMap: [],
            upcomingMoviesMap: [],
            loading: false,
            searchMode: false,
            showHero: true,
            scrolled: false,
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
                    store.films = this.filmsMap.map(curr => ({...curr, type: 'film'}))
                    this.loading = false
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
                    store.series = this.seriesMap.map(curr => ({...curr, type: 'serie'}))
                    this.loading = false
                })
                .catch(err => {
                    console.error(err)
                })
        },
        fetchPopularMovies() {
            axios
                .get(`https://api.themoviedb.org/3/movie/popular?api_key=${store.api_key}&page=1`)
                .then((res) => {
                    const dataResults = res.data.results.filter(curr => curr.original_language === 'en')
                    this.popularMoviesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.title,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        language: curr.original_language,
                        vote: curr.vote_average
                    }))
                    store.popularMovies = this.popularMoviesMap.map(curr => ({...curr, type: 'film'}))

                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetchPopularSeries() {
            axios
                .get(`https://api.themoviedb.org/3/tv/popular?api_key=${store.api_key}&page=3`)
                .then(res => {
                    const dataResults = res.data.results.filter(curr => curr.original_language === 'en')
                    this.popularSeriesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.name,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        language: curr.original_language,
                        vote: curr.vote_average
                    }))
                    store.popularSeries = this.popularSeriesMap.map(curr => ({...curr, type: 'serie'}))
                })
                .catch(err => {
                    console.error(err)
                })
        },
    
        fetchTopRatedMovies() {
            axios
                .get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${store.api_key}`)
                .then((res) => {
                    const dataResults = res.data.results
                    this.topRatedMoviesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.title,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        language: curr.original_language,
                        vote: curr.vote_average
                    }))
                    store.topRatedMovies = this.topRatedMoviesMap.slice(0, 10).map(curr => ({...curr, type: 'film'}))
                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetchTopRatedSeries() {
            axios
                .get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${store.api_key}`)
                .then((res) => {
                    const dataResults = res.data.results
                    this.topRatedSeriesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.name,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        language: curr.original_language,
                        vote: curr.vote_average
                    }))
                    store.topRatedSeries = this.topRatedSeriesMap.slice(0, 10).map(curr => ({...curr, type: 'serie'}))
                })
                .catch(err => {
                    console.log(err)
                })
        },
        fetchTrendingSeries() {
            axios
                .get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${store.api_key}&page=3`)
                .then((res) => {
                    const dataResults = res.data.results.filter(curr => curr.original_language === 'en')
                    this.trendingSeriesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.name,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        vote: curr.vote_average
                    }))

                    store.trendingSeries = this.trendingSeriesMap.map(curr => ({ ...curr, type: 'serie' }))
                })
                .catch(err => {
                    console.error(err)
                })
        },

        fetchUpcomingMovies() {
            axios
                .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${store.api_key}&page=1`)
                .then(res => {
                    console.log(res.data.results)
                    const dataResults = res.data.results.filter(curr => curr.original_language === 'en')
                    this.upcomingMoviesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.title,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        vote: curr.vote_average
                    }))
                    store.upcomingMovies = this.upcomingMoviesMap.map(curr => ({...curr, type: 'film'}))
                })
                .catch(err => {
                    console.error(err)
                })
        },

        isScrolled() {
            this.scrolled = window.scrollY > 0
        }
    },
    computed: {
        filteredFilms() {
            return this.store.films.filter(film =>
                film.title.toLowerCase().includes(store.searchInput.toLowerCase())
            )
        },
        filteredSeries() {
            return this.store.series.filter(serie =>
                serie.title.toLowerCase().includes(store.searchInput.toLowerCase())
            )
        },
        noResults() {
            return this.searchMode && this.filteredFilms.length === 0 && this.filteredSeries.length === 0
        },
    },
    watch: {
        'store.searchInput': function (value) {
            if (value) {
                this.searchMode = true
                this.showHero = false
                this.fetchFilms()
                this.fetchSeries()
            } else {
                this.searchMode = false
                this.showHero = true
            }
        }
    },
    created() {
        this.fetchFilms(false)
        this.fetchSeries(false)

        this.fetchPopularMovies()
        this.fetchPopularSeries()

        this.fetchTopRatedMovies()
        this.fetchTopRatedSeries()

        this.fetchTrendingSeries()
        this.fetchUpcomingMovies()

        window.addEventListener('scroll', this.isScrolled)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.isScrolled)
    },
}
</script>

<style lang="scss" scoped>
.home_view {

    .header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        transition: background-color 0.3s ease;
    }

    .header.scrolled {
        background-color: rgb(20, 20, 20);
    }
}
</style>
