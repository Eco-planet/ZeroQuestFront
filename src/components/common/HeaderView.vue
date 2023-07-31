<template>
  <div id="header" :class="{ open: menuVisible === true }">
    <div class="w-full flex justify-between items-center">
      <div class="wp-30 flex"><button type="button" class="menu-btn" @click="toggleMenu()"><span></span></button></div>
      <div class="wp-40 flex justify-center"><h1><a href="/"><img src="@/assets/images/logo.png" alt="ZeroQuest"></a></h1></div>
      <div class="wp-30 login-box">
        <div class="flex justify-end items-center">
          <!-- <div><Locale /></div> -->
          <div class="w-5"></div>
          <div><button type="button" class="login-id" @click="moveZq">ID</button></div>
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
      <div class="h-10"></div>
      <div class="text-2xl font-semibold">About</div>
      <div class="h-3"></div>
      <div class="text-2xl w-full flex" :class="{ select: $route.name === 'about' }" @click="movePage('/about')">
        <div class="wp-50 flex justify-start">About ZeroQuest</div>
        <div class="wp-50 flex justify-end menu-right">→</div>
      </div>
      <div class="h-3"></div>
      <div class="text-2xl w-full flex" :class="{ select: $route.name === 'terms' }" @click="movePage('/terms')">
        <div class="wp-50 flex justify-start">Terms & Conditions</div>
        <div class="wp-50 flex justify-end menu-right">→</div>
      </div>
      <div class="h-10"></div>
      <div class="text-2xl font-semibold">공식 채널 참여</div>
      <div class="h-3"></div>
      <div class="social-area wp-70 grid grid-cols-5 gap-2">
        <a v-for="logo in logos" :key="logo.id" :class="logo.name" class="snsImg" :href="logo.href">
          <img :src="logo.src" @mouseover="switchLogo(logo, true)" @mouseout="switchLogo(logo, false)"/>
        </a>
      </div>
    </div>
    <div class="wp-20" @click="toggleMenu()"></div>
  </div>
  <Modal :visible="modalVisible" @hide="closeModal" title="message.sorryChecking" />
</template>

<script lang="ts" setup>

import router from "@/router";
import store from "@/store";
import { ref , computed} from "vue";
import Modal from "@/components/Modal/index.vue";



const logos = computed(()=>store.getters.logos);

const modalVisible = ref(false);
const menuVisible = ref(false);
const aniVisible = ref(false);

const forceLogout = () => {
  store.commit("auth/setClearToken");

  if (store.state.showMode === 'webview') {
    window.Java.jsSignOut();

    router.push({ name: 'home', query: { showMode: 'webview', isLogin: 0 } });
  } else {
    router.push("/");
  }
};

const moveZq = () => {
  router.push('myzq');
};

const showModal = () => {
  store.state.popupType = 'message';
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

//Logo전환함수
const switchLogo = (logo:any, isHover:boolean) => {
  return logo.src = isHover ? logo.srcOn : logo.srcOff;
}

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

.menu-right {
  font-family:"SUIT Variable", sans-serif !important;
}



</style>
