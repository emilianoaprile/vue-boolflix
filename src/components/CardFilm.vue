<template>
    <div class="card" @mouseenter="isMouseEnter" @mouseleave="isMouseLeave">
        <img v-if="!mouseEnter" class="card_img" :src="imgSrcControll()" alt="">
        <div v-else class="card-info">
            <img class="flag_language" v-if="countryString" :src="countryFlag(countryString)" alt="">
            <p v-else class="film_language">Lingua: <span>{{ languageNotFound }}</span></p>
            <div>
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
        imgSrcControll() {
            const basePath = store.imgBaseUrl
            return this.film.imgFront === null ? this.defaultImg : basePath + this.film.imgFront
        },
        isMouseEnter() {
            this.mouseEnter = true
        },
        isMouseLeave() {
            this.mouseEnter = false
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

.card {
  background-color: $card-bg-color;
  border-radius: $border-radius;
  max-width: $card-width;
  max-height: 100%;
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

  .card-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    color: $text-color;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: $border-radius;
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
    margin-bottom: 10px;
  }

  .stars {
    color: gold;
    margin-top: 10px;
  }
}
</style>
