import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import locale from "@/locale";
import "element-plus/dist/index.css";
import "@/styles/global.scss";

import globalComponents from "@/components";

createApp(App)
  .use(store)
  .use(router)
  .use(globalComponents)
  .use(ElementPlus)
  .use(locale)
  .mount("#app");
