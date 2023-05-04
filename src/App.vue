<template>
  <Header v-if="$route.name !== 'home'" />
    <!-- <Locale v-if="$route.name !== 'login'" /> -->
    <!-- <nav v-if="$route.name !== 'login'">
      <router-link to="/">{{ t("route.Home") }}</router-link> |
      <router-link to="/about">{{ t("route.About") }}</router-link> |
      <router-link to="/login">LOGIN</router-link> |
      <router-link to="/mypage">MyPage</router-link>
    </nav> -->
  <router-view />
  <Footer v-if="$route.name !== 'home'" />
  <LoadingSpinner v-if="store.state.isLoading"></LoadingSpinner>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import store from "@/store";
import http from "@/api/http";
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import Header from "@/components/common/HeaderView.vue";
import Footer from "@/components/common/FooterView.vue";
import { onMounted } from "vue";

const { t } = useI18n();

onMounted(() => {
  if (store.getters["auth/getTokenInfos"] === "") {
    http.get("/api/tokenInfos", {
      params: {
        'currency': 'USDT',
      }
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

      store.commit("auth/setTokenInfos", { 'info': tokenInfos });
      store.commit("auth/setScanners", { 'info': scanners });
    });
  };
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
</style>
