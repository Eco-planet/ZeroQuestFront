<template>
  <div class="h-10"></div>
  <div class="h-10"></div>
  <div class="h-10"></div>
  <div class="fixed-bottom">
    <a :class="{ oPage: $route.name === 'myzq' }" @click="movePage('/myzq')"
      >My Z.Q</a
    >
    <a
      :class="{ oPage: $route.name === 'zeronft' }"
      @click="movePage('/zeronft')"
      >ZeroNFT</a
    >
    <a
      :class="{
        oPage: $route.name === 'onft' || $route.name === 'onft-detail',
      }"
      @click="movePage('/onft')"
      >O!NFT</a
    >
    <a
      :class="{ oPage: $route.name === 'mywallet' }"
      @click="movePage('/mywallet')"
      >My<br />Wallet</a
    >
    <a
      :class="{ oPage: $route.name === 'challenge' }"
      @click="movePage('/challenge')"
      >Challenge</a
    >
    <a
      :class="{
        oPage:
          $route.name === 'battle' ||
          $route.name === 'entryPage' ||
          $route.name === 'battleDetailInfo' ||
          $route.name === 'myEntry' ||
          $route.name === 'AllSession',
      }"
      @click="movePage('/battle')"
      >Battle</a
    >
  </div>
  <Modal
    :visible="isPopup"
    @hide="closeModal"
    @resData="checkData"
    @afterLogin="afterLogin"
    title="message.sorryChecking"
  />
</template>

<script lang="ts" setup>
import router from "@/router";
import store from "@/store";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const isPopup = ref(false);

const showModal = (type) => {
  store.state.popupType = type;
  isPopup.value = true;
};

const closeModal = () => {
  isPopup.value = false;
};

const checkData = (type: string) => {
  console.log("type = " + type);
};

const afterLogin = () => {
  router.push("/");
};

const movePage = (page: string) => {
  if (page === "/market") {
    showModal("message");
  } else if (page === "/battle") {
    showModal("serviceChecking");
  } else {
    router.push(page);
  }
};

// const movePage = (page: string) => {
//   if (page === "/market") {
//     showModal('message');
//   } else {
//     router.push(page);
//   }
// };
</script>

<style scoped lang="scss"></style>
