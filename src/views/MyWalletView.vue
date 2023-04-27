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
              <div class="flex text-sm">= {{ item.priceUsdt }} USDT</div>
            </div>
            <div class="flex justify-end">
              <div class="flex flex-col justify-end list-margin">
                <template v-if="Object.keys(balances).length > 0">
                  <div class="flex justify-end font-semibold text-2xl">{{ balances[key].balance }}</div>
                  <div class="flex justify-end text-sm">= {{ item.priceUsdt * balances[key].balance }} USDT</div>
                 </template>
                <template v-if="Object.keys(balances).length === 0">
                  <div class="flex justify-end font-semibold text-2xl">0</div>
                  <div class="flex justify-end text-sm">= 0 USDT</div>
                </template>
              </div>
              <div class="flex justify-end items-center">
                <div class="inout" @click="showModal"><img src="@/assets/images/icon_in.png" /></div>
                <div class="w-3"></div>
                <div class="inout" @click=""><img src="@/assets/images/icon_out.png" /></div>
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
          <div class="font-semibold text-xl">0000</div>
          <div class="ml-2 text-gray-400">ESG Point</div>
        </div>
        <div class="h-px h-5 bg-gray-200"></div>
      </div>
      <div class="wp-20 flex justify-center items-center">
        <div class="swap-icon"><img src="@/assets/images/icon_arrow.png" /></div>
      </div>
      <div class="wp-40 flex flex-col">
        <div class="flex justify-end items-center">
          <div class="font-semibold text-xl swap-text">0000</div>
          <div class="ml-2 text-gray-400">ESG</div>
        </div>
        <div class="h-px h-5 bg-gray-200"></div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="flex flex-col">
      <div class="swap-noti flex">{{ t("message.swapCaution") }}</div>
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
      <button class="wp-40 p-2 font-semibold text-2xl text-white swap-btn" @click="">SWAP</button>
    </div>
    <div class="h-10"></div>
  </div>
  <Modal :visible="store.state.isPopup" @hide="closeModal" title="qr_code" />
</template>

<script lang="ts" setup>
import store from "@/store";
import http from "@/api/http";
import openSSLCrypto from "@/utils/openSSLCrypto";
import { ethers } from "ethers-ts";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import Modal from "@/components/Modal/index.vue";

const { t } = useI18n();

const esgPoint = ref(0);
const balances = ref();
const tokenInfos = ref();

onMounted(() => {
  updateBalance();

  if (store.state.isBalanceUpdate === true) {
    getBalanceAll();
  }
});

const getUserInfo = () => {
  http.get("/api/user/info")
  .then((response) => {
    const seed = openSSLCrypto.decode(response.data.data.wallet.seed);
    const walletData = ethers.Wallet.fromMnemonic(seed);
    const privateKey = openSSLCrypto.encode(walletData.privateKey);

    store.commit("auth/setPrivateKey", { privateKey });
  });
};

const getBalanceAll = () => {
  http.get("/api/token/balanceAll", {
    // params: {
    //  'address': store.getters["auth/getAddress"],
    // }
  })
  .then((response) => {
    store.state.isBalanceUpdate = false;

    const resData = response.data.data.balances;

    let balancesData: any = {};

    resData.forEach((res: any) => {
      balancesData[res.symbol] = res;
    });

    store.commit("auth/setBalances", { 'info': balancesData });
  })
  .finally(() => { 
    updateBalance();
  });
};

const updateBalance = () => {
  tokenInfos.value = store.getters["auth/getTokenInfos"];
  balances.value = store.getters["auth/getBalances"];

  for (const key in balances.value) {
    if (balances.value[key].symbol === 'ESGP') {
      esgPoint.value = balances.value[key].balance;
    }
  }
};

const showModal = () => {
  store.state.isPopup = true;
};

const closeModal = () => {
  store.state.isPopup = false;
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

.swap-icon {
  width: 40% !important;
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
  border:none;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-right: 5px;
  display: inline-block;
  border-radius:99px;
}

.swap-btn {
  background-color: #0c5c26;
  border-radius: 5px;
}
</style>
