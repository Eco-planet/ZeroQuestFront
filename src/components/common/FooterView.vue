<template>
  <div class="h-10"></div>
  <div class="h-10"></div>
  <div class="h-10"></div>
  <div class="fixed-bottom">
    <a :class="{ oPage: $route.name === 'myzq' }" @click="movePage('/myzq')">My Z.Q</a>
    <a :class="{ oPage: $route.name === 'zeronft' }" @click="movePage('/zeronft')">ZeroNFT</a>
    <a :class="{ oPage: $route.name === 'onft' }" @click="movePage('/onft')">O!NFT</a>
    <a :class="{ oPage: $route.name === 'mywallet' }" @click="movePage('/mywallet')">My<br />Wallet</a>
    <a @click="movePage('/market')">Open<br />Market</a>
  </div>
  <Modal :visible="isPopup" @hide="closeModal" @resData="checkData" @afterLogin="afterLogin" title="message.sorryChecking" />
</template>

<script lang="ts" setup>
import router from "@/router";
import store from "@/store";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const isPopup = ref(false);

const showModal = () => {
  store.state.popupType = 'message';
  isPopup.value = true;
};

const closeModal = () => {
  isPopup.value = false;
};

const checkData = (type: string) => {
  console.log("type = " + type);
}

const afterLogin = () => {
  router.push("/");
}

const movePage = (page: string) => {
  if (page === "/market") {
    showModal();
  } else {
    router.push(page);
  }
};
</script>

<style scoped lang="scss">
</style>
