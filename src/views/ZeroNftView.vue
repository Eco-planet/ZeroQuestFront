<template>
  <div class="flex flex-col justify-center items-center mm">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-3xl font-semibold text-left">ZeroNFT</div>
      <div class="h-8"></div>
    </div>
    <div class="h-10"></div>
    <div class="flex w-full pb-2 items-center justify-between border-b border-gray-400">
      <div class="text-2xl font-semibold">ESG Point</div>
      <div class="flex items-end">
        <div class="text-3xl font-semibold text-esg-color">{{getBalances}}</div>
        <div class="w-1"></div>
        <div class="text-2xl text-gray-400">point</div>
      </div>
    </div>
    <div class="h-10"></div>
    <div class="w-full relative overflow-x-auto pb-4">
      <ul class="text-xl font-medium text-center text-white space-x-2 whitespace-nowrap">
        <li v-for="tab in categoryList" :key="tab.name" @click="switchTab(tab)"
        class="inline-block w-32 px-4 py-3 rounded-full bg-disable text-white cursor-pointer"
        :class="['tab', currentTab?.name === tab.name ? 'active' : '']">{{ tab.name }}</li>
      </ul>
    </div>
    <ZeroNft :selectedIdx="currentTab?.idx"></ZeroNft>
    
    <div class="h-40"></div>
  </div>
</template>

<script lang="ts" setup>
import http from "@/api/http";
import store from "@/store";
import { onMounted, ref } from 'vue';
import { NftCategory } from "@/types/IZeroNftType"
import ZeroNft from '@/components/ZeroNft.vue'

const getBalances = store.getters["auth/getBalances"].ESGP.balance

const categoryList = ref();
const currentTab = ref<NftCategory>();

onMounted(async () => {
  getNftCategory();
  if (categoryList.value && categoryList.value.length > 0) {
    currentTab.value = categoryList.value[0];
  }
})

const getNftCategory = () => {
  http.get("/api/nft/category")
    .then((res) => {
      categoryList.value = res.data.data;
      currentTab.value = categoryList.value[0];
  })
}

const switchTab = async (tab: any) => {
  currentTab.value = tab;
};
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