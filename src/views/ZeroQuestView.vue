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
        <div class="text-3xl font-semibold text-esg-color">{{ ESGPBalances }}</div>
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
    <div class="w-full grid grid-cols-3 gap-card">
      <template v-for="item in myNftList" :key="item.tokenId">
        <MyNftCard :nftCard="item" :nftInfo="nftList[item.nftId]" @updateEnable="getMyNftList" />
      </template>
    </div>
    <div class="h-10"></div>
    <div class="flex justify-between items-center">
      <div class="text-3xl font-semibold text-left">NEW NFT</div>
      <div class="border rounded-full">
        <div class="text-lg text-gray-400 mx-4 my-1" @click="goToZeroNft()">more +</div>
      </div>
    </div>
    <div class="w-full grid grid-cols-3 gap-card">
      <div class="flex flex-col" v-for="item in nftList" :key="item.tokenId">
        <img class="nftImg" :src="item.image" alt="" @click="goToDetail(item.idx)">
        <div class="h-2"></div>
        <div class="text-lg text-center">{{ item.name }}</div>
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
        <div class="p-4 text-xl font-medium text-black">계단오르기 NFT</div>
      </div>
      <div class="shadow-nft-extra">
        <div class="w-full h-56 relative overflow-hidden">
          <img :src="mainDesc.extra_img2"/>
        </div>
        <div class="p-4 text-xl font-medium text-black">AI 기반 재활용품 NFT</div>
      </div>
    </div>
    <div class="h-40"></div>
  </div>
</template>

<script lang="ts" setup>
import store from "@/store"
import http from "@/api/http";
import router from "@/router";
import { reactive, onMounted, ref } from "vue"
import { NFTSampleType, nftType } from "@/types/IZeroNftType"
import MyNftCard from "@/components/OpenNftView.vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import { errorMsg } from "@/utils/util";

import "vue3-carousel/dist/carousel.css";

const bannerList = store.getters["auth/getBannerList"];
const nftList = store.getters["auth/getNftList"];
const ESGPBalances = ref()
const myNftList = ref<nftType>();
const esgPoint = ref(0);
const balances = ref();
const tokenInfos = ref();
const popupTitle = ref("");

onMounted(() => {
  getMyNftList();
  updateBalance();

  if (store.state.isBalanceUpdate === true || 1) {
    getBalanceAll();
  }
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

const checkError = (status: number, code: number) => {
  if (status === 400) {
    store.state.popupType = 'message';
    popupTitle.value = errorMsg(status, code);
    store.state.isPopup = true;
  } else if (status === 401 || status === 403 || status === 300) {
    store.commit("auth/setInitToken");

    router.push("/");
  }
};

const getBalanceAll = () => {
  http.get("/api/token/balanceAll")
  .then((response) => {
    store.state.isBalanceUpdate = false;

    const resData = response.data.data.balances;

    let balancesData: any = {};

    resData.forEach((res: any) => {
      balancesData[res.symbol] = res;
    });

    store.commit("auth/setBalances", { 'info': balancesData });

    updateBalance();
  })
  .catch((error) => {
    checkError(error.response.status, error.response.data.errorCode);
  });
};

const updateBalance = () => {
  tokenInfos.value = store.getters["auth/getTokenInfos"];
  balances.value = store.getters["auth/getBalances"];
  ESGPBalances.value = store.getters["auth/getBalances"].ESGP.balance

  for (const key in balances.value) {
    if (balances.value[key].symbol === 'ESGP') {
      esgPoint.value = balances.value[key].balance;
    }
  }
};

type mainDescType = {
  desc: string;
  extra_img1: string;
  extra_img2: string;
};


const mainDesc = reactive<mainDescType>({
  desc: "'Ullamco incididunt nostrud elit fugiat minim veniam. Pariatur officia tempor ipsum veniam est culpa id labore. Et nostrud eiusmod qui esse. Nisi cillum consectetur commodo exercitation labore eiusmod in. Nisi eu esse Lorem ipsum ullamco quis in aliqua id excepteur velit dolor eiusmod consequat.'",
  extra_img1: require('@/assets/images/thumb/thumb6.png'),
  extra_img2: require('@/assets/images/thumb/thumb7.png')
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

function goToDetail(idx: number) {
  router.push({
    path: '/zeronftbuy',
    name: "zeronftbuy",
    params: {
      idx: idx
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

.nftImg {
  width:100%;
  height:100%;
  object-fit:cover;
  object-position: center top;
  height: 100px;
}
</style>