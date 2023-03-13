import authApi from "@/api/auth";

export default {
  namespaced: true,
  state: {
    accessToken: sessionStorage.getItem("accessToken") || "",
    expireAccessToken: sessionStorage.getItem("expireAccessToken") || 0,
    refreshToken: sessionStorage.getItem("refreshToken") || "",
    expireRefreshToken: sessionStorage.getItem("expireRefreshToken") || 0,
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
  },
  actions: {
    async googleLogin(context: Nullable, { token }: Nullable) {
      try {
        const response = await authApi.googleLogin(token);

        console.log("expire =" + response.data.data.accessExpiresIn);
        if (response.status === 200) {
          context.commit("setAccessToken", {
            token: response.data.data.accessToken,
            expireAt: response.data.data.accessExpiresIn,
          });
          context.commit("setRefreshToken", {
            token: response.data.data.refreshToken,
            expireAt: response.data.data.refreshExpiresIn,
          });

          console.log(response);
        }
      } catch (e) {
        alert("TOKEN ERROR");
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
          alert("아이디 혹은 비밀번호를 확인해주세요.");
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
        alert("아이디 혹은 비밀번호를 확인해주세요.");
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
          alert("아이디 혹은 비밀번호를 확인해주세요.");
        });
    },
    updateExpire(context: Nullable) {
      context.commit("setAccessToken", "");
    },
  },
};
