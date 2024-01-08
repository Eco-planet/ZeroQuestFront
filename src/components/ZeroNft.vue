<template>
  <div class="w-full mt-10">
    <ul class="grid grid-cols-2 gap-x-8 gap-y-8">
      <li class="p-4 shadow-nft" v-for="nft in nftListSort" :key="nft.name">
        <div class="text-left" @click="goToDetail(nft.idx)">
          <div class="w-full h-full relative">
            <img
              :src="nft.image"
              alt=""
              class="w-full h-full object-contain object-top"
            />
          </div>
          <div
            class="mt-4 text-xl font-medium text-black"
            v-if="locale === 'kr'"
          >
            {{ nft.name.kor }}
          </div>
          <div class="mt-4 text-lg font-medium text-black" v-else>
            {{ nft.name.eng }}
          </div>
          <div class="text-lg font-light text-gray-400">
            {{ Number(nft.buyPrice2).toLocaleString() }} ESG point
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import http from "@/api/http";
import { reactive, ref, onMounted, Ref, computed } from "vue";
import { useRouter } from "vue-router";
import { NFTSampleType } from "@/types/IZeroNftType";
import { useStore } from "vuex";

const router = useRouter();
const vuexStore = useStore();
const nftList = ref();

const locale = computed(() => vuexStore.state.system.locale);

onMounted(() => {
  getNftList();
});

const getNftList = () => {
  http.get("/api/nft/zeroNft").then((res) => {
    const parsedData = res.data.data.map((item: any) => {
      if (item.name) {
        try {
          return { ...item, name: JSON.parse(item.name) };
        } catch (e) {
          console.error("Failed to parse name:", e);
        }
      }
      return item;
    });
    nftList.value = parsedData;
  });
};

const nftListSort = computed(() => {
  if (!nftList.value) {
    return [];
  } else if (props.selectedIdx === 0) {
    return nftList.value;
  } else {
    return nftList.value.filter((item) => item.cid === props.selectedIdx);
  }
});

const props = defineProps({
  selectedIdx: {
    type: Number,
    default() {
      return {};
    },
  },
});

// query로 해당 nft이름을 보내서 그 nft정보를 가져온다.
function goToDetail(idx: number) {
  console.log(idx);
  router.push({
    path: "/zeronftbuy",
    name: "zeronftbuy",
    params: {
      idx: idx,
    },
  });
}
</script>

<style lang="scss">
.shadow-nft {
  box-shadow: 0 6px 8px 0px rgb(0 0 0 / 0.1), 0 2px 8px 0px rgb(0 0 0 / 0.1);
}
</style>
