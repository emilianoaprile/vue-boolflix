<template>
    <section class="section_show">
        <div class="show_wrapper" v-if="randomSerie">
            <div class="jumbo">
                <img :src="imgBackSrcControll()" class="jumbo_img" alt="">
                <div class="item_title">
                    <img class="title_img" :src="imgTitleSrc" alt="">
                </div>
                <div class="overlay"></div>
                <div class="buttons">
                    <button class="btn btn_play">
                        <font-awesome-icon class="play_icon" :icon="['fas', 'play']" />
                        <span>Play</span>
                    </button>
                    <router-link :to="{ name: 'show', params: { id: randomSerie.id, type: randomSerie.type } }">
                        <button class="btn_info">
                            <div class="circle">
                                <font-awesome-icon class="info_icon" :icon="['fas', 'info']" />
                            </div>
                            <span>More Info</span>
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </section>
    <div class="myList_slider">
        <h1 class="main_content-title">Popular TV series chosen for you</h1>
        <div class="cards">
            <Swiper>
                <SwiperSlide v-for="(popularSerie, index) in store.popularSeries" :key="popularSerie.id">
                    <Card :item="popularSerie" :type="popularSerie.type">
                    </Card>
                </SwiperSlide>
            </Swiper>
        </div>

        <h1 class="main_content-title">Top 10 most loved TV Shows of all time</h1>
        <div class="cards">
            <Swiper>
                <SwiperSlide v-for="(topSerie, index) in topSeries" :key="topSerie.id">
                    <CardTopRated :item="topSerie" :type="topSerie.type" :topRatedImgs="this.topRatedPaths[index]">
                    </CardTopRated>
                </SwiperSlide>
            </Swiper>
        </div>

        <h1 class="main_content-title">Most watched TV Shows right now</h1>
        <div class="cards">
            <Swiper>
                <SwiperSlide v-for="(trendSerie, index) in trendingSeries" :key="trendSerie.id">
                    <Card :item="trendSerie" :type="trendSerie.type">
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
        trendingSeries: {
            type: Array,
            required: true
        },
        topSeries: {
            type: Array,
            required: true
        },
        popularSeries: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            store,
            randomIndex: null,
            randomSerie: null,
            imgs: [],
            defaultImg: '/img/default-img.jpg',
            topRatedPaths: [
                '/img/numero-1.png',
                '/img/numero-2.png',
                '/img/numero-3.png',
                '/img/numero-4.png',
                '/img/numero-5.png',
                '/img/numero-6.png',
                '/img/numero-7.png',
                '/img/numero-8.png',
                '/img/numero-9.png',
                '/img/numero-10.png',
            ]
        }
    },
    computed: {
        imgTitleSrc() {
            if (this.imgs.id === this.randomSerie.id) {
                return store.imgBaseUrl + this.imgs.src
            }
        }
    },
    methods: {
        getRandomSerie() {
            const min = 0
            const max = 10
            this.randomIndex = Math.floor(Math.random() * (max - min + 1) + min)
            return this.trendingSeries[this.randomIndex]
        },
        selectRandomSerie() {
            if (this.trendingSeries.length > 0) {
                this.randomSerie = this.getRandomSerie()
                this.fetchImg()
            }
        },
        imgBackSrcControll() {
            const basePath = store.imgBaseUrl_bg
            return this.randomSerie.imgBack === null ? this.defaultImg : basePath + this.randomSerie.imgBack
        },

        fetchImg() {
            axios
                .get(`https://api.themoviedb.org/3/tv/${this.randomSerie.id}/images?api_key=${store.api_key}`)
                .then((res) => {
                    const imgsObj = res.data.logos.find(item => item.iso_639_1 === 'en')
                    console.log(imgsObj)
                    const filePath = imgsObj.file_path
                    this.imgs = {
                        id: this.randomSerie.id,
                        src: filePath
                    }
                })
        }

    },
    watch: {
        trendingSeries: {
            handler(value) {
                if (value.length > 0) {
                    this.selectRandomSerie()
                }
            },
            immediate: true,
            deep: true
        }
    },
    mounted() {
        this.selectRandomSerie()
    },


}
</script>

<style lang="scss" scoped>
.myList_slider {
    position: absolute;
    top: 95%;
    left: 0;
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

                .btn_play {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;

                    .play_icon {
                        font-size: 25px;
                    }
                }
            }
        }
    }

}
</style>