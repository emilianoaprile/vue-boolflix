<template>
    <div class="card">
        <h2 class="film_title">{{ film.title }}</h2>
        <h3 class="original_title">Titolo Originale: <span>{{ film.original_title }}</span></h3>
        <p class="film_language">Lingua: <span>{{ film.language }}</span></p>
        <p class="film_rating">Voto: <span>{{ film.vote }}</span></p>
    </div>
</template>

<script>
    export default {
        props: {
            film: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;


@use '../styles/partials/variables' as *;
@use '../styles/partials/mixins' as *;

.card {
    background-color: $card-bg-color;
    border-radius: $border-radius;
    padding: $padding;
    width: $card-width;
    box-shadow: $box-shadow;
    color: $text-color;

    .film_title {
        font-size: $title-font-size;
        margin: 0 0 $margin-small;
        color: $primary-color;
    }

    .original_title {
        font-size: $subtitle-font-size;
        margin: $margin-small 0;
        color: $secondary-color;

        span {
            color: $text-color;
        }
    }

    .film_language,
    .film_rating {
        font-size: $text-font-size;
        margin: $margin-small 0;
        color: $secondary-color;

        span {
            color: $text-color;
        }
    }
}


</style>