<template>
  <div class="px-8 flex flex-col justify-center items-center">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-3xl font-semibold text-left">O!NFT</div>
    </div>
    <div class="h-10"></div>
    <div class="px-2 w-full flex justify-between text-2xl">
      <div class="font-semibold">ESG Point</div>
      <div class="flex items-end">
        <span class="text-3xl font-semibold esgPoint">{{
          esgPoint.toLocaleString()
        }}</span>
        <div class="w-1"></div>
        <span class="text-2xl text-gray-400">point</span>
      </div>
    </div>
    <div class="h-3"></div>
    <div class="w-full h-px bg-gray-200"></div>
    <div class="h-10"></div>
    <div class="photo-link p-7 w-full h-full">
      <div class="flex font-semibold text-2xl pb-8">
        {{ nftInfo.name }}
      </div>
      <div
        class="flex items-center justify-center pt-9"
        style="position: relative"
      >
        <img :src="nftInfo.image" />
        <div v-if="nftDetail === undefined || nftDetail.enable === 0"></div>
      </div>
      <div class="h-10"></div>
      <div class="flex justify-center items-center">
        <template v-if="nftDetail !== undefined && nftDetail.enable === 0">
          <div class="btn-on-off">
            <button type="button" @click="updateNftEnable('INSTALL')">
              <strong>ON</strong><strong>OFF</strong>
            </button>
          </div>
        </template>
        <template v-else>
          <div class="btn-on-off on">
            <button type="button" @click="updateNftEnable('OFF')">
              <strong>ON</strong><strong>OFF</strong>
            </button>
          </div>
        </template>
      </div>

      <div class="h-10"></div>
      <div class="h-10"></div>
      <template
        v-if="
          questRewards !== undefined &&
          questRewards !== null &&
          Object.keys(questRewards).length > 0
        "
      >
        <div class="px-0 w-full flex justify-between items-center text-2xl">
          <div class="font-semibold">{{ t("message.nftReward") }}</div>
          <div class="font-semibold">
            {{ t("message.totalReward") }} : {{ totalRewards }} point
          </div>
          <div
            class="px-5 nftOn"
            @click="exchangeReward"
            v-if="nftId === 1 || nftId === 2"
          >
            {{ t("message.rewardBtn") }}
          </div>
        </div>
        <div class="h-5"></div>
        <div class="h-px h-5 bg-gray-200"></div>
        <div class="h-5"></div>
        <div class="nTable text-lg h-96 overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>{{ t("message.date") }}</th>
                <th>{{ t("message.time") }}</th>
                <th>{{ t("message.reward") }}</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in questRewards" :key="item.idx">
                <tr>
                  <td>{{ item.createdAt.substring(0, 10) }}</td>
                  <td>{{ item.createdAt.substring(11, 19) }}</td>
                  <td>{{ item.reward }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </div>
  <div class="h-20"></div>

  <recycling v-if="nftId === 1"></recycling>
  <stairs v-else-if="nftId === 2"></stairs>
  <tree v-else-if="nftId === 3"></tree>
  <panda v-else-if="nftId === 4"></panda>
  <panda v-else-if="nftId === 5"></panda>
  <panda v-else-if="nftId === 6"></panda>

  <Modal
    :visible="store.state.isPopup"
    @hide="closeModal"
    :title="popupTitle"
  />

  <div class="h-20"></div>
  <div class="h-20"></div>
</template>

<script lang="ts" setup>
import router from "@/router";
import store from "@/store";
import http from "@/api/http";
import { useI18n } from "vue-i18n";
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import recycling from "@/components/common/recycling.vue";
import stairs from "@/components/common/stairs.vue";
import tree from "@/components/common/tree.vue";
import panda from "@/components/common/panda.vue";

const nftList = store.getters["auth/getNftList"];
const nftDetail = ref();

const nftId = Number(router.currentRoute.value.params.idx);
console.log("nftId", nftId);
const tokenId = Number(router.currentRoute.value.params.tokenId);
const nftInfo = nftList[nftId];
const questRewards = ref();
const totalRewards = ref();
const popupTitle = ref("");
const vuexStore = useStore();
const userTokenInfo = computed(() => vuexStore.getters["auth/getBalances"]);
const esgPoint = parseInt(userTokenInfo.value.ESGP);

const { t } = useI18n();

onMounted(() => {
  getNftDetail();
  getQuestReward();
});

const getNftDetail = () => {
  http
    .get("/api/nft/detail", {
      params: {
        nftId: nftId,
        tokenId: tokenId,
      },
    })
    .then((response) => {
      nftDetail.value = response.data.data;
    });
};

// UTC+9로 날짜 변환하는 함수
const convertToKST = (utcDateStr) => {
  let date = new Date(utcDateStr);
  date.setTime(date.getTime() + 9 * 60 * 60 * 1000); // 9시간을 더함
  return date.toISOString().replace("Z", ""); // 변환된 날짜를 다시 문자열로 반환하며, 'Z'를 제거
};

// Quest 보상 데이터를 가져오는 함수
const fetchQuestRewardData = (url, params) => {
  http
    .get(url, { params })
    .then((response) => {
      // 받아온 데이터의 createdAt을 UTC+9로 변경하고, 배열을 뒤집어 최신 순으로 정렬
      questRewards.value = response.data.data
        .map((item) => ({
          ...item,
          createdAt: convertToKST(item.createdAt),
        }))
        .reverse();

      // reward 속성의 합계 계산
      totalRewards.value = questRewards.value.reduce(
        (sum, item) => sum + parseFloat(item.reward),
        0
      );
    })
    .catch((error) => {
      console.error("Error fetching quest rewards:", error);
      questRewards.value = [];
    });
};

const getQuestReward = () => {
  const symbol = nftList[nftId]?.symbol;
  // nftId가 1 또는 2가 아닐 때 조건 검사
  if (nftId !== 1 && nftId !== 2) {
    fetchQuestRewardData("/api/quest/nftReward", { symbol, tokenId, nftId });
  } else {
    fetchQuestRewardData("/api/quest/reward", { symbol, tokenId, nftId });
  }
};

const exchangeReward = () => {
  http
    .post("/api/quest/reward", {
      symbol: nftList[nftId].symbol,
      tokenId,
      nftId,
    })
    .then((response) => {
      console.log(response);
      if (response.data.data.reward === 0) {
        store.state.popupType = "message";
        popupTitle.value = "error.notReward";
        store.state.isPopup = true;
      } else {
        console.log("response.data.data.reward", response.data.data.reward);
        store.state.popupValue = response.data.data.reward;
        store.state.popupType = "message";
        popupTitle.value = "message.getReward";
        store.state.isPopup = true;
      }
    })
    .catch(() => {
      store.state.popupType = "message";
      popupTitle.value = "error.notActivated";
      store.state.isPopup = true;
    });
};

const closeModal = () => {
  store.state.isPopup = false;
};

const checkData = (type: String) => {
  if (type === "OFF") {
    if (nftDetail.value.enable === 1) {
      http
        .post("/api/nft/enableNft", {
          symbol: nftDetail.value.symbol,
          tokenId: nftDetail.value.tokenId,
          enable: 0,
        })
        .then((response) => {
          getNftDetail();
        });
    }
  } else if (type !== "") {
    gameDownload(type);
  }
};

const gameDownload = (type: String) => {
  const enableType = nftDetail.value.enable;

  if (enableType == 0) {
    http
      .post("/api/nft/enableNft", {
        symbol: nftDetail.value.symbol,
        tokenId: nftDetail.value.tokenId,
        enable: 1,
      })
      .then((response) => {
        getNftDetail();
        gameDownUrl(type);
      });
  } else {
    gameDownUrl(type);
  }
};

const gameDownUrl = (type: String) => {
  let packageName = "";

  if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
    packageName = store.state.packageName;
  } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
    packageName = store.state.packageName;
  }
  window.flutter_inappwebview.callHandler("handleInstallBtn", {
    packageName: packageName,
  });
};

const gameRun = () => {
  let nftType = nftList[nftId].type;
  let linkUrl = "";

  if (nftType > 0) {
    linkUrl = "/api/quest/apptoken";
  } else {
    return false;
  }

  http
    .get(linkUrl, {
      params: {
        symbol: nftDetail.value.symbol,
        nftId: nftId,
        tokenId: tokenId,
      },
    })
    .then((response) => {
      let deepLink = "";

      if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
        deepLink = nftList[nftId].and_deeplink;
      } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
        deepLink = nftList[nftId].ios_deeplink;
      }

      window.flutter_inappwebview.callHandler("handlePlayBtn", {
        deepLink: deepLink,
        token: response.data.data.appToken,
        name: store.getters["auth/getUserName"],
        email: store.getters["auth/getUserEmail"],
        uid: store.getters["auth/getUserId"],
      });
    });
};

const updateNftEnable = (type: String) => {
  if (nftInfo.idx === 3) {
    store.state.popupType = "tree_nft";
    store.state.isPopup = true;
    return; // 모달 띄운 후 종료 됨
  }
  // nftInfo.idx가 1 또는 2인 경우에 대한 특별 처리
  if (nftInfo.idx === 1 || nftInfo.idx === 2) {
    let packageName = "";
    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      packageName = nftInfo.and_packagename;
    } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
      packageName = nftInfo.ios_packagename;
    }

    window.flutter_inappwebview
      .callHandler("checkAppInstalled", { packageName: packageName })
      .then((res) => {
        if (res.result === true || type !== "INSTALL") {
          let newEnableStatus = nftDetail.value.enable === 1 ? 0 : 1;
          http
            .post("/api/nft/enableNft", {
              symbol: nftDetail.value.symbol,
              tokenId: nftDetail.value.tokenId,
              enable: newEnableStatus,
            })
            .then((response) => {
              getNftDetail();
            })
            .catch((error) => {
              console.error("Error updating NFT enable status:", error);
            });
        } else {
          store.state.popupType = "game_install";
          store.state.isPopup = true;
        }
      })
      .catch(() => {
        store.state.popupType = "game_install";
        store.state.isPopup = true;
      });
  } else {
    // nftInfo.idx가 4, 5, 6인 경우에 대한 처리
    let newEnableStatus = nftDetail.value.enable === 1 ? 0 : 1;
    http
      .post("/api/nft/enableNft", {
        symbol: nftDetail.value.symbol,
        tokenId: nftDetail.value.tokenId,
        enable: newEnableStatus,
      })
      .then((response) => {
        getNftDetail(); // 상태 업데이트 후 상세 정보 다시 가져오기
      })
      .catch((error) => {
        console.error("Error updating NFT enable status:", error);
      });
  }
};
</script>

<style lang="scss">
.esgPoint {
  color: #24d120;
}

.photo-link {
  background-color: #fff;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
}

.nTable {
  width: 100%;
  font-size: 0;
  line-height: 0;
}

* + .nTable {
  margin-top: 0px;
}

.nTable > table {
  width: 100%;
  border-spacing: 2px;
  background-color: #999;
  table-layout: fixed;
}

.nTable > table th,
.nTable > table td {
  height: 40px;
  padding: 15px 10px;
  background-color: #fff;
  font-size: 12px;
  line-height: 1.4;
  color: #333;
  text-align: center;
  vertical-align: middle;
  border-collapse: collapse;
  empty-cells: show;
  box-sizing: border-box;
  word-break: keep-all;
  word-wrap: break-word;
}

.nTable > table th {
  padding: 0;
  background-color: #edf5ec;
  font-weight: 400;
  font-size: 12px;
  color: #555;
}

.nftBg {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
}

.nftOn {
  background-color: #24d120;
  border-radius: 5px;
  font-size: 10px;
  color: #ffffff;
}

.nftOff {
  background-color: #ccc;
  border-radius: 5px;
  font-size: 10px;
  color: #ffffff;
}

.btn-on-off {
  width: 100%;
  margin-top: 10px;
  font-size: 0;
  line-height: 0;
  display: flex;
  justify-content: center;
}

.btn-on-off button {
  width: 90px;
  margin: 0;
  padding: 0;
  background-color: #ccc;
  border: none;
  font-size: 0;
  line-height: 0;
  display: flex;
  justify-content: space-between;
  border-radius: 999px;
  position: relative;
  overflow: hidden;
}

.btn-on-off button:before {
  content: "";
  width: 50px;
  height: 100%;
  background-color: #949494;
  display: inline-block;
  position: absolute;
  left: calc(100% - 50px);
  top: 0px;
  border-radius: 999px;
  transition: all 0.3s ease-out;
}

.btn-on-off button > strong {
  min-width: 50px;
  height: 18px;
  font-weight: bold;
  font-size: 10px;
  line-height: 1;
  color: #fff;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
}

.btn-on-off button > strong + strong {
  margin-left: -20px;
}

.btn-on-off.on button:before {
  background-color: #24d120;
  left: 0;
}
</style>
