<template>
    <Header class="header"></Header>
    <div class="sub_header">
        <div class="sub_header-wrapper" :class="{ scrolled: scrolled }">
            <h1 class="title">La mia lista</h1>
        </div>
    </div>
    <section class="myList_cards-section">
        <div class="card" v-for="n in 60" :key="n">
            Card {{ n }}
        </div>
    </section>
</template>

<script>
import Header from '../../components/Header.vue';
import MyListContent from '../../components/MyListContent.vue';
export default {
    components: {
        Header,
        MyListContent
    },
    data() {
        return {
            scrolled: false

        }
    },
    methods: {
        isScrolled() {
            this.scrolled = window.scrollY > 0
        }
    },
    created() {
        window.addEventListener('scroll', this.isScrolled)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.isScrolled)
    },

}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
}

.sub_header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
}

.header {
    background-color: rgb(20, 20, 20);

}

.header.scrolled {
    background-color: rgb(20, 20, 20);
}

.sub_header {
    height: 68px;

    .sub_header-wrapper {
        align-items: center;
        display: flex;
        padding: 0 60px;
        margin-top: 68px;
        height: 100%;
        transition: background-color 0.3s ease;

    }

    .sub_header-wrapper.scrolled {
        background-color: rgb(20, 20, 20);
    }

    .title {
        color: #FFFFFF;
        font-size: 38px;
        font-weight: 300;
    }
}

.myList_cards-section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 40px 6px;
    justify-content: center;
    margin-top: 190px;
    width: 100%;
    padding: 0 60px;
}

.card {
    max-width: 100%;
    height: 130px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #333;
    text-align: center;
}
</style>