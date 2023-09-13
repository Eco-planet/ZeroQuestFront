<template>
  <div class="h-10"></div>
  <div class="px-8 flex flex-col">
    <div class="flex font-semibold text-3xl">MyWallet</div>
    <div class="h-10"></div>
    <div class="px-8 py-5 esg-point w-full flex justify-between text-2xl">
      <div>ESG Point</div>
      <div>{{ esgPoint }}</div>
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
                <template v-if="Object.keys(balances).length > 0">
                  <div class="flex justify-end font-semibold text-2xl">
                    {{
                      parseFloat(
                        (1 * balances[key].balance).toFixed(item.decimals)
                      )
                    }}
                  </div>
                  <div class="flex justify-end text-sm">
                    =
                    {{
                      parseFloat(
                        (item.price * balances[key].balance).toFixed(
                          item.decimals
                        )
                      )
                    }}
                    USDT
                  </div>
                </template>
                <template v-if="Object.keys(balances).length === 0">
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
    <div class="flex font-semibold text-2xl">SWAP</div>
    <div class="h-2"></div>
    <div class="flex">
      <div class="wp-40 flex flex-col">
        <div class="flex justify-end items-center">
          <div class="wp-50">
            <input
              type="number"
              class="w-36 font-semibold text-xl"
              v-model="swapEsgp"
              :onKeyup="initSwapEsgp"
              style="text-align: right"
            />
          </div>
          <div class="wp-50 flex justify-end items-center text-gray-400">
            ESG Point
          </div>
        </div>
        <div class="h-px h-5 bg-gray-200"></div>
      </div>
      <div class="wp-20 flex justify-center items-center">
        <div class="swap-icon" @click="getSwapInfo">
          <img src="@/assets/images/icon_wallet.png" />
        </div>
      </div>
      <div class="wp-40 flex flex-col">
        <div class="flex justify-end items-center">
          <div class="wp-80">
            <input
              type="number"
              class="w-36 font-semibold text-xl swap-text"
              v-model="swapEsg"
              style="text-align: right"
              readonly
            />
          </div>
          <div class="wp-20 flex justify-end items-center text-gray-400">
            ESG
          </div>
        </div>
        <div class="h-px h-5 bg-gray-200"></div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="flex flex-col text-xl">
      <div class="swap-noti flex font-semibold">{{ t("message.swapCaution") }}</div>
      <div class="h-2"></div>
      <div class="flex justify-start items-center">
        <div class="font-bold">·</div>
        <div class="ml-2">{{ t("message.swapCaution1") }}</div>
      </div>
      <div class="flex justify-start items-center">
        <div class="font-bold">·</div>
        <div class="ml-2">{{ t("message.swapCaution2") }}</div>
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
    <div class="h-10"></div>
  </div>
  <Modal
    :visible="store.state.isPopup"
    @hide="closeModal"
    @resData="checkData"
    @resJson="checkObject"
    :title="popupTitle"
  />
</template>

<script lang="ts" setup>
import store from "@/store";
import router from "@/router";
import http from "@/api/http";
import CryptoJS from "crypto";
import openSSLCrypto from "@/utils/openSSLCrypto";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import Modal from "@/components/Modal/index.vue";
import { errorMsg } from "@/utils/util";

const { t } = useI18n();

const esgPoint = ref(0);
const balances = ref();
const tokenInfos = ref();
const withdrawSymbol = ref("");
const popupTitle = ref("");

const isUpdate = ref(false);
const swapEsgp = ref(0);
const swapEsg = ref(0);

onMounted(() => {
  updateBalance();

  if (store.state.isBalanceUpdate === true || 1) {
    getBalanceAll();
  }
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

const getBalanceAll = () => {
  http
    .get("/api/token/balanceAll")
    .then((response) => {
      store.state.isBalanceUpdate = false;

      const resData = response.data.data.balances;

      let balancesData: any = {};

      resData.forEach((res: any) => {
        balancesData[res.symbol] = res;
      });

      store.commit("auth/setBalances", { info: balancesData });

      updateBalance();
    })
    .catch((error) => {
      checkError(error.response.status, error.response.data.errorCode);
    });
};

const updateBalance = () => {
  tokenInfos.value = store.getters["auth/getTokenInfos"];
  balances.value = store.getters["auth/getBalances"];

  for (const key in balances.value) {
    if (balances.value[key].symbol === "ESGP") {
      esgPoint.value = balances.value[key].balance;
    }
  }
};

const getStatusCheck = (type: string, symbol: string) => {
  if (type === "swap" && swapEsg.value <= 0) return false;

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

          getBalanceAll();
        }

        if (type === "sendCoin") {
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

  http
    .post("/api/user/withdrawPw", {
      password: passwd,
    })
    .then((response) => {
      if (response.data.data.result === true) {
        store.commit("auth/setWithdrawPw", { pw: true });
      }
    });
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
    .then((response) => {
      store.state.popupType = "message";
      popupTitle.value = "message.withdrawRequestEnd";
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

const getSwapInfo = () => {
  if (swapEsgp.value < 1000) {
    store.state.popupType = "message";
    popupTitle.value = "error.lessMiniumCostSwap";
    store.state.isPopup = true;
  } else {
    http
      .get("/api/swap/estimate", {
        params: {
          fromAddress: store.getters["auth/getAddress"],
          toAddress: store.getters["auth/getAddress"],
          fromSymbol: "ESGP",
          toSymbol: "ESG",
          amount: swapEsgp.value,
        },
      })
      .then((response) => {
        if (response.data.data.userSendPrice < response.data.data.minSwap) {
          swapEsg.value = 0;

          store.state.popupType = "message";
          popupTitle.value = "error.lessMiniumCostSwap";
          store.state.isPopup = true;
        } else {
          swapEsg.value = response.data.data.swapRecvAmount;
        }
      })
      .catch((error) => {
        checkError(error.response.status, error.response.data.errorCode);
      });
  }
};

const sendSwap = () => {
  http
    .post("/api/swap/send", {
      fromAddress: store.getters["auth/getAddress"],
      toAddress: store.getters["auth/getAddress"],
      fromSymbol: "ESGP",
      toSymbol: "ESG",
      amount: swapEsgp.value,
      privateKey: store.getters["auth/getPrivateKey"],
    })
    .then((response) => {
      swapEsgp.value = 0;
      swapEsg.value = 0;

      store.state.popupType = "message";
      popupTitle.value = "message.swapRequestEnd";
      store.state.isPopup = true;
    })
    .catch((error) => {
      checkError(error.response.status, error.response.data.errorCode);
    });
};

const initSwapEsgp = () => {
  swapEsg.value = 0;

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

  width: 37% !important;
  border: 2px solid transparent; /* 초기에 투명한 테두리로 설정 */
  box-shadow: 0 0 20px rgba(0, 0, 255, 0.7);
}

@keyframes spreadEffect {
  0% {
    box-shadow: 0 0 20px rgba(0, 0, 255, 0.7);
    border-width: 2px; /* 초기 테두리 두께 */
  }
  100% {
    box-shadow: 0 0 60px 30px rgba(0, 0, 255, 0.1); /* 더 퍼진 그림자 효과 */
    border-width: 20px; /* 퍼진 테두리 두께 */
  }
}

.swap-text {
  color: #24d120;
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
</style>
