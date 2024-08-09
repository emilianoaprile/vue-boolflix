<template>
    <Header class="header"></Header>
    <div class="sub_header" v-if="showHero && store.searchInput.length === 0">
        <div class="sub_header-wrapper" :class="{ scrolled: scrolled }">
            <h1 class="title">Nuovi e Popolari</h1>
        </div>
    </div>
    <NewPopularContent v-if="showHero && store.searchInput.length === 0"
        :topMovies="store.topRatedMovies" 
        :topSeries="store.topRatedSeries"
        :upcomingMovies="store.upcomingMovies"
        :upcomingSeries="store.upcomingSeries">
    </NewPopularContent>
    <SearchResults 
        :loadingMain="loading" 
        :films="filteredFilms" 
        :series="filteredSeries" 
        :noResults="noResults">
    </SearchResults>
</template>

<script>
import axios from 'axios';
import Header from '../../components/Header.vue';
import SearchResults from '../../components/SearchResults.vue';
import NewPopularContent from '../../components/NewPopularContent.vue';
import { store } from '../../store';
export default {
    components: {
        Header,
        NewPopularContent,
        SearchResults
    },
    data() {
        return {
            store,
            scrolled: false,
            apiKey: store.api_key,
            topRatedSeriesMap: [],
            topRatedMoviesMap: [],
            upcomingMoviesMap: [],
            upcomingSeriesMap: [],
            filmsMap: [],
            seriesMap: [],
            loading: false,
            searchMode: false,
            showHero: true,

        }
    },
    methods: {
        isScrolled() {
            this.scrolled = window.scrollY > 0
        },
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
                    store.topRatedSeries = this.topRatedSeriesMap.slice(0, 10).map(curr => ({ ...curr, type: 'serie' }))
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
        fetchUpcomingMovies() {
            axios
                .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${store.api_key}&page=1`)
                .then(res => {
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
        fetchUpcomingSeries() {
            axios
                .get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=${store.api_key}&page=7`)
                .then(res => {
                    console.log(res.data.results)
                    const dataResults = res.data.results.filter(curr => curr.original_language === 'en')
                    this.upcomingSeriesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.name,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        vote: curr.vote_average
                    }))
                    store.upcomingSeries = this.upcomingSeriesMap.map(curr => ({...curr, type: 'serie'}))
                })
                .catch(err => {
                    console.error(err)
                })
        },

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
    created() {
        this.fetchFilms(false)
        this.fetchSeries(false)
        this.fetchTopRatedMovies()
        this.fetchTopRatedSeries()
        this.fetchUpcomingMovies()
        this.fetchUpcomingSeries()
        window.addEventListener('scroll', this.isScrolled)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.isScrolled)

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

}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
}

.sub_header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
}

.header {
    background-color: rgb(20, 20, 20);

}

.header.scrolled {
    background-color: rgb(20, 20, 20);
}

.sub_header {
    height: 68px;

    .sub_header-wrapper {
        align-items: center;
        display: flex;
        padding: 0 60px;
        margin-top: 68px;
        height: 100%;
        transition: background-color 0.3s ease;

    }

    .sub_header-wrapper.scrolled {
        background-color: rgb(20, 20, 20);
    }

    .title {
        color: #FFFFFF;
        font-size: 38px;
    }
}
</style>