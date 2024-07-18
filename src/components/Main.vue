<template>
    <main class="main_content">
        <h1 class="main_content-title">Films</h1>
        <div class="cards">
            <Swiper>
                <SwiperSlide v-for="film in transformedFilms" :key="film.id">
                    <Card :item="film"></Card>
                </SwiperSlide>
            </Swiper>
        </div>
        <h1 class="main_content-title">Series</h1>
        <div class="cards">
            <Swiper>
                <SwiperSlide v-for="serie in transformedSeries" :key="serie.id">
                    <Card :item="serie"></Card>
                </SwiperSlide>
            </Swiper>
        </div>
    </main>
</template>

<script>
import { store } from '../store.js'
import Card from './Card.vue';
import Swiper from './Swiper.vue';
import { SwiperSlide } from 'swiper/vue';
export default {
    components: {
        Card,
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            store
        }
    },
    computed: {
        transformedFilms() {
            // mappo i voti trasformandoli di scala da 1 a 10 -> 1 a 5 arrotondati per eccesso se >= 0.5, per difetto se < 0.5 (es. 2.4 = 2)
            return this.store.films.map(film => {
                return {
                    ...film,
                    vote: Math.round(film.vote / 2)
                };
            });
        },
        transformedSeries() {
            // mappo i voti trasformandoli di scala da 1 a 10 -> 1 a 5 arrotondati per eccesso se >= 0.5, per difetto se < 0.5 (es. 2.4 = 2)
            return this.store.series.map(serie => {
                return {
                    ...serie,
                    vote: Math.round(serie.vote / 2)
                };
            });
        }
    },
    updated() {
        // console.log(this.transformedFilms);
    }
}
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.main_content {
    padding: 30px 60px;

    .cards {
        padding-top: 30px;
        padding-bottom: 30px;
    }
    .main_content-title {
        text-transform: uppercase;
        color: white;
    }
}

</style>