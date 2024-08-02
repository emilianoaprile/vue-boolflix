<template>
  <swiper :slidesPerView="1" :spaceBetween="10" :pagination="{
    clickable: true,
  }" :breakpoints="{
    '640': {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    '768': {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    '992': {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    '1024': {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    '1200': {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    '1400': {
      slidesPerView: 5,
      spaceBetween: 10,
    },
  }" :modules="modules" class="mySwiper">
    <slot></slot>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>

<style lang="scss">
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  /* Center slide text vertically */
  /* display: flex;
  justify-content: center;
  align-items: center; */
}

.mySwiper .swiper-pagination {
  position: static !important;
  text-align: center;
  transition: 300ms opacity;
  transform: translate3d(0, 0, 0);
  z-index: 10;
  margin-top: 30px;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mySwiper .swiper-pagination-bullet-active {
  background: red;
}

.mySwiper .swiper-pagination-bullet {
  background: red;
  width: 15px;
  height: 15px;
}
</style>