import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import locale from "@/locale";
import vue3GoogleLogin from "vue3-google-login";
import "@/output.css";
import "element-plus/dist/index.css";
import "@/styles/layout.css";

import globalComponents from "@/components";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(globalComponents)
  .use(ElementPlus)
  .use(locale)
  .use(vue3GoogleLogin, { clientId: process.env.VUE_APP_GOOGLE_API_KEY });

// app.config.globalProperties.isLoading = false;

router.isReady().then(() => {
  app.mount("#app");
});
