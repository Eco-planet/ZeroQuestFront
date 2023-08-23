import { createStore } from "vuex";
import { logos } from "@/utils/Logo"
import { dateTableEmits } from "element-plus/es/components/calendar/src/date-table";
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
    nftId: 0,
    nftIdx: 0,
    logos: logos,
    updateEntryInfo:null,
    updateUserVotes:0
  },
  getters: {
    logos:state => state.logos,
    updateEntryInfo:state => state.updateEntryInfo,
    updateUserVotes:state => state.updateUserVotes
  },
  mutations: {
    SET_DATA(state, payload){
      state.updateEntryInfo = payload
    },
    SET_USER_VOTES(state, payload){
      state.updateUserVotes = payload
    },
    
  },
  actions: {
    updateEntryInfo({ commit }, data) {
      commit('SET_DATA', data)
    },
    updateUserVotes({ commit }, data){
      commit('SET_USER_VOTES', data)
    }
  },
  modules,
});
