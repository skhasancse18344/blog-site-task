import { createRouter, createWebHistory } from "vue-router";
import Blog from "../components/BlogPage.vue";
import Home from "../components/Home.vue";
import View from "../components/ViewBlog.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog,
  },
  {
    path: "/view/:id",
    name: "view",
    component: View,
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
