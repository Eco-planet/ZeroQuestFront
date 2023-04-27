import authApi from "@/api/auth";
import router from "@/router";

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
    privateKey: sessionStorage.getItem("privateKey") || "",
    address: sessionStorage.getItem("address") || "",
    balances: sessionStorage.getItem("balances") || "",
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
  },
  mutations: {
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

          console.log(response);

          router.push("/mywallet");
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
