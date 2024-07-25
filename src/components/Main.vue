<template>
    <Loader v-if="loadingMain" class="loader"></Loader>
    <main v-else class="main_content">
        <div v-if="store.films.length > 0 || store.series > 0" class="main_wrapper">
            <h1 class="main_content-title">Films</h1>
            <div class="cards">
                <Swiper>
                    <SwiperSlide v-for="film in films" :key="film.id">
                        <Card :item="film" :type="itemType.film"></Card>
                    </SwiperSlide>
                </Swiper>
            </div>
            <h1 class="main_content-title">Series</h1>
            <div class="cards">
                <Swiper>
                    <SwiperSlide v-for="serie in series" :key="serie.id">
                        <Card :item="serie" :type="itemType.serie"></Card>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    </main>
</template>

<script>
import { store } from '../store.js'
import Card from './Card.vue';
import Swiper from './Swiper.vue';
import { SwiperSlide } from 'swiper/vue';
import Loader from '../components/Loader.vue';

export default {
    props: {
        loadingMain: {
            type: Boolean,
            require: true
        },
        films: {
            type: Array,
            required: true
        },
        series: {
            type: Array,
            required: true
        }
    },
    components: {
        Card,
        Swiper,
        SwiperSlide,
        Loader
    },
    data() {
        return {
            store,
            itemType: {
                film: 'film',
                serie: 'serie'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.main_content {
    padding: 30px 60px;
    position: relative;

    .cards {
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .main_content-title {
        text-transform: uppercase;
        color: white;
    }
}

.isNotSearch > h1 {
    color: white;
    text-align: center;
    margin-top: 300px;

}

.loader {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
}
</style>