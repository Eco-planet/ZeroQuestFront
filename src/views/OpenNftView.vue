<template>
  <div class="flex flex-col justify-center items-center mm">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-3xl font-semibold text-left">O!NFT</div>
      <div class="h-8"></div>
      <div class="flex justify-center slider"><img src="@/assets/images/banner00.jpg" alt=""></div>
    </div>
    <div class="h-10"></div>
    <div class="flex w-full">
      <div class="text-2xl font-semibold text-left">My NFT</div>
    </div>
    <div class="h-10"></div>
    <div class="w-full grid grid-cols-3 gap-card">
      <template v-for="item in myNftList" :key="item.tokenId">
        <MyNftCard :nftCard="item" :nftInfo="nftList[item.nftId]" @updateEnable="getMyNftList" />
      </template>
    </div>
    <div class="h-10"></div>
    <div class="h-10"></div>
    <div class="h-10"></div>
   </div>
</template>

<script lang="ts" setup>
import store from "@/store";
import http from "@/api/http";
import { onMounted, ref } from "vue";
import MyNftCard from "@/components/OpenNftView.vue";

const nftList = store.getters["auth/getNftList"];
const myNftList = ref();

onMounted(() => {
  getMyNftList();
});

const getMyNftList = () => {
  http.get("/api/nft/myZeroNft", {
    params: {
      type: 1,
    }
  })
  .then((response) => {
    myNftList.value = response.data.data;
  });
};
</script>

<style lang="scss">
.nftImg {
  width:100%;
  height:100%;
  object-fit:cover;
  object-position: center top;
  height: 100px;
}

.nftOn  {
  background-color: #24d120;
}

.nftOff  {
  background-color: #ccc;
}

</style>
