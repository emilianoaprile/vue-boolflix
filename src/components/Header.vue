<template>
    <header class="page_header">
        <nav class="navbar">
            <div class="menu">
                <img class="logo" :src="imgLogoPath" alt="">
                <ul class="menu_list">
                    <li class="menu_item" v-for="(listItem, i) in menu">
                        <a :href="listItem.href">{{ listItem.item }}</a>
                    </li>
                </ul>
            </div>
            <div class="searchBar">
                <input class="input_search" 
                    v-model="store.searchInput"
                    @keyup.enter="$emit('searchFilms'), $emit('searchSeries')" 
                    type="text"
                    placeholder="Titoli, persone, generi">
                <button class="btn btn_search" 
                    @click="$emit('searchFilms'), $emit('searchSeries')">
                    Cerca
                </button>
            </div>
        </nav>
    </header>
</template>

<script>
import { store } from '../store.js'
export default {
    data() {
        return {
            store,
            menu: [
                {
                    item: 'Home',
                    href: '#'
                },
                {
                    item: 'Serie TV',
                    href: '#'
                },
                {
                    item: ' Film',
                    href: '#'
                },
                {
                    item: 'Nuovi e Popolari',
                    href: '#'
                },
                {
                    item: 'La mia lista',
                    href: '#'
                },
                {
                    item: 'Sfoglia per lingua',
                    href: '#'
                },
            ],
            imgLogoPath: '/img/logo-boolflix.png'
        }
    }

}
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;


.page_header {
    background-image: linear-gradient(180deg, rgba(0, 0, 0, .7) 10%, transparent);
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;

    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 60px;

        .logo {
            width: 92px;
            height: 31px;
        }

        .searchBar {
            display: flex;
            gap: 20px;
        }

        .searchBar .input_search {
            width: 300px;
            padding: 8px 3px;
            padding-left: 10px;
            border-radius: 5px;
        }

        .menu {
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 35px;

            .menu_list {
                display: flex;
                gap: 20px;
            }
        }
    }

}
</style>