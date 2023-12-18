<template>
  <div>
    <div v-if="locale === 'kr'">
      <div>
        <h5 v-if="nftId === '7'" class="pb-8 text-3xl text-black font-semibold">
          멸종위기 동물관심 1탄<br> 
          레드판다 시리즈 NFT
        </h5>
        <h5 v-if="nftId === '8'" class="pb-8 text-3xl text-black font-semibold">
          멸종위기 동물관심 2탄<br> 
          레드판다 시리즈 NFT
        </h5>
      </div>

      <div>
        <p  v-if="nftId === '7'" class=" mb-16 font-medium text-xl">
          Sapiens Red Panda NFT는  <br>
          돌도끼를 장착한 원시 팬더의 모습으로,  <br>
          고대의 자연 속 인간을 떠올리게 합니다.<br>
          멸종위기 동물에 대한 관심가지기 1탄으로<br>
          제로퀘스트가 준비한 레드판다 NFT에 <br>
          많은 관심 부탁드립니다. 
        </p>
        <p  v-else-if="nftId === '8'" class=" mb-16 font-medium text-xl">
          Adventure Red Panda NFT는 <br>
          호기심 많고 추진력 끝내주는 모험가입니다. <br>
          대항해 시대의 개척자를 상징하며, <br>
          세상을 탐구하기 위해 끊임없이 모험을 합니다.<br>
          멸종위기 동물에 대한 관심가지기, <br>
          2탄으로 제로퀘스트가 준비한 레드판다 NFT에  <br>
          많은 관심 부탁드립니다.
        </p>
      </div>
   
      <div class="flex justify-center">
        <p class="mb-16 font-bold text-2xl text-left">
          1. 판매일정 : 12월 8일 ~ 미정 <br>
          2. 가격 : 500ESG point<br>
          3. 리워드 : 300일 동안 매일 <br>50 ESG point를 지급합니다 
        </p>
      </div>
      <p class="mb-10 font-medium text-xl">
        멸종 위기 동물 레드판다에게 관심을 가져 주세요.
      </p>
      <p class="mb-10 font-medium text-xl">
        레드판다는 점점 개체수가 적어지고 있습니다.<br>
        서식지와 개체수에 대한 생태계 조사 자료는 부족하지만 <br>
        개체 수가 적은 원인은 개발로 인한 서식지 파괴,<br>
        가죽이나 애완목적의 밀렵이 중요한 원인입니다.<br>
        또한 레드판다는 육아를 싫어해서 개체의 수가 <br>
        잘 늘지 않는 것도 원인이라고 하네요.
      </p>
      <p class="mb-10 font-medium text-xl">
        중국, 인도, 네팔, 부탄, 미얀마 북부 등에서 <br>
        소수나마 서식하고 있으며,<br>
        총 개체수는 대략 5000여 마리 정도로 추산됩니다.<br>
        그중 약 800마리 정도가 동물원에서 사육중이며,<br>
        특히 일본은 레서판다의 사육번식에 <br>
        성공한 이래 200마리가량이나 보유하고 있습니다.
      </p>
      <p class="mb-10 font-medium text-xl">
        래서판다에게는 근연종이 없어서, 만약 멸종 가까이 가면 <br>
        복구는 절망적이라고 합니다.
      </p>
      <p class="mb-16 font-medium text-xl">
        세계자연보전연맹(IUCN)이 정한 Red List에서 <br>
        취약(Vulnerable)종으로 등록되었다가<br>
        2015년부로 상황이 더 안 좋아졌는지<br>
        위험(Endangered)으로 상향 되었습니다.<br>
        우리의 관심이 더 많이 필요할 때 입니다.
      </p>
      <div class="mt-32 text-2xl font-medium">자발적 탄소감축 플랫폼</div>
      <div class="flex justify-center">
        <img class="pt-4" src="@/assets/images/zero.png">
      </div>
    </div>
    <div v-else>
      <div>
        <h5 v-if="nftId === '7'" class="pb-8 text-3xl text-black font-semibold">
          Interest in endangered animals part 1<br>
          Red Panda Series NFT"
        </h5>
        <h5 v-if="nftId === '8'" class="pb-8 text-3xl text-black font-semibold">
          Interest in endangered animals part 2<br>
          Red Panda Series NFT"
        </h5>
      </div>
      <div>
        <p v-if="nftId === '7'" class=" mb-16 font-medium text-xl">
          In the form of a primitive panda equipped with a stone axe,  <br>
          It reminds me of humans in ancient nature.  <br>
          Part 1 of becoming interested in endangered animals<br>
          Red Panda NFT prepared by ZeroQuest <br>
          We ask for your interest.
        </p>
        <p v-if="nftId === '8'" class=" mb-16 font-medium text-xl">
          He is a curious and driven adventurer.  <br>
          Symbolizing the pioneers of the Age of Exploration,  <br>
          We constantly go on adventures to explore the world.<br>
          Part 2: Red Panda NFT prepared by ZeroQuest<br>
          We ask for your interest.
        </p>
      </div>
      <div class="flex justify-center">
        <p class="mb-16 font-bold text-2xl text-left">
          1. Sales schedule: December 8 ~ TBC<br>
          2. Price: 500 ESG points.<br>
          3. Reward: 50 ESG points are paid <br>
          every day for 300 days.
        </p>
      </div>
      <p class="mb-10 font-medium text-xl">
        Please pay attention to the endangered animal, the red panda.
      </p>
      <p class="mb-10 font-medium text-xl">
        The number of red pandas is gradually decreasing.<br>
        Although there is a lack of ecological survey data <br>
        on habitat and population, <br>
        The reason for the low population <br>
        is habitat destruction due to development,<br>
        Poaching for leather or pets is an important cause.<br>
        In addition, red pandas do not like raising children, <br>
        so the number of individuals <br>
        It is said that the reason is that it does not increase well.
      </p>
      <p class="mb-10 font-medium text-xl">
        In China, India, Nepal, Bhutan, northern Myanmar, etc. <br>
        There are only a small number of them,<br>
        The total population is estimated to be approximately 5,000.<br>
        Of these, approximately 800 are being raised in zoos,<br>
        In particular, Japan is involved <br>
        in the breeding and breeding of red pandas. <br>
        Since its success, we have about 200 of them.
      </p>
      <p class="mb-10 font-medium text-xl">
        The red panda has no related species, <br>
        so if it gets close to extinction, <br>
        Recovery is said to be hopeless.
      </p>
      <p class="mb-16 font-medium text-xl">
        From the Red List established <br>
        by the International Union for Conservation of Nature (IUCN) <br>
        Registered as Vulnerable species<br>
        Has the situation gotten worse since 2015<br>
        It has been upgraded to Endangered.<br>
        It's time for more of our attention.
      </p>
      <div class="mt-32 text-2xl font-medium">Voluntary Carbon Reduction Platform</div>
      <div class="flex justify-center">
        <img class="pt-4" src="@/assets/images/zero.png">
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex"
import router from "@/router"

const store = useStore()
const locale = computed(() => store.state.system.locale)
const nftId = router.currentRoute.value.params.idx 
</script>

<style lang="scss" scoped>

</style>