<template>
  <div class="flex flex-col items-center mm">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-3xl font-semibold text-left">ZeroNFT</div>
      <div class="h-8"></div>
    </div>
    <div class="h-10"></div>
    <div
      class="flex w-full pb-2 items-center justify-between border-b border-gray-400"
    >
      <div class="text-2xl font-semibold">ESG Point</div>
      <div class="flex items-end">
        <div class="text-3xl font-semibold text-esg-color">  {{ esgPoint.toLocaleString() }}</div>
        <div class="w-1"></div>
        <div class="text-2xl text-gray-400">point</div>
      </div>
    </div>
    <div class="h-10"></div>

    <div class="w-full mt-5">
      <div class="grid">
        <div class="p-7 shadow-nft">
          <div class="text-left">
            <div
              class="w-full h-full relative flex items-center justify-center"
            >
              <img :src="nowNft?.image" />
            </div>
            <div
              class="mt-10 text-3xl font-semibold text-black"
              v-if="locale === 'kr'"
            >
              {{ nowNft?.name.kor }}
            </div>
            <div class="mt-10 text-3xl font-semibold text-black" v-else>
              {{ nowNft?.name.eng }}
            </div>
            <div class="mt-10 text-xl">
              <div class="flex justify-between mb-4">
                <span>Expiration Date</span>
                <!-- <span>{{ formatDate(filterNft.expiration_data) }}</span> -->
                <span>2023-05-31</span>
              </div>
              <div class="flex justify-between mb-4">
                <span>Asset Protocol</span>
                <span>ERC-721</span>
              </div>
              <div class="flex justify-between mb-4">
                <span>Asset Public Chain</span>
                <span>Ethereum</span>
              </div>
              <!-- <div class="flex justify-between mb-4">
                <span>Remaining NFT</span>
                <span>0 / </span>
              </div> -->
              <div class="flex justify-between mb-4">
                <span>Price</span>
                <span
                  >{{ Number(nowNft?.buyPrice2).toLocaleString() }} ESG
                  point</span
                >
              </div>
              <div
                class="flex justify-between mb-4"
                v-if="nftId !== 1 && nftId !== 2 && nftId !== 3"
              >
                <span>Remaining Number</span>
                <div>
                  <span>{{ nowNft?.metaData?.sale }}</span> /
                  <span>1000</span>
                </div>
              </div>
            </div>
            <!-- <div class="flex justify-end items-center">
              <button @click="decrease" class="bg-red-500 text-white px-4 py-2 rounded">-</button>
              <input type="number" min="0" v-model="count" class="text-sm mx-1 w-20 text-center border-2 border-gray-300" />
              <button @click="increase" class="bg-green-500 text-white px-4 py-2 rounded">+</button>
              <span class="w-24 ml-4 flex justify-end text-xl font-semibold">{{total_eth}}ETH</span>
            </div> -->
          </div>
        </div>
      </div>
      <div class="h-10"></div>
      <!-- <div class="flex justify-between">
        <div
          class="w-64 h-20 flex justify-center items-center rounded-lg text-2xl font-medium text-center text-white bg-esg-color1 cursor-pointer"
          @click="buyNftESGP(nowNft)"
        >
          {{ t("message.buyWithPoint") }}
        </div>
        <div
          class="w-64 h-20 flex justify-center items-center rounded-lg text-2xl font-medium text-center text-white bg-esg-color2 cursor-pointer"
          @click="goToMyWallet()"
        >
          {{ t("message.ChargingPoint") }}
        </div>
      </div> -->
      <div v-if="isLoading === true" class="spinner">
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>

      <div class="flex justify-between">
        <div
          class="w-64 h-20 flex justify-center items-center rounded-lg text-2xl font-medium text-center text-white bg-esg-color1 cursor-pointer"
          @click="buyNftESGP(nowNft)"
        >
          Buy with ESG points
        </div>
        <div
          class="w-64 h-20 flex justify-center items-center rounded-lg text-2xl font-medium text-center text-white bg-esg-color2 cursor-pointer"
          @click="goToMyWallet()"
        >
          ESG Point charging
        </div>
      </div>
    </div>

    <div class="h-20"></div>
    <!-- <div class="text-left w-full">
      <div class="text-2xl font-semibold text-left">CONTENTS</div>

    </div> -->
    <!-- <div class="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
      <div class="shadow-nft-extra">
        <div class="w-full h-56 relative overflow-hidden">
          <img :src="filterNft.extra_img1"/>
        </div>
        <div class="p-4 text-xl font-medium text-black">모바일 NFT</div>
      </div>
      <div class="shadow-nft-extra">
        <div class="w-full h-56 relative overflow-hidden">
          <img :src="filterNft.extra_img2"/>
        </div>
        <div class="p-4 text-xl font-medium text-black">모바일 NFT</div>
      </div>
    </div> -->
    <!-- <recycling></recycling> -->

    <recycling v-if="nftId === 1"></recycling>
    <stairs v-else-if="nftId === 2"></stairs>
    <tree v-else-if="nftId === 3"></tree>
    <panda v-else-if="nftId === 4"></panda>
    <panda v-else-if="nftId === 5"></panda>
    <panda v-else-if="nftId === 6"></panda>
    <div class="h-96"></div>

    <Modal
      :visible="store.state.isPopup"
      @hide="closeModal"
      @refreshHide="closeMintingModal"
      :title="popupTitle"
    />
  </div>
</template>

<script lang="ts" setup>
import http from "@/api/http";
import { useStore } from "vuex";
import { ref, reactive, computed, onMounted, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import { nftType } from "@/types/IZeroNftType";
import { useI18n } from "vue-i18n";
import recycling from "@/components/common/recycling.vue";
import stairs from "@/components/common/stairs.vue";
import tree from "@/components/common/tree.vue";
import Modal from "@/components/Modal/index.vue";
import panda from "@/components/common/panda.vue";

const { t } = useI18n();

const store = useStore();
const route = useRoute();
const router = useRouter();
const nftId = parseInt(route.params.idx);
const vuexStore = useStore();
const isLoading = ref(false);
const esgPoint = computed(() => parseInt(vuexStore.state.auth.balances));

const nowNft = Object.values(store.getters["auth/getNftList"]).filter(
  (item) => item.idx === nftId
)[0];


console.log("nowNft", nowNft);

const getPk = store.getters["auth/getPrivateKey"];
const getAddress = store.getters["auth/getAddress"];
// const getBalances = store.getters["auth/getBalances"].ESGP.balance;
const getBalances = store.getters["auth/getBalances"]
// const esgPoint = ref("");
// const balances = ref();
const popupTitle = ref("");
const locale = computed(() => vuexStore.state.system.locale);
console.log("store", store.state.isLoading);

// onMounted(() => {
//   updateBalance();
// });

// const updateBalance = () => {
//   balances.value = store.getters["auth/getBalances"];

//   for (const key in balances.value) {
//     if (balances.value[key].symbol === "ESGP") {
//       const balance = parseFloat(balances.value[key].balance);
//       esgPoint.value = balance.toLocaleString();
//     }
//   }
// };

const buyNftESGP = (nft: nftType) => {
  isLoading.value = true;

  http
    .post("/api/nft/buyNft", {
      symbol: nft.symbol,
      nftId: nft.idx,
      currency: nft.buySymbol2,
      balance: 1,
      address: getAddress,
      privateKey: getPk,
    })
    .then((res) => {
      console.log("res", res);
      store.state.popupType = "successMinting";
      store.state.isPopup = true;
      popupTitle.value = "message.successMinting";
      vuexStore.dispatch("auth/getPointBalance");

    })
    .catch((err) => {
      console.log("err", err);
      if (err.response.data.errorCode === 505) {
        console.log("err 505는", err);
        store.state.popupType = "message";
        popupTitle.value = "error.notEnoughPoints";
        store.state.isPopup = true;
      } else if (err.response.data.errorCode === 502) {
        console.log("err 502는", err);
        store.state.popupType = "message";
        popupTitle.value = "error.notEnoughGasFee";
        store.state.isPopup = true;
      } else if (err.response.data.errorCode === 300) {
        console.log("err 300는", err);
        store.state.popupType = "duplicate_nft_buy";
        store.state.isPopup = true;
      }
    })
    .finally(() => {
      isLoading.value = false;
      // location.reload();
    });
};

const goToMyWallet = () => {
  router.push({
    path: "/mywallet",
    name: "mywallet",
  });
};

// 날자 형식 변경
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

// 구매 개수 counting
const count = ref(0);
const ESGPPerPrice = 5;

const total_eth = computed(() => {
  return parseFloat((count.value * ESGPPerPrice).toFixed(6));
});

function increase() {
  count.value++;
}

function decrease() {
  if (count.value > 0) {
    count.value--;
  }
}

const isModalOpen = ref(false);

const isModalChange = (buyModalEmit: boolean) => {
  isModalOpen.value = buyModalEmit;
};

const closeModal = () => {
  store.state.isPopup = false;
};
const closeMintingModal = () => {
  store.state.isPopup = false;
  router.go(0);
};
</script>

<style lang="scss">
.text-esg-color {
  color: #24d120;
}
.bg-esg-color1 {
  background-color: #18c050;
}
.bg-esg-color2 {
  background-color: #0c5c26;
}
.shadow-nft {
  box-shadow: 0 6px 8px 0px rgb(0 0 0 / 0.1), 0 2px 8px 4px rgb(0 0 0 / 0.1);
}
.shadow-nft-extra {
  box-shadow: 0 6px 8px 0px rgb(0 0 0 / 0.1), 0 2px 8px 0px rgb(0 0 0 / 0.1);
}

.spinner {
  position: fixed; /* 또는 부모 요소에 상대적으로 위치하게 하려면 'absolute' 사용 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5); /* 반투명 배경 */
  z-index: 1000; /* 다른 콘텐츠 위에 보이도록 함 */
}
</style>
