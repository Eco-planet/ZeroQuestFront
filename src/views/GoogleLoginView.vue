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
      @click="login"
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

    <div class="break-words text-black">
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
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import router from "@/router";
import axios from "axios";
import store from "@/store";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import openSSLCrypto from "@/utils/openSSLCrypto";
import { googleTokenLogin, googleLogout } from "vue3-google-login";
import { onMounted, ref } from "vue";

const vuexStore = useStore();

const { t } = useI18n();

const showMode = ref(router.currentRoute.value.query.showMode);

const isLogin = ref(router.currentRoute.value.query.isLogin);
const locale = computed(() => vuexStore.state.system.locale);
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

// const loginSdk = () => {
//   if (showMode.value === "webview") {
//     window.Java.jsSignIn();
//   } else {
//     googleTokenLogin().then((response) => {
//       axios({
//         method: "GET",
//         url:
//           "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
//           response.access_token,
//       }).then((userInfo) => {
//         login(userInfo.data);
//       });
//     });
//   }
// };

const login = (userData: any): void => {
  // 로그인시 기존 토큰 데이터 삭제
  store.commit("auth/setInitToken");

  store.state.isBalanceUpdate = true;

  const loginToken = {
    // googleId: userData.sub,
    // email: userData.email,
    // name: userData.name,
    googleId: '117460334549764779336',
    email: 'adstarcore@gmail.com',
    name: '한해수',
    timestamp: Date.now(),
  };

  // store.commit("auth/setUserName", { userName: userData.name });
  // store.commit("auth/setUserEmail", { userEmail: userData.email });
  store.commit("auth/setUserName", { userName: '한해수' });
  store.commit("auth/setUserEmail", { userEmail: 'adstarcore@gmail.com' });

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
