<template>
  <div class="mx-10">
    <div>
      <h5 class="pb-8 text-3xl text-black font-medium">
        Tree Planting NFT Usage Guide
      </h5>
      <p class="mb-6 font-medium text-xl">
        Purchasing one Tree Planting NFT results in the planting of one real
        tree.<br />
        (Country and city will be announced later.)
      </p>
      <p class="mb-6 font-medium text-xl">
        You can check data on where the real tree is planted and how much carbon
        dioxide it is absorbing.<br />
      </p>
      <p class="mb-6 font-medium text-xl">
        You can receive ESG points once a day.
      </p>
      <p class="mb-6 font-medium text-xl">
        By purchasing a Tree Planting NFT, you contribute to carbon reduction.
      </p>
      <p class="mb-6 font-medium text-xl">
        After purchasing a Tree Planting NFT, it may take time for the actual
        tree to be planted depending on local conditions.
      </p>
      <p class="mb-6 font-medium text-xl">
        Until the actual tree is planted, you can receive 100 ESG points daily.
      </p>
      <p class="mb-16 font-medium text-xl">
        Once the actual tree is planted, you can receive rewards based on the
        amount of carbon absorbed.
      </p>
      <p class="mb-6 font-bold text-2xl">
        Main Target Countries for Tree Planting
      </p>
      <p class="mb-6 font-bold text-xl">
        Mongolia, Kyrgyzstan, and Central Asian regions planned.
      </p>
      <button
        v-if="onft"
        type="button"
        class="text-white bg-red-600 font-semibold rounded-lg text-xl w-64 py-2.5 mt-12 me-2"
        @click="myTreeLocation"
      >
        Check My Tree Location
      </button>
    </div>

    <div class="mt-20 text-2xl font-medium">
      The more we participate in ZeroQuest, <br />
      the more we can reduce Earth's carbon emissions, <br />
      creating a sustainable planet.<br />
    </div>
    <div class="mt-32 text-2xl font-medium">
      Voluntary Carbon Reduction Platform
    </div>
    <div class="flex justify-center">
      <img class="pt-4" src="@/assets/images/zero.png" />
    </div>
    <div class="mt-32 font-bold">
      * ESG points can be withdrawn to KakaoPay from My Points
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const locale = computed(() => store.state.system.locale);

//
</script>

<style lang="scss" scoped>
.on {
  width: 36px;
  height: 16px;
  background-color: #36cf34;
  border-radius: 5px;
}

.moduleBtnBg {
  background-color: #0c5d25;
  border-radius: 20px;
}
</style>
