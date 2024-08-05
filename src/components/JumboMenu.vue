<template>
    <section class="section_show">
        <div class="show_wrapper" v-if="randomSerie">
            <div class="jumbo">
                <img :src="imgBackSrcControll()" class="jumbo_img" alt="Movie Image">
                <div class="item_title">
                    <h1 class="title">{{ randomSerie.title }}</h1>
                    <!-- <p class="description">{{ randomSerie.description }}</p> -->
                </div>
                <div class="overlay"></div>
                <div class="buttons">
                    <button class="btn btn_play">
                        <font-awesome-icon class="play_icon" :icon="['fas', 'play']" />
                        <span>Riproduci</span>
                    </button>
                    <!-- rotta alla show della serie random -->
                    <!-- <router-link> -->
                    <button class="btn btn_info">
                        <div class="circle">
                            <font-awesome-icon class="info_icon" :icon="['fas', 'info']" />
                        </div>
                        <span>Altre info</span>
                    </button>
                    <!-- </router-link> -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { store } from '../store';
export default {
    props: {
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
            defaultImg: '/img/default-img.jpg',

        }
    },
    methods: {
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
        imgBackSrcControll() {
            const basePath = store.imgBaseUrl_bg
            return this.randomSerie.imgBack === null ? this.defaultImg : basePath + this.randomSerie.imgBack
        },
    },
    watch: {
        popularSeries: {
            handler(value) {
                if (value.length > 0) {
                    this.selectRandomSerie()
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.selectRandomSerie()
    }

}
</script>

<style lang="scss" scoped>
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

            img {
                width: 100%;
                height: auto;
                max-height: 100vh;
                opacity: 0.45;
            }

            .item_title {
                position: absolute;
                bottom: 40%;
                left: 60px;
                border-radius: 30px;
                max-width: 35%;
                z-index: 999;


                .title {
                    font-size: 48px;
                    color: white;
                    text-transform: uppercase;
                    padding-bottom: 20px;
                    // font-family: "Cormorant Garamond", serif;
                    font-weight: 700;
                    font-style: normal;
                }

                .description {
                    color: white;
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