<template>
  <div class="flex flex-col justify-center items-center">
    <div class="h-56"></div>
    <div class="w-full flex">
      <div class="wp-30"></div>
      <div class="wp-40 flex justify-center items-center">
        <img src="@/assets/images/logo_big.png" alt="ZEROQUEST" />
      </div>
      <div class="wp-20"></div>
    </div>
    <div class="h-20"></div>
    <div class="h-10"></div>
    <div
      class="flex justify-center items-center wp-80 max-w-4xl border rounded-full py-4"
      @click="loginSdk"
    >
      <div class="wp-10">
        <img src="@/assets/images/icon_google.png" alt="Google" />
      </div>
      <div class="w-5"></div>
      <div class="text-3xl font-semibold">Google</div>
      <div class="w-1"></div>
      <div class="text-2xl">{{ t("message.googleLoginButton") }}</div>
    </div>
    <div class="h-10"></div>
    <div class="wp-70 max-w-4xl">
      <div class="font-medium text-xl font-semibold">
        {{ t("message.googleLoginTitle") }}
      </div>
      <div class="h-5"></div>
      <div class="break-words text-gray-500 text-lg">
        {{ t("message.googleLoginComment") }}
      </div>
    </div>

    <div class="break-words text-black">
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
  </div>
  <!-- 카카오 공유 -->
  <!--   <button type="button">
    <a id="kakao-link-btn" @click="shareKakao">
      <img
        src="https://www.designdb.com/usr/upload/editor/email/202304132212562023ad50-d888-46ee-8247-12fe63822d4f.png"
        alt="카카오톡 공유하기"
      />
    </a>
  </button> -->

  <!-- 텔레그램 공유 -->
  <!-- <button type="button" class="sns_btn" @click="shareTelegram">
    <img
      src="https://www.cctvnews.co.kr/news/photo/201909/136595_148460_5049.jpg"
      alt="텔레그램 공유하기"
    />
  </button> -->

  <!-- <button type="button" class="sns_btn">
    <a href="https://telegram.me/share/url?url=https://sample.com/index.php&text=추천코드: <?php echo $member['mb_referer']?>" target="_blank" class="sns_btn">
      <img src="/images/telegram.png" alt="텔레그램 공유하기">
    </a>
  </button>
 -->
</template>

<script lang="ts" setup>
import router from "@/router";
import axios from "axios";
import store from "@/store";
import { useI18n } from "vue-i18n";
import openSSLCrypto from "@/utils/openSSLCrypto";
import { googleTokenLogin, googleLogout } from "vue3-google-login";
import { onMounted, ref } from "vue";

const { t } = useI18n();

const showMode = ref(router.currentRoute.value.query.showMode);
const isLogin = ref(router.currentRoute.value.query.isLogin);

onMounted(() => {
  if (store.state.showMode === "webview" || showMode.value === "webview") {
    store.state.showMode = "webview";

    if (isLogin.value == 1) {
      store.state.isLoading = true;
      window.Java.jsLogin();
    }
  }
});

window.webviewLogin = (sub: String, email: String, name: String) => {
  login({ sub, email, name });
};

const loginSdk = () => {
  if (showMode.value === "webview") {
    window.Java.jsSignIn();
  } else {
    googleTokenLogin().then((response) => {
      axios({
        method: "GET",
        url:
          "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
          response.access_token,
      }).then((userInfo) => {
        // console.log(userInfo);
        login(userInfo.data);
      });
    });
  }
};

const login = (userData: any): void => {
  // 로그인시 기존 토큰 데이터 삭제
  store.commit("auth/setInitToken");

  store.state.isBalanceUpdate = true;

  const loginToken = {
    googleId: userData.sub,
    email: userData.email,
    name: userData.name,
    timestamp: Date.now(),
  };

  store.commit("auth/setUserName", { userName: userData.name });
  store.commit("auth/setUserEmail", { userEmail: userData.email });

  const json = JSON.stringify(loginToken);
  const encode = openSSLCrypto.encode(json);

  store.dispatch("auth/googleLogin", {
    token: encode,
  });
};

const logout = () => {
  console.log("logout");
  googleLogout();
};

// /*
// // Telegram
// const shareTelegram = () => {
//   const text = "ZeroQuest - 친구초대 이벤트";
//   const url = "http://localhost:8081";
//   window.open("https://telegram.me/share/url?url=" + url + "&text=" + text);
// };
// //Kakao
// const shareKakao = () => {
//   window.Kakao.Link.sendDefault({
//     objectType: "feed",
//     content: {
//       title: "ZeroQuest - 친구초대 이벤트",
//       description: "100 ESGP",
//       imageUrl: "preview_image.png (1000*1000)",
//       link: {
//         mobileWebUrl: "http://localhost:8081",
//         webUrl: "http://localhost:8081",
//       },
//     },
//   });
// }; */
</script>

<style lang="scss">
.google-btn {
  width: 80%;
  height: 80px;
  border: 2px solid #dadada;
  font-weight: 500;
  font-size: 25px;
  line-height: 1;
  color: #000;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 99px;

  img {
    width: 12px;
  }
}
.google-btn strong {
  padding: 0 8px 0 30px;
  font-weight: 600;
  font-size: 34px;
}
.google-btn img {
  width: 52px;
}
</style>
