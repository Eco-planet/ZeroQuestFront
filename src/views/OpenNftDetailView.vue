<template>
  <div class="px-8 flex flex-col justify-center items-center">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-3xl font-semibold text-left">O!NFT</div>
    </div>
    <div class="h-10"></div>
    <div class="px-2 w-full flex justify-between text-2xl">
      <div class="font-semibold">ESG Point</div>
      <div>
        <span class="font-semibold esgPoint">{{ esgPoint }}</span>
        <span class="text-gray-500">point</span>
      </div>
    </div>
    <div class="h-3"></div>
    <div class="w-full h-px bg-gray-200"></div>
    <div class="h-10"></div>
    <div class="photo-link p-7 w-full h-full">
      <div class="flex font-semibold text-2xl pb-8">{{ nftInfo.name }}</div>
      <div class="flex items-center justify-center pt-9" style="position:relative;">
        <img :src="nftInfo.image" />
        <div v-if="nftDetail === undefined || nftDetail.enable === 0" class="nftBg"></div>
      </div>
      <div class="h-10"></div>
      <div class="flex justify-center items-center">
        <template v-if="nftDetail !== undefined && nftDetail.enable === 0">
          <div class="btn-on-off">
            <button type="button" @click="updateNftEnable('INSTALL')"><strong>ON</strong><strong>OFF</strong></button>
          </div>
        </template>
        <template v-else>
          <div class="btn-on-off on">
            <button type="button" @click="updateNftEnable('OFF')"><strong>ON</strong><strong>OFF</strong></button>
          </div>
        </template>
      </div>

      <div class="h-10"></div>
      <div class="h-10"></div>
      <template v-if="questRewards !== undefined && questRewards !== null && Object.keys(questRewards).length > 0">
        <div class="px-0 w-full flex justify-between items-center text-2xl">
          <div class="font-semibold">{{ t("message.nftReward") }}</div>
          <div class="px-5 nftOn">{{ t("message.rewardBtn") }}</div>
        </div>
        <div class="h-5"></div>
        <div class="h-px h-5 bg-gray-200"></div>
        <div class="h-5"></div>
        <div class="nTable text-lg">
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>시간</th>
                <th>리워드</th>
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


  <div class="h-20"></div>
  <div class="h-20"></div>
  <Modal :visible="store.state.isPopup" @hide="closeModal" @resData="checkData" />
</template>

<script lang="ts" setup>
import router from "@/router";
import store from "@/store";
import http from "@/api/http";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import recycling from "@/components/common/recycling.vue"
import stairs from "@/components/common/stairs.vue"
import tree from "@/components/common/tree.vue"

const nftList = store.getters["auth/getNftList"];
const nftDetail = ref();
const esgPoint = ref(0);
const nftId = Number(router.currentRoute.value.params.nftId);
const tokenId = Number(router.currentRoute.value.params.tokenId);
const nftInfo = nftList[nftId];
const questRewards = ref();

const { t } = useI18n();

onMounted(() => {
  getNftDetail();
  getEsgpBalance();
  getQuestReward();
});

const getNftDetail = () => {
  http.get("/api/nft/detail", {
    params: {
      nftId: nftId,
      tokenId: tokenId,
    }
  })
    .then((response) => {
      nftDetail.value = response.data.data;
    });
};

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

const showPopup = () => {
  store.state.isPopup = true;
};

const closeModal = () => {
  store.state.isPopup = false;
};

const checkData = (type: String) => {
  if (type === 'OFF') {
    if (nftDetail.value.enable === 1) {
      http.post("/api/nft/enableNft", {
        'symbol': nftDetail.value.symbol,
        'tokenId': nftDetail.value.tokenId,
        'enable': 0,
      })
        .then((response) => {
          getNftDetail();
        });
    }
  } else if (type !== '') {
    gameDownload(type);
  }
};

const gameDownload = (type: String) => {
  const enableType = nftDetail.value.enable;

  if (enableType == 0) {
    http.post("/api/nft/enableNft", {
      'symbol': nftDetail.value.symbol,
      'tokenId': nftDetail.value.tokenId,
      'enable': 1,
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
  if (type === '1') {
    window.open('https://tempdownload0623.s3.ap-northeast-2.amazonaws.com/smartrecycle.apk', '_blank');
  } else if (type === '2') {
    window.open('https://tempdownload0623.s3.ap-northeast-2.amazonaws.com/stepup.apk', '_blank');
  }
};

const gameRun = () => {
  let nftType = nftList[nftId].type;
  let linkUrl = '';

  if (nftType > 0) {
    linkUrl = "/api/quest/apptoken"
    //linkUrl = "/api/quest/gametoken"
  } else {
    return false;
  }

  http.get(linkUrl, {
    params: {
      symbol: nftDetail.value.symbol,
      nftId: nftId,
      tokenId: tokenId,
    }
  })
    .then((response) => {
      let deepLink = '';

      if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
        deepLink = nftList[nftId].and_deeplink;
      } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
        deepLink = nftList[nftId].ios_deeplink;
      }

      //window.open(deepLink + '?token=' + response.data.data.appToken + '&name=' + store.getters["auth/getUserName"] + '&email=' + store.getters["auth/getUserEmail"] + '&uid=' + store.getters["auth/getUserId"], '_blank');
      window.flutter_inappwebview.callHandler('handlePlayBtn', { deepLink: deepLink, token: response.data.data.appToken, name: store.getters["auth/getUserName"], email: store.getters["auth/getUserEmail"], uid: store.getters["auth/getUserId"] });
    });
};

const updateNftEnable = (type: String) => {
  if (type == 'INSTALL') {
    store.state.nftId = nftId;
    store.state.nftIdx = nftInfo.idx;

    let packageName = '';

    if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      packageName = nftInfo.and_packagename;
    } else if (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) {
      packageName = nftInfo.ios_packagename;
    }

    window.flutter_inappwebview.callHandler('checkAppInstalled', { packageName: packageName }).then((res: any) => {
      //console.log(JSON.stringify(res));

      if (res.result == true) {
        http.post("/api/nft/enableNft", {
          'symbol': nftDetail.value.symbol,
          'tokenId': nftDetail.value.tokenId,
          'enable': 1,
        })
          .then((response) => {
            getNftDetail();
          });
      } else {
        store.state.popupType = 'game_install';
        store.state.isPopup = true;
      }
    }).catch(() => {
      store.state.popupType = 'game_install';
      store.state.isPopup = true;
    });
  } else if (type === 'OFF') {
    store.state.nftId = nftId;
    store.state.nftIdx = nftInfo.idx;

    store.state.popupType = 'game_off';
    store.state.isPopup = true;
  } else if (type === 'RUN') {
    gameRun();
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

*+.nTable {
  margin-top: 0px;
}

.nTable>table {
  width: 100%;
  border-spacing: 2px;
  background-color: #999;
  table-layout: fixed;
}

.nTable>table th,
.nTable>table td {
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

.nTable>table th {
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
  color: #FFFFFF;
}

.nftOff {
  background-color: #ccc;
  border-radius: 5px;
  font-size: 10px;
  color: #FFFFFF;
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
  transition: all .3s ease-out;
}

.btn-on-off button>strong {
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

.btn-on-off button>strong+strong {
  margin-left: -20px;
}

.btn-on-off.on button:before {
  background-color: #24d120;
  left: 0;
}</style>
