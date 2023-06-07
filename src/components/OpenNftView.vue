<template>
  <div class="flex flex-col">
    <div><img class="nftImg" :src="nftInfo.image" alt="" @click="goNftDetail(nftCard.nftId)"></div>
    <div v-if="nftCard.enable === 1" class="flex justify-center items-center">
      <div class="pt-2 w-full text-center text-xl nftCardLife">
        {{ nftCard.balance }} / {{ nftInfo.metaData.maxLife }}
      </div>
    </div>
    <div class="h-2"></div>
    <div class="text-lg text-center">{{ nftInfo.name }}</div>
    <div class="flex justify-center items-center">
      <template v-if="nftCard.enable === 0">
        <div class="wp-30 font-semibold text-center text-white rounded-full nftOff" @click="updateNftEnable(1)">OFF</div>
      </template>
      <template v-if="nftCard.enable === 1">
        <div class="wp-30 font-semibold text-center text-white rounded-full nftOn" @click="updateNftEnable(0)">ON</div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import http from "@/api/http";
import { ref, toRefs, watch } from "vue";

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
  "updateEnable",
]);

const { nftCard, nftInfo } = toRefs(props);

watch(nftCard, (val) => {
  console.log("enable nftCard");
}, { immediate: false, deep: true });

const updateNftEnable = (enable: Number) => {
  http.post("/api/nft/enableNft", {
    'symbol': nftInfo.value.symbol,
    'tokenId': nftCard.value.tokenId,
    'enable': enable,
  })
  .then((response) => {
    if (response.data.status === 1) {
      emit("updateEnable");
    }
  });
};

const goNftDetail = (nftId: number) => {
  router.push({ name: 'onft-detail', params: { nftId } });
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