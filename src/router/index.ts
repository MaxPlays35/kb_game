import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Connect from "@/views/Connect.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/connect",
    alias: "/",
    component: Connect
  },
  {
    path: "/waiting",
    component: () =>
      import(/* webpackChunkName: "WaitingLobby" */ "@/views/WaitingLobby.vue")
  },
  {
    path: "/game",
    component: () => import(/* webpackChunkName: "Lobby" */ "@/views/Lobby.vue")
  },
  {
    path: "/profileSettings",
    component: () =>
      import(
        /* webpackChunkName: "ProfileSettings" */ "@/views/ProfileSettings.vue"
      )
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
