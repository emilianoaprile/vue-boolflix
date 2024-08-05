import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./pages/HomeView.vue";
import ShowItem from './pages/show/ShowItem.vue';
import MenuSerieTv from './pages/menu/MenuSerieTv.vue';
import MenuFilm from './pages/menu/MenuFilm.vue';
import MenuNewPopular from './pages/menu/MenuNewPopular.vue';
import MenuMyList from './pages/menu/MenuMyList.vue';
import SearchByLang from './pages/menu/SearchByLang.vue';


const routes = [
  {
    path: "/",
    name: 'home',
    component: HomeView,
  },
  {
    path: "/:type/:id",
    name: 'show',
    props: true,
    component: ShowItem,
  },
  {
    path: "/serieTV",
    name: 'serieTV',
    component: MenuSerieTv
  },
  {
    path: "/film",
    name: 'film',
    component: MenuFilm
  },
  {
    path: "/nuovi-e-popolari",
    name: 'nuovi-e-popolari',
    component: MenuNewPopular
  },
  {
    path: "/la-mia-lista",
    name: 'la-mia-lista',
    component: MenuMyList
  },
  {
    path: "/sfoglia-per-lingua",
    name: 'sfoglia-per-lingua',
    component: SearchByLang
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export {router}