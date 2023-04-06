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
import LoadingSpinner from "@/components/common/LoadingSpinner.vue";
import Header from "@/components/common/HeaderView.vue";
import Footer from "@/components/common/FooterView.vue";

const { t } = useI18n();
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
