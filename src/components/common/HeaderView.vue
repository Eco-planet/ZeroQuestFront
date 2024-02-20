  <template>
    <div id="header" :class="{ open: menuVisible === true }">
      <div class="w-full flex justify-between items-center">
        <div class="wp-30 flex"><button type="button" class="menu-btn" @click="toggleMenu()"><span></span></button></div>
        <div class="wp-40 flex justify-center"><h1><a href="/"><img src="@/assets/images/logo.png" alt="ZeroQuest"></a></h1></div>
        <div class="wp-30 login-box">
          <div class="flex justify-end items-center">
            <div>
              <Locale />
            </div>
            <div class="w-5"></div>
            <Dropdown title="Services" :items="services"/>
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
        <!-- <div class="text-2xl" :class="{ select: $route.name === 'battle' }" @click="movePage('/battle')">Battle</div> -->
        <div class="text-2xl" :class="{ select: $route.name === 'battle' }" @click="movePage1()">Battle</div>
        <div class="h-10"></div>
        <div class="text-2xl font-semibold">About</div>
        <div class="h-3"></div>
        <div class="text-2xl w-full flex" :class="{ select: $route.name === 'introduction' }" @click="movePage('/introduction')">
          <div class="wp-50 flex justify-start">About ZeroQuest</div>
          <div class="wp-50 flex justify-end menu-right">→</div>
        </div>


        <div class="h-3"></div>
        <div class="text-2xl w-full flex" :class="{ select: $route.name === 'Notion' }" @click="movePage('/TermsNotion')">
          <div class="wp-50 flex justify-start">Terms & Conditions</div>
          <div class="wp-50 flex justify-end menu-right">→</div>
        </div>
        <div class="h-3"></div>
        <div class="h-10"></div>
        <div class="text-2xl font-semibold">{{ t("common.participateChannels") }}</div>
        <div class="h-3"></div>
        <div class="social-area wp-70 grid grid-cols-5 gap-2">
          <a v-for="logo in logos" :key="logo.id" :class="logo.name" class="snsImg" :href="logo.href" target="_blank"
          @mouseover="switchLogo(logo, true)"
          @mouseout="switchLogo(logo, false)"
          @click="handleSocialIconClick(logo)">
           <img :src="logo.src"/>
       </a>
        </div>
        <div class="h-10"></div>
        <a href="https://open.kakao.com/o/gEkf2eMf" target="_blank">
          <div class="pb-2 text-2xl font-semibold">{{ t("message.howToUse")}}</div>
          <img 
          :src="kakaoLogo" 
          @mouseover="switchKakaoLogo(true)" 
          @mouseout="switchKakaoLogo(false)"
          @click = "openKakaoTalk"
          :class="kakaoHover? 'w-14':'w-auto'"
    
          >
        </a>
        <div class="text-2xl font-semibold mt-4 cursor-pointer" @click="Withdrawal">Withdrawal</div>
      
      </div>
      <div class="wp-20" @click="toggleMenu()"></div>
    </div>
    <!-- <Modal :showClose="showClose" :visible="modalVisible" :withdrawVisible="modalWithdrawVisible" @clickWithdraw="clickWithdraw" @voteHide="WithdrawCloseModal" @hide="closeModal" title="message.sorryChecking"/> -->
  </template>

  <script lang="ts" setup>

  import router from "@/router";
  import { ref , computed} from "vue";
  import { useI18n } from "vue-i18n";
  import http from "@/api/http"
  import Modal from "@/components/Modal/index.vue";
  import Dropdown from './Dropdown.vue';
  import { useStore } from "vuex"

  const { t } = useI18n();

  const store = useStore()

  const logos = computed(()=>store.getters.logos);

  const kakaoLogo = ref(require("@/assets/images/sns05_off.png"))
  const kakaoHover = ref()

  const showClose = ref(true)

  const menuVisible = ref(false);
  const aniVisible = ref(false);

  //battle modal창
  const movePage1 = () => {
    store.state.popupType = 'serviceChecking';
    modalVisible.value = true;
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

  const switchKakaoLogo = (isHover:boolean) => {
    if(isHover){
      kakaoLogo.value = require("@/assets/images/kakao_logo.png");
      kakaoHover.value = true
    }else{
      kakaoLogo.value = require("@/assets/images/sns05_off.png")
      kakaoHover.value = false
    }
  }

  const movePage = (page: string) => {
    menuVisible.value = false;
    aniVisible.value = false;

    if (page === "/battle") {
      showModal();
    } else {
      router.push(page);
    }
  };

  const services = ref([
    {
      title: 'Web',
      link: '#',
    },
    {
      title: 'Design',
      link: '#',
    },
    {
      title: 'Videos',
      link: '#',
    },
  ]);

  const Withdrawal = () => { 
    router.push({
      path:'/Withdraw',
      name:"Withdraw"
    })
    toggleMenu() 
  }

  const handleSocialIconClick = (logo) => {
    if (logo.name === 'telegram') {
      window.flutter_inappwebview
      .callHandler("handleTelegramCommBtn")
      .then((res: any) => {
        console.log(res);
      });
    } else if(logo.name === "gitHub") {
      window.flutter_inappwebview
      .callHandler("handleGithubCommBtn")
      .then((res: any) => {
        console.log(res);
      });
    } else if (logo.name === "twitter") {
      window.flutter_inappwebview
      .callHandler("handleTwitterCommBtn")
      .then((res: any) => {
        console.log(res);
      });
    }else if (logo.name === "blog") {
      window.flutter_inappwebview
      .callHandler("handleNaverBlogCommBtn")
      .then((res: any) => {
        console.log(res);
      });
    } else if (logo.name === 'medium') {
      window.flutter_inappwebview
      .callHandler("handleMediumCommBtn")
      .then((res: any) => {
        console.log(res);
      });
    }
  };

  const openKakaoTalk = () => {
	window.flutter_inappwebview.callHandler('handleKakaoCommBtn').then(res => {
		console.log(res);
	});
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
