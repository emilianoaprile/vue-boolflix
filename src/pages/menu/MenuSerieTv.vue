<template>
    <Header class="header"></Header>
    <div class="sub_header">
        <div class="sub_header-wrapper" :class="{ scrolled: scrolled }">
            <h1 class="title">Serie TV</h1>
        </div>
    </div>
    <SerieTvContent 
        :trendingSeries="store.trendingSeries" 
        :topSeries="store.topRatedSeries" 
        :popularSeries="store.popularSeries">
    </SerieTvContent>
</template>

<script>
import axios from 'axios';
import Header from '../../components/Header.vue';
import SerieTvContent from '../../components/SerieTvContent.vue';
import { store } from '../../store';
export default {
    components: {
        Header,
        SerieTvContent,
    },
    data() {
        return {
            store,
            randomSerie: null,
            randomIndex: null,
            trendingSeriesMap: [],
            topRatedSeriesMap: [],
            popularSeriesMap: [],
            apiKey: store.api_key,
            scrolled: false

        }
    },
    methods: {
        fetchTrendingSeries() {
            axios
                .get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${this.apiKey}&page=${store.getRandomNumberPage(1,4)}`)
                .then((res) => {
                    const dataResults = res.data.results.filter(curr => curr.original_language === 'en')
                    console.log(dataResults)
                    this.trendingSeriesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.name,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        vote: curr.vote_average
                    }))

                    store.trendingSeries = this.trendingSeriesMap.map(curr => ({ ...curr, type: 'serie' }))
                    console.log(store.trendingSeries)
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
        fetchPopularSeries() {
            axios
                .get(`https://api.themoviedb.org/3/tv/popular?api_key=${store.api_key}&page=${store.getRandomNumberPage(1, 3)}`)
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

        getRandomSerie() {
            const min = 0
            const max = this.trendingSeriesMap.length - 1
            this.randomIndex = Math.floor(Math.random() * (max - min + 1) + min)
            return this.trendingSeriesMap[this.randomIndex]
        },
        selectRandomSerie() {
            if (this.trendingSeries.length > 0) {
                this.randomSerie = this.getRandomSerie()
            }
        },
        isScrolled() {
            this.scrolled = window.scrollY > 0
        }
    },

    created() {
        this.fetchTrendingSeries()
        this.fetchTopRatedSeries()
        this.fetchPopularSeries()
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