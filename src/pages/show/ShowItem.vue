<template>
    <div style="color: white;">
        Show Page
    </div>
</template>

<script>
import axios from 'axios';
import { store } from '../../store.js';
    export default {
        props: {
            id: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                filmShow: {},
                serieShow: {},
                apiKey: store.api_key
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
            }
        },
        created() {
            this.fetchFilm()
        }
    }
</script>

<style lang="scss" scoped>

</style>