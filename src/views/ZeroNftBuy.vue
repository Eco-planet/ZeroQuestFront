<template>
  <div class="flex flex-col items-center mm">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-3xl font-semibold text-left">ZeroNFT</div>
      <div class="h-8"></div>
    </div>
    <div class="h-10"></div>
    <div class="flex w-full pb-2 items-center justify-between border-b border-gray-400">
      <div class="text-2xl font-semibold">ESG Point</div>
      <div class="flex items-end">
        <div class="text-3xl font-semibold text-esg-color">{{ getBalances }}</div>
        <div class="w-1"></div>
        <div class="text-2xl text-gray-400">point</div>
      </div>
    </div>
    <div class="h-10"></div>

    <div class="w-full mt-5">
      <div class="grid">
        <div class="p-7 shadow-nft">
          <div class="text-left">
            <div class="w-full h-full relative flex items-center justify-center">
              <img :src="nowNft?.image">
            </div>
            <div class="mt-10 text-3xl font-semibold text-black">{{nowNft?.name}}</div>
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
                <span>{{nowNft?.buyPrice1}} {{nowNft?.buySymbol1}} / {{ nowNft?.buyPrice2 }} {{ nowNft?.buySymbol2 }}</span>
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
      <div class="flex justify-between">
        <div class="w-64 h-20 flex justify-center items-center rounded-lg text-2xl font-medium text-center text-white bg-esg-color1 cursor-pointer" @click="buyNftESGP(nowNft)">ESG Point로 구매</div>
        <div class="w-64 h-20 flex justify-center items-center rounded-lg text-2xl font-medium text-center text-white bg-esg-color2 cursor-pointer" @click="goToMyWallet()">ESG Point 충전</div>
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
    <div class="h-96"></div>
  </div>
</template>
  
<script lang="ts" setup>
import http from "@/api/http";
import store from "@/store";
import { ref, reactive, computed, onMounted, defineProps } from "vue"
import { useRoute, useRouter } from "vue-router"
import { nftType } from "@/types/IZeroNftType"
import recycling from "@/components/common/recycling.vue"
import stairs from "@/components/common/stairs.vue"
import tree from "@/components/common/tree.vue"


const route = useRoute();
const router = useRouter();
const nftId = parseInt(route.params.idx)

const nowNft = Object.values(store.getters["auth/getNftList"]).filter(item => item.idx === nftId)[0]
console.log("nowNft",nowNft)
const getPk = store.getters["auth/getPrivateKey"]
const getAddress = store.getters["auth/getAddress"]
const getBalances = store.getters["auth/getBalances"].ESGP.balance

const buyNftESGP = (nft: nftType) => {
  http.post("/api/nft/buyNft", {
    symbol: nft.symbol,
    nftId: nft.idx,
    currency: nft.buySymbol2,
    balance: 1,
    address: getAddress,
    privateKey: getPk
  }).then((res) => {
    console.log("res", res)
  }).catch((err) => {
    console.log("err", err)
  })
}

const goToMyWallet = () => {
  router.push({
    path: '/mywallet',
    name: 'mywallet'
  })
}

// 날자 형식 변경
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  
  return `${year}-${month}-${day}`;
}

// 구매 개수 counting
const count = ref(0);
const ESGPPerPrice = 5;

const total_eth = computed(() => {
  return parseFloat((count.value * ESGPPerPrice).toFixed(6))
})

function increase() {
  count.value++;
}

function decrease() {
  if (count.value > 0) {
    count.value--;
  }
}
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
</style>