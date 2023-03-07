/* eslint-disable */
import axios from "./httpBase";

interface IHttpRequest {
  url: string;
  data?: object;
  params?: object;
  headers?: object;
  method?: "POST" | "GET";
  
  onUploadProgress?: (progressEvent: ProgressEvent) => void;
  
  loadingSelector?: string;
  hiddenMessage?: boolean 
  withCredentials?: boolean
}


const request = (config: IHttpRequest) => {
  if (!config) {
    return;
  }
  axios.defaults.withCredentials = true
  const configHeaders = config.headers || {};
  const defaultHeaders = axios.defaults.headers;
  config.headers = Object.assign(
    defaultHeaders,
    configHeaders
  );
  config.withCredentials = true
  // @ts-ignore
  return axios(config);
}

const post = (config: IHttpRequest) => {
  return new Promise<any>((resolve, reject) => {
    request({
      ...config,
      method: "POST"
    })?.then((res: any) => {
      if (res) {
        resolve(res);
      } else {
        reject(res?.message || "")
      }
    }).catch((err) => {
      reject(err || "ERROR");
    });
  });
}

const get = (config: IHttpRequest) => {
  return new Promise<any>((resolve, reject) => {
    request({
      ...config,
      method: "GET"
    })?.then((res: any) => {
      if (res) {
        resolve(res);
      } else {
        reject(res?.message || "")
      }
    }).catch((err) => {
      reject(err || "ERROR");
    });
  });
}


export {
  post,
  get
};
