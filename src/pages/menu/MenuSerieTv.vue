<template>
    <Header class="header"></Header>
    <div class="sub_header">
        <div class="sub_header-wrapper" :class="{ scrolled: scrolled }">
            <h1 class="title">Serie TV</h1>
        </div>
    </div>
    <JumboMenu :popularSeries="popularSeriesMap"></JumboMenu>
</template>

<script>
import axios from 'axios';
import Header from '../../components/Header.vue';
import JumboMenu from '../../components/JumboMenu.vue';
import { store } from '../../store'
export default {
    components: {
        Header,
        JumboMenu,
    },
    data() {
        return {
            store,
            scrolled: false,
            randomSerie: null,
            randomIndex: null,
            popularSeriesMap: [],
            apiKey: store.api_key,
            scrolled: false

        }
    },
    methods: {
        fetchPopularSeries() {
            axios
                .get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${this.apiKey}`)
                .then((res) => {
                    const dataResults = res.data.results
                    this.popularSeriesMap = dataResults.map(curr => ({
                        id: curr.id,
                        title: curr.name,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        description: curr.overview,
                        vote: curr.vote_average
                    }))

                    store.popularSeries = this.popularSeriesMap.map(curr => ({ ...curr, type: 'serie' }))
                    console.log(store.popularSeries)
                })
        },
        getRandomSerie() {
            const min = 0
            const max = this.popularSeries.length - 1
            this.randomIndex = Math.floor(Math.random() * (max - min + 1) + min)
            return this.popularSeries[this.randomIndex]
        },
        selectRandomSerie() {
            if (this.popularSeries.length > 0) {
                this.randomSerie = this.getRandomSerie()
            }
        },
        isScrolled() {
            this.scrolled = window.scrollY > 0
        }
    },

    created() {
        this.fetchPopularSeries()
        window.addEventListener('scroll', this.isScrolled)

    },
    beforeDestroy() {
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