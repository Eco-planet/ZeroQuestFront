<template>
  <div class="h-10"></div>
  <div class="px-8 flex flex-col">
    <div class="flex font-semibold text-3xl">MyWallet</div>
    <div class="h-10"></div>
    <div class="px-8 py-5 esg-point w-full flex justify-between text-2xl">
      <div>ESG Point</div>
      <div>{{ esgPoint.toLocaleString() }}</div>
    </div>
    <div class="h-10"></div>
    <div class="px-8 py-5 my-wallet">
      <template v-for="(item, key, index) in tokenInfos" :key="item.symbol">
        <template v-if="item.symbol !== 'ESGP'">
          <div v-if="index !== 0" class="h-5"></div>
          <div v-if="index !== 0" class="h-px h-5 bg-gray-200"></div>
          <div v-if="index !== 0" class="h-5"></div>
          <div class="flex justify-between">
            <div class="flex flex-col">
              <div class="flex font-semibold text-2xl">{{ key }}</div>
              <div class="flex text-sm">= {{ item.price }} USDT</div>
            </div>
            <div class="flex justify-end">
              <div class="flex flex-col justify-end list-margin">
                <template v-if="Object.keys(userTokenInfo).length > 0">
                  <div class="flex justify-end font-semibold text-2xl">
                    {{
                      parseFloat(1 * userTokenInfo[key]).toFixed(item.decimals)
                    }}
                  </div>
                  <div class="flex justify-end text-sm">
                    =
                    {{
                      parseFloat(
                        (item.price * userTokenInfo[key]).toFixed(item.decimals)
                      )
                    }}
                    USDT
                  </div>
                </template>
                <template v-if="Object.keys(userTokenInfo).length === 0">
                  <div class="flex justify-end font-semibold text-2xl">0</div>
                  <div class="flex justify-end text-sm">= 0 USDT</div>
                </template>
              </div>
              <div class="flex justify-end items-center">
                <div class="inout" @click="showQrCode">
                  <img src="@/assets/images/icon_in.png" />
                </div>
                <div class="w-3"></div>
                <div
                  class="inout"
                  @click="getStatusCheck('sendCoin', key.toString())"
                >
                  <img src="@/assets/images/icon_out.png" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
    <div class="h-10"></div>
    <div class="flex font-semibold text-2xl items-center">
      SWAP
      <select
        v-model="selectedPair"
        class="ml-5 border-none focus:border-none focus:outline-none"
        style="margin-left: 20px"
      >
        <option value="ESGP-ESG">ESGP to ESG</option>
        <option value="ESG-ESGP">ESG to ESGP</option>
        <option value="ESG-ETH">ESG to ETH</option>
        <!-- <option value="ETH-ESG">ETH to ESG</option> -->
      </select>
    </div>
    <div class="h-2"></div>
    <div class="flex">
      <div class="wp-40 flex flex-col">
        <div class="flex justify-end items-center">
          <div class="wp-100 input-container">
            <input
              type="number"
              class="input-field font-semibold text-xl"
              v-model="swapEsgp"
              :onKeyup="initSwapEsgp"
              @focus="handleFocus"
              placeholder="0"
              style="text-align: right"
            />
            <div class="wp-15 flex justify-end items-center text-gray-400">
              {{ fromSymbol }}
            </div>
          </div>
        </div>
        <div class="h-px h-5 bg-gray-200"></div>
      </div>
      <div class="wp-20 flex justify-center items-center">
        <div class="swap-icon" @click="getSwapInfo">
          <img src="@/assets/images/arrow.png" />
        </div>
      </div>
      <div class="wp-40 flex flex-col">
        <div class="flex justify-end items-center">
          <div class="wp-80 input-container">
            <input
              type="number"
              class="w-36 font-semibold text-xl swap-text non-clickable"
              v-model="swapEsg"
              style="text-align: right"
              readonly
            />
          </div>
          <div
            class="input-field wp-20 flex justify-end items-center text-gray-400"
          >
            {{ toSymbol }}
          </div>
        </div>
        <div class="h-px h-5 bg-gray-200"></div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="flex flex-col text-xl">
      <div class="swap-noti flex font-semibold">
        {{ t("message.swapCaution") }}
      </div>

      <div class="h-2"></div>
      <div class="flex justify-start items-start" style="text-align: left">
        <div class="font-bold">·</div>
        <div class="ml-2">{{ t("message.swapCaution1") }}</div>
      </div>
      <div class="flex justify-start items-start">
        <div class="font-bold">·</div>
        <div class="ml-2 text-left">{{ t("message.swapCaution2") }}</div>
      </div>
      <div class="flex justify-start items-start">
        <div class="font-bold">·</div>
        <div class="ml-2 text-left">{{ t("message.swapCaution3") }}</div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="flex justify-center items-center">
      <button
        :class="[
          swapEsg > 0
            ? 'wp-40 p-2 font-semibold text-2xl text-white swap-btn'
            : 'wp-40 p-2 font-semibold text-2xl text-white swap-btn-disable',
        ]"
        @click="getStatusCheck('swap', '')"
      >
        SWAP
      </button>
    </div>
    <div class="h-20"></div>
  </div>
  <Modal
    :visible="store.state.isPopup"
    @hide="closeModal"
    @refreshHide="closeSwapModal"
    @resData="checkData"
    @resJson="checkObject"
    :title="popupTitle"
    :showClose="showClose"
    :popupType="store.state.popupType"
    :swapEsgp="currentSwapValue"
  />
  <div class="h-20"></div>
</template>

<script lang="ts" setup>
import store from "@/store";
import router from "@/router";
import http from "@/api/http";
import CryptoJS from "crypto";
import openSSLCrypto from "@/utils/openSSLCrypto";
import { useI18n } from "vue-i18n";
import { onMounted, ref, reactive, watchEffect } from "vue";
import Modal from "@/components/Modal/index.vue";
import { errorMsg } from "@/utils/util";
import { useStore } from "vuex";
import { computed, watch } from "vue";

const { t } = useI18n();
const vuexStore = useStore();
const userTokenInfo = computed(() => vuexStore.getters["auth/getBalances"]);
const esgPoint = parseInt(userTokenInfo.value.ESGP);
const balances = ref({});
const withdrawSymbol = ref("");
const popupTitle = ref("");

const isUpdate = ref(false);
const swapEsgp = ref(0);
const swapEsg = ref(0);
const showClose = ref(true);
const tokenInfos = computed(() => vuexStore.getters["auth/getTokenInfos"]);
const boolWithdraw = computed(() => vuexStore.getters["auth/getWithdrawPw"]);
const pwHash = computed(() => vuexStore.getters["auth/getPwHash"]);
const pwNumber = computed(() => vuexStore.getters["auth/getPwNumber"]);

// 선택된 쌍을 저장할 ref
const selectedPair = ref("ESGP-ESG");
// fromSymbol과 toSymbol을 저장할 ref
const fromSymbol = ref("");
const toSymbol = ref("");

watchEffect(() => {
  const [from, to] = selectedPair.value.split("-");
  fromSymbol.value = from;
  toSymbol.value = to;
});

onMounted(async () => {
  await vuexStore.dispatch("auth/getPointBalanceAll");
});

const checkError = (status: number, code: number) => {
  if (status === 400) {
    store.state.popupType = "message";
    popupTitle.value = errorMsg(status, code);
    store.state.isPopup = true;
  } else if (status === 401 || status === 403 || status === 300) {
    store.commit("auth/setClearToken");

    router.push("/");
  }
};

const getStatusCheck = (type: string, symbol: string) => {
  isUpdate.value = false;
  console.log("클릭");
  if (type === "swap") {
    // if (swapEsgp.value < 30000) 
    if (swapEsgp.value < 30000 && fromSymbol.value === "ESGP"){
      store.state.isPopup = true;
      store.state.popupType = "message";
      popupTitle.value = "message.notSuccessMinting";
      return; // 이 조건을 만족하지 않으면 여기서 함수 실행을 중단
    }
  }

  // 처리중인 SendCoin/Swap 이 있는지 확인
  http
    .get("/api/statusCheck", {
      params: {
        address: store.getters["auth/getAddress"],
      },
    })
    .then((response) => {
      if (Object.keys(response.data.data).length > 0) {
        store.state.popupType = "message";
        popupTitle.value = "error.notProcessIng";
        store.state.isPopup = true;
        isUpdate.value = true;
      } else {
        if (isUpdate.value === true) {
          isUpdate.value = false;
          vuexStore.dispatch("auth/getPointBalanceAll");
        }

        if (type === "sendCoin") {
          console.log("나다");
          withdrawSymbol.value = symbol;

          if (store.getters["auth/getWithdrawPw"] === true) {
            store.state.popupType = "send_coin";
          } else {
            store.state.popupType = "withdraw_pass";
          }
          store.state.isPopup = true;
        } else if (type === "swap") {
          if (swapEsg.value === 0) {
            store.state.popupType = "message";
            popupTitle.value = "error.lessMiniumCostSwap";
            store.state.isPopup = true;
          } else {
            sendSwap();
          }
        }
      }
    })
    .catch((error) => {
      checkError(error.response.status, error.response.data.errorCode);
    });
};

const checkData = (res: string) => {
  const passwd = openSSLCrypto.encode(
    CryptoJS.createHash("md5").update(res).digest("hex")
  );
  // 이미 withdraw가 등록되어 있으면 updated를 호출 그렇지 않으면
  if (boolWithdraw.value) {
    http
      .post("/auth/resetWithdrawPw", {
        verifyToken: pwHash.value,
        verifyCode: pwNumber.value,
        password: passwd,
      })
      .then((response) => {
        if (response.data.data === true) {
          store.state.popupType = "passwordUpdateComplated";
          store.state.isPopup = true;
        }
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  } else {
    http
      .post("/api/user/withdrawPw", {
        password: passwd,
      })
      .then((response) => {
        if (response.data.data.result === true) {
          store.commit("auth/setWithdrawPw", { pw: true });
        }
        store.state.popupType = "passwordRegComplated";
        store.state.isPopup = true;
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }
};

const checkObject = (res: any) => {
  sendCoin(withdrawSymbol.value, res.address, res.count, res.passwd);
};

const sendCoin = (
  symbol: string,
  to: string,
  value: number,
  password: string
) => {
  store.state.isLoading = true;
  const passwd = openSSLCrypto.encode(
    CryptoJS.createHash("md5").update(password).digest("hex")
  );

  http
    .post("/api/token/sendCoin", {
      symbol: symbol,
      to: to,
      value: value,
      address: store.getters["auth/getAddress"],
      privateKey: store.getters["auth/getPrivateKey"],
      password: passwd,
    })
    .then(async (response) => {
      await store.dispatch("auth/getPointBalanceAll");
      store.state.isLoading = false;
      popupTitle.value = "message.withdrawRequestEnd";
      store.state.popupType = "message";
      store.state.isPopup = true;
    })
    .catch((error) => {
      checkError(error.response.status, error.response.data.errorCode);
    });
};

const showQrCode = () => {
  store.state.popupType = "qr_code";
  store.state.isPopup = true;
};

const closeModal = () => {
  store.state.isPopup = false;
};

const closeSwapModal = () => {
  store.state.isPopup = false;
  router.go(0);
};

const isValidNumber = (number) => {
  return /^\d+$/.test(number);
};

const getSwapInfo = () => {
  if (swapEsgp.value === 0 && fromSymbol.value === "ESGP") {
    store.state.popupType = "message";
    popupTitle.value = "error.lessMiniumCostSwap";
    store.state.isPopup = true;
    store.state.isLoading = false;
  } else {
    if (isValidNumber(swapEsgp.value)) {
      store.state.isLoading = true;
      http
        .get("/api/swap/estimate", {
          params: {
            fromAddress: store.getters["auth/getAddress"],
            toAddress: store.getters["auth/getAddress"],
            fromSymbol: fromSymbol.value,
            toSymbol: toSymbol.value,
            amount: swapEsgp.value || 0,
          },
        })
        .then((response) => {
          store.state.isLoading = false;

          swapEsg.value = response.data.data.swapRecvAmount;
        })
        .catch((error) => {
          checkError(error.response.status, error.response.data.errorCode);
          store.state.popupType = "message";
          popupTitle.value = "error.notEnoughMoney";
          store.state.isPopup = true;
        });
    } else {
      store.state.popupType = "message";
      popupTitle.value = "error.incorrectValue";
      store.state.isPopup = true;
      store.state.isLoading = false;
    }
  }
};

const sendSwap = () => {
  const currentSwapValue = swapEsgp.value; // 요청 전 swapEsgp 값을 저장

  http
    .post("/api/swap/send", {
      fromAddress: store.getters["auth/getAddress"],
      toAddress: store.getters["auth/getAddress"],
      fromSymbol: fromSymbol.value,
      toSymbol: toSymbol.value,
      amount: currentSwapValue,
      privateKey: store.getters["auth/getPrivateKey"],
    })
    .then((response) => {
      console.log("response sendSwap에", response);

      // 여기에서 currentSwapValue를 사용하여 조건을 검사
      if (currentSwapValue >= 30000) {
        store.state.popupValue = currentSwapValue;
        store.state.popupType = "successSwap";
        popupTitle.value = "Swap transaction completed successfully";
      } else {
        // popupTitle.value = "Swap amount must be at least 30000";
        // store.state.popupType = "error";
        popupTitle.value = "Would you like to proceed with the swap?";
      }

      showClose.value = true;
      store.state.isPopup = true;
      swapEsgp.value = 0;
      swapEsg.value = 0;
      store.dispatch("auth/getPointBalanceAll");
    })
    .catch((error) => {
      checkError(error.response.status, error.response.data.errorCode);
      popupTitle.value = "Error during the swap operation";
      store.state.popupType = "error";
      store.state.isPopup = true;
    });
};

const initSwapEsgp = () => {
  swapEsg.value = 0;
};

const handleInput = () => {
  const appMain = document.getElementById("appMain");
  if (appMain) {
    appMain.scrollTop = 0;
  }
};

const handleFocus = () => {
  swapEsgp.value = "";
};
</script>

<style lang="scss">
.esg-point {
  background-color: #0c5c26;
  border: 1px solid #08471d;
  color: #fff;
}

.my-wallet {
  border: 1px solid #999;
}

.wallet-line {
  border: 1px solid #999;
}

.inout {
  width: 25% !important;
}

@keyframes glowing {
  0% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1.2);
  }
}

.swap-icon {
  width: 40% !important;
  animation-name: glowing;
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.swap-text {
  color: #24d120;
  width: 100%; /* 너비를 100%로 조정하여 더 많은 공간 확보 */
  text-align: right;
}

.list-margin {
  margin-right: -20px;
}

.swap-noti:before {
  content: "!";
  width: 16px;
  height: 16px;
  background-color: #ff9600;
  border: none;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-right: 5px;
  display: inline-block;
  border-radius: 99px;
}

.swap-btn {
  background-color: #0c5c26;
  border-radius: 5px;
}

.swap-btn-disable {
  background-color: gray;
  border-radius: 5px;
}

.input-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: -5px; /* 기존 값보다 작게 조정하거나, 음수값을 사용해 조정 */
}

.input-field {
  text-align: left;
  width: 100%;
  border: none; /* 테두리 제거 */
  padding: 10px; /* 패딩을 조정하여 입력 필드의 크기를 조정할 수 있음 */
  border-radius: 5px; /* 필요한 경우 모서리를 둥글게 처리 */
}

.non-clickable {
  pointer-events: none; // 포인터 이벤트 비활성화
}
</style>
