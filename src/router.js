import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./pages/HomeView.vue";
import ShowItem from './pages/show/ShowItem.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export {router}