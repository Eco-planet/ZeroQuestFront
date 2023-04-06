<template>
  <div class="flex flex-col justify-center items-center mm">
    <div class="h-8"></div>
    <div class="flex flex-col w-full">
      <div class="text-3xl font-semibold text-left">O!NFT</div>
      <div class="h-8"></div>
      <div class="flex justify-center slider"><img src="@/assets/images/banner00.jpg" alt=""></div>
    </div>
    <div class="h-10"></div>
    <div class="flex w-full">
      <div class="text-2xl font-semibold text-left">My NFT</div>
    </div>
    <div class="h-10"></div>
    <NftList />
    <div class="h-10"></div>
    <div class="h-10"></div>
    <div class="h-10"></div>
   </div>
</template>

<script lang="ts" setup>
import store from "@/store";
import NftList from "@/components/OpenNftView.vue";
</script>

<style lang="scss">
.nftImg {
  width:100%;
  height:100%;
  object-fit:cover;
  object-position: center top;
  height: 100px;
}

.nftOn  {
  background-color: #24d120;
}

.nftOff  {
  background-color: #ccc;
}

</style>
