<template>
    <section class="section_show">
        <div class="show_wrapper" v-if="randomMovie">
            <div class="jumbo">
                <img :src="imgBackSrcControll()" class="jumbo_img" alt="Movie Image">
                <div class="item_title">
                    <img class="title_img" :src="imgSrc" alt="">
                </div>
                <div class="overlay"></div>
                <div class="buttons">
                    <button class="btn btn_play">
                        <font-awesome-icon class="play_icon" :icon="['fas', 'play']" />
                        <span>Riproduci</span>
                    </button>
                    <router-link :to="{ name: 'show', params: { id: popularMovies[randomIndex].id, type: popularMovies[randomIndex].type } }">
                        <button class="btn btn_info">
                            <div class="circle">
                                <font-awesome-icon class="info_icon" :icon="['fas', 'info']" />
                            </div>
                            <span>Altre info</span>
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
    <!-- TODO: cambiare nomi delle classi -->
    <div class="myList_slider">
        <div class="myList_wrapper" v-if="store.myList.length > 0">
            <h1 class="main_content-title">La mia lista</h1>
            <div class="cards">
                <Swiper>
                    <SwiperSlide v-for="listItem in store.myList" :key="listItem.id">
                        <Card :item="listItem" :type="listItem.type"></Card>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>

        <h1 class="main_content-title">Serie TV che ti appassioneranno</h1>
        <div class="cards">
            <Swiper>
                <SwiperSlide v-for="(trendSerie, index) in store.trendingSeries" :key="trendSerie.id">
                    <Card :item="trendSerie" :type="trendSerie.type">
                    </Card>
                </SwiperSlide>
            </Swiper>
        </div>

        <h1 class="main_content-title">Top 10 film più amati di sempre</h1>
        <div class="cards">
            <Swiper>
                <SwiperSlide v-for="(topFilm, index) in store.topRatedMovies" :key="topFilm.id">
                    <CardTopRated :item="topFilm" :type="topFilm.type" :topRatedImgs="this.topRatedPaths[index]">
                    </CardTopRated>
                </SwiperSlide>
            </Swiper>
        </div>

        <h1 class="main_content-title">Serie TV popolari</h1>
        <div class="cards">
            <Swiper>
                <SwiperSlide v-for="(popularSerie, index) in store.popularSeries" :key="popularSerie.id">
                    <Card :item="popularSerie" :type="popularSerie.type">
                    </Card>
                </SwiperSlide>
            </Swiper>
        </div>

        <h1 class="main_content-title">Top 10 serie TV più votate </h1>
        <div class="cards">
            <Swiper>
                <SwiperSlide v-for="(topSerie, index) in store.topRatedSeries" :key="topSerie.id">
                    <CardTopRated :item="topSerie" :type="topSerie.type" :topRatedImgs="this.topRatedPaths[index]">
                    </CardTopRated>
                </SwiperSlide>
            </Swiper>
        </div>

        <h1 class="main_content-title">Novità su Boolflix</h1>
        <div class="cards">
            <Swiper>
                <SwiperSlide v-for="(upMovie, index) in store.upcomingMovies" :key="upMovie.id">
                    <Card :item="upMovie" :type="upMovie.type">
                    </Card>
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import { store } from '../store';
import Card from './Card.vue';
import CardTopRated from './CardTopRated.vue';
import Swiper from './Swiper.vue';
import { SwiperSlide } from 'swiper/vue';

export default {
    components: {
        Card,
        Swiper,
        SwiperSlide,
        CardTopRated
    },
    props: {
        popularMovies: {
            type: Array,
            required: true
        },
        popularSeries: {
            type: Array,
            required: true
        },
        topRatedMovies: {
            type: Array,
            required: true
        },
        topRatedSeries: {
            type: Array,
            required: true
        },
        trendingSeries: {
            type: Array,
            required: true
        },
        upcomingMovies: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            store,
            randomMovie: null,
            randomIndex: null,
            imgs: [],
            topRatedPaths: [
                '../../public/img/numero-1.png',
                '../../public/img/numero-2.png',
                '../../public/img/numero-3.png',
                '../../public/img/numero-4.png',
                '../../public/img/numero-5.png',
                '../../public/img/numero-6.png',
                '../../public/img/numero-7.png',
                '../../public/img/numero-8.png',
                '../../public/img/numero-9.png',
                '../../public/img/numero-10.png',
            ]
        }
    },
    computed: {
        imgSrc() {
            if (this.imgs.length > 0) {
                return store.imgBaseUrl + this.imgs[0].file_path
            }
        }
    },
    methods: {
        getRandomFilm() {
            const min = 0
            const max = this.popularMovies.length - 1
            this.randomIndex = Math.floor(Math.random() * (max - min + 1) + min)
            return this.popularMovies[this.randomIndex]
        },
        selectRandomMovie() {
            if (this.popularMovies.length > 0) {
                this.randomMovie = this.getRandomFilm()
                this.fetchImg()
            }
        },
        imgBackSrcControll() {
            const basePath = store.imgBaseUrl_bg
            return this.randomMovie.imgBack === null ? this.defaultImg : basePath + this.randomMovie.imgBack
        },
        fetchImg() {
            axios
                .get(`https://api.themoviedb.org/3/movie/${this.randomMovie.id}/images?api_key=923fd129639cf98cbea32d9013dacbfd`)
                .then((res) => {
                    this.imgs = res.data.logos.filter(item => item.iso_639_1 === 'en')
                })
        }
    },
    watch: {
        popularMovies: {
            handler(value) {
                if (value.length > 0) {
                    this.selectRandomMovie()
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.selectRandomMovie()
    }
}
</script>


<style lang="scss" scoped>
.section_show {
    position: relative;
    z-index: 1;
}

.myList_slider {
    position: absolute;
    top: 80%;
    left: 0;
    width: 100%;
    z-index: 2;
    background: transparent;
    padding: 20px 0;
    box-sizing: border-box;
    padding: 0 60px;
}

.cards {
    padding-top: 40px;
    padding-bottom: 40px;
}

.main_content-title {
    color: white;
    font-size: 20px;
}


.show_wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 20px;
}

.jumbo {
    position: relative;

    .jumbo_img {
        width: 100%;
        height: auto;
        max-height: 100vh;
        opacity: 0.45;
    }

    .title_img {
        width: 350px;
        max-height: 250px;
    }

    .item_title {
        position: absolute;
        bottom: 40%;
        left: 60px;
        border-radius: 30px;
        max-width: 35%;

        .title {
            font-size: 48px;
            color: white;
            text-transform: uppercase;
            padding-bottom: 20px;
            // font-family: "Cormorant Garamond", serif;
            font-weight: 700;
            font-style: normal;
        }
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, #141414, transparent 50%);
        pointer-events: none;
    }

    .buttons {
        position: absolute;
        bottom: 30%;
        left: 60px;
        width: 40%;
        display: flex;
        gap: 20px;

        .btn_play,
        .btn_info {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;

            .play_icon {
                font-size: 25px;
            }

            .info_icon {
                font-size: 16px;
            }
        }

        .btn_info:hover {
            .circle {
                border: 2px solid white;
                border-radius: 50%;
                width: 25px;
                height: 25px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .circle {
            border: 2px solid black;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.1s;
        }
    }
}
</style>