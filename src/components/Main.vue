<template>
    <main>
        <div class="container">
            <h1>films</h1>
            <div class="cards">
                <CardFilm v-for="film in store.films" :key="film.id" :film="film"></CardFilm>
            </div>
            <h1>Series</h1>
            <div class="cards">
                <CardSerie v-for="serie in store.series" :key="serie.id" :serie="serie"></CardSerie>
            </div>
        </div>
    </main>
</template>

<script>
import {store} from '../store.js'
import CardFilm from './CardFilm.vue';
import CardSerie from './CardSerie.vue';
    export default {
        components: {
            CardFilm,
            CardSerie
        },
        data() {
            return {
                store
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;


.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    padding: 30px 10px;

}
</style>