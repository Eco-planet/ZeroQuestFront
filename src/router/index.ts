import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import GoogleView from "../views/GoogleLoginView.vue";
import GameLoginView from "../views/GameLoginView.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: GoogleView,
  },
  {
    path: "/login",
    name: "login",
    component: GameLoginView,
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
    path: "/zeronftbuy/:idx",
    name: "zeronftbuy",
    component: () =>
      import(/* webpackChunkName: "zeronftbuy" */ "../views/ZeroNftBuy.vue"),
  },
  {
    path: "/onft",
    name: "onft",
    component: () =>
      import(/* webpackChunkName: "onft" */ "../views/OpenNftView.vue"),
  },
  {
    path: "/onft-detail/:nftId/:tokenId",
    name: "onft-detail",
    component: () =>
      import(/* webpackChunkName: "onft-detail" */ "../views/OpenNftDetailView.vue"),
  },
  {
    path: "/mywallet",
    name: "mywallet",
    component: () =>
      import(/* webpackChunkName: "mywallet" */ "../views/MyWalletView.vue"),
  },

  {
    path: "/battle",
    name: "battle",
    component: ()=>
      import(/* webpackChunkName: "battle" */ "../views/BattleView.vue"),
  },
  {
    path:'/AllSession/:recentSessionIdx',
    name:'AllSession',
    component: () => 
      import (/* webpackChunkName: "battle" */ "../views/AllSession.vue"),
  },
  {
    path:'/battleDetailInfo/:walletAddress/:sessionId/:cardIdx',
    name:'battleDetailInfo',
    component: () => 
      import (/* webpackChunkName: "battle" */ "../views/BattleDetailInfo.vue"),
    
  },
  {
    path:'/myEntry',
    name:'myEntry',
    component: () => 
      import (/* webpackChunkName: "battle" */ "../views/MyEntries.vue")
    
  },
  {
    path:'/entryPage/:sessionId',
    name:'entryPage',
    component: () => 
      import (/* webpackChunkName: "battle" */ "../views/EntryPage.vue")
    
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
      router.push("/" + process.env.VUE_APP_FIRST_URL);
    }
  } else if (to.name !== "home" && to.name !== "terms" && store.getters["auth/getTerms"] != '' && store.getters["auth/getTerms"] == 0) {
    router.push("/terms");
  }

  if (to.query.locale) {
    store.commit("system/SET_LOCALE", { lang: to.query.locale });
  }

  next();
});

router.afterEach(async (to: Nullable, from: Nullable, next: Nullable) => {
  setTimeout(() => {
    store.state.isLoading = false;
  }, 0);
});

export default router;
