<template>
  <div class="global-modal" v-if="wrapperVisible" @click="clickMask">
    <div :class="['global-modal-container', innerClass]" :style="containerStyle" @click.stop>
      <img v-if="showClose" class="close-icon" src="@/assets/images/img_close_black.png" @click="hide" />
      <div class="flex flex-col justify-center items-center">
        <template v-if="popupType === 'qr_code'">
          <div class="flex flex-col justify-center items-center">
            <div class="font-semibold text-2xl">My Address</div>
            <div class="h-5"></div>
            <QRCodeVue3
              :width="200"
              :height="200"
              value="{{ myAddress }}"
              :dotsOptions="{
                type: 'square'
              }"
              :cornersSquareOptions="{ type: 'square', color: '#000000' }"
            />
            <div class="h-10"></div>
            <div class="p-3 text-xl bg-gray-500 rounded text-white">{{ store.getters["auth/getAddress"] }}</div>
            <div class="h-10"></div>
            <div class="p-3 flex justify-center items-center qrcode-bg" @click="doCopy">
              <div class="text-2xl text-white">Copy Address</div>
              <div class="w-5"></div>
              <div class="wp-10"><img src="@/assets/images/icon_copy.png" /></div>
            </div>
            <div class="h-10"></div>
            <div class="w-full flex">- {{ t('message.addressCaution1') }}</div>
            <div class="w-full flex">- {{ t('message.addressCaution2') }}</div>
            <div class="w-full flex">- {{ t('message.addressCaution3') }}</div>
          </div>
        </template>
        <template v-if="popupType === 'withdraw_pass'">
          <div class="flex flex-col justify-center items-center">
            <div class="font-semibold text-2xl">{{ t('message.withdrawPassRegister') }}</div>
            <div class="h-5"></div>
            <div class="h-10"></div>
            <div class="p-5 flex flex-col text-xl rounded pass-back-bg">
              <div class="flex justify-start items-center">
                <div>{{ t('message.withdrawPassInput') }}</div>
                <div class="ml-4"><input type="password" v-model="passwd1" size="20" class="text-lg border-solid border-1 border-gray-300" /></div>
              </div>
              <div class="h-5"></div>
              <div class="flex justify-start items-center">
                <div>{{ t('message.withdrawPassCheck') }}</div>
                <div class="ml-4"><input type="password" v-model="passwd2" size="20" class="text-lg border-solid border-1 border-gray-300" /></div>
              </div>
              <div class="h-5"></div>
              <div v-if="passwdMsg !== ''" class="text-red-500">{{ passwdMsg }}</div>
            </div>
            <div class="h-5"></div>
            <div class="wp-90">
              <div class="text-left">- {{ t('message.withdrawPassCaution1') }}</div>
              <div class="text-left">- {{ t('message.withdrawPassCaution2') }}</div>
            </div>
            <div class="h-10"></div>
            <div class="p-3 flex justify-center items-center pass-bg rounded" @click="doPass">
              <div class="p-2 text-2xl text-white">{{ t('message.withdrawPassRegister') }}</div>
            </div>
           </div>
        </template>
        <template v-if="popupType === 'send_coin'">
          <div class="flex flex-col justify-center items-center">
            <div class="font-semibold text-2xl">{{ t('message.withdraw') }}</div>
            <div class="h-5"></div>
            <div class="h-10"></div>
            <div class="p-5 flex flex-col text-xl rounded pass-back-bg">
              <div class="flex justify-end items-center">
                <div>Address</div>
                <div class="ml-4"><input type="text" v-model="withdrawAddress" size="20" class="text-lg border-solid border-1 border-gray-300" /></div>
              </div>
              <div class="h-5"></div>
              <div class="flex justify-end items-center">
                <div>{{ t('message.withdrawCount') }}</div>
                <div class="ml-4"><input type="number" v-model="withdrawCount" size="20" class="text-lg border-solid border-1 border-gray-300" /></div>
              </div>
              <div class="h-5"></div>
              <div class="flex justify-end items-center">
                <div>{{ t('message.withdrawPassInput') }}</div>
                <div class="ml-4"><input type="password" v-model="withdrawPass" size="20" class="text-lg border-solid border-1 border-gray-300" /></div>
              </div>
              <div class="h-5"></div>
              <div v-if="withdrawMsg !== ''" class="text-red-500">{{ withdrawMsg }}</div>
            </div>
            <div class="h-5"></div>
            <div class="wp-90">
              <div class="text-left">- {{ t('message.withdrawCaution1') }}</div>
              <div class="text-left">- {{ t('message.withdrawCaution2') }}</div>
              <div class="h-2"></div>
              <div class="text-left"><span class='font-semibold'>{{ t('message.withdrawCaution3') }}</span> : {{ t('message.withdrawCaution4') }}</div>
            </div>
            <div class="h-10"></div>
            <div class="p-3 flex justify-center items-center pass-bg rounded" @click="doSendCoin">
              <div class="p-2 text-2xl text-white px-7">{{ t('message.withdrawBtnRegister') }}</div>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'game_install'">
          <div class="flex flex-col justify-center items-center">
            <div class="h-5"></div>
            <div class="text-2xl text-center">NFT 를 활성화하기 위해서는<br/>{{ nftList[store.state.nftId].name }} App 을<br/>설치해야 합니다.</div>
            <div class="h-10"></div>
            <div class="flex items-center justify-center"><img :src="nftList[store.state.nftId].image" /></div>
            <div class="h-10"></div>
            <div class="text-xl text-center">연동되는 어플리케이션은 설치 후 동일한<br/>구글 로그인을 사용해야 합니다.</div>
            <div class="h-10"></div>
            <div class="w-full flex justify-center items-center">
              <button class="wp-40 p-2 font-semibold text-2xl text-white game-btn" @click="resData(store.state.nftId.toString())">설치하기</button>
              <div class="wp-20"></div>
              <button class="wp-40 p-2 font-semibold text-2xl text-white down-btn" @click="resData('run');">실행하기</button>
            </div>
          </div>
        </template>
        <template v-if="popupType !== 'qr_code' && popupType !== 'withdraw_pass' && popupType !== 'send_coin' && popupType !== 'game_install'">
          <div><img class="error-icon" src="@/assets/images/icon_error.png" /></div>
          <div class="h-10"></div>
          <div class="text-2xl text-center">{{ t(showTitle) }}</div>
          <div class="h-10"></div>
          <div v-if="popupType !== 'message'" class="flex justify-center">
            <div><button class="w-36 h-12 font-semibold text-white text-xl rounded close-btn" @click="resData('yes')">YES</button></div>
            <div class="w-20"></div>
            <div><button class="w-36 h-12 font-semibold text-white text-xl rounded close-btn" @click="resData('no')">NO</button></div>
          </div>
          <div v-if="popupType === 'message'" class="flex justify-center">
            <div><button class="w-48 h-12 font-semibold text-white text-xl rounded close-btn" @click="hide">Closed</button></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import store from "@/store";
import { STATEMENT_OR_BLOCK_KEYS } from "@babel/types";
import { onMounted, computed, nextTick, ref, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import QRCodeVue3 from "qr-code-generator-vue3";

const { t } = useI18n();

const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
  innerStyle: {
    type: Object,
    default: () => ({}),
  },
  innerClass: {
    type: String,
    defualt: () => "",
  },
  popupType: {
    type: String,
    default: () => "Error",
  },
  title: {
    type: String,
    default: () => "",
  },
  showClose: {
    type: Boolean,
    default: () => true,
  },
});

const emit = defineEmits([
  "afterShow",
  "afterHide",
  "afterLogin",
  "show",
  "hide",
  "update:visible",
  "resData",
  "resJson",
]);
const { visible, innerStyle, title } = toRefs(props); // 弹框组件显隐
const wrapperVisible = ref(false); // 弹框外部容器显隐
const innerVisible = ref(false); // 弹框中间容器显隐
const resolvePromise = ref(null);
const showTitle = ref(title.value);

const passwd1 = ref("");
const passwd2 = ref("");
const passwdMsg = ref("");

const myAddress = store.getters['auth/getAddress'];
const withdrawAddress = ref("");
const withdrawCount = ref();
const withdrawPass = ref("");
const withdrawMsg = ref("");

const nftList = store.getters["auth/getNftList"];

const popupType = ref("");

watch(visible, (val) => {
  if (val) {
    popupType.value = store.state.popupType;

    if (store.state.isLogin === true) {
      showTitle.value = "error.useAfterLogin";
    } else {
      showTitle.value = title.value;
    }

    wrapperVisible.value = true;
    setTimeout(() => {
      innerVisible.value = true;
      emit("afterShow");
    }, 100);
  } else {
    innerVisible.value = false;
    setTimeout(() => {
      wrapperVisible.value = false;
      emit("afterHide");

      if (store.state.isLogin === true) {
        store.state.isLogin = false;
        emit("afterLogin");
      }
    }, 100);
  }
});

const show = () => {
  emit("update:visible", true);

  return new Promise((resolve: any, _) => {
    resolvePromise.value = resolve;
  });
};

const hide = () => {
  store.state.popupType = '';

  passwd1.value = "";    
  passwd2.value = "";    
  passwdMsg.value = "";    

  withdrawAddress.value = "";
  withdrawCount.value = null;
  withdrawPass.value = "";
 
  emit("update:visible", false);
  emit("hide");
};

const resData = (res: string) => {
  emit("resData", res);
  emit("update:visible", false);
  emit("hide");
};

const resJson = (res: any) => {
  emit("resJson", res);
  emit("update:visible", false);
  emit("hide");
};

const containerStyle = computed(() => ({
  transform: innerVisible.value
    ? "translate(-50%, -50%) scale(1,1)"
    : "translate(-50%, -50%) scale(0,0)",
  ...innerStyle.value,
}));

const clickMask = () => {
  hide();
}

const doCopy = () => {
  window.navigator.clipboard.writeText(store.getters["auth/getAddress"]).then(() => {
    //console.log('copy');
  });

  hide();
};

const doPass = () => {
  if (passwd1.value.length < 6) {
    passwdMsg.value = "6자리 이상으로 입력해주세요.";
  } else if (passwd1.value !== passwd2.value) {
    passwdMsg.value = "패스워드가 일치하지 않습니다.";
  } else {
    resData(passwd1.value);

    passwd1.value = "";    
    passwd2.value = "";    
    passwdMsg.value = "";    
  }
};

const doSendCoin = () => {
  if (withdrawAddress.value === "") {
    withdrawMsg.value = "출금하실 주소를 입력해주세요."
  } else if (withdrawCount.value < 0) {
    withdrawMsg.value = "출금 수량을 입력해주세요."
  } else if (withdrawPass.value === "") {
    withdrawMsg.value = "출금 비밀번호를 입력해주세요."
  } else {
    var res = {
      address: withdrawAddress.value,
      count: withdrawCount.value,
      passwd: withdrawPass.value,
    };

    resJson(res);

    withdrawAddress.value = "";
    withdrawCount.value = null;
    withdrawPass.value = "";
  }
};
</script>

<style lang="scss">
.global-modal {
  z-index: 100;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  &-container {
    // transition: 0.2s all ease;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    // transform: translate(-50%, -70%);
    // border-radius: 10px;
    // padding: 80px 28px 38px 28px;
    // overflow-y: auto;
    // max-height: 90%;

    @media screen and (min-width: 840px) {
      min-width: 400px;
    }

    @media screen and (max-width: 840px) {
      padding: 5rem 2rem;
      width: calc(100% - 60px);
    }

    .title {
      position: absolute;
      top: 27px;
      left: 27px;
      font-size: 20px;
      font-weight: bold;
    }

    .close-icon {
      position: absolute;
      top: 27px;
      right: 27px;
      width: 20px;
      height: 20px;
      cursor: pointer;

      @media screen and (max-width: 840px) {
        position: absolute;
        top: 18px;
        right: 18px;
        width: 15px;
        height: 15px;
        cursor: pointer;
      }
    }

    .error-icon {
      width: 60%;
      height: 60%;
      margin-left: 20%;
    }

    .close-btn {
      background-color: #999;
    }

    .qrcode-bg {
      background-color: #437af0;
    }

    .pass-back-bg {
      background-color: #f6f8f5;
    }

    .pass-bg {
      background-color: #0c5c26;
    }

    .down-btn {
      background-color: #437af0;
      border-radius: 5px;
    }

    .game-btn {
      background-color: #0c5c26;
      border-radius: 5px;
    }
  }
}
</style>
