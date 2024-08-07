<template>
    <section class="myList_cards-section">
        <div class="card" v-for="(listItem, index) in myList" :key="listItem.id">
            <img style="width: 100%; height: 100%;" :src="store.imgBaseUrl + imgs[index]"  alt="">
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { store } from '../store';

export default {
    props: {
        myList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            store,
            imgs: [],
            apiKey: store.api_key
        }
    },
    methods: {
        fetchMyList() {
            this.myList.forEach(el => {
                const url = el.type === 'film'
                ? `https://api.themoviedb.org/3/movie/${el.id}/images?api_key=${this.apiKey}`
                : `https://api.themoviedb.org/3/tv/${el.id}/images?api_key=${this.apiKey}`

            axios
                .get(url)
                .then((res) => {
                    // console.log(res.data)
                    const backdrops = res.data.backdrops
                    // console.log('un array backdrops di oggetti di ogni elemento di my List :',backdrops)
                    const backdropEn = backdrops.find(obj => obj.iso_639_1 === 'en')
                    if(backdropEn) {
                        this.imgs.push(backdropEn.file_path)
                    } else {
                        const backdropAlternative = backdrops.find(obj => (obj.height >= 720 || obj.iso_639_1 === 'it'))
                        if(backdropAlternative) {
                            this.imgs.push(backdropAlternative.file_path)
                        }
                    }
                    console.log(this.imgs)
                })
                .catch(err => {
                    console.error(err)
                })
            });

        }
    },
    created() {
        console.log('my list:', this.myList)
        this.fetchMyList()
    }

}
</script>

<style lang="scss" scoped>
.myList_cards-section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 40px 8px;
    justify-content: center;
    margin-top: 190px;
    width: 100%;
    padding: 0 60px;
}

.card {
    max-width: 100%;
    height: 130px;
}</style>