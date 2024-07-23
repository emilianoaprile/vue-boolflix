import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./pages/HomeView.vue";
import FilmShow from './pages/show/FilmShow.vue';

const routes = [
  {
    path: "/",
    name: 'home',
    component: HomeView,
  },
  {
    path: "/:id",
    name: 'show',
    component: FilmShow,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export {router}