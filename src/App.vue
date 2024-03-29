<template>
  <Header v-if="$route.name !== 'home' && $route.name !== 'login'" />
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

const vuexStore = useStore();
const bannerList = store.getters["auth/getBannerList"];
const nftList = store.getters["auth/getNftList"];
const pointBalance = store.getters["auth/getBalances"];
const tokenInfos = store.getters["auth/getTokenInfos"];

onMounted(async () => {
  if (!pointBalance) {
    vuexStore.dispatch("auth/getPointBalanceAll");
  }
  if (!bannerList) {
    await vuexStore.dispatch("auth/getBannerList");
  }
  if (!nftList) {
    await vuexStore.dispatch("auth/getNftList");
  }
  if (!tokenInfos) {
    await vuexStore.dispatch("auth/getTokenInfos");
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
