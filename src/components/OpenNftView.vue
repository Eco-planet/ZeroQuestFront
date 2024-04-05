<template>
  <div class="flex flex-col h-full justify-between">
    <div>
      <div class="flex flex-col">
        <div>
          <img
            class="nftImg max-w-full h-auto fold:h-64"
            :src="nftInfo.image"
            alt=""
            @click="goNftDetail(nftCard.nftId, nftCard.tokenId)"
          />
        </div>
        <div
          v-if="nftCard.enable === 0"
          class="nftDisable"
          @click="goNftDetail(nftCard.nftId, nftCard.tokenId)"
        ></div>
      </div>
      <div class="h-3"></div>
      <div class="flex flex-col items-center">
      <div class="font-semibold text-center">{{ nftInfo.name }}</div>
    </div>
    </div>
    
    <div class="flex justify-center items-center">
      <template v-if="nftCard.enable === 0 && nftInfo.type === 2">
        <div
          class="wp-40 p-1 font-semibold text-center text-white nftOff"
          @click="updateNftEnable('TREE')"
        >
          Play
        </div>
      </template>
      <template v-else-if="nftCard.enable === 0">
        <div
          class="wp-40 p-1 font-semibold text-center text-white nftOff"
          @click="updateNftEnable('INSTALL')"
        >
          Play
        </div>
      </template>
      <template v-else>
        <div
          class="wp-40 p-1 font-semibold text-center text-white nftOn"
          @click="updateNftEnable('RUN')"
        >
          Play
        </div>
      </template>
    </div>
  </div>
  <Modal :visible="store.state.isPopup" @hide="closeModal" />
</template>

<script lang="ts" setup>
import store from "@/store";
import router from "@/router";
import http from "@/api/http";
import { ref, toRefs, watch, computed } from "vue";
import { useStore } from "vuex";

const vuexStore = useStore();
const locale = computed(() => vuexStore.state.system.locale);

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

const emit = defineEmits(["updateRun", "updateReward", "updateEnable"]);

const { nftCard, nftInfo } = toRefs(props);

watch(
  nftCard,
  (val) => {
    //console.log("enable nftCard");
  },
  { immediate: false, deep: true }
);

const updateNftEnable = (type: String) => {
  store.state.nftId = nftCard.value.nftId;
  store.state.nftIdx = nftCard.value.idx;
  console.log(nftCard.value.nftId)
  if (type == "INSTALL") {
    let packageName = "";

    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      packageName = nftInfo.value.and_packagename;
    } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
      packageName = nftInfo.value.ios_packagename;
    }
    store.state.packageName = packageName;

    store.state.popupType = "game_install";
    store.state.isPopup = true;

    window.flutter_inappwebview
      .callHandler("checkAppInstalled", { packageName: packageName })
      .then((res: any) => {

        if (res.result == true) {
          emit("updateEnable");
        } else {
          store.state.popupType = "game_install";
          store.state.isPopup = true;
        }
      })
      .catch(() => {
        store.state.popupType = "game_install";
        store.state.isPopup = true;
      });
  } else if (type === "RUN") {
    emit("updateRun");
  } else if (type == "REWARD") {
    emit("updateReward");
  } else if (type == "TREE") {
    console.log("debug1");
    store.state.popupType = "tree_nft";
    store.state.isPopup = true;
  } 
  if( [4,5,6].includes(nftInfo.value.idx)) {
    // console.log('nftInfo.value.idx',`/onft-detail/${nftInfo.value.idx}`)
    router.push(`/onft-detail/${nftInfo.value.idx}`);
  }
};

const closeModal = () => {
  store.state.isPopup = false;
};

const goNftDetail = (idx: number, tokenId: number) => {
  router.push({ name: "onft-detail", params: { idx, tokenId } });
};

// console.log('nftInfo',nftInfo.value)


</script>

<style scoped lang="scss">
.nftCardLife {
  margin-top: -25px;
  height: 25px;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
}
</style>
