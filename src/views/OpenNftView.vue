<template>
  <div class="px-8 flex flex-col justify-center items-center">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-3xl font-semibold text-left">O!NFT</div>
    </div>
    <div class="h-10"></div>
    <div class="w-full">
      <Carousel :autoplay="3000" :wrap-around="true">
        <Slide v-for="slide in bannerList" :key="slide">
          <div class="carousel__item" style="overflow: hidden;"><img :src="slide.url" /></div>
        </Slide>
      </Carousel>
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
   <Modal :visible="store.state.isPopup" @hide="closeModal" @resData="gameInstall" />
</template>

<script lang="ts" setup>
import store from "@/store";
import http from "@/api/http";
import { onMounted, ref } from "vue";
import MyNftCard from "@/components/OpenNftView.vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

const nftList = store.getters["auth/getNftList"];
const myNftList = ref();

const bannerList = store.getters["auth/getBannerList"];

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
    const myNftData = response.data.data;

    let myList: any = {};

    myNftData.forEach((res: any) => {
      myList[res.idx] = res;
    });

    myNftList.value = myList;
  });
};

const closeModal = () => {
  store.state.isPopup = false;
};

const gameInstall = (type: string) => {
  if (type === 'install') {
    const idx = store.state.nftIdx;

    http.get("/api/quest/gametoken", {
      params: {
        symbol: myNftList.value[idx].symbol,
        nftId: store.state.nftId,
        tokenId: myNftList.value[idx].tokenId,
      }
    })
    .then((response) => {
      let deepLink = '';

      if(navigator.userAgent.toLowerCase().indexOf("android") > -1){
        deepLink = nftList[store.state.nftId].and_deeplink;
      } else if(navigator.userAgent.toLowerCase().indexOf("iphone") > -1){
        deepLink = nftList[store.state.nftId].ios_deeplink;
      }

      window.open(deepLink + '?token=' + response.data.data.gameToken + '&name=' + store.getters["auth/getUserName"] + '&email=' + store.getters["auth/getUserEmail"], '_blank');
    });
  } else if (type === '1') {
    window.open('https://smartrecycle.apk', '_blank');
  } else if (type === '2') {
    window.open('https://stepup.apk', '_blank');
  }
}


</script>

<style lang="scss">
.nftImg {
  width:100%;
  height:100%;
  object-fit: contain;
  object-position: center top;
  height: 100px;
}

.nftDisable {
  background-color: rgba(0, 0, 0, 0.2);
  width:100%;
  height:100%;
  height: 100px;
  margin-top: -100px;
}

.nftOn  {
  background-color: #24d120;
}

.nftOff  {
  background-color: #ccc;
}

</style>
