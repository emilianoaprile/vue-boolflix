<template>
    <Header class="header"></Header>
    <div class="sub_header">
        <div class="sub_header-wrapper" :class="{ scrolled: scrolled }">
            <h1 class="title">Film</h1>
        </div>
    </div>
    <FilmContent :popularMovies="store.popularMovies" :topFilms="store.topRatedMovies"></FilmContent>
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
            popularMoviesMap: [],
            topRatedMoviesMap: [],
            apiKey: store.api_key,
            scrolled: false

        }
    },
    methods: {
        fetchTrendingMovies() {
            axios
                .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}`)
                .then((res) => {
                    const dataResults = res.data.results
                    console.log(dataResults)
                    this.popularMoviesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.title,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        vote: curr.vote_average
                    }))

                    store.popularMovies = this.popularMoviesMap.map(curr => ({ ...curr, type: 'film' }))
                    console.log(store.popularMovies)
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

        getRandomMovie() {
            const min = 0
            const max = this.popularMoviesMap.length - 1
            this.randomIndex = Math.floor(Math.random() * (max - min + 1) + min)
            return this.popularMoviesMap[this.randomIndex]
        },
        selectRandomSerie() {
            if (this.popularMovies.length > 0) {
                this.randomMovie = this.getRandomMovie()
            }
        },
        isScrolled() {
            this.scrolled = window.scrollY > 0
        }
    },

    created() {
        this.fetchTrendingMovies()
        this.fetchTopRatedMovies()
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