import { createStore } from "vuex";
const modulesFiles = require.context("./modules", true, /\.(ts|js)$/);

const modules = modulesFiles.keys().reduce((modules: any, modulePath: any) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default createStore({
  state: {
    showMode: 'web',
    isLoading: true,
    isLogin: false,
    isPopup: false,
    popupType: '',
    isBalanceUpdate: true,
    errorCount: 0,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules,
});
