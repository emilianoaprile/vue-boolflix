<template>
    <section class="newPopular_section">
        <div class="myList_slider">
            <h1 class="main_content-title">New on Boolflix</h1>
            <div class="cards">
                <Swiper>
                    <SwiperSlide v-for="(upcomingMovie, index) in upcomingMovies" :key="upcomingMovie.id">
                        <Card :item="upcomingMovie" :type="upcomingMovie.type">
                        </Card>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <div class="myList_slider">
            <h1 class="main_content-title">Top 10 most loved TV Shows</h1>
            <div class="cards">
                <Swiper>
                    <SwiperSlide v-for="(topSerie, index) in topSeries" :key="topSerie.id">
                        <CardTopRated :item="topSerie" :type="topSerie.type" :topRatedImgs="this.topRatedPaths[index]">
                        </CardTopRated>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
        <div class="myList_slider">
            <h1 class="main_content-title">Top 10 most loved movies</h1>
            <div class="cards">
                <Swiper>
                    <SwiperSlide v-for="(topMovie, index) in topMovies" :key="topMovie.id">
                        <CardTopRated :item="topMovie" :type="topMovie.type" :topRatedImgs="this.topRatedPaths[index]">
                        </CardTopRated>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>

        <div class="myList_slider">
            <h1 class="main_content-title">TV Shows coming in the next few days</h1>
            <div class="cards">
                <Swiper>
                    <SwiperSlide v-for="(upcomingSerie, index) in upcomingSeries" :key="upcomingSerie.id">
                        <Card :item="upcomingSerie" :type="upcomingSerie.type">
                        </Card>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </section>
</template>

<script>
import { store } from '../store';
import Card from './Card.vue';
import CardTopRated from './CardTopRated.vue';
import Swiper from './Swiper.vue';
import { SwiperSlide } from 'swiper/vue';
export default {
    components: {
        Card,
        CardTopRated,
        Swiper,
        SwiperSlide
    },
    props: {
        topMovies: {
            type: Array,
            require: true
        },
        topSeries: {
            type: Array,
            required: true
        },
        upcomingMovies: {
            type: Array,
            required: true
        },
        upcomingSeries: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            store,
            imgs: [],
            defaultImg: '/img/default-img.jpg',
            topRatedPaths: [
                '/img/numero-1.png',
                '/img/numero-3.png',
                '/img/numero-2.png',
                '/img/numero-4.png',
                '/img/numero-5.png',
                '/img/numero-6.png',
                '/img/numero-7.png',
                '/img/numero-8.png',
                '/img/numero-9.png',
                '/img/numero-10.png',
            ]

        }
    }
}
</script>

<style lang="scss" scoped>
.newPopular_section {
    margin-top: 164px;
}

.myList_slider {
    position: relative;
    width: 100%;
    z-index: 0;
    background: transparent;
    padding: 20px 0;
    box-sizing: border-box;
    padding: 0 60px;
}

.cards {
    padding-top: 30px;
    padding-bottom: 30px;
}

.main_content-title {
    color: white;
    font-size: 20px;
}
</style>