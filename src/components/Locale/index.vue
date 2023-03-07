<template>
  <el-dropdown class="locale" trigger="click">
    <span class="el-dropdown-link">
      <img class="icon" src="@/assets/svgs/icon_locale.svg" alt="" />
    </span>
    <template #dropdown>
      <el-dropdown-menu class="my-drop-menu">
        <el-dropdown-item
          v-for="item in locales"
          :key="item.name"
          class="my-drop-menu-item"
          @click="setLocale(item)"
          >{{ item.label }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { locales } from "@/config/constants/locale";
import { useStore } from "vuex";

const store = useStore();
function setLocale(locale: Nullable) {
  store.commit("system/SET_LOCALE", { lang: locale.name });
}
</script>

<style lang="scss">
.locale {
  .icon {
    cursor: pointer;
    width: 26px;
    height: 26px;

    @media screen and (max-width: 1240px) {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
