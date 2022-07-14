import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Home from "./components/Home.vue"
// lazy-loaded
// const BoardUser = () => import("./components/BoardUser.vue")
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
