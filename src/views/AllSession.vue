<template>
  <div class="flex flex-col justify-center mm">
    <div class="h-8"></div>
    <!-- All Session-->
    <div>    
      <div class="flex font-semibold text-3xl">Battle - All session</div>
    </div>
    <!--드롭다운-->
    <div class="grid grid-cols-1 gap-card mt-10">
      <!-- 1 -->
      <select
      v-model="sessionSort"
      class="border-solid
      border-1
      border-gray-300
      focus:outline-none 
      font-medium
      text-xl
      py-2.5 
      inline-flex 
      items-center 
      dark:focus:ring-green-800
      focus:ring-4 
      focus:ring-green-300 
      dark:bg-green-600 
      dark:hover:bg-green-700 
      "
      >
        <option v-for="session in sessions" :key="session.id" :value=session.id>{{ session.title }}</option>
      </select>
    </div>
    <!-- 박스 -->
    <div class="mt-2 p-3 w-auto">
      <div class="flex justify-between">
        <div>       
          <p class="font-semibold text-left entryBoxInfo">{{ nowSession?.title }}</p>
          <p class="pb-4 entryBoxInfo text-start">
            <span class="font-semibold">
              Topic : 
            </span>
            {{ nowSession?.topic }}</p>
        </div>
      </div>
      <div class="flex"> 
        <p class="mr-2 entryBoxInfo2">2022년 3월4일</p> ~ 
        <p class="ml-2 entryBoxInfo2">222년 4월 4일</p>
      </div>
    </div>
    <!-- 카드 -->
    <!-- row에 카드2개씩 -->
    <div class="mt-5 grid grid-cols-2 gap-card">
        <!-- 카드1 -->
      <div v-for="(item) in nowSessionItems.slice(0,moreLimit)" :key="item.id" class="mt-7 p-5 bg-white">
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
    v-if="nowSessionItems.length >10"
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
    cardTbtn
    mediaBottom"
    >더보기
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { sessions, entries  } from "@/utils/mockData"

// 드롭다운 value === session의 id
const sessionSort = ref(15)

//드롭다운 value로 해당하는 session id를 찾아 화면에 뿌려줌
const nowSession= computed(()=>{
  return sessions.find(e => e.id === sessionSort.value)
})

//현재 sessionid에 해당하는entries를 화면에 뿌려줌
const nowSessionItems = computed(()=>{
  return entries
  .filter(e => e.session_id === sessionSort.value)
  .sort((a,b) => b.like - a.like)
})

//더보기
const moreLimit = ref(10)
const moreBtn = () => {
  moreLimit.value +=10;
}

</script>

<style lang="scss" scoped>
  .entryBoxInfo {
    font-size: clamp(1.2rem, 2vw, 2rem);
  }

  .entryBoxInfo2 {
    font-size: clamp(1rem, 2vw, 2rem);
  }

  .cardTbtn {
    background-color: #24d120;;
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

  .mediaBottom {
    margin-bottom: 70px;
    
    @media(min-width:400px){
      margin-bottom: 100px;
    }

    @media(min-width:768px){
      margin-bottom: 200px;
    }
  }
</style>@/utils/LogoState@/utils/Logo