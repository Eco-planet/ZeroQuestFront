<template>
  <div class="flex flex-col justify-center mm">
    <div class="h-8"></div>
    <div class="w-full">
      <Carousel :autoplay="3000" :wrap-around="true">
        <Slide v-for="slide in bannerList" :key="slide">
          <div class="carousel__item" style="overflow: hidden;"><img :src="slide.url" /></div>
        </Slide>
      </Carousel>
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
        <div class="text-lg text-gray-400 mx-4 my-1" @click="goToOnft()">more +</div>
      </div>
    </div>
    <div class="mt-10 grid grid-cols-2 gap-x-8 gap-y-8" >
      <div v-for="oNft in myOnftSample" :key="oNft.name">
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
    <div class="h-10"></div>
    <div class="flex justify-between items-center">
      <div class="text-3xl font-semibold text-left">MY NFT</div>
      <div class="border rounded-full">
        <div class="text-lg text-gray-400 mx-4 my-1" @click="goToZeroNft()">more +</div>
      </div>
    </div>
    <div class="mt-10 grid grid-cols-2 gap-x-8 gap-y-8" >
      <div v-for="myNft in myNftSample" :key="myNft.name">
        <div v-if="myNft.activated === true">
          <div class="w-full h-64 relative overflow-hidden" @click="goToDetail(myNft.name)">
            <img :src="myNft.extra_img1"/>
          </div>
          <div class="pt-4 text-xl font-medium text-black">{{myNft.name}}</div>
          <div class="flex justify-center">
            <div class="wp-20 font-semibold text-white rounded-full nftOn">ON</div>
          </div>
        </div>
        <div v-else>
          <div class="w-full h-64 relative overflow-hidden" @click="goToDetail(myNft.name)">
            <img :src="myNft.extra_img1" class="grayscale"/>
          </div>
          <div class="pt-4 text-xl font-medium text-black">{{myNft.name}}</div>
          <div class="flex justify-center">
            <div class="wp-20 font-semibold text-white rounded-full nftOff">OFF</div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-16"></div>
    <div class="text-left">
      <div class="text-xl mt-4 font-normal text-gray-500">
        {{ mainDesc.desc }}
      </div>
    </div>
    <div class="mt-10 grid grid-cols-2 gap-x-8 gap-y-8">
      <div class="shadow-nft-extra">
        <div class="w-full h-56 relative overflow-hidden">
          <img :src="mainDesc.extra_img1"/>
        </div>
        <div class="p-4 text-xl font-medium text-black">모바일 NFT</div>
      </div>
      <div class="shadow-nft-extra">
        <div class="w-full h-56 relative overflow-hidden">
          <img :src="mainDesc.extra_img2"/>
        </div>
        <div class="p-4 text-xl font-medium text-black">모바일 NFT</div>
      </div>
    </div>
    <div class="h-40"></div>
  </div>
</template>

<script lang="ts" setup>
import store from "@/store"
import router from "@/router";
import { reactive } from "vue"
import { NFTSampleType } from "@/types/IZeroNftType"
import { Carousel, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

type oNFTSampleType = {
  name: string;
  activated: boolean;
  extra_img1: string;
};

type mainDescType = {
  desc: string;
  extra_img1: string;
  extra_img2: string;
};

const bannerList = store.getters["auth/getBannerList"];

// 샘플 데이터, 나중에 admin에서 추가되는 데이터
let myNftSample = reactive<oNFTSampleType[]>([
  {
    name: "Pino1 NFT 1End",
    activated: true,
    extra_img1: require('@/assets/images/thumb/thumb1.jpg'),
  },
  {
    name: "Pino4 NFT 1End",
    activated: false,
    extra_img1: require('@/assets/images/thumb/thumb2.jpg'),
  },
  {
    name: "Pino2 NFT 1End",
    activated: false,
    extra_img1: require('@/assets/images/thumb/thumb3.jpg'),
  },
  {
    name: "Pino3 NFT 1End",
    activated: true,
    extra_img1: require('@/assets/images/thumb/thumb4.jpg'),
  },
])

let myOnftSample = reactive<oNFTSampleType[]>([
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

const mainDesc = reactive<mainDescType>({
  desc: "'Ullamco incididunt nostrud elit fugiat minim veniam. Pariatur officia tempor ipsum veniam est culpa id labore. Et nostrud eiusmod qui esse. Nisi cillum consectetur commodo exercitation labore eiusmod in. Nisi eu esse Lorem ipsum ullamco quis in aliqua id excepteur velit dolor eiusmod consequat.'",
  extra_img1: require('@/assets/images/thumb/thumb5.jpg'),
  extra_img2: require('@/assets/images/thumb/thumb2.jpg')
})

function goToOnft() {
  router.push({
    path: '/onft',
    name: 'onft'
  })
}
function goToZeroNft() {
  router.push({
    path: '/zeronft',
    name: 'zeronft'
  })
}
function goToDetail(name: string) {
  console.log("nftName", name)
  router.push({
    path: '/zeronftbuy',
    name: "zeronftbuy",
    params: {
      name: name
    }
  })
}
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
.grayscale {
  filter: grayscale(100%);
}
</style>