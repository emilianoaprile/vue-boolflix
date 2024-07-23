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
                filmShow: [],
                serieShow: [],
                apiKey: store.api_key
            }
        },
        methods: {
            fetchFilm() {
                axios
                .get(`https://api.themoviedb.org/3/movie/${this.id}${this.apiKey}`)
                .then((res) => {
                    console.log(res.data)
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