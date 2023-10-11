<template>
  <div class="flex flex-col">
    <div class="flex flex-col">
      <div><img class="nftImg" :src="nftInfo.image" alt="" @click="goNftDetail(nftCard.nftId, nftCard.tokenId)"></div>
      <div v-if="nftCard.enable === 0" class="nftDisable" @click="goNftDetail(nftCard.nftId, nftCard.tokenId)"></div>
    </div>
    <!-- <div v-if="nftCard.enable === 1" class="flex justify-center items-center" @click="goNftDetail(nftCard.nftId, nftCard.tokenId)">
      <div class="pt-2 w-full text-center text-xl nftCardLife">
        {{ nftCard.balance }} / {{ nftInfo.metaData.maxLife }}
      </div>
    </div> -->
    <div class="h-3"></div>
    <div class="text-lg text-center" v-if="locale === 'kr'">{{ nftInfo.name.kor }}</div>
    <div class="text-lg text-center" v-else>{{ nftInfo.name.eng }}</div>
    <div class="h-1"></div>
    <div class="flex justify-center items-center">
      <template v-if="nftCard.enable === 0 && nftInfo.type === 2">
        <div class="wp-40 p-1 font-semibold text-center text-white nftOff" @click="showModal">Play</div>
      </template>
      <template v-else-if="nftCard.enable === 0">
        <div class="wp-40 p-1 font-semibold text-center text-white nftOff" @click="updateNftEnable('INSTALL')">Play</div>
      </template>
      <template v-else>
        <div class="wp-40 p-1 font-semibold text-center text-white nftOn" @click="updateNftEnable('RUN')">Play</div>
      </template>
    </div>
  </div>
  <Modal :visible="store.state.isPopup" @hide="closeModal" :title="popupTitle" />
</template>

<script lang="ts" setup>
import store from "@/store";
import router from "@/router";
import http from "@/api/http";
import { ref, toRefs, watch, computed } from "vue";
import { useStore } from "vuex";

const vuexStore = useStore();
const locale = computed(() => vuexStore.state.system.locale)

const props = defineProps({
  nftCard: {
    type: Object,
    default: () => ({}),
  },
  nftInfo: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits([
  "updateRun",
  "updateReward",
  "updateEnable",
]);

const { nftCard, nftInfo } = toRefs(props);

watch(nftCard, (val) => {
  //console.log("enable nftCard");
}, { immediate: false, deep: true });

const updateNftEnable = (type: String) => {
  store.state.nftId = nftCard.value.nftId;
  store.state.nftIdx = nftCard.value.idx;

  if (type == 'INSTALL') {
    let packageName = '';

    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      packageName = nftInfo.value.and_packagename;
    } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
      packageName = nftInfo.value.ios_packagename;
    }
    store.state.packageName = packageName

    window.flutter_inappwebview.callHandler('checkAppInstalled', {packageName:packageName}).then((res:any) => {
      //console.log(JSON.stringify(res));

      if (res.result == true) {
        emit("updateEnable");
      } else {
        store.state.popupType = 'game_install';
        store.state.isPopup = true; 
      }
    }).catch(() => {
      store.state.popupType = 'game_install';
      store.state.isPopup = true;  
    });
  } else if (type === 'RUN') {
    emit("updateRun");
  } else if (type == 'REWARD') {
    emit("updateReward");
  }
};

const popupTitle = ref("");

const showModal = () => {
  store.state.popupType = "message";
  store.state.isPopup = true;
  popupTitle.value = "error.commingSoon";
}

const closeModal = () => {
  store.state.isPopup = false;
};

const goNftDetail = (nftId: number, tokenId: number) => {
  router.push({ name: 'onft-detail', params: { nftId, tokenId } });
};
</script>

<style scoped lang="scss">
.nftCardLife {
  margin-top: -25px;
  height: 25px;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
}
</style>