<template>
    <router-link :to="{name: 'show', params: {id: item.id, type: type}}">
        <div class="card">
            <img class="card_img":src="imgFrontSrcControll()" alt="" />
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
        }
    },
    data() {
        return {
            store,
            countryString: null,
            languageNotFound: 'Lingua non trovata',
            defaultImg: '/img/default-img.jpg',
        };
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
}
</style>