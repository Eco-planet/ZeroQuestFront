<template>
  <div class="m-7">
    <div class="w-full p-16 pt-40 relative text-center mx-auto my-8 mt-20">
      <div class="w-full flex justify-center">
        <div
          class="mb-10 pl-10 flex items-center justify-center w-7/10 p-4 bg-custom-green rounded-2xl font-semibold text-4xl text-black refBtn"
        >
          지구 지키기 소확행 🌎🌟
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center min-h-screen">
      <div class="w-full mt-10 p-12 mx-auto">
        <p class="font-semibold text-2xl leading-9 text-black">
          친구와 함께 탄소감축 실천하자<br />친구가 추천인 코드<br />
          입력 한 경우, 추천인에게
        </p>
        <p class="font-semibold text-3xl leading-9 text-black">
          <span class="text-green-600">2,000 ESG Point</span><span> 지급</span>
        </p>

        <div
          @click="showLastSixChars"
          class="flex items-center justify-between w-1/2 h-32 p-4 my-10 bg-white border border-gray-300 rounded-md shadow-md font-semibold text-2xl text-black mx-auto"
        >
          <div class="flex-grow-0"></div>

          <span class="underline ml-8">{{ slicedReferralValue }}</span>

          <div class="flex-grow"></div>

          <img
            src="../assets/images/refcodeImg.png"
            alt="Referral Code Image"
          />
        </div>

        <div class="font-semibold text-2xl leading-9 text-black">
          소문내기만 해도
        </div>
        <div class="font-semibold text-2xl leading-9 text-black">
          <span class="text-green-600">50 ESG Point</span><span> 지급</span>
        </div>

        <div class="mt-7 mb-4 flex justify-center items-center">
          <button @click="shareKakao" class="mr-8">
            <img
              src="./../assets/images/kakao_logo.png"
              alt="카카오톡 공유하기"
            />
          </button>
          <button @click="shareTelegram">
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

        <div
          class="py-10 bg-gray-200 rounded-xl mb-20 mb-[100px] mx-auto w-full max-w-lg"
        >
          <br />
          <div>
            <span class="text-3xl font-bold mb-4 block">
              추천인 코드 입력란
            </span>
            <span class="text-lg font-bold block py-2">
              아래 칸에 추천인 코드를 입력한 후<br />
              확인 버튼을 눌러주세요
            </span>
          </div>

          <div
            class="flex flex-col items-center justify-center space-y-10 mt-5 mb-10"
          >
            <input
              type="text"
              placeholder="추천인 코드 입력란"
              class="px-10 py-4 text-center border border-black border-b-2"
              v-model="referralCode"
            />
          </div>

          <button
            @click="referralInput"
            class="w-36 py-2 text-white font-medium border rounded-full text-xl refBtn mx-auto relative top-[-24px]"
          >
            확인
          </button>
          <br /><br />
        </div>
        <br /><br /><br /><br /><br /><br />
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

  if (referralValue) {
    const text = `ZeroQuest - 친구초대 이벤트 :`;
    const url = `https://play.google.com/store/apps/details?id=com.aiblue.zrqst_webview_app`;
    const referralSlice = referralValue.slice(-6); // Use slice if referralValue is a string
    const telegramShareUrl = `https://telegram.me/share/url?url=${encodeURIComponent(
      url
    )}  &text=${encodeURIComponent(text + referralSlice)}`;
    window.open(telegramShareUrl);
    // Assuming that you want to send the referral after sharing on Telegram
    if (window.confirm("텔레그램으로 친구 공유합니다")) {
      sendReferralRequest(referralValue)
        .then((response) => {
          console.log("sendReferral Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  } else {
    console.error("store.state.referral is not defined or is empty");
  }
};
const sendReferralRequest = (code) => {
  return http.post(`/api/user/sendReferral`, {
    referralCode: code,
  });
};

// 소셜 공유하기, 카카오
const shareKakao = () => {
  const referralValue = referral.value;
  if (referralValue) {
    const referralSlice = referralValue.slice(-6);
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `ZeroQuest-친구초대 이벤트 ${referralSlice}을 입력하세요`,
        description: `https://play.google.com/store/apps/details?id=com.aiblue.zrqst_webview_app&pcampaignid=web_share`,
        imageUrl:
          "https://play-lh.googleusercontent.com/VaCMJUHxqjCtqNJ3oKFDdDCZUHdIOu5nZRARVnxSNssiYK6HXZ6JOTcA3vAcLPYfrJI=w240-h480-rw",
        link: {
          mobileWebUrl: `dev-zqbackend.eco-esgtest.io`,
          webUrl: `dev-zqbackend.eco-esgtest.io`,
        },
        // serverCallbackArgs: { callback: "/api/test" },
        // serverCallbackArgs: '{"key":"value"}',
      },
    });

    // GET 요청을 서버에 보내기
    // http
    //   .get("/api/test", { data: "Kakao share button clicked!" })
    //   .then((response) => {
    //     console.log("GET request sent successfully:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error sending GET request:", error);
    //   });

    // 여기서 api/user/sendReferral 호출하기
    sendReferralRequest(referralValue)
      .then((response) => {
        console.log("sendReferral Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.error("store.state.referral is not defined or is empty");
  }
};

// 레퍼럴 입력 가이드 (sendReferral)
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
      alert("이미 등록된 레퍼럴 코드입니다.");
      // 오류 발생시 해당 메시지를 표시
      alert("입력한 코드는 존재하지 않는 레퍼럴 코드입니다.");
    });
};

const showLastSixChars = () => {
  const referralValue = referral.value;
  if (referralValue) {
    const slicedValue = referralValue.slice(-6);

    // 클립보드에 slicedValue를 복사
    navigator.clipboard
      .writeText(slicedValue)
      .then(() => {
        alert(slicedValue + "은 추천인 코드입니다."); // 뒷부분 6자리를 알림창으로 표시.
        alert("추천인 코드가 클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
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
.refBtn {
  background-color: #70ad47;
}
</style>
