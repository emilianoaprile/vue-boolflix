<template>
    <Loader v-if="loadingMain" class="loader"></Loader>
    <main v-else class="main_content">
        <div v-if="renderCards" class="main_wrapper">
            <div v-if="noResults" class="no_results">
                <div class="no_results-content">
                    <h2>Your search did not have any matches</h2>
                    <p>Seggestions:</p>
                    <ul class="advice_list">
                        <li>- Try differnt keywords</li>
                        <li>- Looking for a movie o TV show?</li>
                        <li>- Try using a movie or TV show title</li>
                    </ul>
                </div>
            </div>
            <div v-else class="main_wrapper">
                <div v-if="films.length > 0">
                    <h1 class="main_content-title">Films</h1>
                    <div class="cards">
                        <Swiper>
                            <SwiperSlide v-for="film in films" :key="film.id">
                                <Card :item="film" :type="film.type"></Card>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <div v-if="series.length > 0">
                    <h1 class="main_content-title">Series</h1>
                    <div class="cards">
                        <Swiper>
                            <SwiperSlide v-for="serie in series" :key="serie.id">
                                <Card :item="serie" :type="serie.type"></Card>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>


<script>
import { store } from '../store.js';
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
        },
        noResults: {
            type: Boolean,
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
        };
    },
    computed: {
        renderCards() {
            return this.store.searchInput.length > 0 && this.store.showCards
        }
    },
    watch: {
        'store.searchInput'(value) {
            this.store.showCards = value.length > 0
        }
    },
}

</script>



<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.main_content {
    padding: 120px 60px;

    .cards {
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .main_content-title {
        color: white;
        font-size: 20px;
    }

    .no_results {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 100px;

        .no_results-content {
            font-size: 12px;
            color: white;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .advice_list>li {
            margin-top: 5px;
        }
    }
}

.isNotSearch>h1 {
    color: white;
    text-align: center;
    margin-top: 300px;

}

.loader {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    z-index: 10000;
}
</style>