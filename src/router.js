import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/Home.vue"
import Course from "./components/Course.vue"
import Leaderboard from "./components/Leaderboard.vue"
import Docs from "./components/Docs.vue"
// lazy-loaded
// const BoardUser = () => import("./components/BoardUser.vue")
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/course/:name",
    component: Course,
  },
  {
    path: "/leaderboard",
    component: Leaderboard,
  },
  {
    path: "/docs",
    component: Docs,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
