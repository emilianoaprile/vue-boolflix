<template>
    <Header class="header"></Header>
    <div class="sub_header">
        <div class="sub_header-wrapper" :class="{ scrolled: scrolled }">
            <h1 class="title">Film</h1>
        </div>
    </div>
    <FilmContent 
    :trendingMovies="store.trendingMovies" 
    :topRatedFilms="store.topRatedMovies"
    :popularMovies="store.popularMovies"
    >
    </FilmContent>
</template>

<script>
import axios from 'axios';
import Header from '../../components/Header.vue';
import FilmContent from '../../components/FilmContent.vue';
import { store } from '../../store';
export default {
    components: {
        Header,
        FilmContent,
    },
    data() {
        return {
            store,
            randomSerie: null,
            randomIndex: null,
            trendingMoviesMap: [],
            topRatedMoviesMap: [],
            popularMoviesMap: [],
            apiKey: store.api_key,
            scrolled: false

        }
    },
    methods: {
        fetchTrendingMovies() {
            axios
                .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}&page=${store.getRandomNumberPage(1, 4)}`)
                .then((res) => {
                    const dataResults = res.data.results
                    console.log(dataResults)
                    this.trendingMoviesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.title,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        vote: curr.vote_average
                    }))

                    store.trendingMovies = this.trendingMoviesMap.map(curr => ({ ...curr, type: 'film' }))
                    console.log(store.trendingMovies)
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
        fetchPopularMovies() {
            axios
                .get(`https://api.themoviedb.org/3/movie/popular?api_key=${store.api_key}&page=${store.getRandomNumberPage(1,4)}`)
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
        
        isScrolled() {
            this.scrolled = window.scrollY > 0
        }
    },

    created() {
        this.fetchTrendingMovies()
        this.fetchTopRatedMovies()
        this.fetchPopularMovies()
        window.addEventListener('scroll', this.isScrolled)

    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.isScrolled)
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