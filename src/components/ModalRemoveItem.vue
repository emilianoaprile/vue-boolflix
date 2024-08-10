<template>
    <div class="modal">
        <div class="modal_text">
            {{ showDetails.title}} è stato rimosso da La mia lista.
        </div>
        <button class="modal_btn" @click="addToMyList">
            <font-awesome-icon class="cancel_icon" :icon="['fas', 'rotate-left']" />
            <span>Annulla</span>
        </button>
    </div>
</template>

<script>
import { store } from '../store'
export default {
    props: {
        showDetails: {
            type: Object,
            rquired: true
        },
        type: {
            type: String,
            rquired: true
        }
    },
    data() {
        return {
            store,
        }
    },
    methods: {
        addToMyList() {
            store.addToMyList({ ...this.showDetails, type: this.type })
            store.isIntoList = true
            store.showModal = false
        },
    },
    created() {
        console.log(this.showDetails)
        console.log(this.type)
    }

}
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    bottom: 3.2rem;
    margin: 0px 20%;
    z-index: 10;
    left: 0px;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    height: 70px;
    border-radius: 40px;
    padding: 0 50px;
    font-size: 18px;
    color: rgba(24, 24, 24);
}

.cancel_icon {
    font-size: 18px;
    color: rgb(24, 24, 24);
}
</style>