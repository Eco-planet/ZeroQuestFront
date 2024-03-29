import authApi from "@/api/auth";
import {
  bannerListApi,
  nftListApi,
  getPointBalanceAll,
  tokenInfos,
} from "@/api/axios";
import router from "@/router";
import { ethers } from "ethers-ts";
import openSSLCrypto from "@/utils/openSSLCrypto";
import { popperContentEmits } from "element-plus";
import { isContext } from "vm";
import axios from "axios";
import store from "..";
//
export default {
  namespaced: true,
  state: {
    accessToken: localStorage.getItem("accessToken") || "",
    expireAccessToken: localStorage.getItem("expireAccessToken") || 0,
    refreshToken: localStorage.getItem("refreshToken") || "",
    expireRefreshToken: localStorage.getItem("expireRefreshToken") || 0,
    tokenInfos: localStorage.getItem("tokenInfos") || "",
    scanners: localStorage.getItem("scanners") || "",
    userId: localStorage.getItem("userId") || "",
    userName: localStorage.getItem("userName") || "",
    userEmail: localStorage.getItem("userEmail") || "",
    privateKey: localStorage.getItem("privateKey") || "",
    address: localStorage.getItem("address") || "",
    balances: localStorage.getItem("balances") || "",
    withdrawPw: localStorage.getItem("withdrawPw") || false,
    //bannerList, nftList - nftTime, bannerTime을 비교하기 위해 사용
    nftList: localStorage.getItem("nftList") || "",
    nftLatestTime: localStorage.getItem("nftLatestTime") || 0,
    bannerList: localStorage.getItem("bannerList") || "",
    nftTime: localStorage.getItem("nftTime") || 0,
    bannersTime: localStorage.getItem("bannersTime") || 0,
    bannerLatestTime: localStorage.getItem("bannerLatestTime") || 0,
    compareNftTime: localStorage.getItem("compareNftTime") || 0,
    terms: localStorage.getItem("terms") || "",
    vote: localStorage.getItem("vote") || 0,
    pwHash: localStorage.getItem("pwHash") || "",
    pwNumber: localStorage.getItem("pwNumber") || "",
    referral: localStorage.getItem("referral") || "",
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
    getReferral: (state: Nullable) => {
      return state.referral;
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
      if (state.withdrawPw === true || state.withdrawPw === "true") {
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
    getUserVote: (state: Nullable) => {
      return state.vote;
    },
    getPwHash: (state: Nullable) => {
      return state.pwHash;
    },
    getPwNumber: (state: Nullable) => {
      return state.pwNumber;
    },
  },
  mutations: {
    setClearToken(state: Nullable) {
      state.expireAccessToken = 0;
      state.expireRefreshToken = 0;
      state.accessToken = "";
      state.refreshToken = "";

      let orgTokenInfos = state.tokenInfos;
      let orgNftList = state.nftList;
      let orgBannerList = state.bannerList;

      localStorage.clear();

      localStorage.setItem("tokenInfos", orgTokenInfos);
      localStorage.setItem("nftList", orgNftList);
      localStorage.setItem("bannerList", orgBannerList);
    },
    setInitToken(state: Nullable) {
      state.expireAccessToken = 0;
      state.expireRefreshToken = 0;

      localStorage.setItem("expireAccessToken", "0");
      localStorage.setItem("expireRefreshToken", "0");
    },
    setAccessToken(state: Nullable, { token, expireAt }: Nullable) {
      const currentDate = new Date().getTime() / 1000;

      state.accessToken = token;
      state.expireAccessToken = currentDate + expireAt;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("expireAccessToken", currentDate + expireAt);
    },
    setRefreshToken(state: Nullable, { token, expireAt }: Nullable) {
      const currentDate = new Date().getTime() / 1000;

      state.refreshToken = token;
      state.expireRefreshToken = currentDate + expireAt;

      localStorage.setItem("refreshToken", token);
      localStorage.setItem("expireRefreshToken", currentDate + expireAt);
    },
    setTokenInfos(state: Nullable, { info }: Nullable) {
      state.tokenInfos = JSON.stringify(info);

      localStorage.setItem("tokenInfos", JSON.stringify(info));
    },
    setScanners(state: Nullable, { info }: Nullable) {
      state.scanners = JSON.stringify(info);

      localStorage.setItem("scanners", JSON.stringify(info));
    },
    setUserId(state: Nullable, { userId }: Nullable) {
      state.userId = userId;

      localStorage.setItem("userId", userId);
    },
    setUserName(state: Nullable, { userName }: Nullable) {
      state.userName = userName;

      localStorage.setItem("userName", userName);
    },
    setReferral(state: Nullable, { referral }: Nullable) {
      state.referral = referral;
      localStorage.setItem("referral", referral);
    },
    setUserEmail(state: Nullable, { userEmail }: Nullable) {
      state.userEmail = userEmail;

      localStorage.setItem("userEmail", userEmail);
    },
    setPrivateKey(state: Nullable, { privateKey }: Nullable) {
      state.privateKey = privateKey;

      localStorage.setItem("privateKey", privateKey);
    },
    setAddress(state: Nullable, { address }: Nullable) {
      state.address = address;

      localStorage.setItem("address", address);
    },
    setBalances(state: Nullable, { balance }: Nullable) {
      state.balances = JSON.stringify(balance); // 상태 업데이트
      localStorage.setItem("balances", JSON.stringify(balance));
    },

    setWithdrawPw(state: Nullable, { pw }: Nullable) {
      state.withdrawPw = pw;

      localStorage.setItem("withdrawPw", pw);
    },
    setNftList(state: Nullable, { info }: Nullable) {
      state.nftList = JSON.stringify(info);
      localStorage.setItem("nftList", JSON.stringify(info));
    },

    setNftLatestTime(state: Nullable, nftLatestTime: Nullable) {
      state.nftLatestTime = nftLatestTime;
      localStorage.setItem("nftLatestTime", nftLatestTime);
      console.log("nftLatestTime", nftLatestTime);
    },

    setBannerLatestTime(state: Nullable, bannerLatestTime: Nullable) {
      state.bannerLatestTime = bannerLatestTime;
      localStorage.setItem("bannerLatestTime", bannerLatestTime);
      console.log("bannerLatestTime", bannerLatestTime);
    },

    setBannerList(state: Nullable, { info }: Nullable) {
      state.bannerList = JSON.stringify(info);
      localStorage.setItem("bannerList", JSON.stringify(info));
    },

    setBannerTime(state: Nullable, payload: Nullable) {
      state.bannerTimes = payload; //payload를 변경
      localStorage.setItem("bannersTime", payload);
    },

    setTerms(state: Nullable, { terms }: Nullable) {
      state.terms = terms;

      localStorage.setItem("terms", terms);
    },
    setUserVote(state: Nullable, { vote }: Nullable) {
      state.vote = vote;
      localStorage.setItem("vote", vote.toString());
    },
    setPwHash(state: Nullable, { pwHash }: Nullable) {
      state.pwHash = pwHash;
      localStorage.setItem("pwHash", pwHash);
    },

    setPwNumber(state: Nullable, { pwNumber }: Nullable) {
      state.pwNumber = pwNumber;
      localStorage.setItem("pwNumber", pwNumber);
    },
  },
  actions: {
    async googleLogin(context: Nullable, { token }: Nullable) {
      try {
        const response = await authApi.googleLogin(token);
        console.log("res", response);

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
          /* 레퍼럴 Application, storage */
          context.commit("setReferral", {
            referral: response.data.data.referral,
          });
          context.commit("setBalances", {
            balance: response.data.data.userTokenInfo,
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

          context.commit("setUserVote", {
            vote: response.data.data.vote,
          });

          if (response.data.data.terms == 0) {
            router.push("/terms");
          } else {
            router.push("/" + process.env.VUE_APP_FIRST_URL);
          }
        }
      } catch (e) {
        console.log("TOKEN ERROR");
        router.push("/");
      }
    },
    updateUserVotes(context: Nullable, vote: any) {
      context.commit("setUserVote", {
        vote,
      });
    },
    pwHash(context: Nullable, pwHash: any) {
      context.commit("setPwHash", {
        pwHash,
      });
    },
    pwNumber(context: Nullable, pwNumber: any) {
      context.commit("setPwNumber", {
        pwNumber,
      });
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

    async getPointBalanceAll(context: any) {
      try {
        const response = await getPointBalanceAll();
        if (response.status === 200) {
          const balance = response.data.data.userTokenInfo;
          if (balance) {
            context.commit("setBalances", { balance });
          }
        }
      } catch (error) {
        console.error("Error fetching ESGP balance:", error);
      }
    },

    async getBannerList(context: Nullable) {
      const response = await bannerListApi();
      console.log("getBannerList Response", response);

      if (response.status === 200) {
        const bannerListData = response.data.data;

        let bannerList: any = {};
        let updatedAt: any = [];
        let latestUpdatedAt = 0;

        bannerListData.forEach((res: any) => {
          bannerList[res.idx] = res;

          updatedAt.push(Date.parse(res.updatedAt));

          if (updatedAt) {
            latestUpdatedAt = Math.max(...updatedAt);
          }
        });

        context.commit("setBannerLatestTime", latestUpdatedAt);
        context.commit("setBannerList", { info: bannerList });
      }
    },

    async getNftList(context: Nullable) {
      const response = await nftListApi();
      console.log("getNftLIst는", response);

      if (response.status === 200) {
        const nftListData = response.data.data;

        let nftList: any = {};
        let updatedAt: any = [];
        let latestUpdatedAt: any = 0;

        nftListData.forEach((res: any) => {
          nftList[res.idx] = res;
          updatedAt.push(Date.parse(res.nftUpdatedTime));

          if (updatedAt) {
            latestUpdatedAt = Math.max(...updatedAt);
          }

          if (res.metaData !== "" && res.metaData !== undefined) {
            nftList[res.idx]["metaData"] = JSON.parse(res.metaData);
          } else {
            nftList[res.idx]["metaData"] = "";
          }
        });

        context.commit("setNftLatestTime", latestUpdatedAt);
        context.commit("setNftList", { info: nftList });
      }
    },

    // async getNftList(context: Nullable) {
    //   try {
    //     console.log("호출1");
    //     const response = await compareNftTime();
    //     console.log('getNftlist에 response는',response)
    //     // context.commit("setNftList", { info: nftList });

    //   } catch (error) {
    //     console.error("error");
    //   }
    // },

    // async getBannerList(context: Nullable) {
    //   try {
    //     const response = await compareBannersTime();
    //     console.log('getBannerList actions실행시',response)
    //     context.commit("setBannerList", {info:bannerList});
    //     context.commit('setBannerLatestTime',response);
    //   } catch (error) {
    //     console.error("error");
    //   }
    // },

    async getTokenInfos(context: Nullable) {
      const response = await tokenInfos();
      if (response.status === 200) {
        const resTokenData = response.data.data.tokenInfos;
        const resScannerData = response.data.data.scanner;

        let tokenInfos: any = {};
        let scanners: any = {};

        resTokenData.forEach((res: any) => {
          tokenInfos[res.symbol] = res;
        });

        resScannerData.forEach((res: any) => {
          scanners[res.chainId] = res;
        });

        store.commit("auth/setTokenInfos", { info: tokenInfos });
        store.commit("auth/setScanners", { info: scanners });
      }
    },
  },
};
