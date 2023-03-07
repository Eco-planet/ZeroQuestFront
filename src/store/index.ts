import { createStore } from "vuex";
const modulesFiles = require.context("./modules", true, /\.ts$/);

const modules = modulesFiles.keys().reduce((modules: any, modulePath: any) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules,
});
