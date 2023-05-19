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
    <div class="h-20"></div>
    <template v-if="loginData === undefined">
      <div class="flex justify-center items-center wp-80 max-w-4xl border rounded-full py-4" @click="loginSdk">
        <div class="wp-10">
          <img src="@/assets/images/icon_google.png" alt="Google" />
        </div>
        <div class="w-5"></div>
        <div class="text-3xl font-semibold">Google</div>
        <div class="w-1"></div>
        <div class="text-2xl">{{ t("message.googleLoginButton") }}</div>
      </div>
    </template>
    <template v-if="loginData !== undefined">
      <div class="font-semibold text-2xl">{{ t("message.gameLoginInfo", { name: loginData.username }) }}</div>
      <div class="h-20"></div>
      <div class="w-full flex justify-center items-center">
        <button class="wp-40 p-5 font-semibold text-2xl text-white link-btn" @click="sendClose">연동하기</button>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import http from "@/api/http";
import store from "@/store";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import openSSLCrypto from "@/utils/openSSLCrypto";
import { googleTokenLogin, googleLogout } from "vue3-google-login";

const { t } = useI18n();

const loginData = ref();

const loginSdk = () => {
  googleTokenLogin().then((response) => {
    // console.log("Handle the response", response);

    axios({
      method: "GET",
      url: "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + response.access_token,
    }).then((userInfo) => {
      console.log(userInfo);
      login(userInfo.data);
    });
  });
};

const login = (userData: any): void => {
  store.state.isBalanceUpdate = true;

  const loginToken = {
    googleId: userData.sub,
    email: userData.email,
    name: userData.name,
    timestamp: Date.now(),
  };

  const json = JSON.stringify(loginToken);
  const encode = openSSLCrypto.encode(json);

  gameLogin(encode);
};

const gameLogin = (token: string) => {
  http.post("/auth/google", {
    token,
  })
  .then((response) => {
    console.log(response);
    loginData.value = response.data.data;
  })
  .catch((error) => {
  });
};

const sendClose = () => {
  window.location.href = "https://close?accessToken=" + loginData.value.accessToken + "&uid=" + loginData.value.uid + "&name=" + loginData.value.username;
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

.link-btn {
  background-color: #0c5c26;
  border-radius: 5px;
}
</style>
