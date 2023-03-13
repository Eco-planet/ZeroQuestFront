import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import locale from "@/locale";
import vue3GoogleLogin from "vue3-google-login";
import "element-plus/dist/index.css";
import "@/styles/global.scss";
import "./index.css";

import globalComponents from "@/components";

createApp(App)
  .use(store)
  .use(router)
  .use(globalComponents)
  .use(ElementPlus)
  .use(locale)
  .use(vue3GoogleLogin, { clientId: process.env.VUE_APP_GOOGLE_API_KEY })
  .mount("#app");
