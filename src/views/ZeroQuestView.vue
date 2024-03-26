<template>
  <!-- <div>
    <h2>래퍼럴 입력창</h2>
    <input
      type="string"
      style="border: 1px solid black"
      v-model="referralCode"
    />
    <button @click="referralInput">래퍼럴 버튼</button>
  </div> -->

  <div class="flex flex-col justify-center mm">
    <div class="h-8"></div>
    <div class="w-full">
      <Carousel :autoplay="3000" :wrap-around="true">
        <Slide v-for="slide in bannerList" :key="slide">
          <div class="carousel__item" style="overflow: hidden">
            <!-- <img
              v-if="locale === 'kr'"
              :src="slide.url.kor"
              @click="goToLink(slide.link)"
            /> -->
            <img
              v-if="locale === 'kr'"
              src="@/assets/images/referral_banner.png"
              @click="goToLink(slide.link)"
            />
            <!-- <img v-else :src="slide.url.eng" @click="goToLink(slide.link)" /> -->
            <img
              v-else
              src="@/assets/images/referral_banner_eng.png"
              @click="goToLink(slide.link)"
            />
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
          <div class="font-semibold text-center" v-if="locale === 'kr'">
            {{ nftList[item.nftId].name.kor }}
          </div>
          <div class="font-semibold text-center" v-else>
            {{ nftList[item.nftId].name.eng }}
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
          <div class="font-semibold text-center" v-if="locale === 'kr'">
            {{ nftList[item.nftId].name.kor }}
          </div>
          <div class="font-semibold text-center" v-else>
            {{ nftList[item.nftId].name.eng }}
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
        <div class="font-semibold text-center" v-if="locale === 'kr'">
          {{ item.name.kor }}
        </div>
        <div class="font-semibold text-center" v-else>{{ item.name.eng }}</div>
      </div>
    </div>
    <div class="h-10"></div>

    <div
      class="w-66 h-24 flex justify-center items-center mb-5 mt-10 cursor-pointer"
      @click="referPage"
    >
      <img
        v-if="locale === 'kr'"
        src="@/assets/images/referral_banner.png"
        @click="referPage"
      />
      <img
        v-else
        src="@/assets/images/referral_banner_eng.png"
        @click="referPage"
      />
    </div>

    <div class="h-10"></div>

    <div
      class="break-words text-black media-Bottom intro-zeroquest text-center mt-10"
    >
      <div v-if="locale === 'kr'">
        <div class="font-semibold text-2xl">
          제로퀘스트와 함께 지구를 살려요!🌍🎮
        </div>
        <br />
        <div class="font-medium text-lg">
          탄소 발자국을 줄이는 행동, 그게 바로 우리의 게임 미션!<br />
          성공할 때마다 ESG 포인트도 적립! <br />
          포인트는 ESG 토큰으로 교환하면 재태크도 됩니다.<br />

          계단 오르기부터 자전거 타기까지!<br />
          제로퀘스트와 함께하면, 지구를 살리면서 주머니도 가득!<br />
          함께 지구를 더 즐겁게, 건강하게 만들어가요!
        </div>
        <br />

        <div class="pt-4 font-semibold text-xl">
          지금 바로 시작! <br />
          제로퀘스트와 지구의 히어로가 되어보세요!🌟🚀<br />
          쉿! 소문내기까지 하면 추가 보너스도 빵빵합니다.
        </div>
      </div>
      <div v-else>
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
const bannerList = store.getters["auth/getBannerList"];
const nftList = computed(() => vuexStore.getters["auth/getNftList"]);
const bannerLatestTime = computed(() =>
  parseInt(vuexStore.state.auth.bannerLatestTime)
);
const nftLatestTime = computed(() =>
  parseInt(vuexStore.state.auth.nftLatestTime)
);
const esgPoint = computed(() => parseInt(vuexStore.state.auth.balances));

const myNftList = ref<nftType>();
// const esgPoint = ref("");

const balances = ref();
// const tokenInfos = ref();
// const tokenInfos = computed(() => store.getters["auth/getTokenInfos"]);

const popupTitle = ref("");
const referralCode = ref(""); //레퍼럴 코드 확인용

const locale = computed(() => vuexStore.state.system.locale);

const { t } = useI18n();

onMounted(() => {
  // updateBalance()
  getMyNftList();
  // checkNftLatestTime(vuexStore, nftLatestTime.value)
  // checkBannerLatestTime(vuexStore, bannerLatestTime.value);
  // updateBalance();
  // if (store.state.isBalanceUpdate === true || 1) {
  //   getBalanceAll();
  // }
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
      console.log("zero는", response.data.data);
      console.log("response는", response);
    });
};

const checkError = (status: number, code: number) => {
  if (status === 400) {
    store.state.popupType = "message";
    popupTitle.value = errorMsg(status, code);
    store.state.isPopup = true;
  } else if (status === 401 || status === 403 || status === 300) {
    store.commit("auth/setClearToken");

    router.push("/");
  }
};

// const getBalanceAll = () => {
//   http
//     .get("/api/token/balanceAll")
//     .then((response) => {
//       console.log("response getBalanceAll에서",response)
//       store.state.isBalanceUpdate = false;

//       const resData = response.data.data.balances;
//       console.log("resData는",resData)
//       let balancesData: any = {};

//       resData.forEach((res: any) => {
//         balancesData[res.symbol] = res;
//       });

//       store.commit("auth/setBalances", { info: balancesData });

//       updateBalance();
//     })
//     .catch((error) => {
//       checkError(error.response.status, error.response.data.errorCode);
//     });
// };

const updateBalance = () => {
  store.getters["auth/getTokenInfos"];
  // balances.value = store.getters["auth/getBalances"];

  // for (const key in balances.value) {
  //   if (balances.value[key].symbol === "ESGP") {
  //     const balance = parseFloat(balances.value[key].balance);
  //     esgPoint.value = balance.toLocaleString();
  //   }
  // }
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

function goToLink(link: string) {
  router.push({
    path: link,
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
