<template>
  <div>
    <div v-if="locale === 'kr'"> 
      <div>
        <h5 class="pb-8 text-3xl text-black font-medium">AI 재활용 분리 NFT 사용방법</h5>
        <p class="mb-32 font-medium text-xl">
          탄소감축을 위한 재활용 방법을 AI 카메라로 쉽게 알려드립니다<br />
          올바른 재활용 방법만 실천해도 탄소를 줄이는 효과가 있습니다
        </p>
      </div>
      <div>
        <div class="pb-3 text-2xl font-semibold">사용방법</div>
        <div class="text-xl">
          <div class="pb-3 font-medium">1. AI 재활용 NFT를 구매하고 NFT를 ON 시키면 <br />
            AI 카메라 모듈을 설치합니다
          </div>
          <div class="pb-3 font-medium">2. AI 카메라에 재활용 제품이나 상표를 스캔합니다</div>
          <div class="pb-3 font-medium">3. 스캔 후 재활용 방법이나 분리수거 방법을 제시합니다 </div>
          <div class="pb-3 font-medium">4. 제시하는 방법에 따라 분리수거를 실행합니다</div>
          <div class="pb-3 font-medium">5. 실행 후 포인트를 받으세요 </div>
        </div>
      </div>
      <div>
        <div class="mt-32 mb-10 text-2xl font-semibold">AI 기반 재활용품 NFT <br>사용방법</div>
        <div>
          <div>
            <div class="pb-3 font-semibold text-2xl">1. 설치</div>
            <div class="text-xl">
              <div>AI 재활용 NFT를 구매</div>
              <div>
                <div class="flex justify-center">
                  <div class="font-medium">NFT</div>
                  <div class="ml-3 text-white font-medium on">ON</div>
                </div>
                <div class="font-medium">모듈 자동설치</div>
              </div>
            </div>
          </div>
          <div>
            <div class="mt-12 pb-3 font-semibold text-2xl">2. 실행 - 스캔</div>
            <div class="text-xl">
              <div class="pb-4 font-medium">AI 카메라로 재활용품을 스캔</div>
              <div class="flex justify-center">
                <img src="@/assets/images/scan.png">
              </div>
            </div>
          </div>
          <div>
            <div class="mt-20 pb-3 font-semibold text-2xl">3. 실행 - 분리수거</div>
            <div class="font-medium text-xl">제시하는 방법에 따라 분리수거 실행</div>
            <div class="flex justify-center">
              <img class="pt-4" src="@/assets/images/recycle.png">
            </div>
          </div>
          <div>
            <div class="mt-20 pb-3 font-semibold text-2xl">4. 종료 및 보상</div>
            <div class="font-medium text-xl">실행 후 ESG 포인트를 받을 수 있습니다 <br>
              ESG 포인트는 ESG 토큰으로 변경이 가능합니다
            </div>
            <div class="flex justify-center">
              <img class="pt-4" src="@/assets/images/esg.png">
            </div>
          </div>
          <div class="mt-40 text-2xl font-medium">
            우리가 제로퀘스트를 수행할수록 <br>
            지구의 탄소 배출량이 줄어들어<br>
            지속가능한 지구를 만들 수 있습니다<br>
          </div>
          <div class="mt-32 text-2xl font-medium">자발적 탄소감축 플랫폼</div>
          <div class="flex justify-center">
            <img class="pt-4" src="@/assets/images/zero.png">
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div>
        <h5 class="pb-8 text-3xl text-black font-medium">How to Use AI Recycling Separation NFT</h5>
        <p class="mb-32 font-medium text-xl">
          We’ll let you know easily <br />
          about the recycling method for carbon reduction using an AI camera.<br/>
          Proper recycling will reduce carbon emissions.
        </p>
      </div>
      <div>
        <div class="pb-3 text-2xl font-semibold">How to Use</div>
        <div class="text-xl">
          <div class="pb-3 font-medium">1. Purchase the recycling AI NFT and turn it on.  <br />
            This will automatically install the AI camera module.
          </div>
          <div class="pb-3 font-medium">2. Scan recycled products or trademarks using the AI camera.</div>
          <div class="pb-3 font-medium">3. It will suggest how to recycle. </div>
          <div class="pb-3 font-medium">4. Follow the recommended recycling method.</div>
          <div class="pb-3 font-medium">5. Earn points upon completion. </div>
        </div>
      </div>
      <div>
        <div class="mt-32 mb-10 text-2xl font-semibold">AI-based Recycling NFT
           <br>User Guide</div>
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
              <div class="pb-4 font-medium">scanning recycles with AI camera</div>
              <div class="flex justify-center">
                <img src="@/assets/images/scan.png">
              </div>
            </div>
          </div>
          <div>
            <div class="mt-20 pb-3 font-semibold text-2xl">3. Run - RECYCLING</div>
            <div class="font-medium text-xl">Doing recycling method</div>
            <div class="flex justify-center">
              <img class="pt-4" src="@/assets/images/recycle.png">
            </div>
          </div>
          <div>
            <div class="mt-20 pb-3 font-semibold text-2xl">4. TERMINATION AND COMPENSATION</div>
            <div class="font-medium text-xl">When you did, you’ll get ESG point <br>
              ESG points can swap ESG token
            </div>
            <div class="flex justify-center">
              <img class="pt-4" src="@/assets/images/esg.png">
            </div>
          </div>
          <div class="mt-40 text-2xl font-medium">
            The more we do zero quests <br>
            The planet's carbon emissions are decreasing<br>
            We can create a sustainable planet<br>
          </div>
          <div class="mt-32 text-2xl font-medium">Voluntary Carbon Reduction Platform</div>
          <div class="flex justify-center">
            <img class="pt-4" src="@/assets/images/zero.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useStore } from "vuex"

const store = useStore()
const locale = computed(() => store.state.system.locale)


</script>

<style lang="scss" scoped>
.on {
  width: 36px;
  height: 16px;
  background-color: #36CF34;
  border-radius: 5px;
}
</style>