<template>
    <header class="page_header">
        <nav class="navbar">
            <div class="menu">
                <router-link :to="{ name: 'home' }">
                    <img class="logo" :src="imgLogoPath" alt="">
                </router-link>
                <ul class="menu_list">
                    <li class="menu_item" v-for="(listItem, i) in menu" :key="i"
                        :class="{ active: isActive(listItem.href) }">
                        <router-link :to="{ name: listItem.href }" @click="removeInputString()">
                            <a>{{ listItem.item }}</a>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="search_box" @click.stop>
                <div v-if="showInput" class="searchBar" @click.stop>
                    <font-awesome-icon class="search_icon" :icon="['fas', 'magnifying-glass']" />
                    <input ref="searchInput" class="input_search" v-model="store.searchInput" type="text"
                        placeholder="Titoli, persone, generi" />
                    <font-awesome-icon v-if="store.searchInput.length > 0" @click="removeInputString()"
                        class="close_input" :icon="['fas', 'xmark']" />
                </div>
                <button v-else @click="toggleInput" class="search_tab">
                    <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
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
            showInput: false,
            menu: [
                { item: 'Home', href: 'home' },
                { item: 'Serie TV', href: 'serieTV' },
                { item: 'Film', href: 'film' },
                { item: 'Nuovi e Popolari', href: 'nuovi-e-popolari' },
                { item: 'La mia lista', href: 'la-mia-lista' },
                { item: 'Sfoglia per lingua', href: 'sfoglia-per-lingua' },
            ],
            imgLogoPath: '/img/logo-boolflix.png',
            showXmark: false
        }
    },
    computed: {
        currentRoute() {
            return this.$route.name
        }
    },
    methods: {
        toggleInput() {
            this.showInput = !this.showInput
            this.$nextTick(() => {
                console.log(this.$refs)
                if (this.showInput && this.$refs.searchInput) {
                    this.$refs.searchInput.focus()
                }
            })
        },
        removeInputString() {
            store.searchInput = ''
        },
        handleClickOutside(event) {
            const searchBox = this.$el.querySelector('.search_box')
            if (!searchBox.contains(event.target)) {
                this.showInput = false
            }
        },
        isActive(href) {
            return this.currentRoute === href
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside)
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
            align-items: center;
            gap: 10px;
            background-color: rgba(0, 0, 0, 0.514);
            border: 1px solid hsla(0, 0%, 100%, .85);
            width: 300px;

            .search_icon {
                font-size: 22px;
                color: white;
                background: transparent;
                border: none;
                display: inline-block;
                padding: 6px 6px;
            }

            .close_input {
                font-size: 22px;
                color: white;
                background: transparent;
                border: none;
                display: inline-block;
                padding: 6px 6px;
                cursor: pointer;

            }

            .input_search {
                background: transparent;
                border: none;
                box-sizing: border-box;
                color: #fff;
                display: inline-block;
                font-size: 14px;
                outline: none;
                padding: 7px 14px 7px 7px;
                width: 212px;
            }
        }

        .menu {
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 40px;

            .menu_list {
                display: flex;
                gap: 22px;

                .menu_item {
                    font-size: 13.5px;
                    font-weight: 300;
                    transition: all 0.3s ease;
                    cursor: pointer; // Imposta il cursore su pointer per tutti gli elementi menu_item per default
                }

                .menu_item.active {
                    font-weight: 500;
                    cursor: default; // Imposta il cursore su default quando l'elemento ha la classe active
                }

                .menu_item.active a {
                    cursor: default; // Imposta il cursore su default per i link all'interno dell'elemento attivo
                }

                .menu_item:hover {
                    color: rgba(255, 255, 255, 0.783);
                }
            }
        }

        .search_box {
            display: flex;
            gap: 10px;

            .search_tab {
                font-size: 22px;
                color: white;
                background: transparent;
                border: none;
                cursor: pointer;
                display: inline-block;
            }
        }
    }
}
</style>
