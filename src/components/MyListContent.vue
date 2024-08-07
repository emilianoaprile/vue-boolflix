<template>
    <section class="myList_cards-section">
        <router-link v-for="(listItem, index) in myList" :key="listItem.id"
            :to="{ name: 'show', params: { id: listItem.id, type: listItem.type } }">
            <div class="card">
                <img class="card_img" :src="getImgUrl(listItem.id)" alt="">
            </div>
        </router-link>
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
            imgList: [],
            apiKey: store.api_key
        }
    },
    methods: {
        fetchMyList() {
            const request = this.myList.map(el => {
                const url = el.type === 'film'
                    ? `https://api.themoviedb.org/3/movie/${el.id}/images?api_key=${this.apiKey}`
                    : `https://api.themoviedb.org/3/tv/${el.id}/images?api_key=${this.apiKey}`

                axios
                    .get(url)
                    .then((res) => {
                        const backdrops = res.data.backdrops
                        const backdrop1 = backdrops.find(obj => obj.iso_639_1 === 'en')
                        const backdrop2 = backdrops.find(obj => (obj.height >= 720 || obj.iso_639_1 === 'it'))
                        const filePath = backdrop1 ? backdrop1.file_path : backdrop2.file_path

                        if(filePath) {
                            this.imgList.push({id: el.id, url: filePath})
                        } 

                    })
                    .catch(err => {
                        console.error(err)
                    })
            })

            Promise.all(request).then(() => {
                console.log(this.imgList)
            }).catch(err => {
                console.error(err)
            })

        },
        getImgUrl(id) {
            const img = this.imgList.find(img => img.id === id)
            return img ? store.imgBaseUrl + img.url : ''
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
    gap: 60px 8px;
    justify-content: center;
    margin-top: 190px;
    width: 100%;
    padding: 0 60px;
}

.card {
    max-width: 100%;
    height: 130px;

    .card_img {
        width: 100%; 
        height: 100%;
    }
}
</style>