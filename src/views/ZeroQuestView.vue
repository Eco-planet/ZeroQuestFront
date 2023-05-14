<template>
  <div class="flex flex-col justify-center mm">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-4xl font-semibold text-left">My Z.Q</div>
      <div class="h-8"></div>
      <div class="flex justify-center slider"><img src="@/assets/images/banner00.jpg" alt=""></div>
    </div>
    <div class="h-10"></div>
    <div class="flex w-full pb-2 items-center justify-between border-b border-gray-400">
      <div class="text-2xl font-semibold">ESG Point</div>
      <div class="flex items-end">
        <div class="text-3xl font-semibold text-esg-color">99,999</div>
        <div class="w-1"></div>
        <div class="text-2xl text-gray-400">point</div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="flex justify-between items-center">
      <div class="text-3xl font-semibold text-left">O!NFT</div>
      <div class="border rounded-full">
        <div class="text-lg text-gray-400 mx-4 my-1">more +</div>
      </div>
    </div>
    <div class="mt-10 grid grid-cols-2 gap-x-8 gap-y-8" >
      <div v-for="oNft in oNftSample" :key="oNft.name">
        <div v-if="oNft.activated === true">
          <div class="w-full h-64 relative overflow-hidden">
            <img :src="oNft.extra_img1"/>
          </div>
          <div class="pt-4 text-xl font-medium text-black">{{oNft.name}}</div>
          <div class="flex justify-center">
            <div class="wp-20 font-semibold text-white rounded-full nftOn">ON</div>
          </div>
        </div>
        <div v-else>
          <div class="w-full h-64 relative overflow-hidden">
            <img :src="oNft.extra_img1" class="grayscale"/>
          </div>
          <div class="pt-4 text-xl font-medium text-black">{{oNft.name}}</div>
          <div class="flex justify-center">
            <div class="wp-20 font-semibold text-white rounded-full nftOff">OFF</div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-40"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue"

type NFTSampleType = {
  name: string;
  total: number;
  price_eth: number;
  price_esg: number;
  expiration_data: Date;
  description: string;
  extra_img1: string;
  extra_img2: string;
};

type oNFTSampleType = {
  name: string;
  activated: boolean;
  extra_img1: string;
};

// 샘플 데이터, 나중에 admin에서 추가되는 데이터
let oNftSample = reactive<oNFTSampleType[]>([
  {
    name: "NFT1",
    activated: true,
    extra_img1: require('@/assets/images/thumb/thumb1.jpg'),
  },
  {
    name: "NFT2",
    activated: false,
    extra_img1: require('@/assets/images/thumb/thumb2.jpg'),
  },
  {
    name: "NFT3",
    activated: false,
    extra_img1: require('@/assets/images/thumb/thumb3.jpg'),
  },
  {
    name: "NFT4",
    activated: true,
    extra_img1: require('@/assets/images/thumb/thumb4.jpg'),
  },
  {
    name: "NFT5",
    activated: false,
    extra_img1: require('@/assets/images/thumb/thumb5.jpg'),
  },
])
</script>

<style lang="scss">
.text-esg-color {
  color: #24d120;
}

.nftOn  {
  background-color: #24d120;
}

.nftOff  {
  background-color: #ccc;
}
</style>