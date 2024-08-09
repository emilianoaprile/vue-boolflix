<template>
    <router-link :to="{ name: 'show', params: { id: item.id, type: type } }">
        <div class="card">
            <div class="img_wrapper">
                <img class="number" :src="topRatedImgs" alt="" srcset="">
                <img class="card_img" :src="imgFrontSrcControll()" alt="" />
            </div>
        </div>
    </router-link>
</template>

<script>
import { store } from '../store.js';

export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        topRatedImgs: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            store,
            countryString: null,
            languageNotFound: 'Lingua non trovata',
            defaultImg: '/img/default-img.jpg',
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
            };
            return availableLang[language];
        },
        imgFrontSrcControll() {
            const basePath = store.imgBaseUrl;
            return this.item.imgFront === null ? this.defaultImg : basePath + this.item.imgFront;
        },
        imgBackSrcControll() {
            const basePath = store.imgBaseUrl;
            return this.item.imgBack === null ? this.defaultImg : basePath + this.item.imgBack;
        }
    },
    computed: {
        roundedVote() {
            return Math.ceil(this.item.vote);
        },
        emptyStars() {
            return 5 - Math.ceil(this.item.vote);
        }
    },
    created() {
        this.countryString = this.languageMap(this.item.language);
    }
};
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.card {
    // background-color: $card-bg-color;
    border-radius: $border-radius;
    max-width: $card-width;
    height: 220px;
    max-height: 100%;
    color: $text-color;
    position: relative;
    overflow: hidden;

    .img_wrapper {
        height: 100%;
        overflow: hidden;
        padding: 35.714285714% 0;
        position: relative;
        width: 100%;

        .number {
            bottom: 0;
            position: absolute;
            left: 0;
            top: 0;
            width: 49%;
            background-color: #db202cce;
            border: 2px solid white;
            border-radius: $border-radius;
            padding-left: 4px;


        }

        .card_img {
            bottom: 0;
            height: 100%;
            left: auto;
            object-fit: cover;
            position: absolute;
            right: 0;
            top: 0;
            width: 60%;
        }
    }
}
</style>
