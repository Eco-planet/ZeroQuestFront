import axios from "axios";
import store from "@/store";
import router from "@/router";

const TIMEOUT = 1000 * 60;

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-type": "application/json",
    "Cache-Control": "no-cache",
  },
});

instance.interceptors.request.use(function (config: Nullable) {
  store.state.isLoading = true;

  if (
    store.getters["auth/getAccessToken"] !== null &&
    store.getters["auth/getAccessToken"] !== ""
  ) {
    config["headers"] = {
      authorization: `Bearer ${store.getters["auth/getAccessToken"]}`,
      refresh: store.getters["auth/getRefreshToken"],
    };
  }

  return config;
});

instance.interceptors.response.use(
  async (response: any) => {
    store.state.isLoading = false;

    return response;
  },
  async (error) => {
    const errorRes = error.response;
    const originalRequest = error.config;

    if (errorRes.status === 401 && store.getters["auth/getRefreshToken"] !== '') {
      return await instance.post("/auth/refresh")
      .then(async (res) => {
        if (res.status === 200) {
          store.commit("auth/setAccessToken", { token: res.data.data.accessToken, expireAt: res.data.data.accessExpiresIn });

          originalRequest.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
          return axios(originalRequest);
        } 
      }).catch((err) => {
        //console.log(err)
        router.push("/");
      })
    }
    
    setTimeout(() => {
      store.state.isLoading = false;
    }, 1000);

    if (errorRes.status === 401) {
      router.push("/");
    }
    //throw error

    return Promise.reject(error);
  }
)

export default instance;
