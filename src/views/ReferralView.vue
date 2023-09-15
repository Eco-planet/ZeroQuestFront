<template>
  <div class="referral-contens-area">
    <div class="w-full flex justify-center">
      <!-- 추가된 부분: div를 중앙 정렬하기 위해 flex와 justify-center를 사용합니다. -->
      <div class="mb-10 pl-10 flex items-center justify-center w-7/10 p-4 rounded-2xl font-semibold text-4xl text-black refBtn">
        지구 지키기 소확행 🌎🌟
      </div>
    </div>

    <div class="referral-container f0">
      <p class="tit">
        친구와 함께 탄소감축 실천하자<br />
        친구가 추천인 코드 입력 한 경우, 추천인에게
      </p>
      <p class="tit-bold">
        <span>2,000 ESG Point</span>
        <span> 지급</span>
      </p>

      <div @click="showLastSixChars"
        class="flex items-center justify-between w-auto p-4 my-10 bg-white border border-black font-semibold text-2xl text-black">
        <span class="underline referral-code-span">{{slicedReferralValue}}</span>
        <img class="referral-image" src="../assets/images/refcodeImg.png" alt="Referral Code Image" />
      </div>

      <p class="tit">소문내기만 해도</p>
      <p class="tit-bold">
        <span>50 ESG Point</span>
        <span> 지급</span>
      </p>

      <div class="mt-7 mb-4">
        <!-- 카카오 공유 -->
        <button type="button">
          <a id="kakao-link-btn" @click="shareKakao">
            <img src="./../assets/images/kakao_logo.png" alt="카카오톡 공유하기" />
          </a>
        </button>

        <!-- 텔레그램 공유 -->
        <button type="button" class="sns_btn" @click="shareTelegram">
          <img src="./../assets/images/telog.png" alt="텔레그램 공유하기" />
        </button>
      </div>

      <div class="h-9"></div>

      <div class="font-medium text-sm text-gray-400">
        주의사항 : 추천인으로 자기 자신을 추천할 수 없습니다.<br />
        같은 사람에게 여러 번 소문내기를 하더라도<br />
        50 ESG Point가 지급됩니다.<br />
        제 3자의 최초가입시에만 소문내기 한 사람에게<br />
        2,000 ESG Point가 지급됩니다.<br />
        한 번에 한 사람에게만 소문내기를 할 수 있습니다.<br />
        하루에 5명의 레퍼럴을 할 수 있습니다.
      </div>

      <div class="h-10"></div>

      <div class="py-5 bg-gray-200 rounded-xl">
        <div>
          <span class="text-3xl font-bold mb-4 block">
            추천인 코드 입력란
          </span>
          <span class="text-lg font-bold block py-2">
            아래 칸에 추천인 코드를 입력한 후<br />
            확인 버튼을 눌러주세요
          </span>
        </div>

        <div class="flex flex-col items-center justify-center space-y-10 mt-5 mb-10">
          <input type="text" placeholder="추천인 코드 입력란" class="px-10 py-4 text-center border border-black border-b-2"
            v-model="referralCode" />
        </div>

        <button
          @click="referralInput"
          class="w-36 py-2 text-white font-medium border rounded-full text-xl refBtn"
        >
        확인
        </button>
      </div>
    </div>
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
import { errorMsg } from "@/utils/util";
import { useStore } from "vuex";
import "vue3-carousel/dist/carousel.css";
const vuexStore = useStore(); // Use a different variable name for the store
const referral = computed(() => vuexStore.getters["auth/getReferral"]);
const bannerList = store.getters["auth/getBannerList"];
const nftList = store.getters["auth/getNftList"];
const myNftList = ref<nftType>();
const esgPoint = ref(0);
const balances = ref();
const tokenInfos = ref();
const popupTitle = ref("");
const referralCode = ref(""); //레퍼럴 코드 확인용

// 소셜 공유하기, 텔레그램

const shareTelegram = () => {
  const referralValue = referral.value;
  //console.log("텔레그램 Referral:", referralValue); // Check the value in the console

  if (referralValue) {
    const text = `ZeroQuest - 친구초대 이벤트 :`;
    const url = `https://play.google.com/store/apps/details?id=com.aiblue.zrqst_webview_app`;
    const referralSlice = referralValue.slice(-6); // Use slice if referralValue is a string
    const telegramShareUrl = `https://telegram.me/share/url?url=${encodeURIComponent(
      url
    )}  &text=${encodeURIComponent(text + referralSlice)}`;

    window.open(telegramShareUrl);
  } else {
    console.error("store.state.referral is not defined or is empty");
  }
};

// 소셜 공유하기, 카카오
const shareKakao = () => {
  const referralValue = referral.value;
  if (referralValue) {
    const referralSlice = referralValue.slice(-6); // Calculate referralSlice here
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "ZeroQuest-친구초대 이벤트" + referralSlice + "입력하세요",
        description: `https://play.google.com/store/apps/details?id=com.aiblue.zrqst_webview_app&pcampaignid=web_share`,
        imageUrl: "preview_image.png (1000*1000)",
        link: {
          mobileWebUrl: "http://localhost:8080/ ",
          webUrl: "http://localhost:8080/ ",
        },

        // serverCallbackArgs: {
        //   key: `{"current": "${mobileWebUrl}"}`, // 사용자 정의 파라미터 설정
        // },
      },
    });
  } else {
    console.error("store.state.referral is not defined or is empty");
  }
};

// 레퍼럴 입력 가이드

// const referralInput = () => {
//   console.log("레퍼럴 코드는", referralCode.value, typeof referralCode.value);
//   http
//     .post(`/api/user/checkReferral`, {
//       referralCode: referralCode.value,
//     })
//     .then((response) => {
//       console.log("200", response.data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       if (error.response) {
//         console.error("Server Response:", error.response.data);
//       }
//     });
// };

const referralInput = () => {
  const userReferralSlice = referral.value.slice(-6);

  if (referralCode.value === userReferralSlice) {
    alert("본인의 추천인 코드 마지막 6자리는 입력할 수 없습니다.");
    return;
  }

  console.log("레퍼럴 코드는", referralCode.value, typeof referralCode.value);

  http
    .post(`/api/user/checkReferral`, {
      referralCode: referralCode.value,
    })
    .then((response) => {
      console.log("200", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);

      // 오류 발생시 해당 메시지를 표시
      alert("입력한 코드는 존재하지 않는 레퍼럴 코드입니다.");
    });
};

const showLastSixChars = () => {
  const referralValue = referral.value;
  if (referralValue) {
    const slicedValue = referralValue.slice(-6);
    alert(slicedValue + "은 추천인 코드입니다."); // 뒷부분 6자리를 알림창으로 표시. 다른 방법으로 표시하려면 이 부분을 변경하세요.
  } else {
    console.error("referral value is not defined or is empty");
  }
};

const slicedReferralValue = computed(() => {
  if (referral.value) {
    return referral.value.slice(-6);
  }
  return "";
});
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

.referral-container>.tit {
  font-weight: 600;
  font-size: 26px;
  line-height: 36px;
  color: #000;
}

.referral-container>.tit-bold {
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;
  color: #000;
}

.refBtn {
  background-color:  #70ad47;

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

  .referral-container>.tit {
    font-size: 3.6111vw;
    line-height: 5vw;
  }

  .referral-container>.tit-bold {
    font-size: 4vw;
    line-height: 5vw;
  }

  .referral-container>.tit-bold>span:nth-child(1) {
    font-weight: 600;
    color: #70ad47;
  }

  .referral-container>.tit-bold>span:nth-child(2) {
    font-weight: 600;
  }
}
</style>
