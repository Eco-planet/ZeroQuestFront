<template>
  <div>
    <div class="mx-10">
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
        <p v-if="nftId === '4'" class="mb-16 font-bold text-2xl text-center">
          1. Sales Schedule: 
          <br/>December 8th onwards, TBA <br />
          2. Price: 500 ESG points<br />
          3. Reward: 50 ESG points<br/> daily for 300 days<br/>
        </p>
        <p v-if="nftId === '5'" class="mb-16 font-bold text-2xl text-center">
          1. Sales Schedule: 
          <br/>December 15th onwards, TBA <br />
          2. Price: 500 ESG points<br />
          3. Reward: 50 ESG points <br/>daily for 300 days<br/>
        </p>
        <p v-if="nftId === '6'" class="mb-16 font-bold text-2xl text-center">
          1. Sales Schedule: 
          <br/>December 22nd onwards, TBA<br />
          2. Price: 500 ESG points<br />
          3. Reward: 50 ESG points<br/> daily for 300 days<br/>
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
