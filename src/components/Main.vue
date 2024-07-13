<template>
    <main>
        <div class="container">
            <div class="cards">
                <Card v-for="film in store.films" :key="film.id" :film="film"></Card>
            </div>
        </div>
    </main>
</template>

<script>
import {store} from '../store.js'
import Card from './Card.vue';
    export default {
        components: {
            Card
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