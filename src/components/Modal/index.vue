<template>
  <div
    class="global-modal"
    v-if="wrapperVisible || wrapperVisible2"
    @click="clickMask"
  >
    <div
      :class="['global-modal-container', innerClass]"
      :style="containerStyle"
      @click.stop
    >
      <img
        v-if="
          showClose &&
          popupType !== 'successMinting' &&
          popupType !== 'duplicate_nft_buy'
        "
        class="close-icon"
        src="@/assets/images/img_close_black.png"
        @click="hide"
      />

      <img
        v-else
        class="close-icon"
        src="@/assets/images/img_close_black.png"
        @click="refreshHide"
      />
      <div class="flex flex-col justify-center items-center">
        <template v-if="popupType === 'qr_code'">
          <div class="flex flex-col justify-center items-center">
            <div class="font-semibold text-2xl">My Address</div>
            <div class="h-5"></div>
            <QRCodeVue3
              :width="200"
              :height="200"
              :value="myAddress"
              :dotsOptions="{
                type: 'square',
              }"
              :cornersSquareOptions="{ type: 'square', color: '#000000' }"
            />
            <div class="h-10"></div>
            <div class="p-3 text-xl bg-gray-500 rounded text-white">
              {{ store.getters["auth/getAddress"] }}
            </div>
            <div class="h-10"></div>
            <div
              class="p-3 flex justify-center items-center qrcode-bg"
              @click="doCopy"
            >
              <div class="text-2xl text-white">Copy Address</div>
              <div class="w-5"></div>
              <div class="wp-10">
                <img src="@/assets/images/icon_copy.png" />
              </div>
            </div>
            <div class="h-10"></div>
            <div class="w-full flex">- {{ t("message.addressCaution1") }}</div>
            <div class="w-full flex text-left">
              - {{ t("message.addressCaution2") }}
            </div>
            <div class="w-full flex text-left">
              - {{ t("message.addressCaution3") }}
            </div>
          </div>
        </template>
        <template v-if="popupType === 'withdraw_pass'">
          <div class="flex flex-col justify-center items-center">
            <div class="font-semibold text-2xl">
              {{ t("message.withdrawPassRegister") }}
            </div>
            <div class="h-5"></div>
            <div class="h-10"></div>
            <div class="p-5 flex flex-col text-xl rounded pass-back-bg">
              <div class="flex justify-between items-center">
                <div>
                  {{ t("message.withdrawNewPassInput") }}
                </div>
                <div class="ml-4">
                  <input
                    type="password"
                    v-model="passwd1"
                    @input="validatePassword"
                    size="20"
                    maxlength="6"
                    class="text-lg border-solid border-1 border-gray-300"
                  />
                </div>
              </div>
              <div class="h-5"></div>
              <div class="flex justify-between items-center">
                <div>
                  {{ t("message.withdrawPassCheck") }}
                </div>
                <div class="ml-4">
                  <input
                    type="password"
                    v-model="passwd2"
                    size="20"
                    class="text-lg border-solid border-1 border-gray-300"
                  />
                </div>
              </div>
              <div class="h-5"></div>
              <div v-if="passwdMsg !== ''" class="text-red-500">
                {{ passwdMsg }}
              </div>
            </div>
            <div class="h-5"></div>
            <div class="wp-90">
              <div class="text-left">
                - {{ t("message.withdrawPassCaution1") }}
              </div>
              <div class="text-left">
                - {{ t("message.withdrawPassCaution2") }}
              </div>
            </div>
            <div class="h-10"></div>
            <div
              class="p-3 flex justify-center items-center pass-bg rounded"
              @click="doPass"
            >
              <div class="p-2 text-2xl text-white">
                {{ t("message.withdrawPassRegister") }}
              </div>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'withdraw_pass_update'">
          <div class="flex flex-col justify-center items-center">
            <div class="font-semibold text-2xl">
              {{ t("message.withdrawPassReset") }}
            </div>
            <div class="h-5"></div>
            <div class="h-10"></div>
            <div class="p-5 flex flex-col text-xl rounded pass-back-bg">
              <div class="flex justify-between items-center">
                <div>{{ t("message.withdrawNewPassInput") }}</div>
                <div class="ml-4">
                  <input
                    type="password"
                    v-model.trim="updatePW1"
                    size="20"
                    class="text-lg border-solid border-1 border-gray-300"
                  />
                </div>
              </div>
              <div class="h-5"></div>
              <div class="flex justify-between items-center">
                <div>{{ t("message.withdrawPassCheck") }}</div>
                <div class="ml-4">
                  <input
                    type="password"
                    v-model.trim="updatePW2"
                    size="20"
                    class="text-lg border-solid border-1 border-gray-300"
                  />
                </div>
              </div>
              <div class="h-5"></div>
              <div v-if="passwdMsg !== ''" class="text-red-500">
                {{ passwdMsg }}
              </div>
            </div>
            <div class="h-5"></div>
            <div class="text-lg">
              <div class="text-left">
                - {{ t("message.withdrawPassCaution1") }}
              </div>
              <div class="text-left">
                - {{ t("message.withdrawPassCaution2") }}
              </div>
            </div>
            <div class="h-10"></div>
            <div
              class="wp-70 p-3 flex justify-center items-center pass-bg rounded"
              @click="requestUpdatePW"
            >
              <div class="p-2 text-2xl text-white">
                {{ t("message.withdrawPassUpdate") }}
              </div>
            </div>
          </div>
        </template>

        <template v-if="popupType === 'PreparingForService'">
          <div>
            <div class="mb-10 text-3xl font-bold">
              Service is Being Prepared
            </div>
            <div>
              <button
                class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="hide"
              >
                OK
              </button>
            </div>
          </div>
        </template>

        <template v-if="popupType === 'send_coin'">
          <div class="flex flex-col justify-center items-center">
            <div class="flex items-center">
              <div
                class="font-semibold text-2xl"
                style="position: relative; left: 20px"
              >
                {{ t("message.withdraw") }}
              </div>
              <div style="position: relative; left: 85px">
                <img
                  src="@/assets/images/qr2.png"
                  class="w-12"
                  @click="withdrawalCamera"
                />
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
                    class="text-lg border-solid border-1 border-gray-300 input-field"
                  />
                </div>
              </div>
              <div class="h-5"></div>
              <div class="flex justify-end items-center">
                <div>
                  {{ t("message.withdrawCount") }}
                </div>
                <div class="ml-4">
                  <input
                    type="number"
                    v-model="withdrawCount"
                    size="20"
                    class="text-lg border-solid border-1 border-gray-300 input-field"
                  />
                </div>
              </div>
              <div class="h-5"></div>
              <div class="flex justify-end items-center">
                <div>
                  {{ t("message.withdrawPassInput") }}
                </div>
                <div class="ml-4">
                  <input
                    type="password"
                    v-model="withdrawPass"
                    size="20"
                    class="text-lg border-solid border-1 border-gray-300 input-field"
                  />
                </div>
              </div>
              <div class="h-5"></div>
              <div v-if="withdrawMsg !== ''" class="text-red-500">
                {{ withdrawMsg }}
              </div>
            </div>
            <div class="h-5"></div>
            <div class="wp-90 text-lg">
              <div class="text-left">- {{ t("message.withdrawCaution1") }}</div>
              <div class="text-left">- {{ t("message.withdrawCaution2") }}</div>
              <div class="h-2"></div>
              <div class="text-left">
                <span class="font-semibold">{{
                  t("message.withdrawCaution3")
                }}</span>
                : {{ t("message.withdrawCaution4") }}
              </div>
            </div>
            <div class="h-10"></div>
            <div
              class="p-3 flex justify-center items-center pass-bg rounded"
              @click="doSendCoin"
            >
              <div class="p-2 text-2xl text-white px-7">
                {{ t("message.withdrawBtnRegister") }}
              </div>
            </div>
            <div
              class="pt-4 font-semibold underline text-lg"
              @click="openResetPW"
            >
              {{ t("message.forgetPassword") }}
              <!-- <h1>Scanned QR Code</h1>
              <p>{{ qrCodeReceived }}</p> -->
            </div>
          </div>
        </template>

        <template v-if="popupType === 'resetPW'">
          <div class="flex flex-col justify-center items-center">
            <div class="bg-white px-4 pb-4">
              <div class="mb-10 text-center">
                <h3
                  class="mt-4 font-semibold text-black voteText text-2xl"
                  id="modal-title"
                >
                  {{ t("message.resetPassword") }} <br />
                  {{ t("message.GoogleAuthentication") }}
                </h3>
              </div>
              <div>
                <div
                  class="py-3 px-10 bg-gray-100 rounded-lg font-medium text-xl"
                >
                  When requesting an authentication code, a randomly generated
                  verification number will be sent to the currently logged-in
                  Google email.
                </div>
              </div>

              <button
                type="button"
                class="mb-16 text-white hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium text-sm rounded-lg mt-7 w-full h-16 text-2xl text-center getCode"
                @click="codeRequest"
              >
                {{ t("message.VerificationCodeRequest") }}
              </button>
              <div class="font-medium text-xl">
                {{ t("message.EnterCode") }}
              </div>
              <input
                type="text"
                v-model.trim="certificationNumber"
                class="mt-4 border-solid border-gray-300 wp-70"
                :placeholder="t('message.EnterVerificationCode')"
              />
              <button
                type="button"
                class="moduleBtnBg wp-70 text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm rounded-lg mt-9 h-16 text-2xl text-center"
                @click="resetRequest"
              >
                {{ t("message.Complete") }}
              </button>
            </div>
          </div>
        </template>

        <template v-if="popupType === 'duplicate_nft_buy'">
          <div>
            <div class="mb-16 text-3xl font-bold text-black">
              Voluntary carbon reduction <br />
              NFTs cannot be purchased repeatedly.
            </div>
          </div>

          <div>
            <div class="font-semibold text-xl text-black text-2xl">
              If you refer 'ZeroQuest' to friends, <br />
              you'll earn<br />
              <span class="text-esg-color font-bold">50ESG points</span>
            </div>
          </div>

          <div class="mt-7 mb-4">
            <button type="button" class="sns_btn" @click="shareTelegram">
              <img src="@/assets/images/telog.png" alt="텔레그램 공유하기" />
            </button>
          </div>
        </template>

        <template v-if="popupType === 'game_install'">
          <div class="flex flex-col justify-center items-center">
            <div class="h-5"></div>
            <div class="text-2xl text-center">
              To activate NFTs,<br />you need to install<br />the
              {{ nftList[store.state.nftId].name.eng }}.
            </div>
            <div class="h-10"></div>
            <div class="flex items-center justify-center">
              <img :src="nftList[store.state.nftId].image" />
            </div>
            <div class="h-10"></div>
            <div class="text-xl text-center">
              The connected application should use<br />the same Google login
              after installation.
            </div>
            <div class="h-10"></div>
            <div class="w-full flex justify-center items-center">
              <button
                class="wp-40 p-2 font-semibold text-2xl text-white game-btn"
                @click="resData(store.state.nftId.toString())"
              >
                Install
              </button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'serviceChecking'">
          <div>
            <div class="mb-10 flex justify-center">
              <img class="" src="@/assets/images/icon_error.png" />
            </div>

            <div class="mb-10 text-3xl font-bold">
              {{ t("message.serviceChecking") }}
            </div>
            <div>
              <button
                class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="hide"
              >
                {{ t("message.termsBtn") }}
              </button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'successReferral'">
          <div>
            <div class="mb-10 flex justify-center">
              <img class="wp-30" src="@/assets/images/icon_success.png" />
            </div>

            <div class="mb-10 text-3xl">
              <span style="font-size: 2.5rem; font-weight: bold">{{
                t("message.successReferralTitle")
              }}</span>
              <br /><br />
              {{ t("message.successReferral") }}
            </div>
            <div>
              <button
                class="w-48 h-16 font-semibold text-white text-xl rounded close-btn"
                @click="refreshHide"
              >
                {{ t("message.termsBtn") }}
              </button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'successMinting'">
          <div>
            <div class="mb-10 flex justify-center">
              <img class="wp-30" src="@/assets/images/icon_success.png" />
            </div>
            <div class="mb-10 text-3xl font-bold">
              {{ t("message.successMinting") }}
            </div>
            <div>
              <button
                class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="refreshHide"
              >
                {{ t("message.termsBtn") }}
              </button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'passwordRegComplated'">
          <div>
            <div class="mb-10 flex justify-center">
              <img class="wp-30" src="@/assets/images/icon_success.png" />
            </div>
            <div class="mb-10 text-3xl font-bold">
              {{ t("message.passwordRegComplated") }}
            </div>
            <div>
              <button
                class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="refreshHide"
              >
                {{ t("message.termsBtn") }}
              </button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'passwordUpdateComplated'">
          <div>
            <div class="mb-10 flex justify-center">
              <img class="wp-30" src="@/assets/images/icon_success.png" />
            </div>
            <div class="mb-10 text-3xl font-bold">
              {{ t("message.passwordUpdateComplated") }}
            </div>
            <div>
              <button
                class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="refreshHide"
              >
                {{ t("message.termsBtn") }}
              </button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'successSwap'">
          <div>
            <div class="mb-10 flex justify-center">
              <img class="wp-30" src="@/assets/images/icon_success.png" />
            </div>
            <div class="mb-10 text-3xl font-bold">
              {{ t("message.successSwap") }}
            </div>
            <div>
              <button
                class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="refreshHide"
              >
                {{ t("message.termsBtn") }}
              </button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'tree_nft'">
          <div>
            <div>
              <img class="error-icon" src="@/assets/images/icon_error.png" />
            </div>
            <div class="mb-10 text-3xl font-bold">
              {{ t("error.commingSoon") }}
            </div>
            <div>
              <button
                class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="hide"
              >
                {{ t("message.termsBtn") }}
              </button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'withDraw'">
          <div class="mb-10 text-3xl font-bold">
            Are you sure you want to withdraw?
          </div>
          <div>
            <div class="mb-10 text-2xl font-semibold">
              When you withdraw, your accumulated points and NFT information
              will be permanently deleted, and recovery will not be possible.
            </div>
            <div class="flex justify-between">
              <button
                class="w-44 h-12 font-semibold text-xl rounded close-btn bg-white text-green-800 border border-gray-300 border-solid"
                @click="hide"
              >
                Cancel
              </button>
              <button
                class="w-44 h-12 font-semibold text-white text-xl rounded close-btn bg-green-700"
                @click="withdrawBtn"
              >
                Withdraw
              </button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'successWithdraw'">
          <div>
            <div class="mb-4 text-2xl font-bold">
              Your membership withdrawal is complete.<br />
            </div>
            <div class="mb-10 text-xl font-semibold">
              It's a pity, but we look forward to<br />
              our next meeting with you.<br />
            </div>
            <div>
              <button
                class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="refreshHide"
              >
                Confirm
              </button>
            </div>
          </div>
        </template>
        <template v-if="popupType === 'shareSuccess'">
          <div>
            <div class="mb-10 flex justify-center">
              <img class="wp-30" src="@/assets/images/icon_success.png" />
            </div>
            <div class="font-bold text-2xl pb-8">Sharing was successful.</div>
            <div>
              <button
                class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="hide"
              >
                Closed
              </button>
            </div>
          </div>
        </template>

        <template
          v-if="
            popupType !== 'qr_code' &&
            popupType !== 'withdraw_pass' &&
            popupType !== 'withdraw_pass_update' &&
            popupType !== 'resetPW' &&
            popupType !== 'send_coin' &&
            popupType !== 'game_install' &&
            popupType !== 'duplicate_nft_buy' &&
            popupType !== 'serviceChecking' &&
            popupType !== 'successReferral' &&
            popupType !== 'successMinting' &&
            popupType !== 'withDraw' &&
            popupType !== 'successWithdraw' &&
            popupType !== 'tree_nft' &&
            popupType !== 'shareSuccess' &&
            popupType !== 'notSuccessMinting' &&
            popupType !== 'PreparingForService' &&
            popupType !== 'successSwap' &&
            popupType !== 'passwordRegComplated' &&
            popupType !== 'passwordUpdateComplated'
          "
        >
          <div>
            <!-- <img class="error-icon" src="@/assets/images/icon_error.png" /> -->
            <img
              :src="
                swapEsgp >= 30000
                  ? '/assets/images/icon_success.png'
                  : '/assets/images/icon_error.png'
              "
            />
            <!-- <img :src="swapEsgp >= 30000 ? '/assets/images/icon_success.png' : '/assets/images/icon_success.png'" /> -->
          </div>
          <div class="h-10"></div>
          <div
            v-if="showTitle == 'message.swapRequestEnd'"
            class="text-2xl text-center"
          >
            <div>{{ t(showTitle) }}</div>
          </div>

          <div
            v-else-if="showTitle == 'message.getReward'"
            class="text-2xl text-center"
          >
            <div>
              {{ t("message.getReward", { value: store.state.popupValue }) }}
            </div>
          </div>
          <div v-else class="text-2xl text-center">{{ t(showTitle) }}</div>

          <div class="h-10"></div>

          <div v-if="popupType !== 'message'" class="flex justify-center">
            <div>
              <button
                class="w-36 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="resData('yes')"
              >
                YES
              </button>
            </div>
            <div class="w-20"></div>
            <div>
              <button
                class="w-36 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="resData('no')"
              >
                NO
              </button>
            </div>
          </div>
          <div
            v-if="showTitle == 'message.swapRequestEnd'"
            class="flex justify-center"
          >
            <div>
              <button
                class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="refreshHide"
              >
                Closed
              </button>
            </div>
          </div>
          <div v-else-if="popupType === 'message'" class="flex justify-center">
            <div>
              <button
                class="w-48 h-12 font-semibold text-white text-xl rounded close-btn"
                @click="hide"
              >
                Closed
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs, watch, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import QRCodeVue3 from "qr-code-generator-vue3";
import http from "@/api/http";
import CryptoJS from "crypto";
import openSSLCrypto from "@/utils/openSSLCrypto";
import { useStore } from "vuex";
import "vue3-carousel/dist/carousel.css";

const store = useStore();
const qrCodeReceived = ref("");

onMounted(() => {
  window.receiveQRCode = (qrCode) => {
    qrCodeReceived.value = qrCode;
    console.log("Received QR Code:", qrCode);
    // 여기에서 추가 로직을 구현할 수 있습니다.
  };
});

onUnmounted(() => {
  delete window.receiveQRCode; // 컴포넌트가 제거될 때 함수를 정리
});

const locale = computed(() => store.state.system.locale);
const accessToken = store.getters["auth/getAccessToken"];

const { t } = useI18n();

const props = defineProps({
  visible: {
    type: Boolean,
    default: () => false,
  },
  withdrawVisible: {
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
  swapEsgp: {
    type: Number,
    default: () => 0,
  },
});

watch(
  () => props.swapEsgp,
  (newValue, oldValue) => {
    console.log(`swapEsgp 변경 from ${oldValue} to ${newValue}`);
  },
  { immediate: true }
);

const emit = defineEmits([
  "afterShow",
  "afterHide",
  "afterLogin",
  "show",
  "hide",
  "update:visible",
  "resData",
  "resJson",
  "refreshHide",
  "clickWithdraw",
]);
const { visible, withdrawVisible, innerStyle, title } = toRefs(props); // 弹框组件显隐
const wrapperVisible = ref(false); // 弹框外部容器显隐
const wrapperVisible2 = ref(false); // 弹框外部容器显隐
const innerVisible = ref(false); // 弹框中间容器显隐
const resolvePromise = ref(null);
const showTitle = ref(title.value);

const passwd1 = ref("");
const passwd2 = ref("");
const passwdMsg = ref("");
const updatePW1 = ref();
const updatePW2 = ref();

const myAddress = store.getters["auth/getAddress"];
const withdrawAddress = ref("");
const withdrawCount = ref();
const withdrawPass = ref("");
const withdrawMsg = ref("");

const nftList = store.getters["auth/getNftList"];

const popupType = ref("");
console.log(popupType.value);
//출금번호 초기화
const userEmail = computed(() => store.getters["auth/getUserEmail"]);

const certificationNumber = ref();
const md5Hash = ref();

const referral = computed(() => store.getters["auth/getReferral"]);
const referralCode = ref(""); //레퍼럴 코드 확인용

watch([visible, withdrawVisible], ([newVisible, newWithdrawVisible]) => {
  if (newVisible || newWithdrawVisible) {
    popupType.value = store.state.popupType;

    if (popupType.value === "successWithdraw") {
      wrapperVisible.value = false;
      innerVisible.value = false;
    }

    if (store.state.isLogin === true) {
      showTitle.value = "error.useAfterLogin";
    } else {
      showTitle.value = title.value;
    }

    wrapperVisible.value = newVisible;
    wrapperVisible2.value = newWithdrawVisible;
    setTimeout(() => {
      innerVisible.value = true;
      emit("afterShow");
    }, 100);
  } else {
    innerVisible.value = false;
    setTimeout(() => {
      wrapperVisible.value = false;
      wrapperVisible2.value = false;
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
  store.state.popupType = "";

  passwd1.value = "";
  passwd2.value = "";
  passwdMsg.value = "";
  qrCodeReceived.value = "";

  const validatePassword = (event) => {
    const password = event.target.value; // input 이벤트에서 입력된 값을 가져옴
    const regex = /^[A-Za-z0-9]+$/; // 영문 대소문자 및 숫자만 허용
    // 입력된 비밀번호가 6자리를 초과하는지 검사합니다.
    if (password.length > 6) {
      passwdMsg.value = "Password must be no more than 6 characters.";
      passwd1.value = password.substring(0, 6); // 비밀번호를 6자리로 자릅니다.
    } else if (!regex.test(password)) {
      passwdMsg.value = "Password must contain only alphanumeric characters.";
      passwd1.value = password.replace(/[^A-Za-z0-9]/g, "");
    } else {
      passwdMsg.value = ""; // 에러 메시지를 초기화합니다.
    }
  };

  withdrawAddress.value = "";
  withdrawCount.value = null;
  withdrawPass.value = "";

  emit("update:visible", false);
  emit("hide");
};

const refreshHide = () => {
  console.log("referral code entered");
  store.state.popupType = "";

  passwd1.value = "";
  passwd2.value = "";
  passwdMsg.value = "";

  withdrawAddress.value = "";
  withdrawCount.value = null;
  withdrawPass.value = "";

  emit("update:visible", false);
  emit("refreshHide");
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

const withdrawBtn = () => {
  emit("clickWithdraw");
};
const containerStyle = computed(() => ({
  transform: innerVisible.value
    ? "translate(-50%, -50%) scale(1,1)"
    : "translate(-50%, -50%) scale(0,0)",
  ...innerStyle.value,
}));

const clickMask = () => {
  hide();
};

const withdrawalCamera = () => {
  console.log("됐니?");
  window.flutter_inappwebview
    .callHandler("handleOpenCamera")
    .TouchEvent((res: any) => {
      console.log("res는", res);
    });
};

const doCopy = () => {
  console.log("do copy?");
  window.flutter_inappwebview.callHandler("handleCopyBtn", {
    content: store.getters["auth/getAddress"],
  });

  hide();
};

const doPass = () => {
  if (passwd1.value.length < 6) {
    passwdMsg.value = "Please enter at least 6 characters.";
  } else if (passwd1.value.length > 6) {
    passwdMsg.value = "Only 6 characters allowed.";
  } else if (passwd1.value !== passwd2.value) {
    passwdMsg.value = "The passwords do not match.";
  } else {
    resData(passwd1.value);

    passwd1.value = "";
    passwd2.value = "";
    passwdMsg.value = "";
  }
};

const requestUpdatePW = () => {
  if (updatePW1.value.length < 6) {
    passwdMsg.value = "Please enter at least 6 characters.";
  } else if (updatePW1.value.length > 6) {
    passwdMsg.value = "Only 6 characters allowed.";
  } else if (updatePW1.value !== updatePW2.value) {
    passwdMsg.value = "The passwords do not match.";
  } else {
    resData(updatePW1.value);

    updatePW1.value = "";
    updatePW2.value = "";
    passwdMsg.value = "";
  }
};

const doSendCoin = () => {
  if (withdrawAddress.value === "") {
    withdrawMsg.value = t("message.withdrawError3");
  } else if (!withdrawCount.value || withdrawCount.value < 0) {
    withdrawMsg.value = t("message.withdrawError4");
    return;
  } else if (withdrawPass.value === "") {
    withdrawMsg.value = t("message.withdrawError5");
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
  popupType.value = "resetPW";
  store.state.isPopup = true;
};

//인증코드요청
const codeRequest = () => {
  console.log("인증번호 요청");
  http
    .post("/auth/signStart", { email: userEmail.value })
    .then((response) => {
      md5Hash.value = response.data.data;
      alert(t("message.codeTransmissionCompleted"));
    })
    .catch((error) => {
      alert(error);
    });
};

//초기화요청검증
const resetRequest = () => {
  if (!md5Hash.value) {
    alert(t("message.verificationCode1"));
  } else if (!certificationNumber.value) {
    // alert("인증번호를 입력해주세요")
    alert(t("message.verificationCode2"));
  } else if (md5Hash.value && certificationNumber.value) {
    http
      .post("/auth/signVerify", {
        verifyToken: md5Hash.value,
        verifyCode: certificationNumber.value,
      })
      .then((response) => {
        if (response && response.data) {
          console.log("response", response.data.data);
          //스토어에 해쉬, 인증번호 넣어주고 비밀번호 입력모달에서 가져와서 쓰기
          store.dispatch("auth/pwHash", md5Hash.value);
          store.dispatch("auth/pwNumber", certificationNumber.value);

          popupType.value = "withdraw_pass_update";

          store.state.isPopup = true;
        }
      })
      .catch((error) => {
        alert(t("message.verificationCode3"));
      });
  }
};

const showShareModal = async () => {
  await store.dispatch("auth/getPointBalanceAll");
  store.state.popupType = "shareSuccess";
  store.state.isPopup = true;
};

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
      },
    };

    window.flutter_inappwebview
      .callHandler("handleTelegramShareBtn", {
        infoShareTelegram: infoShareTelegram,
      })
      .then(async (res: any) => {
        await store.dispatch("auth/getPointBalanceAll");
      });
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
      background-color: rgb(15, 83, 15);
    }

    .qrcode-bg {
      background-color: #437af0;
    }

    .pass-back-bg {
      background-color: #f6f8f5;
      display: flex;
      flex-direction: column;
      padding: 20px; // 패딩 조정
      gap: 10px; // 항목 사이의 간격
      background-color: #f6f8f5;
      border-radius: 10px; // 모서리 둥글게
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

    .getCode {
      background-color: #21b750;
    }

    .moduleBtnBg {
      background-color: #0c5d25;
    }
  }
}
.input-field {
  width: 100%; // 너비를 100%로 설정하여 부모 컨테이너에 맞게 조정
  padding: 10px; // 패딩 추가
  border: 1px solid #ccc; // 테두리 스타일 조정
  border-radius: 5px; // 모서리 둥글게
}
</style>
