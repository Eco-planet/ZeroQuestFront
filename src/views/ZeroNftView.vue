<template>
  <div class="flex flex-col justify-center items-center mm">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-3xl font-semibold text-left">ZeroNFT</div>
      <div class="h-8"></div>
    </div>
    <div class="h-10"></div>
    <div
      class="flex w-full pb-2 items-center justify-between border-b border-gray-400"
    >
      <div class="text-2xl font-semibold">ESG Point</div>
      <div class="flex items-end">
        <div class="text-3xl font-semibold text-esg-color">
          {{ esgPoint.toLocaleString() }}
        </div>

        <div class="w-1"></div>
        <div class="text-2xl text-gray-400">point</div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="w-full relative overflow-x-auto pb-4">
      <ul
        class="text-xl font-medium text-center text-white space-x-2 whitespace-nowrap"
      >
        <li
          v-for="tab in categoryList"
          :key="tab.idx"
          @click="switchTab(tab)"
          class="w-44 inline-block py-3 rounded-full bg-disable text-white cursor-pointer"
          :class="['tab', currentTab?.idx === tab.idx ? 'active' : '']"
        >
          <p>{{ tab.name }}</p>
        </li>
      </ul>
    </div>
    <ZeroNft :selectedIdx="currentTab?.idx"></ZeroNft>

    <div class="h-72"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import http from "@/api/http";
import store from "@/store";
import { onMounted, ref } from "vue";
import { NftCategory } from "@/types/IZeroNftType";
import ZeroNft from "@/components/ZeroNft.vue";
import { useStore } from "vuex";
import { checkNftLatestTime } from "@/api/axios";

const vuexStore = useStore();

const userTokenInfo = computed(() => vuexStore.getters["auth/getBalances"]);
const esgPoint = parseInt(userTokenInfo.value.ESGP);

const categoryList = ref();

const currentTab = ref<NftCategory>();
const nftList = computed(() => store.getters["auth/getNftList"]);
const nftLatestTime = computed(() =>
  parseInt(vuexStore.state.auth.nftLatestTime)
);

onMounted(async () => {
  getNftCategory();
  checkNftLatestTime(vuexStore, nftLatestTime.value);
});

const getNftCategory = () => {
  http.get("/api/nft/category").then((res) => {
    // "전체" 항목을 추가합니다.
    const allCategory = {
      idx: 0,
      name: "All", // 여기서 locale은 반응형 참조(ref)입니다.
    };

    // 서버로부터 받은 데이터에 "전체" 항목을 포함시킵니다.
    categoryList.value = [allCategory, ...res.data.data];

    // 기본적으로 "전체" 카테고리를 현재 탭으로 설정합니다.
    currentTab.value = categoryList.value[0];
  });
};

console.log("categoryList다", categoryList);

const switchTab = async (tab: any) => {
  currentTab.value = tab;
};
console.log("switchTab", switchTab);
</script>

<style lang="scss">
.text-esg-color {
  color: #24d120;
}

.bg-esg-color {
  background-color: #0c5c26;
}

.bg-disable {
  background-color: #bbb;
}

.active {
  background-color: #0c5c26;
}
</style>
