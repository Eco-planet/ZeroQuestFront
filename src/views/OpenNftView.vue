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
          <div class="carousel__item" style="overflow: hidden">
            <img :src="slide.url" @click="goToLink(slide.link)" />
          </div>
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
        <MyNftCard
          :nftCard="item"
          :nftInfo="nftList[item.nftId]"
          @updateRun="gameRun"
          @updateReward="gameReward"
          @updateEnable="gameEnable"
        />
      </template>
    </div>
    <div class="h-10"></div>
    <div class="h-10"></div>
    <div class="h-10"></div>
  </div>
  <Modal
    :visible="store.state.isPopup"
    @hide="closeModal"
    @resData="checkData"
    :title="popupTitle"
  />
</template>

<script lang="ts" setup>
import store from "@/store";
import router from "@/router";
import http from "@/api/http";
import { onMounted, onUnmounted, ref, computed } from "vue";
import MyNftCard from "@/components/OpenNftView.vue";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import { useStore } from "vuex";
import "vue3-carousel/dist/carousel.css";

const vuexStore = useStore();
const nftList = store.getters["auth/getNftList"];
const myNftList = ref();
const bannerList = store.getters["auth/getBannerList"];
const onFlutter = ref(true);
const popupTitle = ref("");

onMounted(() => {
  window.addEventListener("flutterInAppWebViewPlatformReady", readyFlutter);

  getMyNftList();
});

onUnmounted(() => {
  window.removeEventListener("flutterInAppWebViewPlatformReady", readyFlutter);
});

const getMyNftList = () => {
  http
    .get("/api/nft/myZeroNft", {
      params: {
        type: 1,
      },
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

const checkData = (type: String) => {
  if (type !== "") {
    gameDownload(type);
  }
};

const gameEnable = () => {
  const idx = store.state.nftIdx;
  const enableType = myNftList.value[idx].enable;

  http
    .post("/api/nft/enableNft", {
      symbol: myNftList.value[idx].symbol,
      tokenId: myNftList.value[idx].tokenId,
      enable: 1,
    })
    .then((response) => {
      getMyNftList();
    });
};

const gameDownload = (type: String) => {
  const idx = store.state.nftIdx;
  //const enableType = myNftList.value[idx].enable;

  http
    .post("/api/nft/enableNft", {
      symbol: myNftList.value[idx].symbol,
      tokenId: myNftList.value[idx].tokenId,
      enable: 1,
    })
    .then((response) => {
      getMyNftList();
      gameDownUrl(type);
    });
};

const gameDownUrl = (type: String) => {
  let packageName = "";

  if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
    packageName = store.state.packageName;
  } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
    packageName = store.state.packageName;
  }
  window.flutter_inappwebview.callHandler("handleInstallBtn", {
    packageName: packageName,
  });
};

const gameRun = () => {
  const idx = store.state.nftIdx;

  let nftType = nftList[store.state.nftId].type;
  let linkUrl = "";

  if (nftType > 0) {
    linkUrl = "/api/quest/apptoken";
  } else {
    return false;
  }

  http
    .get(linkUrl, {
      params: {
        symbol: myNftList.value[idx].symbol,
        nftId: store.state.nftId,
        tokenId: myNftList.value[idx].tokenId,
      },
    })
    .then((response) => {
      let deepLink = "";

      if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
        deepLink = nftList[store.state.nftId].and_deeplink;
      } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
        deepLink = nftList[store.state.nftId].ios_deeplink;
      }

      window.flutter_inappwebview.callHandler("handlePlayBtn", {
        deepLink: deepLink,
        token: response.data.data.appToken,
        name: store.getters["auth/getUserName"],
        email: store.getters["auth/getUserEmail"],
        uid: store.getters["auth/getUserId"],
        isTest: response.data.data.isTest,
      });
    });
};

const gameReward = () => {};

const readyFlutter = (event: any) => {
  onFlutter.value = true;

  store.state.popupType = "message";
  popupTitle.value = "flutter_enable";
  store.state.isPopup = true;
};

function goToLink(link: string) {
  router.push({
    path: link,
  });
}
</script>

<style lang="scss">
.nftImg {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center top;
  height: 100px;
}

.nftDisable {
  width: 100%;
  height: 100%;
  height: 100px;
  margin-top: -100px;
}

.nftOn {
  background-color: #24d120;
  border-radius: 5px;
}

.nftOff {
  background-color: #ccc;
  border-radius: 5px;
}
</style>
