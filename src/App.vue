<template>
  <Header v-if="$route.name !== 'home' && $route.name !== 'login'" />
  <!-- <Locale v-if="$route.name !== 'login'" /> -->
  <!-- <nav v-if="$route.name !== 'login'">
      <router-link to="/">{{ t("route.Home") }}</router-link> |
      <router-link to="/about">{{ t("route.About") }}</router-link> |
      <router-link to="/login">LOGIN</router-link> |
      <router-link to="/mypage">MyPage</router-link>
    </nav> -->
  <div
    id="appMain"
    class="wrap"
    :class="{
      battleBg:
        $route.name === 'battle' ||
        $route.name === 'entryPage' ||
        $route.name === 'battleDetailInfo' ||
        $route.name === 'myEntry' ||
        $route.name === 'AllSession',
    }"
  >
    <router-view />
    <div class="h-20"></div>
  </div>
  <Footer v-if="$route.name !== 'home' && $route.name !== 'login'" />
  <LoadingSpinner v-if="store.state.isLoading"></LoadingSpinner>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import store from "@/store";
import http from "@/api/http";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import Header from "@/components/common/HeaderView.vue";
import Footer from "@/components/common/FooterView.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

onMounted(() => {
  if (
    store.getters["auth/getTokenInfos"] === undefined ||
    store.getters["auth/getTokenInfos"] === ""
  ) {
    http
      .get("/api/tokenInfos", {
        params: {
          currency: "USDT",
        },
      })
      .then((response) => {
        const resTokenData = response.data.data.tokenInfos;
        const resScannerData = response.data.data.scanner;

        let tokenInfos: any = {};
        let scanners: any = {};

        resTokenData.forEach((res: any) => {
          tokenInfos[res.symbol] = res;
        });

        resScannerData.forEach((res: any) => {
          scanners[res.chainId] = res;
        });

        store.commit("auth/setTokenInfos", { info: tokenInfos });
        store.commit("auth/setScanners", { info: scanners });
      });
  }

  if (
    store.getters["auth/getNftList"] === undefined ||
    store.getters["auth/getNftList"] === ""
  ) {
    http
      .get("/api/nft/zeroNft", {
        params: {},
      })
      .then((response) => {
        const nftListData = response.data.data;
        console.log("nftListData", nftListData);

        let nftList: any = {};

        nftListData.forEach((res: any) => {
          nftList[res.idx] = res;

          if (res.metaData !== "" && res.metaData !== undefined) {
            nftList[res.idx]["metaData"] = JSON.parse(res.metaData);
          } else {
            nftList[res.idx]["metaData"] = "";
          }

          if (res.name !== "" && res.name !== undefined) {
            try {
              nftList[res.idx]["name"] = JSON.parse(res.name);
            } catch (e) {
              console.error("Failed to parse name:", e);
            }
          }
        });

        store.commit("auth/setNftList", { info: nftList });
      });
  }

  if (
    store.getters["auth/getBannerList"] === undefined ||
    store.getters["auth/getBannerList"] === ""
  ) {
    http
      .get("/api/banners", {
        params: {},
      })
      .then((response) => {
        const bannerListData = response.data.data;

        let bannerList: any = {};

        bannerListData.forEach((res: any) => {
          bannerList[res.idx] = res;

          if (res.url !== "" && res.url !== undefined) {
            try {
              bannerList[res.idx]["url"] = JSON.parse(res.url);
            } catch (e) {
              console.error("Failed to parse name:", e);
            }
          }
        });

        store.commit("auth/setBannerList", { info: bannerList });
      });
  }
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.wrap {
  height: 100%;
  overflow-y: auto;
  overflow-y: overlay;
}

.battleBg {
  background-color: #fafafa;
}
</style>
