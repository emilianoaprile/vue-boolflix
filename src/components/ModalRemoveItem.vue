<template>
    <div class="modal">
        <div class="modal_text">
            titolo del film è stato rimosso da La mia lista
        </div>
        <button class="modal_btn" >
            <font-awesome-icon class="cancel_icon" :icon="['fas', 'rotate-left']" />
            <span>Annulla</span>
        </button>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    bottom: 3.2rem;
    margin: 0px 12.5%;
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
}

.cancel_icon {
    font-size: 25px;
}
</style>