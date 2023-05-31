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
    <div class="flex justify-center items-center wp-80 max-w-4xl border rounded-full py-4" @click="loginSdk">
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
      <div class="font-medium text-xl font-semibold">{{ t("message.googleLoginTitle") }}</div>
      <div class="h-5"></div>
      <div class="break-words text-gray-500 text-lg">{{ t("message.googleLoginComment") }}</div>
    </div>
  </div>
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
  if (store.state.showMode === 'webview' || showMode.value === 'webview') {
    store.state.showMode = 'webview';

    if (isLogin.value == 1) {
      store.state.isLoading = true;
      window.Java.jsLogin();
    }
  }
});

window.webviewLogin = (sub: String, email: String, name: String) => {
  login({sub, email, name});
};

const loginSdk = () => {
  if (showMode.value === 'webview') {
    window.Java.jsSignIn();
  } else {
    googleTokenLogin().then((response) => {
      axios({
        method: "GET",
        url: "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + response.access_token,
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
