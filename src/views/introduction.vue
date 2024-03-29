<template>
  <div>
    <div>
      <div>
        <h3 class="p-9 text-2xl text-black">
          <span class="font-bold">ZeroQuest</span> is a <br />
          platform that combines BlockChain and AI <br />
          <span class="font-bold">voluntary carbon reduction</span> App
        </h3>
      </div>
    </div>
    <div class="infoBg p-5 text-white">
      <p class="text-xl font-medium">{{ t("message.introduction1") }}</p>
      <p class="mb-10 text-xl">🔥🌏🤔🤔🤔</p>
      <p class="mb-10 text-2xl font-medium">{{ t("message.introduction2") }}</p>
      <div>
        <p class="text-3xl font-medium">
          Reduce carbon with ZeroQuest <br />
          and earn points too!
        </p>
      </div>

      <div class="flex justify-center">
        <img src="@/assets/images/info.png" />
      </div>
      <div>
        <p class="mb-10 text-2xl font-medium">
          Reduce carbon and get rewarded<br />
          on the Zero to Earn (ZtoE) platform.
        </p>
      </div>
    </div>
    <div class="p-9 text-2xl text-black">
      <div>
        <p>
          Did you know that by using the <span class="font-bold">stairs</span
          ><br />
          instead of the elevator for just
          <span class="font-bold">one day</span> a year, <br />
          <span class="font-bold">you can reduce</span><br />
          <span class="font-bold">4.6kg of carbon dioxide</span> annually?
        </p>
      </div>
      <div>
        <p class="mt-40 font-bold">
          ZeroQuest supports <br />
          voluntary methods in everyday life <br />
          to reduce carbon emissions, <br />
          promoting a sustainable lifestyle.
        </p>
      </div>

      <div class="mt-32">
        <div class="mb-16 flex justify-center items-center">
          <img src="@/assets/images/tree.png" class="wp-40 mr-4" />
          <div class="font-medium wp-40">{{ t("message.introduction3") }}</div>
        </div>
        <div class="mb-16 flex justify-center items-center">
          <img src="@/assets/images/recycling.png" class="wp-40 mr-4" />
          <div class="wp-40">
            <div>
              <div class="font-medium">
                Recycled PET Bottle<br />Recognition Module
              </div>
            </div>

            <button
              type="button"
              class="moduleBtnBg text-white font-medium rounded-full text-sm mt-4 px-5 py-4 text-center"
              @click="transferOnft"
            >
              {{ t("message.introduction4") }}
            </button>
          </div>
        </div>
        <div class="mb-16 flex justify-center items-center">
          <img src="@/assets/images/stair.png" class="wp-40 mr-4" />
          <div class="wp-40">
            <div>
              <div class="font-medium">
                Stair Climbing<br />Recognition Module
              </div>
            </div>
            <button
              type="button"
              class="moduleBtnBg text-white font-medium rounded-full text-sm mt-4 px-5 py-4 text-center"
              @click="transferOnft"
            >
              {{ t("message.introduction4") }}
            </button>
          </div>
        </div>
      </div>
      <div>
        <div class="mt-32 mb-16 font-bold">
          Living in an apartment?<br />
          Through the 'Stair Climbing' NFT, <br />you can earn ESG points.
        </div>
      </div>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSc0DY0h1l9CM2bP9yWwBbmJFbjXq1owwtO8tAuJgXm8Ej6Sbg/viewform"
        target="_blank"
        class="moduleBtnBg block text-white font-medium py-8 text-center"
        >{{ t("message.introduction5") }}
      </a>
      <div class="mt-40">
        <div>
          <span>
            Earn points through <span class="font-bold">NFT</span> and<br />
            swap those points for
            <span class="font-bold">ESG tokens</span>,<br />
            which you can then <span class="font-bold">sell</span>.
          </span>
        </div>
      </div>
    </div>
    <div class="flex justify-center relative">
      <img src="@/assets/images/info2.png" />
      <!-- <a href="https://play.google.com/store/apps/details?id=com.aiblue.zrqst_multilingual_webview_app" @click="handleGooglePlayStore"> -->
      <a @click="handleGooglePlayStore">
        <img
          class="absolute top-3/4 left-1/2 transform -translate-x-1/2 translate-y-52"
          src="@/assets/images/info3.png"
        />
      </a>
    </div>
    <div class="mt-10 text-xl font-semibold">
      {{ t("message.introduction6") }}
    </div>
    <div class="h-56"></div>
    <!-- <div class="text-xl font-semibold" @click="handleTossPayment">토스페이 테스트</div> -->
    <div class="h-56"></div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useStore } from "vuex";
import router from "@/router";

const store = useStore();
const locale = computed(() => store.state.system.locale);
const { t } = useI18n();

const transferOnft = () => {
  router.push({
    path: "/onft",
    name: "onft",
  });
};

const handleGooglePlayStore = () => {
  window.flutter_inappwebview
    .callHandler("handleGooglePlayStoreCommBtn")
    .then((res: any) => {
      console.log(res);
    });
};
</script>

<style lang="scss" scoped>
.infoBg {
  background-color: #31847f;
}

.moduleBtnBg {
  background-color: #31847f;
  border-radius: 20px;
}
</style>
