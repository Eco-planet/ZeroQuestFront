<template>
  <div>
    <div>
      <div v-if="locale === 'kr'">
        <h3 class="p-9 text-2xl text-black">
          <span class="font-bold">제로퀘스트</span>는 <br>
          BlockChain과 AI가 접목된 <br>
          <span class="font-bold">자발적 탄소 감축 플랫폼</span>App 입니다
        </h3>
      </div>
      <div v-else>
        <h3 class="p-9 text-2xl text-black">
          <span class="font-bold">ZeroQuest</span> is a <br>
          platform that combines BlockChain and AI <br>
          <span class="font-bold">voluntary carbon reduction</span> App
        </h3>
      </div>
    </div>
    <div class="infoBg p-5 text-white">
      <p class="text-xl font-medium">{{ t('message.introduction1') }}</p>
      <p class="mb-10 text-xl">🔥🌏🤔🤔🤔</p>
      <p class="mb-10 text-2xl font-medium">{{ t('message.introduction2') }}</p>
      <div>
        <p v-if="locale === 'kr'" class="text-3xl font-medium">제로퀘스트로 탄소감축하고 <br>
          포인트도 얻자!
        </p>
        <p v-else class="text-3xl font-medium">Reduce carbon with ZeroQuest <br>
          and earn points too!
        </p>
      </div>

      <div class="flex justify-center">
        <img src="@/assets/images/info.png" />
      </div>
      <div>
        <p v-if="locale === 'kr'" class="mb-10 text-2xl font-medium">
          탄소를 감축하고 보상받는<br>
          Zero to Earn(ZtoE)플랫폼
        </p>
        <p v-else class="mb-10 text-2xl font-medium">
          Reduce carbon and get rewarded<br>
          on the Zero to Earn (ZtoE) platform.
        </p>
      </div>

    </div>
    <div class="p-9 text-2xl text-black">
      <div>
        <p v-if="locale === 'kr'">일년에 <span class="font-bold">하루</span><br>
          승강기 대신 <span class="font-bold">계단</span>을 이용하면 <br>
          <span class="font-bold">연간 4.6kg의 이산화탄소를</span><br>
          <span class="font-bold">줄일 수 있다</span>는 사실을 <br>
          알고계신가요?
        </p>
        <p v-else>Did you know that by using the <span class="font-bold">stairs</span><br>
          instead of the elevator for just <span class="font-bold">one day</span> a year, <br>
          <span class="font-bold">you can reduce</span><br>
          <span class="font-bold">4.6kg of carbon dioxide</span> annually?

        </p>
      </div>
      <div>
        <p v-if="locale === 'kr'" class="mt-40 font-bold">
          제로퀘스트는 <br>
          생활 속에서 자발적으로 <br>
          탄소배출을 감소시킬 수 있는 <br>
          라이프스타일 방법을 지원합니다
        </p>
        <p v-else class="mt-40 font-bold">
          ZeroQuest supports <br>
          voluntary methods in everyday life <br>
          to reduce carbon emissions, <br>
          promoting a sustainable lifestyle.
        </p>
      </div>

      <div class="mt-32">
        <div class="mb-16 flex justify-center items-center">
          <img src="@/assets/images/tree.png" class="wp-40 mr-4"/>
          <div class="font-medium wp-40">{{ t('message.introduction3') }}</div>
        </div>
        <div class="mb-16 flex justify-center items-center">
          <img src="@/assets/images/recycling.png" class="wp-40 mr-4"/>
          <div class="wp-40">
            <div>
              <div v-if="locale === 'kr'" class="font-medium">재활용페트병<br>인식 모듈</div>
              <div v-else class="font-medium">Recycled PET Bottle<br>Recognition Module</div>
            </div>

            <button
              type="button"
              class="moduleBtnBg text-white font-medium rounded-full text-sm mt-4 px-5 py-4 text-center"
              @click="transferOnft"
            >
            {{ t('message.introduction4') }}
            </button>
          </div>
        </div>
        <div class="mb-16 flex justify-center items-center">
          <img src="@/assets/images/stair.png" class="wp-40 mr-4"/>
          <div class="wp-40">
            <div>
              <div v-if="locale === 'kr'" class="font-medium">계단오르기<br>인식 모듈</div>
              <div v-else class="font-medium">Stair Climbing<br>Recognition Module</div>
            </div>
            <button
              type="button"
              class="moduleBtnBg text-white font-medium rounded-full text-sm mt-4 px-5 py-4 text-center"
              @click="transferOnft"
            >
            {{ t('message.introduction4') }}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div v-if="locale === 'kr'" class="mt-32 mb-16 font-bold">아파트에서 살고있다면?<br> ‘계단오르기’NFT를 통해 <br>ESG 포인트 획득이 가능합니다
        </div>
        <div v-else class="mt-32 mb-16 font-bold">Living in an apartment?<br> Through the 'Stair Climbing' NFT, <br>you
          can earn ESG points.</div>
      </div>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSc0DY0h1l9CM2bP9yWwBbmJFbjXq1owwtO8tAuJgXm8Ej6Sbg/viewform" target="_blank" class="
        moduleBtnBg
        block
        text-white 
        font-medium
        py-8
        text-center">{{ t('message.introduction5') }}
      </a>
      <div class="mt-40">
        <div>
          <span v-if="locale === 'kr'">
            <span class="font-bold">NFT</span>를 통해 포인트를 얻고<br>
            포인트를 <span class="font-bold">ESG토큰</span>으로 스왑해<br>
            <span class="font-bold">판매</span>할 수 있습니다
          </span>
          <span v-else>
            Earn points through <span class="font-bold">NFT</span> and<br>
            swap those points for <span class="font-bold">ESG tokens</span>,<br>
            which you can then <span class="font-bold">sell</span>.
          </span>
        </div>
      </div>
    </div>
    <div class="flex justify-center relative">
      <img src="@/assets/images/info2.png" />
      <a href="https://play.google.com/store/apps/details?id=com.aiblue.zrqst_multilingual_webview_app" @click="handleGooglePlayStore">

        <img
        class="absolute top-3/4 left-1/2 transform -translate-x-1/2 translate-y-52"
        src="@/assets/images/info3.png"
      />
      </a>
    </div>
    <div class="mt-10 text-xl font-semibold" >{{ t("message.introduction6") }}</div>
    <div class="h-56"></div>
    <div class="text-xl font-semibold" @click="handleTossPayment">토스페이 테스트</div>
    <div class="h-56"></div>

  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useStore } from "vuex";
import router from "@/router";

const store = useStore()
const locale = computed(() => store.state.system.locale)
const { t } = useI18n();

const transferOnft = () => {
  router.push({
    path: '/onft',
    name: 'onft'
  })
}

const handleGooglePlayStore = () => {
  window.flutter_inappwebview.callHandler("handleGooglePlayStoreCommBtn").then((res: any) => {
      console.log(res);
    });
}; 

// const handleTossPayment = () => {
//   window.flutter_inappwebview.callHandler("handleTossPayBtn").then((res: any) => {
//       console.log(res);
  
//     });
// }

const handleTossPayment = () => {
  const dataToSend = { points: 100, buyerTel: '01012345678', 
      pg: "tosspayments", //"kakaopay"
      pay_method: "card",
      // merchant_uid: "ORD20180131-0000011",
      name: "esgp 구매",
      m_redirect_url: "https://dev.zeroquest.kr",
      amount: 444,
      buyer_email: "funidea_woo@naver.com",
      buyer_name: "테스터",
      buyer_tel: "010-8832-4280",
      buyer_addr: "서울특별시 영등포구 당산동",
      buyer_postcode: "07222", }; // 예시 데이터
  window.flutter_inappwebview.callHandler("handleTossPayBtn", dataToSend).then((res: any) => {
    console.log(res);
  });
}

</script>

<style lang="scss" scoped>
.infoBg {
  background-color: #31847F;
}

.moduleBtnBg {
  background-color: #31847F;
  border-radius: 20px;
}
</style>