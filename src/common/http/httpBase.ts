import axios from "axios";

const TIMEOUT = 1000 * 60;

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const instance = axios.create({
  // 默认开启凭证，带cookie到请求中
  withCredentials: true,
  // 默认10秒超时
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

instance.interceptors.response.use(
  (resp) => {
    const data = resp.data;
    return data;
  },
  (err) => {
    console.log("err", err);
  }
);

export default instance;
