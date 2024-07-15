<template>
    <header class="page_header">
        <div class="container">
            <nav class="navbar">
                <div class="logo">
                    <img :src="imgLogoPath" alt="">
                </div>
    
                <div class="searchBar">
                    <!-- utilizzo del v-model per sincronizzare il valore dell'input alla variabile searchInput salvata nello store -->
                    <input class="input_search" v-model="store.searchInput" type="text" placeholder="Titoli, persone, generi">
                    <!-- $emit per gestire l'invio dell'evento click da componte figlio (Header) a componente Madre (App) -->
                    <button class="btn btn_search" @click="$emit('searchFilms'), $emit('searchSeries')">Cerca</button>
                </div>
            </nav>
        </div>
    </header>
</template>

<script>
import {store} from '../store.js'
    export default {
        data() {
            return {
                store,
                imgLogoPath: '/img/logo-boolflix.png'
            }
        }
        
    }
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;


.page_header {
    background-color: black;
    .navbar {
        display: flex;
        padding: 30px 20px;
        justify-content: space-between;
        align-items: center;
    
        .logo {
            width: 150px;
        }
    
        .searchBar {
            display: flex;
            gap: 20px;
        }
    
        .searchBar .input_search {
            width: 300px;
            padding: 8px 3px;
            padding-left: 10px;
            border-radius: 15px;
        }
    }

}

</style>