<template>
  <div class="referral-contens-area">
    <div class="w-full flex justify-center">
      <!-- 추가된 부분: div를 중앙 정렬하기 위해 flex와 justify-center를 사용합니다. -->
      <div
        class="mb-10 flex items-center justify-center w-7/10 p-4 rounded-2xl font-semibold text-4xl text-black refBtn"
      >
        {{ t("message.referral1") }}
      </div>
    </div>

    <div class="referral-container f0">
      <p class="tit">
        {{ t("message.referral2") }}<br />
        {{ t("message.referral3") }}
      </p>
      <p class="tit-bold">
        <span> {{ t("message.referral5") }} </span>
        <span>{{ t("message.referral4") }}</span>
      </p>

      <div
        @click="showLastSixChars"
        class="flex items-center justify-between w-auto p-4 my-10 bg-white border border-black font-semibold text-2xl text-black"
      >
        <span class="underline referral-code-span">{{
          slicedReferralValue
        }}</span>
        <img
          class="referral-image"
          src="../assets/images/refcodeImg.png"
          alt="Referral Code Image"
        />
      </div>

      <p class="tit">{{ t("message.referral6") }}</p>
      <p class="tit-bold">
        <span>{{ t("message.referral5") }}</span>
        <span> {{ t("message.referral7") }}</span>
      </p>

      <div class="mt-7 mb-4">
        <!-- 카카오 공유 -->
        <!-- <button type="button">
          <a id="kakao-link-btn" @click="shareKakao">
            <img
              src="./../assets/images/kakao_logo.png"
              alt="카카오톡 공유하기"
            />
          </a>
        </button> -->

        <!-- 텔레그램 공유 -->
        <button type="button" class="sns_btn" @click="shareTelegram">
          <img src="./../assets/images/telog.png" alt="텔레그램 공유하기" />
        </button>
      </div>

      <div class="h-9"></div>

      <div>
        <div class="font-medium text-sm text-gray-400">
          Notice: You cannot refer yourself as a referrer.<br />
          Even if you spread the word to the same person multiple times,<br />
          you will be awarded 50 ESG Points.<br />
          Only when a third-party signs up for the first time,<br />
          the person who spread the word will receive 1,000 ESG Points.<br />
          You can spread the word to only one person at a time.<br />
          You can make up to 5 referrals a day.
        </div>
      </div>

      <div class="h-10"></div>

      <div class="py-5 bg-gray-200 rounded-xl">
        <div>
          <span class="text-3xl font-bold mb-4 block">
            {{ t("message.referral8") }}
          </span>
          <div>
            <span class="text-lg font-bold block py-2">
              Please enter the referral code in the box below<br />
              and press the confirm button
            </span>
          </div>
        </div>

        <div
          class="flex flex-col items-center justify-center space-y-10 mt-5 mb-10"
        >
          <input
            type="text"
            :placeholder="t('message.referral8')"
            class="px-10 py-4 text-center border border-black border-b-2"
            v-model="referralCode"
          />
        </div>

        <button
          @click="referralInput"
          class="w-36 py-2 text-white font-medium border rounded-full text-xl refBtn"
        >
          {{ t("message.termsBtn") }}
        </button>
      </div>
    </div>
  </div>
  <Modal
    :visible="store.state.isPopup"
    @hide="closeModal"
    @refreshHide="closeRefModal"
    :title="popupTitle"
  />
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
import { errorMsg } from "@/utils/util";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import "vue3-carousel/dist/carousel.css";
import { access } from "fs";
import Modal from "@/components/Modal/index.vue";
const vuexStore = useStore(); // Use a different variable name for the store
const referral = computed(() => vuexStore.getters["auth/getReferral"]);
const bannerList = store.getters["auth/getBannerList"];
const nftList = store.getters["auth/getNftList"];
const accessToken = store.getters["auth/getAccessToken"];
const myNftList = ref<nftType>();
const esgPoint = ref(0);
const balances = ref();
const tokenInfos = ref();
const popupTitle = ref("");
const referralCode = ref(""); //레퍼럴 코드 확인용

const locale = computed(() => vuexStore.state.system.locale);
const { t } = useI18n();

// 소셜 공유하기, 텔레그램

const shareTelegram = () => {
  const referralValue = referral.value;

  if (referralValue) {
    const referralSlice = referralValue.slice(-6); // Use slice if referralValue is a string

    const infoShareTelegram = {
      content: {
        objectType: "feed",
        title: `ZeroQuest - Please enter ${referralSlice} on Referral COde Entry`,

        description: `https://play.google.com/store/apps/details?id=com.aiblue.zrqst_multilingual_webview_app`,
        imageUrl:
          "https://play-lh.googleusercontent.com/VaCMJUHxqjCtqNJ3oKFDdDCZUHdIOu5nZRARVnxSNssiYK6HXZ6JOTcA3vAcLPYfrJI=w240-h480-rw",
        link: {
          mobileWebUrl: `https://zeroquest.io`,
          webUrl: `https://zeroquest.io`,
        },
        accessToken: accessToken,
      },
    };

    window.flutter_inappwebview
      .callHandler("handleTelegramShareBtn", {
        infoShareTelegram: infoShareTelegram,
      })
      .then((res: any) => {
        router.go(0);
      });
  } else {
    console.error("store.state.referral is not defined or is empty");
  }
};

// 레퍼럴 입력 가이드 (sendReferral)
const referralInput = () => {
  const userReferralSlice = referral.value.slice(-6);

  if (referralCode.value === userReferralSlice) {
    store.state.popupType = "message";
    store.state.isPopup = true;
    popupTitle.value = "message.ref3";
    return;
  } else if (!referralCode.value) {
    store.state.popupType = "message";
    store.state.isPopup = true;
    popupTitle.value = "message.ref6";
    return;
  }

  http
    .post(`/api/user/checkReferral`, {
      referralCode: referralCode.value,
    })
    .then((response) => {
      store.state.popupType = "successReferral";
      store.state.isPopup = true;
      popupTitle.value = "message.successReferral";
    })
    .catch((error) => {
      console.error("Error:", error);

      if (error.response.data.errorCode === 303) {
        // 존재하지 않는 레퍼럴 코드를 입력 했을 때
        store.state.popupType = "message";
        store.state.isPopup = true;
        popupTitle.value = "message.ref5";
      } else if (error.response.data.errorCode === 304) {
        // 이미 등록된 레퍼럴 코드를 입력 했을 때
        store.state.popupType = "message";
        store.state.isPopup = true;
        popupTitle.value = "message.ref4";
      }
    });
};

const showLastSixChars = () => {
  const referralValue = referral.value;
  if (referralValue) {
    const slicedValue = referralValue.slice(-6);

    // 클립보드에 slicedValue를 복사
    window.flutter_inappwebview.callHandler("handleCopyBtn", {
      content: slicedValue,
    });
  }
};

const slicedReferralValue = computed(() => {
  if (referral.value) {
    return referral.value.slice(-6);
  }
  return "";
});

const closeModal = () => {
  store.state.isPopup = false;
};
const closeRefModal = () => {
  store.state.isPopup = false;
  router.go(0);
};
</script>

<style>
.referral-contens-area {
  width: 100%;
  padding: 60px 50px 170px;
  text-align: center;
  position: relative;
}

.referral-container {
  width: 100%;
  margin-top: 40px;
  padding: 50px 48px;
  border: 2px solid #ddd;
}

.referral-code-span {
  flex-grow: 1;
  text-align: center;
  display: flex;
  align-items: center;
  /* 수직 중앙 정렬을 위한 속성 */
  justify-content: center;
  /* 수평 중앙 정렬을 위한 속성 */
}

.referral-image {
  margin-left: 1rem;
  /* 이미지와 텍스트 사이의 간격 조절 */
}

.referral-container > .tit {
  font-weight: 600;
  font-size: 26px;
  line-height: 36px;
  color: #000;
}

.referral-container > .tit-bold {
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #000;
}

.refBtn {
  background-color: #70ad47;
}

@media only screen and (max-width: 1024px) {
  .referral-contens-area {
    padding: 8.3333vw 6.9444vw 23.6111vw;
  }

  .referral-container {
    margin-top: 5.5556vw;
    padding: 6.9444vw 6.6667vw;
    border-width: 0.2778vw;
  }

  h2 {
    margin-bottom: 6.9444vw;
    font-size: 6.1111vw;
    height: 9.7222vw;
  }

  .referral-container > .tit {
    font-size: 3.6111vw;
    line-height: 5vw;
  }

  .referral-container > .tit-bold {
    font-size: 4vw;
    line-height: 5vw;
  }

  .referral-container > .tit-bold > span:nth-child(2) {
    font-weight: 600;
    color: #70ad47;
  }

  .referral-container > .tit-bold > span:nth-child(1) {
    font-weight: 600;
  }
}
</style>
