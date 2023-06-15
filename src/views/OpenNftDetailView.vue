<template>
  <div class="px-8 flex flex-col justify-center items-center">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-3xl font-semibold text-left">O!NFT</div>
    </div>
    <div class="h-10"></div>
    <div class="px-2 w-full flex justify-between text-2xl">
      <div class="font-semibold">ESG Point</div>
      <div><span class="font-semibold esgPoint">{{ esgPoint }}</span> <span class="text-gray-500">point</span></div>
    </div>
    <div class="h-3"></div>
    <div class="w-full h-px bg-gray-200"></div>
    <div class="h-10"></div>
    <div class="photo-link p-7 w-full h-full">
      <div class="flex items-center justify-center"><img :src="nftInfo.image" /></div>
      <div class="h-10"></div>
      <div class="flex font-semibold text-2xl">{{ nftInfo.name }}</div>
      <div class="h-5"></div>
      <div class="flex text-xl text-left">{{ nftInfo.description }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import store from "@/store";
import http from "@/api/http";
import { onMounted, ref } from "vue";

const nftList = store.getters["auth/getNftList"];
const esgPoint = ref(0);
const nftId = Number(router.currentRoute.value.params.nftId);
const nftInfo = nftList[nftId];

onMounted(() => {
  getEsgpBalance();
});

const getEsgpBalance = () => {
  http.get("/api/token/balance", {
    params: {
      symbol: 'ESGP',
    }
  })
  .then((response) => {
    esgPoint.value = response.data.data.balance;
  })
};
</script>

<style lang="scss">
.esgPoint  {
  color: #24d120;
}

.photo-link {
  background-color: #fff;
  box-shadow:0 0 16px rgba(0,0,0,0.2);
}
</style>
