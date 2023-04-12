<template>
  <div id="header" :class="{ open: menuVisible === true }">
    <div class="w-full flex justify-between items-center">
      <div class="wp-30 flex"><button type="button" class="menu-btn" @click="toggleMenu()"><span></span></button></div>
      <div class="wp-40 flex justify-center"><h1><a href="/"><img src="@/assets/images/logo.png" alt="ZeroQuest"></a></h1></div>
      <div class="wp-30 login-box">
        <div class="flex justify-end items-center">
          <div><Locale /></div>
          <div class="w-5"></div>
          <div><button type="button" class="login-id">ID</button></div>
        </div>
      </div>
    </div>
  </div>
  <div v-show="menuVisible" class="menus flex" :class="{ ani: aniVisible === true }">
    <div class="wp-80 p-8 flex flex-col justify-start items-start" style="background: #fff;">
      <div class="text-2xl" :class="{ select: $route.name === 'myzq' }" @click="movePage('/myzq')">My Z.Q</div>
      <div class="h-6"></div>
      <div class="text-2xl" :class="{ select: $route.name === 'zeronft' }" @click="movePage('/zeronft')">ZeroNFT</div>
      <div class="h-6"></div>
      <div class="text-2xl" :class="{ select: $route.name === 'onft' }" @click="movePage('/onft')">O!NFT</div>
      <div class="h-6"></div>
      <div class="text-2xl" :class="{ select: $route.name === 'mywallet' }" @click="movePage('/mywallet')">My Wallet</div>
      <div class="h-6"></div>
      <div class="text-2xl" @click="movePage('/market')">Open Market</div>
    </div>
    <div class="wp-20"></div>
  </div>
  <Modal :visible="modalVisible" @hide="closeModal"></Modal>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";
import Modal from "@/components/Modal/index.vue";

const modalVisible = ref(false);
const menuVisible = ref(false);
const aniVisible = ref(false);

const showModal = () => {
  modalVisible.value = true;
};

const closeModal = () => {
  modalVisible.value = false;
};

const toggleMenu = () => {
  if (menuVisible.value == true) {
    aniVisible.value = false;

    setTimeout(() => {
      menuVisible.value = false;
    }, 100);
  } else {
    menuVisible.value = true;

    setTimeout(() => {
      aniVisible.value = true;
    }, 100);
  }
};

const movePage = (page: string) => {
  menuVisible.value = false;
  aniVisible.value = false;

  if (page === "/market") {
    showModal();
  } else {
    router.push(page);
  }
};
</script>

<style scoped lang="scss">
.menus {
  z-index: 100;
  width: 100%;
  position: absolute;
  left: -100%;
  top: 48px;
  height: calc(100% - 48px);
  background-color: rgba(0, 0, 0, 0.7);
  transition: all 0.1s ease-in;

  .select {
    color: #18c050;
    font-weight: 500;
  }
}

.ani {
    transition: all 0.5s !important;
    left: 0;
}
</style>
