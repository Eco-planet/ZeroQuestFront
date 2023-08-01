<template>
  <div class="flex flex-col justify-center mm">
    <div class="h-8"></div>
    <!-- All Session-->
    <div class="flex">    
      <div class="flex font-semibold text-4xl">My Entry</div>
    </div>
    <!-- 카드 -->
    <!-- row에 카드2개씩 -->
    <div class="mt-1 grid grid-cols-2 gap-card"
    :class="myEntries.length>10 ? '': 'cardMediaBottom'">
        <!-- 카드1 -->
      <div v-for="(item) in myEntries.slice(0,moreLimit)" :key="item.id" class="mt-7 p-5 bg-white">
        <!-- 하트버튼 -->
        <div href="#" 
        class="
        w-full
        text-xl
        text-white 
        py-2 
        focus:ring-4 
        focus:ring-green-300 
        dark:bg-green-600 
        dark:hover:bg-green-700 
        dark:focus:ring-green-800
        cardTbtn"
        >
          <div class="flex justify-center">
            <div class="pr-4">Vote.</div>
            <div class="flex">
              <div>
                <img class="w-8" src="../assets/images/img_icon_heart_white.png"/>
              </div>
              <div>{{ item.like }}</div>
            </div>
          </div>
        </div>
          <!-- 테테루그림 -->
        <div class="flex justify-center mt-4">
          <img class="w-full cardImg" :src="item.img"/>
        </div>
        <!-- teteru bear -->
        <div class="pt-2 pb-2 font-medium text-truncate cardText">{{ item.cardName }}</div>    
      </div>
    </div>
    <!-- 더보기버튼 -->
    <button href="#" 
    v-if="myEntries.length >10"
    @click="moreBtn"
    class="
    mt-32
    text-xl
    text-white 
    py-2 
    font-semibold
    focus:ring-4 
    focus:ring-green-300 
    dark:bg-green-600 
    dark:hover:bg-green-700 
    dark:focus:ring-green-800
    moreMediaBottom"
    >더보기
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import router from "@/router"
import { entries } from '@/utils/mockData'


const myAddress = router.currentRoute.value.params.myAddress

const myEntries = entries.filter((e)=>{
  return e.wallet_address === myAddress
}).sort((a,b) => b.like - a.like)

//더보기
const moreLimit = ref(10)
const moreBtn = () => {
  moreLimit.value +=10;
}

</script>

<style lang="scss" scoped>
  .cardTbtn {
    background-color: #0c5c26;
    border-radius: 7px;
  }

  .cardImg {
    width: 33vw;
    height: 34.1vw;
    max-height: 350px;
  }

  .cardText {
    font-size: clamp(1.5rem, 4.3vw, 3rem);
  }

  .cardMediaBottom {
    margin-bottom: 70px;

    @media(min-width:768px){
      margin-bottom: 200px;
    }
  }

  .moreMediaBottom {
    margin-bottom: 70px;
    background-color: #24d120;
    border-radius: 7px;
    
    @media(min-width:400px){
      margin-bottom: 100px;
    }

    @media(min-width:768px){
      margin-bottom: 200px;
    }
  }
</style>@/utils/LogoState@/utils/Logo