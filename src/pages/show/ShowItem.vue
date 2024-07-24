<template>
    <Header></Header>
    <section class="section_show">
        <div class="show_wrapper">
            <div class="jumbo">
                <img class="jumbo_img" :src="imgBackSrcControll()" alt="">
                <div class="item_title">
                    <h1 class="title">{{ filmShow.title }}</h1>
                    <p class="tagline">{{ filmShow.tagline }}</p>
                </div>
                <div class="overlay"></div>
                <div class="buttons">
                    <button class="btn btn_play">
                        <font-awesome-icon class="play_icon" :icon="['fas', 'play']" />
                        <span>Riproduci</span>
                    </button>
                    <button class="btn_round btn_addlist">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                    <button class="btn_round btn_like">
                        <font-awesome-icon :icon="['far', 'thumbs-up']" />
                    </button>
                    <div class="vote btn_round">
                        73%
                    </div>
                </div>
            </div>
            <div class="item_content">
                <div class="info_content-left">
                    <div class="date_duration">
                        <p>{{ filmShow.date }}</p>
                        <p>{{ filmShow.duration }} min</p>
                        <div class="hd_box">HD</div>
                    </div>

                    <div class="description">
                        <p>{{ filmShow.description }}</p>
                    </div>

                </div>
                <div class="info_content-right">
                    <ul class="genres">
                        Generi:
                        <li v-for="genre in filmShow.genres">{{ genre.name }}</li>
                    </ul>
                </div>

            </div>
        </div>
    </section>

</template>

<script>
import Header from '../../components/Header.vue';
import axios from 'axios';
import { store } from '../../store.js';
export default {
    components: {
        Header
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            store,
            filmShow: {},
            serieShow: {},
            apiKey: store.api_key,
            defaultImg: '/img/default-img.jpg',
        }
    },
    methods: {
        fetchFilm() {
            axios
                .get(`https://api.themoviedb.org/3/movie/${this.id}${this.apiKey}`)
                .then((res) => {
                    const curr = res.data
                    console.log(curr)
                    this.filmShow = {
                        title: curr.title,
                        date: curr.release_date,
                        duration: curr.runtime,
                        genres: curr.genres,
                        vote: curr.vote_average,
                        tagline: curr.tagline,
                        description: curr.overview,
                        imgFront: curr.poster_path,
                        imgBack: curr.backdrop_path,
                        imagesCollection: curr.belongs_to_collection
                    }
                    console.log(this.filmShow)
                })
        },
        imgBackSrcControll() {
            const basePath = store.imgBaseUrl_bg;
            return this.filmShow.imgBack === null ? this.defaultImg : basePath + this.filmShow.imgBack;
        },
    },
    created() {
        this.fetchFilm()
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
        max-height: 85vh;
        opacity: 0.45;
    }

    .item_title {
        position: absolute;
        bottom: 40%;
        left: 60px;
        border-radius: 30px;
        max-width: 45%;

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
        background: linear-gradient(0deg, #181818, transparent 50%);
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

        .vote {
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}


.item_content {
    display: flex;
    justify-content: space-between;
    padding: 0 60px;
    color: white;
}

.info_content-left {
    width: 60%;
    padding-bottom: 20px;
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