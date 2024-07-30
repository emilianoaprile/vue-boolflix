<template>
    <section class="section_show">
        <div class="show_wrapper" v-if="randomMovie">
            <div class="jumbo">
                <img :src="imgBackSrcControll()" class="jumbo_img" alt="Movie Image">
                <div class="item_title">
                    <h1 class="title">{{ randomMovie.title }}</h1>
                </div>
                <div class="overlay"></div>
                <div class="buttons">
                    <button class="btn btn_play">
                        <font-awesome-icon class="play_icon" :icon="['fas', 'play']" />
                        <span>Riproduci</span>
                    </button>
                    <button class="btn">
                        Altre info
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import { store } from '../store'

export default {
    props: {
        popularMovies: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            store,
            randomMovie: null,
            randomIndex: null,
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
                console.log(this.randomMovie)
            }
        },
        imgBackSrcControll() {
            const basePath = store.imgBaseUrl_bg
            return this.randomMovie.imgBack === null ? this.defaultImg : basePath + this.randomMovie.imgBack
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
    }
}
</script>


<style lang="scss" scoped>
.show_wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 20px;
}

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


        .title {
            font-size: 48px;
            color: white;
            text-transform: uppercase;
            padding-bottom: 20px;
            font-family: "Cormorant Garamond", serif;
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
        background: linear-gradient(0deg, #181818, transparent 50%);
        pointer-events: none;
    }

    .buttons {

        position: absolute;
        bottom: 30%;
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
</style>