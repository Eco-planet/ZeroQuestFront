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
        <div class="text-3xl font-semibold text-esg-color">{{ esgPoint }}</div>
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
      <div class="flex flex-col" v-for="item in myNftList" :key="item.tokenId">
        <div v-if="item.enable === 1">
          <div><img class="nftImg" :src="nftList[item.nftId].image" alt="" @click="goNftDetail(item.nftId)"></div>
          <div class="h-2"></div>
          <div class="text-lg text-center">{{ nftList[item.nftId].name }}</div>
        </div>
        <div class="grayscale" v-else>
          <div><img class="nftImg" :src="nftList[item.nftId].image" alt="" @click="goNftDetail(item.nftId)"></div>
          <div class="h-2"></div>
          <div class="text-lg text-center">{{ nftList[item.nftId].name }}</div>
        </div>
      </div>
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
    <div class="h-36"></div>
    <div class="break-words text-black media-Bottom">
      <div class="font-semibold text-2xl">제로퀘스트와 함께 지구를 살려요!🌍🎮</div><br>
      <div class="font-medium text-lg">탄소 발자국을 줄이는 행동, 그게 바로 우리의 게임 미션!<br> 
      성공할 때마다 ESG 포인트도 적립! <br>
      포인트는 ESG 토큰으로 교환하면 재태크도 됩니다.<br>
      
      계단 오르기부터 자전거 타기까지!<br>
      제로퀘스트와 함께하면, 지구를 살리면서 주머니도 가득!<br>
      함께 지구를 더 즐겁게, 건강하게 만들어가요!
      </div><br>
      
      
      <div class="pt-4 font-semibold text-xl">
      지금 바로 시작! <br>
      제로퀘스트와 지구의 히어로가 되어보세요!🌟🚀<br>
      쉿! 소문내기까지 하면 추가 보너스도 빵빵합니다.
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
const myNftList = ref<nftType>();
const esgPoint = ref(0);
const balances = ref();
const tokenInfos = ref();
const popupTitle = ref("");

console.log("bannerList",bannerList)

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
      console.log("zero",response.data.data)
    });
};

const checkError = (status: number, code: number) => {
  if (status === 400) {
    store.state.popupType = 'message';
    popupTitle.value = errorMsg(status, code);
    store.state.isPopup = true;
  } else if (status === 401 || status === 403 || status === 300) {
    store.commit("auth/setClearToken");

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

const goNftDetail = (nftId: number) => {
  router.push({ name: 'onft-detail', params: { nftId } });
};
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
  object-fit: contain;
  object-position: center top;
  height: 100px;
}

.media-Bottom {
  @media(min-width:450px) {
    margin-bottom: 100px;
  }
}
</style>