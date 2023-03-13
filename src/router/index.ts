import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/MypageView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to: Nullable, from: Nullable, next: Nullable) => {
  if (to.query.locale) {
    store.commit("system/SET_LOCALE", { lang: to.query.locale });
  }

  next();
});

router.afterEach(async (to: Nullable, from: Nullable, next: Nullable) => {
  const currentDate = new Date().getTime() / 1000;

  const expireAccessToken = store.getters["auth/getExpireAccessToken"];
  const expireRefreshToken = store.getters["auth/getExpireRefreshToken"];

  if (to.name === "mypage" && currentDate > expireAccessToken) {
    if (currentDate > expireRefreshToken) {
      console.log("sss");
      alert("로그인후에 이용해주세요!");
      router.push("/login");
    } else {
      await store.dispatch("auth/updateRefreshToken");
    }
  }
});

export default router;
