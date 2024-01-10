<template>
  <div>
    <div v-if="locale === 'kr'">
      <div>
        <h5 v-if="nftId === '4'" class="pb-8 text-3xl text-black font-semibold">
          멸종위기 동물관심 1탄<br />
          레드판다 시리즈 NFT
        </h5>
        <h5 v-if="nftId === '5'" class="pb-8 text-3xl text-black font-semibold">
          멸종위기 동물관심 2탄<br />
          레드판다 시리즈 NFT
        </h5>
        <h5 v-if="nftId === '6'" class="pb-8 text-3xl text-black font-semibold">
          멸종위기 동물관심 3탄<br />
          하늘다람쥐 시리즈 NFT
        </h5>
      </div>
      <div>
        <p v-if="nftId === '4'" class="mb-16 font-medium text-xl">
          Sapiens Red Panda NFT는 <br />
          돌도끼를 장착한 원시 팬더의 모습으로, <br />
          고대의 자연 속 인간을 떠올리게 합니다.<br />
          멸종위기 동물에 대한 관심가지기 1탄으로<br />
          제로퀘스트가 준비한 레드판다 NFT에 <br />
          많은 관심 부탁드립니다.
        </p>
        <p v-else-if="nftId === '5'" class="mb-16 font-medium text-xl">
          Adventure Red Panda NFT는 <br />
          호기심 많고 추진력 끝내주는 모험가입니다. <br />
          대항해 시대의 개척자를 상징하며, <br />
          세상을 탐구하기 위해 끊임없이 모험을 합니다.<br />
          멸종위기 동물에 대한 관심가지기, <br />
          2탄으로 제로퀘스트가 준비한 레드판다 NFT에 <br />
          많은 관심 부탁드립니다.
        </p>
        <p v-if="nftId === '6'" class="mb-16 font-medium text-xl">
          하늘다람쥐 NFT는 <br />
          깨끗한 공기 속에서 친구들과 <br />
          자유로이 활공하고 싶은 <br />
          꿈을 가진 하늘 다람쥐 NFT 입니다.<br />
        </p>
      </div>

      <div class="flex justify-center">
        <p v-if="nftId === '4'" class="mb-16 font-bold text-2xl text-left">
          1. 판매일정 : 12월 8일 ~ 미정 <br />
          2. 가격 : 500ESG point<br />
          3. 리워드 : 300일 동안 매일 <br />50 ESG point를 지급합니다
        </p>
        <p v-if="nftId === '5'" class="mb-16 font-bold text-2xl text-left">
          1. 판매일정 : 12월 15일 ~ 미정 <br />
          2. 가격 : 500ESG point<br />
          3. 리워드 : 300일 동안 매일 <br />50 ESG point를 지급합니다
        </p>
        <p v-if="nftId === '6'" class="mb-16 font-bold text-2xl text-left">
          1. 판매일정 : 12월 22일 ~ 미정<br />
          2. 가격 : 500ESG point<br />
          3. 리워드 : 300일 동안 매일 <br />50 ESG point를 지급합니다
        </p>
      </div>
      <div>
        <p v-if="nftId === '4'" class="mb-10 font-medium text-xl">
          멸종 위기 동물들에게 관심을 가져 주세요.
        </p>
        <p v-if="nftId === '5'" class="mb-10 font-medium text-xl">
          멸종 위기 동물들에게 관심을 가져 주세요.
        </p>
        <p v-if="nftId === '6'" class="mb-10 font-medium text-xl">
          멸종 위기 동물 하늘다람쥐에게 관심을 가져 주세요.
        </p>
      </div>

      <div v-if="nftId === '4' || nftId === '5'">
        <p class="mb-10 font-medium text-xl">
          레드판다는 점점 개체수가 적어지고 있습니다.<br />
          서식지와 개체수에 대한 생태계 조사 자료는 부족하지만 <br />
          개체 수가 적은 원인은 개발로 인한 서식지 파괴,<br />
          가죽이나 애완목적의 밀렵이 중요한 원인입니다.<br />
          또한 레드판다는 육아를 싫어해서 개체의 수가 <br />
          잘 늘지 않는 것도 원인이라고 하네요.
        </p>
        <p class="mb-10 font-medium text-xl">
          중국, 인도, 네팔, 부탄, 미얀마 북부 등에서 <br />
          소수나마 서식하고 있으며,<br />
          총 개체수는 대략 5000여 마리 정도로 추산됩니다.<br />
          그중 약 800마리 정도가 동물원에서 사육중이며,<br />
          특히 일본은 레서판다의 사육번식에 <br />
          성공한 이래 200마리가량이나 보유하고 있습니다.
        </p>
        <p class="mb-10 font-medium text-xl">
          래서판다에게는 근연종이 없어서, 만약 멸종 가까이 가면 <br />
          복구는 절망적이라고 합니다.
        </p>
        <p class="mb-16 font-medium text-xl">
          세계자연보전연맹(IUCN)이 정한 Red List에서 <br />
          취약(Vulnerable)종으로 등록되었다가<br />
          2015년부로 상황이 더 안 좋아졌는지<br />
          위험(Endangered)으로 상향 되었습니다.<br />
          우리의 관심이 더 많이 필요할 때 입니다.
        </p>
      </div>

      <div v-if="nftId === '6'">
        <p class="mb-10 font-medium text-xl">
          무분별한 개발과 산림 훼손은<br />
          하늘다람쥐의 서식지를 줄여가고 있습니다. <br />
          이들은 특히 높은 나무와<br />
          풍부한 식생이 있는 숲에 의존하는데,<br />
          이러한 환경이 점차 줄어들면서 <br />
          서식 가능한 지역이 감소하고 있습니다.
        </p>
        <p class="mb-10 font-medium text-xl">
          또한 전 세계적인 기후 변화는 <br />
          그들의 서식지인 아고산지대의 생태계에<br />
          큰 영향을 미치고 있습니다.<br />
          기온 상승으로 인해 선호하는 식물의 분포가 변하거나,<br />
          먹이가 되는 나무와 식물이 고사하는 <br />
          현상들이 일어나고 있습니다.
        </p>
        <p class="mb-10 font-medium text-xl">
          우리의 관심으로 하늘다람쥐가 <br />
          마음껏 하늘을 날 수 있도록 해주세요
        </p>
        <p class="mb-16 font-medium text-xl">
          ESG Financial은<br />
          이러한 현상에 대한 심각성을 느끼고 <br />
          멸종위기동물을 소개해드리면서 <br />
          이것에 대한 인식을 높이고자 합니다.<br />
          또한 멸종위기동물NFT 시리즈의 수익금은<br />
          동물 보호 단체에 기부할 예정이니<br />
          많은 관심과 참여 부탁드립니다.
        </p>
      </div>

      <div class="mt-32 text-2xl font-medium">자발적 탄소감축 플랫폼</div>
      <div class="flex justify-center">
        <img class="pt-4" src="@/assets/images/zero.png" />
      </div>
    </div>

    <div v-else>
      <div>
        <h5 v-if="nftId === '4'" class="pb-8 text-3xl text-black font-semibold">
          Endangered Animals Awareness Series 1<br />
          Red Panda Series NFT
        </h5>
        <h5 v-if="nftId === '5'" class="pb-8 text-3xl text-black font-semibold">
          Endangered Animals Awareness Series 2<br />
          Red Panda Series NFT
        </h5>
        <h5 v-if="nftId === '6'" class="pb-8 text-3xl text-black font-semibold">
          Endangered Animals Awareness Series 3<br />
          Flying Squirrel Series NFT
        </h5>
      </div>

      <div>
        <p v-if="nftId === '4'" class="mb-16 font-medium text-xl">
          Sapiens Red Panda NFT features a primitive panda armed with an axe,<br />
          evoking the image of humans in ancient nature.<br />
          As the first part of our series to raise awareness for endangered
          animals,<br />
          we invite you to take an interest in our Red Panda NFT prepared by
          ZeroQuest.
        </p>
        <p v-else-if="nftId === '5'" class="mb-16 font-medium text-xl">
          Adventure Red Panda NFT is an adventurous explorer with great
          curiosity and drive.<br />
          Symbolizing the explorers of the Age of Discovery,<br />
          it constantly adventures to explore the world.<br />
          As part of our endangered animal awareness series,<br />
          we invite you to take an interest in our Red Panda NFT prepared by
          ZeroQuest.
        </p>
        <p v-if="nftId === '6'" class="mb-16 font-medium text-xl">
          The Flying Squirrel NFT dreams of gliding freely with friends<br />
          in the clean air.<br />
          Please show your interest in this endangered animal, the flying
          squirrel NFT.
        </p>
      </div>

      <div class="flex justify-center">
        <p v-if="nftId === '4'" class="mb-16 font-bold text-2xl text-left">
          1. Sale Schedule: December 8th onwards, TBA <br />
          2. Price: 500 ESG points<br />
          3. Reward: 50 ESG points daily for 300 days
        </p>
        <p v-if="nftId === '5'" class="mb-16 font-bold text-2xl text-left">
          1. Sale Schedule: December 15th onwards, TBA <br />
          2. Price: 500 ESG points<br />
          3. Reward: 50 ESG points daily for 300 days
        </p>
        <p v-if="nftId === '6'" class="mb-16 font-bold text-2xl text-left">
          1. Sale Schedule: December 22nd onwards, TBA<br />
          2. Price: 500 ESG points<br />
          3. Reward: 50 ESG points daily for 300 days
        </p>
      </div>
      <div>
        <p v-if="nftId === '4'" class="mb-10 font-medium text-xl">
          Please show your interest in endangered animals.
        </p>
        <p v-if="nftId === '5'" class="mb-10 font-medium text-xl">
          Please show your interest in endangered animals.
        </p>
        <p v-if="nftId === '6'" class="mb-10 font-medium text-xl">
          Please show your interest in the endangered flying squirrel.
        </p>
      </div>

      <div v-if="nftId === '4' || nftId === '5'">
        <p class="mb-10 font-medium text-xl">
          Red pandas are becoming increasingly scarce.<br />
          Despite limited data on their habitat and population,<br />
          habitat destruction due to development and poaching for fur or pets
          are major causes.<br />
          Also, red pandas dislike parenting, contributing to their slow
          population growth.
        </p>
        <p class="mb-10 font-medium text-xl">
          They are found in small numbers in northern China, India, Nepal,
          Bhutan, and Myanmar,<br />
          with an estimated total population of around 5,000,<br />
          of which about 800 are bred in zoos.<br />
          Especially Japan has about 200 red pandas following successful
          breeding programs.
        </p>
        <p class="mb-10 font-medium text-xl">
          With no close relatives, the extinction of the red panda would be a
          dire loss.<br />
          Upgraded from Vulnerable to Endangered on the IUCN Red List in
          2015,<br />
          the situation has worsened and calls for our increased attention.
        </p>
        <p class="mb-16 font-medium text-xl">
          The International Union for Conservation of Nature (IUCN) has listed
          it as Endangered,<br />
          indicating the need for greater awareness and action.
        </p>
      </div>

      <div v-if="nftId === '6'">
        <p class="mb-10 font-medium text-xl">
          Indiscriminate development and deforestation are reducing the flying
          squirrel's habitat.<br />
          They rely on forests with tall trees and abundant vegetation,<br />
          but these environments are dwindling, shrinking their habitable areas.
        </p>
        <p class="mb-10 font-medium text-xl">
          Global climate change also significantly affects their montane
          ecosystem.<br />
          Rising temperatures alter the distribution of their preferred
          plants,<br />
          leading to the death of trees and plants they feed on.
        </p>
        <p class="mb-10 font-medium text-xl">
          Your interest can help the flying squirrels soar freely in the sky.
        </p>
        <p class="mb-16 font-medium text-xl">
          ESG Financial feels the seriousness of these issues<br />
          and aims to raise awareness by introducing endangered animals.<br />
          Proceeds from the Endangered Animals NFT series will be donated to
          animal protection organizations.<br />
          We request your attention and participation.
        </p>
      </div>

      <div class="mt-32 text-2xl font-medium">
        Voluntary Carbon Reduction Platform
      </div>
      <div class="flex justify-center">
        <img class="pt-4" src="@/assets/images/zero.png" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import router from "@/router";

const store = useStore();
const locale = computed(() => store.state.system.locale);
const nftId = router.currentRoute.value.params.idx;
console.log("nftId", nftId);
</script>

<style lang="scss" scoped></style>
