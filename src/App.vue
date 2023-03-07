<template>
  <Locale />
  <nav>
    <router-link to="/">{{ t("route.Home") }}</router-link> |
    <router-link to="/about">{{ t("route.About") }}</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
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

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $text-green;
    }
  }
}
</style>
