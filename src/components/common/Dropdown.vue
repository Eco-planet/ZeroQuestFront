<template>
    <el-dropdown class="locale" trigger="click">
      <!-- <div>
        <img class="my-img" src="./../../assets/images/icons8.png"/>      
      </div> -->
      <div class="login-box">
        <button type="button" class="login-id">ID</button>
      </div>
      <template #dropdown>
        <el-dropdown-menu class="my-drop-menu">
          <el-dropdown-item
            v-for="item in logouts"
            :key="item.name"
            class="my-drop-menu-item"
            @click="setLogout(item)"
            >{{ item.label }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { logouts } from "@/config/constants/logout";
  import { useStore } from "vuex";
  import { createRouter, useRouter } from 'vue-router';
  
  const router = useRouter(); // useRouter를 사용하여 router 객체를 가져옴.
  const store = useStore();
  
  function setLogout(locale: Nullable) {
    store.commit("system/SET_LOCALE", { lang: locale.name });
    forceLogout()
  }
  
  const forceLogout = () => {
    store.commit("auth/setClearToken");
  
    if (store.state.showMode === 'webview') {
      window.Java.jsSignOut();
  
      router.push({ name: 'home', query: { showMode: 'webview', isLogin: 0 } });
    } else {
      router.push("/");
    }
  };
  
  </script>
  
  <style lang="scss">
  .locale {
    .icon {
      cursor: pointer;
      width: 36px;
      height: 36px;
  
      @media screen and (max-width: 1240px) {
        width: 36px;
        height: 36px;
      }
    }
  }
  .my-img {
    width: 36px;
    height: 36px;
  }
  </style>