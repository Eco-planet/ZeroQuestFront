import authApi from "@/api/auth";
import router from "@/router";
import { ethers } from "ethers-ts";
import openSSLCrypto from "@/utils/openSSLCrypto";

export default {
  namespaced: true,
  state: {
    accessToken: sessionStorage.getItem("accessToken") || "",
    expireAccessToken: sessionStorage.getItem("expireAccessToken") || 0,
    refreshToken: sessionStorage.getItem("refreshToken") || "",
    expireRefreshToken: sessionStorage.getItem("expireRefreshToken") || 0,
    tokenInfos: sessionStorage.getItem("tokenInfos") || "",
    scanners: sessionStorage.getItem("scanners") || "",
    userId: sessionStorage.getItem("userId") || "",
    userName: sessionStorage.getItem("userName") || "",
    userEmail: sessionStorage.getItem("userEmail") || "",
    privateKey: sessionStorage.getItem("privateKey") || "",
    address: sessionStorage.getItem("address") || "",
    balances: sessionStorage.getItem("balances") || "",
    withdrawPw: sessionStorage.getItem("withdrawPw") || false,
    nftList: sessionStorage.getItem("nftList") || "",
    bannerList: sessionStorage.getItem("bannerList") || "",
    terms: sessionStorage.getItem("terms") || "",
  },
  getters: {
    getAccessToken: (state: Nullable) => {
      return state.accessToken;
    },
    getRefreshToken: (state: Nullable) => {
      return state.refreshToken;
    },
    getExpireAccessToken: (state: Nullable) => {
      return state.expireAccessToken;
    },
    getExpireRefreshToken: (state: Nullable) => {
      return state.expireRefreshToken;
    },
    getTokenInfos: (state: Nullable) => {
      if (state.tokenInfos !== "") {
        return JSON.parse(state.tokenInfos);
      } else {
        return "";
      }
    },
    getScanners: (state: Nullable) => {
      if (state.scanners !== "") {
        return JSON.parse(state.scanners);
      } else {
        return "";
      }
    },
    getUserId: (state: Nullable) => {
      return state.userId;
    },
    getUserName: (state: Nullable) => {
      return state.userName;
    },
    getUserEmail: (state: Nullable) => {
      return state.userEmail;
    },
    getPrivateKey: (state: Nullable) => {
      return state.privateKey;
    },
    getAddress: (state: Nullable) => {
      return state.address;
    },
    getBalances: (state: Nullable) => {
      if (state.balances !== "") {
        return JSON.parse(state.balances);
      } else {
        return "";
      }
    },
    getWithdrawPw: (state: Nullable) => {
      if (state.withdrawPw === true || state.withdrawPw === 'true') {
        return true;
      } else {
        return false;
      }
    },
    getNftList: (state: Nullable) => {
      if (state.nftList !== "") {
        return JSON.parse(state.nftList);
      } else {
        return "";
      }
    },
    getBannerList: (state: Nullable) => {
      if (state.bannerList !== "") {
        return JSON.parse(state.bannerList);
      } else {
        return "";
      }
    },
    getTerms: (state: Nullable) => {
      return state.terms;
    },
  },
  mutations: {
    setClearToken(state: Nullable) {
      state.expireAccessToken = 0;
      state.expireRefreshToken = 0;

      let orgTokenInfos = state.tokenInfos;
      let orgNftList = state.nftList;
      let orgBannerList = state.bannerList;

      sessionStorage.clear();

      sessionStorage.setItem("tokenInfos", orgTokenInfos);
      sessionStorage.setItem("nftList", orgNftList);
      sessionStorage.setItem("bannerList", orgBannerList);
    },
    setInitToken(state: Nullable) {
      state.expireAccessToken = 0;
      state.expireRefreshToken = 0;

      sessionStorage.setItem("expireAccessToken", '0');
      sessionStorage.setItem("expireRefreshToken", '0');
    },
    setAccessToken(state: Nullable, { token, expireAt }: Nullable) {
      const currentDate = new Date().getTime() / 1000;

      state.accessToken = token;
      state.expireAccessToken = currentDate + expireAt;

      sessionStorage.setItem("accessToken", token);
      sessionStorage.setItem("expireAccessToken", currentDate + expireAt);
    },
    setRefreshToken(state: Nullable, { token, expireAt }: Nullable) {
      const currentDate = new Date().getTime() / 1000;

      state.refreshToken = token;
      state.expireRefreshToken = currentDate + expireAt;

      sessionStorage.setItem("refreshToken", token);
      sessionStorage.setItem("expireRefreshToken", currentDate + expireAt);
    },
    setTokenInfos(state: Nullable, { info }: Nullable) {
      state.tokenInfos = JSON.stringify(info);

      sessionStorage.setItem("tokenInfos", JSON.stringify(info));
    },
    setScanners(state: Nullable, { info }: Nullable) {
      state.scanners = JSON.stringify(info);

      sessionStorage.setItem("scanners", JSON.stringify(info));
    },
    setUserId(state: Nullable, { userId }: Nullable) {
      state.userId = userId;

      sessionStorage.setItem("userId", userId);
    },
    setUserName(state: Nullable, { userName }: Nullable) {
      state.userName = userName;

      sessionStorage.setItem("userName", userName);
    },
    setUserEmail(state: Nullable, { userEmail }: Nullable) {
      state.userEmail = userEmail;

      sessionStorage.setItem("userEmail", userEmail);
    },
    setPrivateKey(state: Nullable, { privateKey }: Nullable) {
      state.privateKey = privateKey;

      sessionStorage.setItem("privateKey", privateKey);
    },
    setAddress(state: Nullable, { address }: Nullable) {
      state.address = address;

      sessionStorage.setItem("address", address);
    },
    setBalances(state: Nullable, { info }: Nullable) {
      state.balances = JSON.stringify(info);

      sessionStorage.setItem("balances", JSON.stringify(info));
    },
    setWithdrawPw(state: Nullable, { pw }: Nullable) {
      state.withdrawPw = pw;

      sessionStorage.setItem("withdrawPw", pw);
    },
    setNftList(state: Nullable, { info }: Nullable) {
      state.nftList = JSON.stringify(info);

      sessionStorage.setItem("nftList", JSON.stringify(info));
    },
    setBannerList(state: Nullable, { info }: Nullable) {
      state.bannerList = JSON.stringify(info);

      sessionStorage.setItem("bannerList", JSON.stringify(info));
    },
    setTerms(state: Nullable, { terms }: Nullable) {
      state.terms = terms;

      sessionStorage.setItem("terms", terms);
    },
  },
  actions: {
    async googleLogin(context: Nullable, { token }: Nullable) {
      try {
        const response = await authApi.googleLogin(token);

        if (response.status === 200) {
          context.commit("setAccessToken", {
            token: response.data.data.accessToken,
            expireAt: response.data.data.accessExpiresIn,
          });
          context.commit("setRefreshToken", {
            token: response.data.data.refreshToken,
            expireAt: response.data.data.refreshExpiresIn,
          });
          context.commit("setUserId", {
            userId: response.data.data.uid,
          });
          context.commit("setAddress", {
            address: response.data.data.wallet.address,
          });

          const seed = openSSLCrypto.decode(response.data.data.wallet.seed);
          const walletData = ethers.Wallet.fromMnemonic(seed);
          const privateKey = openSSLCrypto.encode(walletData.privateKey);
          context.commit("setPrivateKey", {
            privateKey,
          });

          context.commit("setWithdrawPw", {
            pw: Boolean(response.data.data.withdrawPw),
          });

          context.commit("setTerms", {
            terms: response.data.data.terms,
          });
 
          if (response.data.data.terms === 1) {
            router.push("/" + process.env.VUE_APP_FIRST_URL);
          } else {
            router.push("/terms");
          }
        }
      } catch (e) {
        console.log("TOKEN ERROR");

        router.push("/");
      }
    },
    updateRefreshToken(context: Nullable) {
      authApi
        .updateRefreshToken()
        .then((response) => {
          if (response.status === 200) {
            context.commit("setAccessToken", {
              token: response.data.data.accessToken,
              expireAt: response.data.data.accessExpiresIn,
            });
          }
        })
        .catch((e) => {
          router.push("/");
        });
    },
    async login(context: Nullable, { userId, password }: Nullable) {
      try {
        const response = await authApi.login(userId, password);

        if (response.status === 200) {
          context.commit("setAccessToken", response.data.token);
          console.log(response);
        }
      } catch (e) {
        router.push("/");
      }
    },
    loginWithoutAsync(context: Nullable, { userId, password }: Nullable) {
      authApi
        .login(userId, password)
        .then((response) => {
          if (response.status === 200) {
            context.commit("setAccessToken", response.data.token);
          }
        })
        .catch((e) => {
          router.push("/");
        });
    },
    updateExpire(context: Nullable) {
      context.commit("setAccessToken", "");

      router.push("/");
    },
  },
};
