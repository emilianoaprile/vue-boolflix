<template>
    <div class="card" @mouseenter="isMouseEnter" @mouseleave="isMouseLeave">
        <img v-if="!mouseEnter" class="card_img" :src="imgFrontSrcControll()" alt="">
        <div v-else class="card_info">
            <div class="img_back">
                <img :src="imgBackSrcControll()" alt="" srcset="">
            </div>
            <div class="card_content">
                <h1 class="card_info-title">{{ film.title }}</h1>
                <p class="card_info-desc">{{ descriptionSlice(170) }}</p>
                <img class="flag_language" v-if="countryString" :src="countryFlag(countryString)" alt="">
                <p v-else class="language">Lingua: <span>{{ languageNotFound }}</span></p>
            </div>
            <div class="review_icons">
                <font-awesome-icon v-for="n in roundedVote" :key="n" :icon="['fas', 'star']" class="stars" />
                <font-awesome-icon v-for="n in emptyStars" :key="n" :icon="['far', 'star']" class="stars" />
            </div>
        </div>
    </div>
</template>



<script>
import { store } from '../store.js'

export default {
    props: {
        film: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            store,
            countryString: null,
            languageNotFound: 'Lingua non trovata',
            defaultImg: '/img/default-img.jpg',
            mouseEnter: false
        }
    },
    methods: {
        languageMap(language) {
            const availableLang = {
                en: 'en',
                it: 'it',
                es: 'es',
                fr: 'fr',
                zh: 'zh',
                de: 'de',
                ja: 'ja',
                cn: 'cn'
            }
            return availableLang[language]
        },
        countryFlag(string) {
            return `public/img/${string}.png`
        },
        imgFrontSrcControll() {
            const basePath = store.imgBaseUrl
            return this.film.imgFront === null ? this.defaultImg : basePath + this.film.imgFront
        },
        imgBackSrcControll() {
            const basePath = store.imgBaseUrl
            return this.film.imgBack === null ? this.defaultImg : basePath + this.film.imgBack
        },
        isMouseEnter() {
            this.mouseEnter = true
        },
        isMouseLeave() {
            this.mouseEnter = false
        },
        descriptionSlice(maxLength) {
            if (this.film.description.length > maxLength) {
                return this.film.description.slice(0, maxLength).trimEnd() + '...'
            }
            return this.film.description
        }
    },
    computed: {
        roundedVote() {
            return Math.ceil(this.film.vote)
        },
        emptyStars() {
            return 5 - Math.ceil(this.film.vote)
        },

    },
    created() {
        this.countryString = this.languageMap(this.film.language)
    }
}
</script>



<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.card {
    background-color: $card-bg-color;
    border-radius: $border-radius;
    max-width: $card-width;
    max-height: 100%;
    height: 450px;
    box-shadow: $box-shadow;
    color: $text-color;
    position: relative;
    overflow: hidden;

    .card_img {
        width: 100%;
        height: 100%;
        border-radius: $border-radius;
        object-fit: cover;
    }

    .card_info {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        color: $text-color;
        padding: 15px;
        border-radius: $border-radius;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .card_content {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            height: 100%;
            padding-top: 10px;
            padding-bottom: 10px;
        }

        .img_back>img {
            width: 270px;
            height: 151px;
        }
    }

    .language {
        font-size: $text-font-size;
        color: $secondary-color;

        span {
            color: $text-color;
        }
    }

    .flag_language {
        width: 30px;
    }

    .stars {
        color: gold;
    }

    .card_info-title {
        font-size: 22px;
        text-align: center;
        margin-bottom: 10px;
    }
}
</style>
