import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Home from "./components/Home.vue"
import Course from "./components/Course.vue"
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
  {
    path: "/course/:name",
    component: Course,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
