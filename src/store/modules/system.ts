import locale from "@/locale";
import LS from "@/utils/localStorage";

export default {
  namespaced: true,
  state: {
    locale: LS.getItem("locale") || "en",
    globalLoadNum: 0,
  },
  getters: {
    globalLoadingAble: (state: Nullable): boolean => state.globalLoadNum > 0,
  },
  mutations: {
    SET_LOCALE(state: Nullable, { lang }: Nullable): void {
      console.log(locale, lang);

      state.locale = lang;
      LS.setItem("locale", lang);
      locale.global.locale = lang;
    },
    SET_GLOBAL_LOADING(state: Nullable, type = "start"): void {
      switch (type) {
        case "start":
          state.globalLoadNum++;
          break;
        case "end":
          if (state.globalLoadNum > 0) state.globalLoadNum--;
          break;
      }
    },
    CLEAR_GLOBAL_LOADING(state: Nullable): void {
      state.globalLoadNum = 0;
    },
  },
  actions: {},
};
