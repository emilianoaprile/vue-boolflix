<template>
    <div class="card">
        <img :src="store.imgBaseUrl + film.imgFront" alt="">
        <img class="flag_language"v-if="countryString" :src="countryFlag(countryString)" alt="">
        <p v-else class="film_language">Lingua: <span>{{ languageNotFound }}</span></p>
        <div>
            <font-awesome-icon v-for="n in roundedVote" :key="n" :icon="['fas', 'star']" class="stars" />
            <font-awesome-icon v-for="n in emptyStars" :key="n" :icon="['far', 'star']" class="stars" />
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
            languageNotFound: 'Lingua non trovata'

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
        }
    },
    computed: {
        roundedVote() {
            return Math.ceil(this.film.vote)
        },
        emptyStars() {
            return 5 - Math.ceil(this.film.vote)
        }
    },
    created() {
        this.countryString = this.languageMap(this.film.language)
    },
}
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;


@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.card {
    background-color: $card-bg-color;
    border-radius: $border-radius;
    padding: $padding;
    width: $card-width;
    box-shadow: $box-shadow;
    color: $text-color;

    .film_title {
        font-size: $title-font-size;
        margin: 0 0 $margin-small;
        color: $primary-color;
    }

    .original_title {
        font-size: $subtitle-font-size;
        margin: $margin-small 0;
        color: $secondary-color;

        span {
            color: $text-color;
        }
    }

    .film_language,
    .film_rating {
        font-size: $text-font-size;
        margin: $margin-small 0;
        color: $secondary-color;

        span {
            color: $text-color;
        }
    }

    .flag_language {
        width: 40px;
    }
    .stars {
        color: gold;

    }
}
</style>