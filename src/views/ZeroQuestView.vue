<template>
  <div class="flex flex-col justify-center mm">
    <div class="h-8"></div>
    <div class="w-full">
      <Carousel :autoplay="3000" :wrap-around="true">
        <Slide v-for="slide in bannerList" :key="slide">
          <div class="carousel__item" style="overflow: hidden">
            <img :src="slide.url" />
          </div>
        </Slide>
      </Carousel>
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
    <div class="pb-4 flex justify-between items-center">
      <div class="text-3xl font-semibold text-left">O!NFT</div>
      <div class="border rounded-full">
        <div class="text-lg text-gray-400 mx-4 my-1" @click="goToOnft()">
          more +
        </div>
      </div>
    </div>
    <div class="w-full grid grid-cols-3 gap-card">
      <div class="flex flex-col" v-for="item in myNftList" :key="item.tokenId">
        <div v-if="item.enable === 1">
          <div>
            <img
              class="nftImg"
              :src="nftList[item.nftId].image"
              alt=""
              @click="goNftDetail(item.nftId, item.tokenId)"
            />
          </div>

          <div class="h-2"></div>
          <div class="font-semibold text-center">
            {{ nftList[item.nftId].name }}
          </div>
        </div>
        <div class="grayscale" v-else>
          <div>
            <img
              class="nftImg"
              :src="nftList[item.nftId].image"
              alt=""
              @click="goNftDetail(item.nftId, item.tokenId)"
            />
          </div>
          <div class="h-2"></div>
          <div class="font-semibold text-center">
            {{ nftList[item.nftId].name }}
          </div>
        </div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="pb-4 flex justify-between items-center">
      <div class="text-3xl font-semibold text-left">NEW NFT</div>
      <div class="border rounded-full">
        <div class="text-lg text-gray-400 mx-4 my-1" @click="goToZeroNft()">
          more +
        </div>
      </div>
    </div>
    <div class="w-full grid grid-cols-3 gap-card">
      <div class="flex flex-col" v-for="item in nftList" :key="item.tokenId">
        <img
          class="nftImg"
          :src="item.image"
          alt=""
          @click="goToDetail(item.idx)"
        />
        <div class="h-2"></div>
        <div class="font-semibold text-center">{{ item.name }}</div>
      </div>
    </div>
    <div class="h-10"></div>

    <div
      class="w-66 h-24 flex justify-center items-center mb-5 mt-10 cursor-pointer"
      @click="referPage"
    >
      <img src="@/assets/images/referral_banner_eng.png" @click="referPage" />
    </div>

    <div class="h-10"></div>

    <div
      class="break-words text-black media-Bottom intro-zeroquest text-center mt-10"
    >
      <div>
        <div class="font-semibold text-2xl">
          Save the Earth with ZeroQuest!🌍🎮
        </div>
        <br />
        <div class="font-medium text-lg">
          Reduce your carbon footprint; that's our mission! <br />
          Earn ESG points for every success! <br />
          More interestingly, points can be redeemed <br />
          by exchanging them for ESG tokens.<br />

          From climbing stairs to riding a bike!<br />
          With ZeroQuest, fill your pockets while saving the planet!<br />
          Let's make the Earth more enjoyable and healthy together!
        </div>
        <br />

        <div class="pt-4 font-semibold text-xl">
          Start Now! <br />
          Become a Hero for ZeroQuest and the Earth!🌟🚀<br />
          Shh! If you spread the word, you'll get a lot of extra bonuses.
        </div>
      </div>
    </div>
    <div class="h-40"></div>
  </div>
</template>

<script lang="ts" setup>
import store from "@/store";
import http from "@/api/http";
import router from "@/router";
import axios from "axios";
import { reactive, onMounted, ref, computed } from "vue";
import { NFTSampleType, nftType } from "@/types/IZeroNftType";
import MyNftCard from "@/components/OpenNftView.vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import { checkBannerLatestTime, checkNftLatestTime } from "@/api/axios.ts";
import { errorMsg } from "@/utils/util";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import "vue3-carousel/dist/carousel.css";
const vuexStore = useStore();
const referral = computed(() => vuexStore.getters["auth/getReferral"]);
const bannerList = computed(() => store.getters["auth/getBannerList"]);
const nftList = computed(() => vuexStore.getters["auth/getNftList"]);
const bannerLatestTime = computed(() =>
  parseInt(vuexStore.state.auth.bannerLatestTime)
);
const nftLatestTime = computed(() =>
  parseInt(vuexStore.state.auth.nftLatestTime)
);
const userTokenInfo = computed(() => vuexStore.getters["auth/getBalances"]);
const esgPoint = parseInt(userTokenInfo.value.ESGP);
const myNftList = ref<nftType>();

onMounted(async () => {
  checkNftLatestTime(vuexStore, nftLatestTime.value);
  checkBannerLatestTime(vuexStore, bannerLatestTime.value);
  getMyNftList();
});

const getMyNftList = () => {
  http
    .get("/api/nft/myZeroNft", {
      params: {
        type: 1,
      },
    })
    .then((response) => {
      myNftList.value = response.data.data;
    });
};

function goToOnft() {
  router.push({
    path: "/onft",
    name: "onft",
  });
}

function goToZeroNft() {
  router.push({
    path: "/zeronft",
    name: "zeronft",
  });
}

function goToDetail(idx: number) {
  router.push({
    path: "/zeronftbuy",
    name: "zeronftbuy",
    params: {
      idx: idx,
    },
  });
}

const goNftDetail = (idx: number, tokenId: number) => {
  router.push({ name: "onft-detail", params: { idx, tokenId } });
};

function referPage() {
  router.push({
    path: "/myzq/referral",
    name: "referral",
  });
}
</script>

<style lang="scss">
.text-esg-color {
  color: #24d120;
}

.nftOn {
  background-color: #24d120;
}

.nftOff {
  background-color: #ccc;
}

.grayscale {
  filter: grayscale(100%);
}

.nftImg {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center top;
  height: 100px;
  @media (max-width: 280px) and (max-height: 653px) {
    height: 50px; // Fold 사이즈에서의 높이
  }
}

.media-Bottom {
  @media (min-width: 450px) {
    margin-bottom: 100px;
  }
}

.refer-box {
  width: 358.467px;
  height: 92.5px;
  background-color: #a5a5a5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.refer-font {
  font-size: 14px;
}
</style>
