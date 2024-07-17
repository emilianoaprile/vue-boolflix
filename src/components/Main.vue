<template>
    <main class="main_content">
        <h1>films</h1>
        <div class="cards">
            <CardFilm v-for="film in transformedFilms" :key="film.id" :film="film"></CardFilm>
        </div>
        <h1>Series</h1>
        <div class="cards">
            <CardSerie v-for="serie in transformedSeries" :key="serie.id" :serie="serie"></CardSerie>
        </div>
    </main>
</template>

<script>
import { store } from '../store.js'
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
    },
    computed: {
        transformedFilms() {
            // mappo i voti trasformandoli di scala da 1 a 10 -> 1 a 5 arrotondati per eccesso se >= 0.5, per difetto se < 0.5 (es. 2.4 = 2)
            return this.store.films.map(film => {
                return {
                    ...film,
                    vote: Math.round(film.vote / 2)
                };
            });
        },
        transformedSeries() {
            // mappo i voti trasformandoli di scala da 1 a 10 -> 1 a 5 arrotondati per eccesso se >= 0.5, per difetto se < 0.5 (es. 2.4 = 2)
            return this.store.series.map(serie => {
                return {
                    ...serie,
                    vote: Math.round(serie.vote / 2)
                };
            });
        }
    },
    updated() {
        // console.log(this.transformedFilms);
    }
}
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.main_content {
    padding: 0 60px;
}
.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 40px;
    padding: 30px 10px;

}
</style>