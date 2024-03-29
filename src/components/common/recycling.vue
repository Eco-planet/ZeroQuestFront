<template>
  <div>
    <div class="mx-10">
      <div>
        <h5 class="pb-8 text-3xl text-black font-medium">
          How to Use AI Recycling Separation NFT
        </h5>
        <p class="mb-32 font-medium text-xl">
          We’ll let you know easily <br />
          about the recycling method for carbon reduction using an AI camera.<br />
          Proper recycling will reduce carbon emissions.
        </p>
      </div>
      <div>
        <div class="pb-3 text-2xl font-semibold">How to Use</div>
        <div class="text-xl">
          <div class="pb-3 font-medium">
            1. Purchase the recycling AI NFT and turn it on. <br />
            This will automatically install the AI camera module.
          </div>
          <div class="pb-3 font-medium">
            2. Scan recycled products or trademarks using the AI camera.
          </div>
          <div class="pb-3 font-medium">3. It will suggest how to recycle.</div>
          <div class="pb-3 font-medium">
            4. Follow the recommended recycling method.
          </div>
          <div class="pb-3 font-medium">5. Earn points upon completion.</div>
        </div>
      </div>
      <div>
        <div class="mt-32 mb-10 text-2xl font-semibold">
          AI-based Recycling NFT <br />User Guide
        </div>
        <div>
          <div>
            <div class="pb-3 font-semibold text-2xl">1. DOWNLOAD</div>
            <div class="text-xl">
              <div>Purchasing AI recycle NFT</div>
              <div>
                <div class="flex justify-center">
                  <div class="font-medium">NFT</div>
                  <div class="ml-3 text-white font-medium on">ON</div>
                </div>
                <div class="font-medium">Automatically installing module</div>
              </div>
            </div>
          </div>
          <div>
            <div class="mt-12 pb-3 font-semibold text-2xl">2. Run - SCAN</div>
            <div class="text-xl">
              <div class="pb-4 font-medium">
                scanning recycles with AI camera
              </div>
              <div class="flex justify-center">
                <img src="@/assets/images/scan.png" />
              </div>
            </div>
          </div>
          <div>
            <div class="mt-20 pb-3 font-semibold text-2xl">
              3. Run - RECYCLING
            </div>
            <div class="font-medium text-xl">Doing recycling method</div>
            <div class="flex justify-center">
              <img class="pt-4" src="@/assets/images/recycle.png" />
            </div>
          </div>
          <div>
            <div class="mt-20 pb-3 font-semibold text-2xl">
              4. TERMINATION AND COMPENSATION
            </div>
            <div class="font-medium text-xl">
              When you did, you’ll get ESG point <br />
              ESG points can swap ESG token
            </div>
            <div class="flex justify-center">
              <img class="pt-4" src="@/assets/images/esg.png" />
            </div>
          </div>
          <div class="mt-40 text-2xl font-medium">
            The more we do zero quests <br />
            The planet's carbon emissions are decreasing<br />
            We can create a sustainable planet<br />
          </div>
          <div class="mt-32 text-2xl font-medium">
            Voluntary Carbon Reduction Platform
          </div>
          <div class="flex justify-center">
            <img class="pt-4" src="@/assets/images/zero.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const locale = computed(() => store.state.system.locale);
</script>

<style lang="scss" scoped>
.on {
  width: 36px;
  height: 16px;
  background-color: #36cf34;
  border-radius: 5px;
}
</style>
