import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import GoogleView from "../views/GoogleLoginView.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: GoogleView,
  },
  {
    path: "/myzq",
    name: "myzq",
    component: () =>
      import(/* webpackChunkName: "myzq" */ "../views/ZeroQuestView.vue"),
  },
  {
    path: "/zeronft",
    name: "zeronft",
    component: () =>
      import(/* webpackChunkName: "zeronft" */ "../views/ZeroNftView.vue"),
  },
  {
    path: "/onft",
    name: "onft",
    component: () =>
      import(/* webpackChunkName: "onft" */ "../views/OpenNftView.vue"),
  },
  {
    path: "/mywallet",
    name: "mywallet",
    component: () =>
      import(/* webpackChunkName: "mywallet" */ "../views/MyWalletView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/terms",
    name: "terms",
    component: () =>
      import(/* webpackChunkName: "terms" */ "../views/TermsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to: Nullable, from: Nullable, next: Nullable) => {
  store.state.isLoading = true;

  const currentDate = new Date().getTime() / 1000;
  const expireAccessToken = store.getters["auth/getExpireAccessToken"];
  const expireRefreshToken = store.getters["auth/getExpireRefreshToken"];

  if (to.name === "home" && currentDate <= expireAccessToken) {
    if (currentDate <= expireRefreshToken) {
      router.push("/mywallet");
    }
  }

  if (to.query.locale) {
    store.commit("system/SET_LOCALE", { lang: to.query.locale });
  }

  next();
});

router.afterEach(async (to: Nullable, from: Nullable, next: Nullable) => {
  const currentDate = new Date().getTime() / 1000;
  const expireAccessToken = store.getters["auth/getExpireAccessToken"];
  const expireRefreshToken = store.getters["auth/getExpireRefreshToken"];

  if (to.name === "mywallet" && currentDate > expireAccessToken) {
    if (currentDate > expireRefreshToken) {
      store.state.isLogin = true;
      store.state.isPopup = true;
    } else {
      await store.dispatch("auth/updateRefreshToken");
    }
  }

  setTimeout(() => {
    store.state.isLoading = false;
  }, 100);
});

export default router;
