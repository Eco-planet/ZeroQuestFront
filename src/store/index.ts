import { createStore } from "vuex";
import { logos } from "@/utils/Logo"
import { dateTableEmits } from "element-plus/es/components/calendar/src/date-table";
import { contentsType } from "@/types/IBattleType";
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
    updateUserVotes:0,
    cardData:[],
<<<<<<< Updated upstream
    popupValue: 0,
=======
    packageName: '',
>>>>>>> Stashed changes
  },
  getters: {
    logos:state => state.logos,
    updateEntryInfo:state => state.updateEntryInfo,
    updateUserVotes:state => state.updateUserVotes,
    cardData:state => state.cardData
  },
  mutations: {
    SET_DATA(state, payload){
      state.updateEntryInfo = payload
    },
    SET_USER_VOTES(state, payload){
      state.updateUserVotes = payload
    },
    SET_CARD_DATA(state, payload){
      state.cardData = payload
    },
    SET_VOTED_NUM(state: Nullable,  votedIdx :Nullable){
      const increVotedContent = state.cardData.find((arr:any)=>
         arr.idx === votedIdx
      )
      if(increVotedContent){
        increVotedContent.vote +=1
      }
    },

  },
  actions: {
    updateEntryInfo({ commit }, data) {
      commit('SET_DATA', data)
    },
    updateUserVotes({ commit }, data){
      commit('SET_USER_VOTES', data)
    },
    cardData({ commit }, data){
      commit('SET_CARD_DATA', data)
    },
    incrementContentsVote(context:Nullable, votedIdx: any){
      context.commit('SET_VOTED_NUM',votedIdx)
    },
  },
  modules,
});
