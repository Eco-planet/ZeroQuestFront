<template>
  <div class="w-full mt-10">
    <ul class="grid grid-cols-2 gap-x-8 gap-y-8">
      <li class="p-4 shadow-nft" v-for="nft in nftListSort" :key="nft.name">
        <div class="text-left" @click="goToDetail(nft.name)">
          <div class="w-full h-44 relative overflow-hidden">
            <img :src="nft.image" alt="" class="w-full h-full object-cover object-top">
          </div>
          <div class="mt-4 text-xl font-medium text-black">{{ nft.name }}</div>
          <div class="mt-2 text-lg font-light text-gray-700">0 / </div>
          <div class="text-lg font-light text-gray-400">{{nft.buyPrice1}} {{nft.buySymbol1}} / {{ nft.buyPrice2 }} {{ nft.buySymbol2 }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
  
<script lang="ts" setup>
import http from "@/api/http";
import store from "@/store";
import { reactive, ref, onMounted, Ref, computed } from "vue";
import { useRouter } from "vue-router"
import { NFTSampleType } from "@/types/IZeroNftType"

const router = useRouter();
const nftList = ref()

onMounted(() => {
  getNftList();
})

const getNftList = () => {
  http.get("/api/nft/zeroNft")
    .then((res) => {
      console.log(res.data.data)
      nftList.value = res.data.data;
    });
};

const nftListSort = computed(() => {
  if (!nftList.value) {
    return [];
  }

  if (props.selectedName === 'ECO') {
    return nftList.value.filter(item => item.symbol === 'ECONFT2');
  } else if (props.selectedName === 'Game') {
    return nftList.value.filter(item => item.symbol === 'ECONFT');
  } else {
    return nftList.value;
  }
});


const props = defineProps({
    selectedName: {
        type: String,
        default() {
            return {}
        }
    }
})

// query로 해당 nft이름을 보내서 그 nft정보를 가져온다.
function goToDetail(name: string) {
  console.log("nftName", name)
  router.push({
    path: '/zeronftbuy',
    name: "zeronftbuy",
    params: {
      name: name
    }
  })
}
</script>
  
  <style lang="scss">
  .shadow-nft {
    box-shadow: 0 6px 8px 0px rgb(0 0 0 / 0.1), 0 2px 8px 0px rgb(0 0 0 / 0.1);
  }
  </style>