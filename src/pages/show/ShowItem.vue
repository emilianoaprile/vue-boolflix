<template>
    <Header class="header" :class="{ scrolled: scrolled }"></Header>
    <section class="section_show">
        <div class="show_wrapper">
            <div class="jumbo">
                <img class="jumbo_img" :src="imgBackSrcControll()" alt="">
                <div class="item_title">
                    <img class="title_img" :src="imgSrc" alt="">
                    <p class="tagline">{{ showDetails.tagline }}</p>
                </div>
                <div class="overlay"></div>
                <div class="buttons">
                    <button class="btn btn_play">
                        <font-awesome-icon class="play_icon" :icon="['fas', 'play']" />
                        <span>Riproduci</span>
                    </button>
                    <button v-if="store.isIntoList" @click="removeFromMyList" class="btn_round btn_addlist">
                        <font-awesome-icon :icon="['fas', 'check']" />
                    </button>
                    <button v-else="store.isIntoList" @click="addToMyList" class="btn_round btn_addlist">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>

                    <button class="btn_round btn_like">
                        <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    </button>
                </div>
            </div>
            <div class="item_content">
                <div class="info_content-left">
                    <div class="date_duration">
                        <p>{{ showDetails.date }}</p>
                        <p>{{ showDetails.duration }}
                            <span v-if="showDetails.duration">min</span>
                        </p>
                        <div class="hd_box">HD</div>
                    </div>

                    <div class="description">
                        <p>{{ showDetails.description }}</p>
                    </div>

                    <div class="vote btn_round-item" :class="{
        top: ratingColors.green,
        mid: ratingColors.yellow,
        low: ratingColors.orange,
        bad: ratingColors.red
    }">
                        {{ rating }}
                        <span class="percentage">%</span>
                    </div>

                </div>
                <div class="info_content-right">
                    <ul class="genres">
                        Generi:
                        <li v-for="genre in showDetails.genres">{{ genre.name }}</li>
                    </ul>
                </div>

            </div>
        </div>
    </section>
    <ModalRemoveItem v-if="store.showModal" :showDetails="showDetails" :type="type"></ModalRemoveItem>
    

</template>

<script>
import Header from '../../components/Header.vue';
import ModalRemoveItem from '../../components/ModalRemoveItem.vue';
import axios from 'axios';
import { store } from '../../store.js';
export default {
    components: {
        Header,
        ModalRemoveItem
    },
    props: {
        id: {
            type: String,
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
            showDetails: {},
            apiKey: store.api_key,
            defaultImg: '/img/default-img.jpg',
            rating: null,
            ratingColors: {
                green: false,
                yellow: false,
                orange: false,
                red: false
            },
            scrolled: false,
            imgs: []

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
        fetchDetails() {
            const url = this.type === 'film'
                ? `https://api.themoviedb.org/3/movie/${this.id}?api_key=${this.apiKey}&language=it_IT`
                : `https://api.themoviedb.org/3/tv/${this.id}?api_key=${this.apiKey}&language=it_IT`

            axios
                .get(url)
                .then((res) => {
                    const curr = res.data;
                    console.log('response:', curr)
                    this.showDetails = {
                        id: curr.id,
                        title: this.type === 'film' ? curr.title : curr.name,
                        date: this.type === 'film' ? curr.release_date : curr.first_air_date,
                        duration: this.type === 'film' ? curr.runtime : '',
                        genres: curr.genres,
                        vote: curr.vote_average,
                        tagline: this.type === 'film' ? curr.tagline : '',
                        description: curr.overview,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                    };
                    this.loading = false;
                    console.log(this.showDetails)
                    this.generateRating()
                    this.checkIfIntoList()
                    this.fetchImg()


                })
                .catch((err) => {
                    console.error(err)
                    this.loading = false
                });
        },
        fetchImg() {
            const url = this.type === 'film'
                ? `https://api.themoviedb.org/3/movie/${this.id}/images?api_key=${this.apiKey}`
                : `https://api.themoviedb.org/3/tv/${this.id}/images?api_key=${this.apiKey}`

            axios
                .get(url)
                .then((res) => {
                    this.imgs = res.data.logos.filter(item => item.iso_639_1 === 'en')
                    console.log(this.imgs)
                })
                .catch(err => {
                    console.error(err)
                })
        },

        imgBackSrcControll() {
            const basePath = store.imgBaseUrl_bg;
            return this.showDetails.imgBack === null ? this.defaultImg : basePath + this.showDetails.imgBack;
        },
        generateRating() {
            this.rating = parseInt(this.showDetails.vote * 10)
            if (this.rating >= 70) {
                this.ratingColors.green = true
            }
            if (this.rating < 70 && this.rating >= 50) {
                this.ratingColors.yellow = true
            }
            if (this.rating < 50 && this.rating >= 30) {
                this.ratingColors.orange = true
            }
            if (this.rating < 30 && this.rating >= 0) {
                this.ratingColors.red = true
            }
            return this.rating
        },
        addToMyList() {
            store.addToMyList({ ...this.showDetails, type: this.type })
            store.isIntoList = true
            store.showModal = false
        },
        removeFromMyList() {
            store.removeFromMyList(this.showDetails)
            store.isIntoList = false
            store.showModal = true
        },
        checkIfIntoList() {
            store.isIntoList = store.myList.find(item => item.id === this.showDetails.id);
        },
        isScrolled() {
            this.scrolled = window.scrollY > 0
        }
    },
    created() {
        this.fetchDetails()
        window.addEventListener('scroll', this.isScrolled)
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.isScrolled)
    },
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: background-color 0.3s ease;
}

.header.scrolled {
    background-color: rgb(20, 20, 20);
}

.show_wrapper {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 20px;
}

.section_show {
    position: relative;
    z-index: 1;
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
        max-width: 45%;
        z-index: 999;
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 30px;

        .title {
            font-size: 38px;
            color: white;
            text-transform: uppercase;
            padding-bottom: 20px;

        }

        .tagline {
            border-radius: 30px;
            color: white;
            font-weight: 700;
            font-size: 18px
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
        bottom: 20%;
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


.item_content {
    display: flex;
    justify-content: space-between;
    padding: 30px 60px;
    color: white;
}

.info_content-left {
    width: 60%;
    padding-bottom: 20px;
    padding-right: 200px;
    border-right: 1px solid rgba(255, 255, 255, 0.63);
    position: relative;

    .vote {
        font-size: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        display: flex;
        position: absolute;
        top: 0;
        right: 30px;

        .percentage {
            font-size: 11px;
            align-self: flex-start;
            margin-top: 3px;
        }
    }

    .btn_round-item {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(42, 42, 42, 0.6);
        cursor: pointer;
        padding: 0.8rem;
        user-select: none;
        border-radius: 50%;
        color: white;

    }

    .top {
        border: 2px solid rgba(60, 255, 30, 0.6);
    }

    .mid {
        border: 2px solid rgba(255, 244, 30, 0.6);
    }

    .low {
        border: 2px solid rgba(255, 165, 30, 0.6);
    }

    .bad {
        border: 2px solid rgba(255, 30, 30, 0.6);
    }
}

.info_content-right {
    width: 30%;
    padding-bottom: 20px;
}

.genres {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.date_duration {
    display: flex;
    gap: 10px;
    margin-bottom: 25px;
}

.hd_box {
    border: 1px solid hsla(0, 0%, 100%, .4);
    border-radius: 3px;
    font-size: .7em;
    padding: 0 .5em;
    white-space: nowrap;
    display: flex;
    align-items: center;
}
</style>