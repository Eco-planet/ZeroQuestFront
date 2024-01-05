<template>
  <div>
    <div v-if="locale ==='kr'">
      <div>
        <h5 class="pb-8 text-3xl text-black font-medium">계단오르기 NFT 사용방법</h5>
        <p class="mb-32 font-medium text-xl">
          우리 건물에 엘리베이터가 있는데 왜 계단을 사용해야 하냐고요?<br>
          우리의 건강을 위해서도 계단을 사용해야 하지만 <br>
          전기 에너지를 절약하는 만큼 탄소 배출량도 줄일 수 있기 때문에<br>
          계단오르기를 실천해야 합니다
        </p>
      </div>
      <div>
        <div class="pb-4 text-2xl font-semibold">사용방법</div>
        <div class="text-xl">
          <div class="pb-4 font-medium">1. 계단오르기 NFT를 구매한 후 NFT를 ON 하고 <br />
            계단오르기 측정 모듈을 설치하세요
          </div>
          <div class="pb-4 font-medium">2. 계단오르기를 시작하는 층에서 <br />
            NFC를 태그하고 오르기를 시작하세요
          </div>
          <div class="pb-4 font-medium">3. 2개 층마다 한 번씩 쉬면서 NFC를 태그해주세요 </div>
          <div class="pb-4 font-medium">4. 최종층에서 NFC를 태그하면 <br>
            계단 오르고, 내리기가 완료 됩니다
          </div>
          <div class="pb-3 font-medium">5. 제로퀘스트의 계단 NFC가 설치된 곳은 <br>
            지도에서 확인할 수 있습니다
          </div>
        </div>
      </div>
      <div>
        <div class="mt-32 mb-16 text-2xl font-semibold">계단오르기 NFT <br>사용방법</div>
        <div>
          <div>
            <div class="pb-3 font-semibold text-2xl">1. 최초설치</div>
            <div class="text-xl">
              <div>계단오르기 NFT를 구매</div>
              <div>
                <div class="flex justify-center">
                  <div class="font-medium">NFT</div>
                  <div class="ml-1 text-white font-medium on">ON</div>
                </div>
                <div class="font-medium">모듈 자동설치</div>
              </div>
            </div>
          </div>
          <div>
            <div class="mt-20 pb-4 font-semibold text-2xl">2. 실행 - 계단오르기</div>
            <div class="text-xl">
              <div class="flex justify-center">
                <div class="pb-3 font-medium">A. 시작층에서</div>
                <img class="px-2" src="@/assets/images/nfc.png">
                <div class="pb-3 font-medium">태그</div>
              </div>
              <div class="flex justify-center py-1">
                <div class="pb-3 font-medium">B. 2개 층마다 한 번씩 쉬면서</div>
                <img class="px-2" src="@/assets/images/nfc.png">
                <div class="pb-3 font-medium">태그</div>
              </div>
              <div class="flex justify-center">
                <div class="pb-3 font-medium">C. 최종 층에서</div>
                <img class="px-2" src="@/assets/images/nfc.png">
                <div class="pb-3 font-medium">태그</div>
              </div>
              <div class="flex justify-center pt-4">
                <img src="@/assets/images/제로퀘스트1층.png">
                <img src="@/assets/images/제로퀘스트5층.png">
              </div>
            </div>
          </div>
          <div>
            <div class="mt-20 pb-3 font-semibold text-2xl">3. 종료 및 보상</div>
            <div class="mb-10 font-medium text-xl">실행 후 ESG 포인트를 받을 수 있습니다<br>
              eSG 포인트는 ESG 토큰으로 변경이 가능합니다
            </div>
            <div>+</div>
            <div class="font-medium text-xl">제로퀘스트의 계단 NFC가 설치된 곳은<br>
              지도에서 확인할 수 있습니다.
            </div>
          </div>
          <div class="pb-8 mt-32 font-bold text-2xl">
            엘리베이터가 있는 건물이 있다면? <br>
            ‘계단오르기’ 설치 요청을 통해 <br>
            NFC를 설치해 보세요
          </div>
          <button type="button" class="
            moduleBtnBg
            text-white 
            font-medium
            text-sm 
            mt-4
            wp-80
            h-24
            text-2xl
            text-center" @click="goToGoogleForm">우리동네 '계단오르기' 설치 요청
          </button>
          <div class="pb-8 mt-12 font-bold text-2xl">
            우리동네 계단 오르기 설치 신청이 가능합니다
          </div>
          <div class="mt-20 text-2xl font-medium">
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
        <h5 class="pb-8 text-3xl text-black font-medium">How to Use the "Going Up Stairs" NFT</h5>
        <p class="mb-32 font-medium text-xl">
          Wondering why you should take the stairs when there's an elevator in your building? <br>
          Using the stairs benefits not only your health but also the environment. <br>
          By conserving electrical energy, you contribute to reduced carbon emissions.<br>
          Make a habit of climbing stairs!
        </p>
      </div>
      <div>
        <div class="pb-4 text-2xl font-semibold">How to Use</div>
        <div class="text-xl">
          <div class="pb-4 font-medium">1. Purchase the "Climbing Stairs" NFT and activate it. <br />
            This will automatically install the stair-climbing measurement module.
          </div>
          <div class="pb-4 font-medium">2. At the starting floor, <br />
            tap the NFC tag before you begin your climb.
          </div>
          <div class="pb-4 font-medium">3. Pause every two floors and tap the NFC tag. </div>
          <div class="pb-4 font-medium">4. Once you reach the final floor and tap the NFC tag, <br>
            your stair climbing session will be recorded as complete.
          </div>
          <div class="pb-3 font-medium">5. Locations of NFC tags on staircases <br>
            can be found on the ZeroQuest map.
          </div>
        </div>
      </div>
      <div>
        <div class="mt-32 mb-16 text-2xl font-semibold">GOING STAIRS NFT <br>USER GUIDE</div>
        <div>
          <div>
            <div class="pb-3 font-semibold text-2xl">1. DOWNLOAD</div>
            <div class="text-xl">
              <div>Purchasing AI recycle NFT</div>
              <div>
                <div class="flex justify-center">
                  <div class="font-medium">NFT</div>
                  <div class="ml-1 text-white font-medium on">ON</div>
                </div>
                <div class="font-medium">Automatically installing module</div>
              </div>
            </div>
          </div>
          <div>
            <div class="mt-20 pb-4 font-semibold text-2xl">2. RUN - GOING UP STAIRS</div>
            <div class="text-xl">
              <div class="flex justify-center">
                <div class="pb-3 font-medium">A. First floor</div>
                <img class="px-2" src="@/assets/images/nfc.png">
                <div class="pb-3 font-medium">tag</div>
              </div>
              <div class="flex justify-center py-1">
                <div class="pb-3 font-medium">B. Take a break every 2 floor</div>
                <img class="px-2" src="@/assets/images/nfc.png">
                <div class="pb-3 font-medium">tag</div>
              </div>
              <div class="flex justify-center">
                <div class="pb-3 font-medium">C. Final floor</div>
                <img class="px-2" src="@/assets/images/nfc.png">
                <div class="pb-3 font-medium">tag</div>
              </div>
              <div class="flex justify-center pt-4">
                <img src="@/assets/images/제로퀘스트1층.png">
                <img src="@/assets/images/제로퀘스트5층.png">
              </div>
            </div>
          </div>
          <div>
            <div class="mt-20 pb-3 font-semibold text-2xl">3. TERMINATION AND COMPENSATION</div>
            <div class="mb-10 font-medium text-xl">When you did, you’ll get ESG point<br>
              ESG points can swap ESG token
            </div>
            <div>+</div>
            <div class="font-medium text-xl">You can find out where the NFC is installed <br>
              on the stairs of ZeroQuest on the map
            </div>
          </div>
          <div class="pb-8 mt-32 font-bold text-2xl">
            What if there is a building with an elevator? <br>
            Through a request to install <br>
            'Stair Climb'Try installing NFC
          </div>
          <button type="button" class="
            moduleBtnBg
            text-white 
            font-medium
            text-sm 
            mt-4
            wp-80
            h-24
            text-2xl
            text-center" @click="goToGoogleForm">Request to install 'Stair Climbing'
          </button>
          <div class="pb-8 mt-12 font-bold text-2xl">
            You can apply for a stair climbing installation
            in our neighborhood
          </div>
          <div class="mt-20 text-2xl font-medium">
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
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const locale = computed(() => store.state.system.locale)

const goToGoogleForm = () => {
  window.open('https://docs.google.com/forms/d/e/1FAIpQLSc0DY0h1l9CM2bP9yWwBbmJFbjXq1owwtO8tAuJgXm8Ej6Sbg/viewform', '_blank')
}
</script>

<style lang="scss" scoped>
.on {
  width: 36px;
  height: 16px;
  background-color: #36CF34;
  border-radius: 5px;
}

.moduleBtnBg {
  background-color: #0C5D25;
  border-radius: 20px;
}
</style>