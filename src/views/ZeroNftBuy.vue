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
        <div class="text-3xl font-semibold text-esg-color">
          {{ esgPoint.toLocaleString() }}
        </div>
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
            <div class="mt-10 text-3xl font-semibold text-black">
              {{ nowNft?.name }}
            </div>
            <div class="mt-10 text-xl">
              <div class="flex justify-between mb-4">
                <span>Expiration Date</span>
                <span>2025-05-31</span>
              </div>
              <div class="flex justify-between mb-4">
                <span>Asset Protocol</span>
                <span>ERC-721</span>
              </div>
              <div class="flex justify-between mb-4">
                <span>Asset Public Chain</span>
                <span>Ethereum</span>
              </div>
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
          </div>
        </div>
      </div>
      <div class="h-10"></div>

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

    <recycling v-if="nftId === 1"></recycling>
    <stairs v-else-if="nftId === 2"></stairs>
    <tree v-else-if="nftId === 3"></tree>
    <panda v-else-if="nftId === 4"></panda>
    <panda v-else-if="nftId === 5"></panda>
    <panda v-else-if="nftId === 6"></panda>
    <div class="h-96"></div>

    <!-- <Modal
      :visible="store.state.isPopup"
      @hide="closeModal"
      @refreshHide="closeMintingModal"
      :title="popupTitle"
      :showClose="showClose"
    /> -->
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
const userTokenInfo = computed(() => vuexStore.getters["auth/getBalances"]);
const esgPoint = parseInt(userTokenInfo.value.ESGP);
const showClose = ref(false);

const nowNft = Object.values(store.getters["auth/getNftList"]).filter(
  (item) => item.idx === nftId
)[0];

console.log("nowNft", nowNft);

const getPk = store.getters["auth/getPrivateKey"];
const getAddress = store.getters["auth/getAddress"];
const popupTitle = ref("");

const buyNftESGP = (nft: nftType) => {
  store.state.isLoading = true;
  http
    .post("/api/nft/buyNft", {
      symbol: nft.symbol,
      nftId: nft.idx,
      currency: nft.buySymbol2,
      balance: 1,
      address: getAddress,
      privateKey: getPk,
    })
    .then(async (res) => {
      await vuexStore.dispatch("auth/getPointBalanceAll");
      store.state.isLoading = false;
      store.state.popupType = "successMinting";
      store.state.isPopup = true;
      popupTitle.value = "message.successMinting";
      vuexStore.dispatch("auth/getRemainingNft", nft.idx);
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
    });
};

const goToMyWallet = () => {
  router.push({
    path: "/mywallet",
    name: "mywallet",
  });
};

const closeModal = () => {
  store.state.isPopup = false;
};
const closeMintingModal = () => {
  router.go(0);
  store.state.isPopup = false;
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
