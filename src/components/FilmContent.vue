<template>
    <section class="section_show">
        <div class="show_wrapper" v-if="randomMovie">
            <div class="jumbo">
                <img :src="imgBackSrcControll()" class="jumbo_img" alt="">
                <div class="item_title">
                    <!-- <h1 class="title">{{ randomSerie.title }}</h1> -->
                    <img class="title_img" :src="imgSrc" alt="">
                    <!-- <h1 class="title" v-if="imgs.length === 0">{{ randomMovie.title }}</h1> -->
                </div>
                <div class="overlay"></div>
                <div class="buttons">
                    <button class="btn btn_play">
                        <font-awesome-icon class="play_icon" :icon="['fas', 'play']" />
                        <span>Riproduci</span>
                    </button>
                    <!-- rotta alla show della serie random -->
                    <router-link :to="{name: 'show', params: {id: randomMovie.id, type: randomMovie.type}}">
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
    <div class="myList_slider">
        <h1 class="main_content-title">Top 10 Film più amati di sempre</h1>
        <div class="cards">
            <Swiper>
                <SwiperSlide v-for="(topFilm, index) in topFilms" :key="topFilm.id">
                    <CardTopRated :item="topFilm" :type="topFilm.type" :topRatedImgs="this.topRatedPaths[index]">
                    </CardTopRated>
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
        topFilms: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            store,
            randomIndex: null,
            randomMovie: null,
            imgs: [],
            defaultImg: '/img/default-img.jpg',
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
        getRandomMovie() {
            const min = 0
            const max = this.popularMovies.length - 1
            this.randomIndex = Math.floor(Math.random() * (max - min + 1) + min)
            return this.popularMovies[this.randomIndex]
        },
        selectRandomMovie() {
            if (this.popularMovies.length > 0) {
                this.randomMovie = this.getRandomMovie()
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
                    console.log(res.data)
                    this.imgs = res.data.logos.filter(item => item.iso_639_1 === 'en')
                    console.log(this.imgs)
                })
        },
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
    },


}
</script>

<style lang="scss" scoped>
.myList_slider {
    position: absolute;
    top: 95%;
    left: 0;
    width: 100%;
    z-index: 2;
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

.section_show {
    position: relative;
    z-index: 0;
    margin-top: 68px;

    .show_wrapper {
        display: grid;
        grid-template-rows: auto 1fr;
        gap: 20px;


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
                z-index: 999;

                .title {
                    font-size: 38px;
                    color: white;
                    text-transform: uppercase;
                    padding-bottom: 20px;
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
                bottom: 25%;
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
    }

}
</style>