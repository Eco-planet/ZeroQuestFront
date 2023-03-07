import Modal from "./Modal/index.vue";
import Locale from "./Locale/index.vue";

const globalComponents = {
  Modal,
  Locale,
};

const extendComponents = {
  // Notification
};

export default {
  install(app: any): void {
    Object.entries(globalComponents).forEach(([key, comp]) => {
      app.component(key, comp);
    });

    Object.entries(extendComponents).forEach(([key, comp]) => {
      app.use(comp);
    });
  },
};
