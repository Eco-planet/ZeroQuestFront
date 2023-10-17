<template>
  <div class="global-modal" v-if="wrapperVisible" @click="clickMask">
    <div :class="['global-modal-container', innerClass]" :style="containerStyle" @click.stop>
      <img v-if="showClose" class="close-icon" src="@/assets/images/img_close_black.png" @click="hide" />
      <div class="flex flex-col justify-center items-center">
        <template v-if="popupType === 'qr_code'">
          <div class="flex flex-col justify-center items-center">
            <div class="font-semibold text-2xl">My Address</div>
            <div class="h-5"></div>
            <QRCodeVue3 :width="200" :height="200" :value="myAddress" :dotsOptions="{
              type: 'square'
            }" :cornersSquareOptions="{ type: 'square', color: '#000000' }" />
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
            <div class="w-full flex text-left">- {{ t('message.addressCaution2') }}</div>
            <div class="w-full flex text-left">- {{ t('message.addressCaution3') }}</div>
          </div>
        </template>
        <template v-if="popupType === 'withdraw_pass'">
          <div class="flex flex-col justify-center items-center">
            <div class="font-semibold text-2xl">
              {{ t('message.withdrawPassRegister') }}
            </div>
            <div class="h-5"></div>
            <div class="h-10"></div>
            <div class="p-5 flex flex-col text-xl rounded pass-back-bg">
              <div class="flex justify-start items-center">
                <div>
                  {{ t('message.withdrawPassInput') }}
                </div>
                <div class="ml-4">
                  <input type="password" v-model="passwd1" size="20"
                    class="text-lg border-solid border-1 border-gray-300" />
                </div>
              </div>
              <div class="h-5"></div>
              <div class="flex justify-start items-center">
                <div>
                  {{ t('message.withdrawPassCheck') }}
                </div>
                <div class="ml-4">
                  <input type="password" v-model="passwd2" size="20"
                    class="text-lg border-solid border-1 border-gray-300" />
                </div>
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
              <div class="p-2 text-2xl text-white">
                {{ t('message.withdrawPassRegister') }}
              </div>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'withdraw_pass_update'">
          <div class="flex flex-col justify-center items-center">
            <div class="font-semibold text-2xl">{{ t('message.withdrawPassReset') }}</div>
            <div class="h-5"></div>
            <div class="h-10"></div>
            <div class="p-5 flex flex-col text-xl rounded pass-back-bg">
              <div class="flex justify-between items-center">
                <div>{{ t('message.withdrawPassInput') }}</div>
                <div class="ml-4">
                  <input type="password" v-model.trim="updatePW1" size="20"
                    class="text-lg border-solid border-1 border-gray-300" />
                </div>
              </div>
              <div class="h-5"></div>
              <div class="flex justify-between items-center">
                <div>{{ t('message.withdrawPassCheck') }}</div>
                <div class="ml-4">
                  <input type="password" v-model.trim="updatePW2" size="20"
                    class="text-lg border-solid border-1 border-gray-300" />
                </div>
              </div>
              <div class="h-5"></div>
              <div v-if="passwdMsg !== ''" class="text-red-500">{{ passwdMsg }}</div>
            </div>
            <div class="h-5"></div>
            <div class="text-lg">
              <div class="text-left">- {{ t('message.withdrawPassCaution1') }}</div>
              <div class="text-left">- {{ t('message.withdrawPassCaution2') }}</div>
            </div>
            <div class="h-10"></div>
            <div class="wp-70 p-3 flex justify-center items-center pass-bg rounded" @click="requestUpdatePW">
              <div class="p-2 text-2xl text-white">{{ t('message.withdrawPassUpdate') }}</div>
            </div>
          </div>
        </template>

        <template v-if="popupType === 'send_coin'">
          <div class="flex flex-col justify-center items-center">
            <div class="flex items-center">
              <div class="font-semibold text-2xl">
                {{ t('message.withdraw') }}
              </div>
              <div>
                <img 
                src="@/assets/images/qr2.png"
                class="w-12"
                @click="withdrawalCamera"
                >
              </div>
            </div>
            <div class="h-5"></div>
            <div class="h-10"></div>
            <div class="p-5 flex flex-col text-xl rounded pass-back-bg">
              <div class="flex justify-end items-center">
                <div>Address</div>
                <div class="ml-4">
                  <input 
                    type="text" 
                    v-model="withdrawAddress" 
                    size="20"
                    class="text-lg border-solid border-1 border-gray-300" />
                  </div>
              </div>
              <div class="h-5"></div>
              <div class="flex justify-end items-center">
                <div>
                  {{ t('message.withdrawCount') }}
                </div>
                <div class="ml-4">
                  <input 
                    type="number" 
                    v-model="withdrawCount" 
                    size="20"
                    class="text-lg border-solid border-1 border-gray-300" />
                  </div>
              </div>
              <div class="h-5"></div>
              <div class="flex justify-end items-center">
                <div>
                  {{ t('message.withdrawPassInput') }}
                </div>
                <div class="ml-4">
                  <input 
                    type="password" 
                    v-model="withdrawPass" 
                    size="20"
                    class="text-lg border-solid border-1 border-gray-300" />
                  </div>
              </div>
              <div class="h-5"></div>
              <div v-if="withdrawMsg !== ''" class="text-red-500">
                {{ withdrawMsg }}
              </div>
            </div>
            <div class="h-5"></div>
            <div class="wp-90 text-lg">
              <div class="text-left">- {{ t('message.withdrawCaution1') }}</div>
              <div class="text-left">- {{ t('message.withdrawCaution2') }}</div>
              <div class="h-2"></div>
              <div class="text-left"><span class='font-semibold'>{{ t('message.withdrawCaution3') }}</span> : {{
                t('message.withdrawCaution4') }}</div>
            </div>
            <div class="h-10"></div>
            <div class="p-3 flex justify-center items-center pass-bg rounded" @click="doSendCoin">
              <div class="p-2 text-2xl text-white px-7">{{ t('message.withdrawBtnRegister') }}</div>
            </div>
            <div class="pt-4 font-semibold underline text-lg" @click="openResetPW">{{ t('message.forgetPassword') }}</div>
          </div>
        </template>

        <template v-if="popupType === 'resetPW'">
          <div class="flex flex-col justify-center items-center">
            <div class="bg-white px-4 pb-4">
    
              <div class="mb-10 text-center">
                <h3 class="mt-4 font-semibold text-black voteText text-2xl" id="modal-title">{{ t('message.resetPassword') }} <br>
                  {{ t('message.GoogleAuthentication') }}</h3>
              </div>
              <div>
                <div v-if="locale === 'kr'" class="py-3 px-10 bg-gray-100 rounded-lg font-medium text-xl">인증코드 요청 시<br>
                  현재 로그인 된 구글 메일로 <br>
                  임의로 생성된 인증번호를 전송합니다.
                </div>
                <div v-else class="py-3 px-10 bg-gray-100 rounded-lg font-medium text-xl">When requesting an authentication code,
                  a randomly generated verification number 
                  will be sent to the currently logged-in Google email.
                </div>
              </div>
         
              <button 
              type="button" 
              class="
              mb-16
              text-white 
              hover:bg-gray-400
              focus:outline-none 
              focus:ring-4 
              focus:ring-gray-200 
              font-medium
              text-sm 
              rounded-lg
              mt-7
              w-full
              h-16
              text-2xl
              text-center 
              getCode
              "
              @click="codeRequest"
              >
              {{ t('message.VerificationCodeRequest') }}
              </button>
              <div class="font-medium text-xl">{{ t('message.EnterCode') }}</div>
              <input type="text" v-model.trim="certificationNumber" class="mt-4 border-solid border-gray-300 wp-70" :placeholder="t('message.EnterVerificationCode')">
              <button type="button" 
              class="
              moduleBtnBg
              wp-70
              text-white 
              hover:bg-green-800 
              focus:outline-none 
              focus:ring-4 
              focus:ring-green-300 
              font-medium
              text-sm 
              rounded-lg
              mt-9
              h-16
              text-2xl
              text-center"
              @click="resetRequest"
              >
              {{ t("message.Complete") }}
              </button>
            </div>
          </div>
        </template>
        
        <template v-if="popupType === 'duplicate_nft_buy'">
          <div >
            <div v-if="locale ==='kr'" class="mb-16 text-3xl font-bold text-black">
              자발적 탄소감축을 위한 <br/>
              NFT는 반복 구매할 수 없습니다.
            </div>
            <div v-else class="mb-16 text-3xl font-bold text-black">
              Voluntary carbon reduction <br/>
              NFTs cannot be purchased repeatedly.
            </div>
          </div>
         
          <div>
            <div v-if="locale === 'kr'" class="font-semibold text-xl text-black text-2xl">
              자발적 탄소감축 "제로퀘스트"를 <br/>
              친구들에게 추천하면<br/>
              <span class="text-esg-color font-bold">50ESG point</span> 를 드립니다
            </div>
            <div v-else class="font-semibold text-xl text-black text-2xl">
              If you refer 'ZeroQuest' to friends, <br/>
              you'll earn<br/>
              <span class="text-esg-color font-bold">50ESG points</span>
            </div>
          </div>

       
    
          <div class="mt-7 mb-4">
            <!-- 카카오 공유 -->
            <button type="button">
              <a id="kakao-link-btn" @click="shareKakao">
                <img
                  src="@/assets/images/kakao_logo.png"
                  alt="카카오톡 공유하기"
                />
              </a>
            </button>
    
            <!-- 텔레그램 공유 -->
            <button type="button" class="sns_btn" @click="shareTelegram">
              <img src="@/assets/images/telog.png" alt="텔레그램 공유하기" />
            </button>
          </div>
        </template>

        <template v-if="popupType === 'game_install'">
          <div v-if="locale === 'kr'" class="flex flex-col justify-center items-center">
            <div class="h-5"></div>
            <div class="text-2xl text-center">NFT 를 활성화하기 위해서는<br />분리수거 AI 카메라 NFT App 을<br />설치해야
              합니다.</div>
            <div class="h-10"></div>
            <div class="flex items-center justify-center">
              <img :src="nftList[store.state.nftId].image" />
            </div>
            <div class="h-10"></div>
            <div class="text-xl text-center">연동되는 어플리케이션은 설치 후 동일한<br />구글 로그인을 사용해야 합니다.</div>
            <div class="h-10"></div>
            <div class="w-full flex justify-center items-center">
              <button class="wp-40 p-2 font-semibold text-2xl text-white game-btn" @click="resData(store.state.nftId.toString())">설치하기</button>
            </div>
          </div>
          <div v-else class="flex flex-col justify-center items-center">
            <div class="h-5"></div>
            <div class="text-2xl text-center">To activate NFTs,<br />you need to install<br />the Smart AI NFT APP.</div>
            <div class="h-10"></div>
            <div class="flex items-center justify-center">
              <img :src="nftList[store.state.nftId].image"/>
            </div>
            <div class="h-10"></div>
            <div class="text-xl text-center">The connected application should use<br />the same Google login after installation.</div>
            <div class="h-10"></div>
            <div class="w-full flex justify-center items-center">
              <button class="wp-40 p-2 font-semibold text-2xl text-white game-btn" @click="resData(store.state.nftId.toString())">설치하기</button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'game_off'">
          <div v-if="locale === 'kr'" class="flex flex-col justify-center items-center">
            <div class="h-5"></div>
            <div class="text-2xl text-center font-medium">NFT 를 <span style='color:red;'>OFF</span> 하면<br />탄소절감 데이터가 적용<br />되지 않습니다.
            </div>
            <div class="h-10"></div>
            <div class="w-full flex justify-center items-center">
              <button class="wp-60 p-2 font-semibold text-2xl text-white off-btn" @click="resData('OFF')">OFF</button>
            </div>
          </div>
          <div v-else class="flex flex-col justify-center items-center font-medium">
            <div class="h-5"></div>
            <div class="text-2xl text-center font-medium">If you <span style='color:red;'>OFF</span> NFT,<br />carbon reduction data <br />will not be applied.
            </div>
            <div class="h-10"></div>
            <div class="w-full flex justify-center items-center">
              <button class="wp-60 p-2 font-semibold text-2xl text-white off-btn" @click="resData('OFF')">OFF</button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'serviceChecking'">
          <div>
            <div class="mb-10 flex justify-center">
              <img class="" src="@/assets/images/icon_error.png" />
            </div>
            <div class="mb-10 text-3xl font-bold">
              {{ t('message.serviceChecking') }}
            </div>
            <div>
              <button class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="hide">{{ t('message.termsBtn') }}</button>
              </div>
          </div>
        </template>
        <template v-if="popupType === 'successReferral'">
          <div>
            <div class="mb-10 flex justify-center">
              <img class="wp-30" src="@/assets/images/icon_success.png" />
            </div>
            <div class="mb-10 text-3xl font-bold">
              {{ t('message.successReferral') }}
            </div>
            <div>
              <button class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="hide">{{ t('message.termsBtn') }}</button>
              </div>
          </div>
        </template>
        <template v-if="popupType === 'successMinting'">
          <div>
            <div class="mb-10 flex justify-center">
              <img class="wp-30" src="@/assets/images/icon_success.png" />
            </div>
            <div class="mb-10 text-3xl font-bold">
              {{ t('message.successMinting') }}
            </div>
            <div>
              <button class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="hide">{{ t('message.termsBtn') }}</button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'tree_nft'">
          <div>
            <div>
              <img class="error-icon" src="@/assets/images/icon_error.png" />
            </div>
            <div class="mb-10 text-3xl font-bold">
                {{ t('error.commingSoon') }}
            </div>
            <div>
              <button class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="hide">{{ t('message.termsBtn') }}</button>
              </div>
          </div>
        </template>

        <template
          v-if="popupType !== 'qr_code' && popupType !== 'withdraw_pass' && popupType !== 'withdraw_pass_update' && popupType !== 'resetPW'&& popupType !== 'send_coin' && popupType !== 'game_install' && popupType !== 'game_off' && popupType !== 'duplicate_nft_buy' && popupType !== 'serviceChecking' && popupType !== 'successReferral' && popupType !== 'successMinting' && popupType !== 'tree_nft'">
          <div>
            <img class="error-icon" src="@/assets/images/icon_error.png" />
          </div>
          <div class="h-10"></div>
          <div v-if="showTitle == 'message.swapRequestEnd'" class="text-2xl text-center">
            <div>{{ t(showTitle) }}</div>
            <div>({{ t('message.swapRequestValue', { value: store.state.popupValue }) }})</div>
          </div>
          <div v-else-if="showTitle == 'message.getReward'" class="text-2xl text-center">
            <div>{{ t('message.getReward', { value: store.state.popupValue }) }}</div>
          </div>
          <div v-else class="text-2xl text-center">{{ t(showTitle) }}</div>

          <div class="h-10"></div>

          <div v-if="popupType !== 'message'" class="flex justify-center">
            <div><button class="w-36 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="resData('yes')">YES</button></div>
            <div class="w-20"></div>
            <div><button class="w-36 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="resData('no')">NO</button></div>
          </div>
          <div v-if="popupType === 'message'" class="flex justify-center">
            <div><button class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="hide">Closed</button></div>
          </div>
         
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch } from "vue";
import { useI18n } from "vue-i18n";
import QRCodeVue3 from "qr-code-generator-vue3";
import http from "@/api/http";
import CryptoJS from "crypto";
import openSSLCrypto from "@/utils/openSSLCrypto";
import { useStore } from "vuex"
import "vue3-carousel/dist/carousel.css";

const store = useStore()

const locale = computed(() => store.state.system.locale)
const accessToken = store.getters["auth/getAccessToken"];

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
const updatePW1 = ref()
const updatePW2 = ref()

const myAddress = store.getters['auth/getAddress'];
const withdrawAddress = ref("");
const withdrawCount = ref();
const withdrawPass = ref("");
const withdrawMsg = ref("");

const nftList = store.getters["auth/getNftList"];
const pwHash = computed(() => store.getters["auth/getPwHash"])
const pwNumber = computed(() => store.getters["auth/getPwNumber"])

const popupType = ref("");

//출금번호 초기화
const userEmail = computed(() => store.getters["auth/getUserEmail"])

const certificationNumber = ref()
const md5Hash = ref()

const referral = computed(() => store.getters["auth/getReferral"]);
const referralCode = ref(""); //레퍼럴 코드 확인용

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
  store.state.popupValue = 0;
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

const withdrawalCamera = () => {
  console.log("됐니?")
  window.flutter_inappwebview.callHandler('handleCopyBtn', {content: slicedValue})
}

const doCopy = () => {
  window.flutter_inappwebview.callHandler('handleCopyBtn', {content: store.getters["auth/getAddress"]})
  // window.navigator.clipboard.writeText(store.getters["auth/getAddress"]).then(() => {
  //   //console.log('copy');
  // });

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

const requestUpdatePW = () => {
  if (updatePW1.value.length < 6 || updatePW2.value.length < 6) {
    alert(t('message.WithdrawalPasswordCheck1'))
  } else if (updatePW1.value !== updatePW2.value) {
    alert(t('message.WithdrawalPasswordCheck2'))
  } else {
    //해쉬, 변경비번, 인증번호 넘겨줘야됨
    //pwHash.pwNumber
    http.post("/auth/resetWithdrawPw", {
      verifyToken: pwHash.value,
      verifyCode: pwNumber.value,
      password: openSSLCrypto.encode(CryptoJS.createHash('md5').update(updatePW1.value).digest('hex'))

    })
    .then((response) => {
      if(response.data.data === true){
        alert(t('message.WithdrawalPasswordCheck3'))
        store.state.isPopup = false;                   
      }
    })
    .catch((error) => {
      alert(error.response.data.message)
    })
  }
}

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

const openResetPW = () => {
  popupType.value = 'resetPW';
  store.state.isPopup = true;
}

//인증코드요청
const codeRequest = () => {
  http.post("/auth/signStart",{ email: userEmail.value })
    .then((response) => {
      md5Hash.value = response.data.data
      alert(t('message.codeTransmissionCompleted'))
  })
  .catch((error) => {
    alert(error)
  })
}

//초기화요청검증
const resetRequest = () => {
  if(!md5Hash.value){
    alert(t("message.verificationCode1"))
  }else if(!certificationNumber.value){
    // alert("인증번호를 입력해주세요")
    alert(t("message.verificationCode2"))
  }else if(md5Hash.value && certificationNumber.value){
    http.post("/auth/signVerify", {
    verifyToken: md5Hash.value,
    verifyCode: certificationNumber.value

    })
    .then((response) => {
  
      if(response && response.data){
        console.log("response",response.data.data)
        //스토어에 해쉬, 인증번호 넣어주고 비밀번호 입력모달에서 가져와서 쓰기
        store.dispatch("auth/pwHash", md5Hash.value)
        store.dispatch("auth/pwNumber", certificationNumber.value)

        popupType.value = 'withdraw_pass_update';

        store.state.isPopup = true;
      }
    })
    .catch((error) => {
      alert(t("message.verificationCode3"))
    })
  }
}


// 소셜 공유하기, 텔레그램

const shareTelegram = () => {
  const referralValue = referral.value;

  if (referralValue) {
    const referralSlice = referralValue.slice(-6); // Use slice if referralValue is a string

    const infoShareTelegram = {
      content: {
        objectType: "feed",
        title: `ZeroQuest - 친구초대 이벤트 ${referralSlice}을 입력하세요`,
        description: `https://play.google.com/store/apps/details?id=com.aiblue.zrqst_webview_app&pcampaignid=web_share`,
        imageUrl:
          "https://play-lh.googleusercontent.com/VaCMJUHxqjCtqNJ3oKFDdDCZUHdIOu5nZRARVnxSNssiYK6HXZ6JOTcA3vAcLPYfrJI=w240-h480-rw",
        link: {
          mobileWebUrl: `https://zeroquest.io`, 
          webUrl: `https://zeroquest.io`,
        },
        accessToken: accessToken,
      }
    }

    window.flutter_inappwebview.callHandler('handleTelegramShareBtn', {infoShareTelegram: infoShareTelegram}).then((res: any) => {
      console.log(res)
    })
  } else {
    console.error("store.state.referral is not defined or is empty");
  }
};
const sendReferralRequest = (code) => {
  return http.post(`/api/user/sendReferral`, {
    referralCode: code,
  });
};

// 소셜 공유하기, 카카오
// 소셜 공유하기, 카카오
const shareKakao = () => {
  const referralValue = referral.value;
  if (referralValue) {
    const referralSlice = referralValue.slice(-6);
    const infoShareKakao = {
      objectType: "feed",
      content: {
        title: `ZeroQuest-친구초대 이벤트 ${referralSlice}을 입력하세요`,
        description: `https://play.google.com/store/apps/details?id=com.aiblue.zrqst_webview_app&pcampaignid=web_share`,
        imageUrl:
          "https://play-lh.googleusercontent.com/VaCMJUHxqjCtqNJ3oKFDdDCZUHdIOu5nZRARVnxSNssiYK6HXZ6JOTcA3vAcLPYfrJI=w240-h480-rw",
        link: {
          mobileWebUrl: `https://zeroquest.io`, 
          webUrl: `https://zeroquest.io`,
        },
        accessToken: accessToken
      },
    }

    // 모바일 버전
    window.flutter_inappwebview.callHandler('handleKakaoShareBtn', {infoShareKakao: infoShareKakao}).then((res: any) => {
      console.log(res)
    })

  } else {
    console.error("store.state.referral is not defined or is empty");
  }
};

// 레퍼럴 입력 가이드 (sendReferral)
const referralInput = () => {
  const userReferralSlice = referral.value.slice(-6);

  if (referralCode.value === userReferralSlice) {
    alert(t("message.ref6"));

    return;
  }

  // console.log("레퍼럴 코드는", referralCode.value, typeof referralCode.value);

  http
    .post(`/api/user/checkReferral`, {
      referralCode: referralCode.value,
    })
    .then((response) => {
      console.log("200", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(t("message.ref4"));
      // 오류 발생시 해당 메시지를 표시
      alert(t("message.ref5"));
  
    });
};

const showLastSixChars = () => {
  const referralValue = referral.value;
  if (referralValue) {
    const slicedValue = referralValue.slice(-6);

    // 클립보드에 slicedValue를 복사
    navigator.clipboard
      .writeText(slicedValue)
      .then(() => {
        alert(slicedValue + t("message.ref1")); // 뒷부분 6자리를 알림창으로 표시.
        alert(t("message.ref2"));
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
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

    .off-btn {
      background-color: #ff0000;
      border-radius: 5px;
    }

    .voteText {
      font-size: clamp(1.7rem, 2.5vw, 2.5rem);
    }

    .getCode{
      background-color: #21B750;
    }
    
    .moduleBtnBg{
      background-color: #0C5D25
    }
  }
}</style>
