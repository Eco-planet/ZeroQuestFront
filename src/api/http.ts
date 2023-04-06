import axios from "axios";
import store from "@/store";

const TIMEOUT = 1000 * 60;

// interface IHttpRequest {
//   url: string;
//   data?: object;
//   params?: object;
//   headers?: object;
//   method?: "POST" | "GET";

//   onUploadProgress?: (progressEvent: ProgressEvent) => void;

//   loadingSelector?: string;
//   hiddenMessage?: boolean;
//   withCredentials?: boolean;
// }

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
  function (response) {
    store.state.isLoading = false;

    store.commit("error/setValidationError", {});

    return response;
  },
  function (error) {
    store.state.isLoading = false;

    if (error.response.status === 422) {
      store.commit("error/setValidationError", error.response.data.data);
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
