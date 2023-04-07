<template>
  <br/>
  <br/>
  <br/>
  <div class="flex flex-col justify-center items-center text-2xl">MyWallet</div>
  <br />
  <br />
  {{ t("error.useAfterLogin") }}
  <br />
  <div>
    <button class="w-36 h-12 font-semibold text-xl rounded-full nftOn" @click="getUserInfo">USER_INFO</button>
  </div>
  <br />
  <br />
</template>

<script lang="ts" setup>
import store from "@/store";
import http from "@/api/http";
import openSSLCrypto from "@/utils/openSSLCrypto";
import { ethers } from "ethers-ts";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const getUserInfo = () => {
  http.get("/api/user/info")
  .then((response) => {
    const seed = openSSLCrypto.decode(response.data.data.wallet.seed);
    const walletData = ethers.Wallet.fromMnemonic(seed);
    const privateKey = openSSLCrypto.encode(walletData.privateKey);

    store.commit("auth/setPrivateKey", { privateKey });

    console.log(store.getters["auth/getPrivateKey"]);
  });
};
</script>

<style lang="scss">
</style>
