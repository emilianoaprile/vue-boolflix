<template>
    <Header></Header>
    <section class="section_show">
        <div class="show_wrapper">
            <div class="jumbo">
                <img class="jumbo_img" :src="imgBackSrcControll()" alt="">
                <button>Riproduci &triangleright;</button>
                <button class="btn_round btn_addlist">&plus;</button>
                <button class="btn_round btn_like">&hearts;</button>
            </div>
            <div class="item_content">
                <div class="info_content-left">
                    <h1>titolo</h1>
                    <p>data release</p>
                    <p>tagline</p>
                    <p>Overview: Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium, incidunt. Lorem,
                        ipsum dolor sit amet consectetur adipisicing elit. Laborum, ducimus.</p>
                    <div class="vote">
                        73%
                    </div>
                </div>
                <div class="info_content-right">
                    <ul>
                        Generi:
                        <li>gen</li>
                        <li>gen</li>
                        <li>gen</li>
                        <li>gen</li>
                        <li>gen</li>
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
    display: flex;
    flex-direction: column;
}

.jumbo {
    height: 650px;

    .jumbo_img {
        height: 100%;
    }
}
</style>