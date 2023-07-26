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
    <div class="text-lg text-center">{{ nftInfo.name }}</div>
    <div class="h-1"></div>
    <div class="flex justify-center items-center">
      <template v-if="nftCard.enable === 0">
        <div class="wp-40 p-1 font-semibold text-center text-white nftOff" @click="updateNftEnable('INSTALL')">Play</div>
      </template>
      <template v-else>
        <div class="wp-40 p-1 font-semibold text-center text-white nftOn" @click="updateNftEnable('RUN')">Play</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import store from "@/store";
import router from "@/router";
import http from "@/api/http";
import { toRefs, watch } from "vue";

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

  // INSTALL 인 경우 이미 설치되어 있는지 체크
  if (type == 'INSTALL') {
    let packageName = '';

    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      packageName = nftCard.value.and_deeplink;
    } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
      packageName = nftCard.value.ios_deeplink;
    }

    window.flutter_inappwebview.callHandler('checkAppInstalled', {packageName:packageName})
    .then((res:any) => {
      console.log(JSON.stringify(result));
      alert(JSON.stringify(result));

      if (res.result == true) {
        type = 'ENABLE';
      }
    });
  }

  if (type == 'INSTALL') {
    store.state.popupType = 'game_install';
    store.state.isPopup = true;  
  } else if (type === 'RUN') {
    emit("updateRun");
  } else if (type == 'REWARD') {
    emit("updateReward");
  } else if (type == 'ENABLE') {
    emit("updateEnable");
  }
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