<template>
    <section class="section_show">
        <div class="show_wrapper">
            <div class="jumbo">
                <img class="jumbo_img" alt="">
                <div class="item_title">
                    <h1 class="title"></h1>
                    <p class="tagline"></p>
                </div>
                <div class="overlay"></div>
                <div class="buttons">
                    <button class="btn btn_play">
                        <font-awesome-icon class="play_icon" :icon="['fas', 'play']" />
                        <span>Riproduci</span>
                    </button>
                    <button class="btn_round btn_addlist">
                        <font-awesome-icon :icon="['fas', 'check']" />
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {store} from '../store'
    export default {
        props: {
            popularMovies: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                store,
            }
        },
        updated() {
            console.log(this.popularMovies)
        }
    }
</script>

<style lang="scss" scoped>

</style>