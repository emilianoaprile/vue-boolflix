import { createWebHistory, createRouter } from "vue-router";

import HomeView from "./pages/HomeView.vue";

const routes = [
  {
    path: "/",
    name: 'home',
    component: HomeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export {router}