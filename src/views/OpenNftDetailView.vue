<template>
  <div class="px-8 flex flex-col justify-center items-center">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-3xl font-semibold text-left">O!NFT</div>
    </div>
    <div class="h-10"></div>
    <div class="px-2 w-full flex justify-between text-2xl">
      <div class="font-semibold">ESG Point</div>
      <div><span class="font-semibold esgPoint">{{ esgPoint }}</span> <span class="text-gray-500">point</span></div>
    </div>
    <div class="h-3"></div>
    <div class="w-full h-px bg-gray-200"></div>
    <div class="h-10"></div>
    <div class="photo-link p-7 w-full h-full">
      <div class="flex items-center justify-center"><img :src="nftInfo.image" /></div>
      <div class="h-10"></div>
      <div class="flex font-semibold text-2xl">{{ nftInfo.name }}</div>
      <template v-if="questRewards !== undefined && questRewards !== null && Object.keys(questRewards).length > 0">
        <div class="h-10"></div>
        <div class="nTable text-lg">
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>리워드</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in questRewards" :key="item.idx">
                <tr>
                  <td>{{ item.createdAt.substring(0, 10) }}</td>
                  <td>{{ item.reward }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </template>
      <div class="h-10"></div>
      <div class="flex text-xl text-left" v-html="nftInfo.description.split('\n').join('<br />')"></div>
      <div class="h-10"></div>
      <div class="flex items-center justify-center"><img :src="nftInfo.descImage" /></div>
    </div>
    <div class="h-20"></div>
    <div class="h-20"></div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import store from "@/store";
import http from "@/api/http";
import { onMounted, ref } from "vue";

const nftList = store.getters["auth/getNftList"];
const esgPoint = ref(0);
const nftId = Number(router.currentRoute.value.params.nftId);
const tokenId = Number(router.currentRoute.value.params.tokenId);
const nftInfo = nftList[nftId];
const questRewards = ref();

onMounted(() => {
  getEsgpBalance();
  getQuestReward();
});

const getEsgpBalance = () => {
  http.get("/api/token/balance", {
    params: {
      symbol: 'ESGP',
    }
  })
  .then((response) => {
    esgPoint.value = response.data.data.balance;
  })
};

const getQuestReward = () => {
  http.get("/api/quest/reward", {
    params: {
      symbol: nftList[nftId].symbol,
      tokenId,
      nftId,
    }
  })
  .then((response) => {
    console.log(response);
    questRewards.value = response.data.data.reverse();
  })
  .catch(() => {
    console.log('err');
    questRewards.value = {};
  })
};
</script>

<style lang="scss">
.esgPoint  {
  color: #24d120;
}

.photo-link {
  background-color: #fff;
  box-shadow:0 0 16px rgba(0,0,0,0.2);
}

.nTable {
  width:100%; font-size:0; line-height:0;
}
* + .nTable { 
  margin-top:0px;
}
.nTable>table { 
  width:100%; border-spacing:2px; background-color: #999; table-layout : fixed;
}
.nTable>table th, .nTable>table td {
  height:40px; padding:15px 10px; background-color: #fff; font-size:12px; line-height:1.4; color:#333; text-align:center; vertical-align: middle; border-collapse:collapse; empty-cells:show; box-sizing: border-box; word-break:keep-all; word-wrap:break-word;
}
.nTable>table th {
  padding:0; background-color: #edf5ec; font-weight: 400; font-size:12px; color: #555;
}
</style>
