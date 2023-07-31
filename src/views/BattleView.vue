<template>
  <div class="flex flex-col justify-center mm">
    <div class="h-8"></div>
    <!-- battle -->
    <div class="flex justify-between mb-10">    
      <div class="flex font-semibold text-3xl">Battle</div>
      <button 
      type="button" 
      class="
      mt-1.5
      w-24
      h-10
      focus:outline-none 
      text-white 
      hover:bg-green-800 
      focus:ring-4 
      focus:ring-green-300 
      text-sm 
      rounded-full
      dark:bg-green-600 
      dark:hover:bg-green-700 
      dark:focus:ring-green-800
      entryBtn"
      @click="myEntry(myAddress)">
      my entries
      </button>
    </div>
    <!-- my vote -->
    <div class="h-10"></div>
    <div class="flex w-full pb-2 items-center justify-between border-b border-gray-400">
      <div class="text-2xl font-semibold">ESG Point</div>
      <div class="flex items-end">
        <div class="text-3xl font-semibold text-esg-color">{{ getBalances }}</div>
        <div class="w-1"></div>
        <div class="text-2xl text-gray-400">point</div>
      </div>
    </div>
    <div class="h-10"></div>
    <!-- 테테루배너 -->
    <div class="flex justify-center">
      <img class="w-full object-cover bannerImg" :src="nowSession?.bannerImg">
    </div>
    <!-- 박스 -->
    <div class="mt-7 p-3 w-auto">
      <div class="flex justify-between">
        <div>       
          <p class="font-semibold text-left entryBoxInfo">{{ nowSession?.title }}</p>
          <p class="pb-4 entryBoxInfo text-start">
            <span class="font-semibold">
              Topic : 
            </span>
            {{ nowSession?.topic }}</p>
        </div>
        <button 
        type="button" 
        class="
        mt-1.5
        focus:outline-none 
        text-white 
        hover:bg-green-800 
        focus:ring-4 
        focus:ring-green-300 
        font-medium 
        text-sm 
        rounded-lg
        dark:bg-green-600 
        dark:hover:bg-green-700 
        dark:focus:ring-green-800
        entryBtn"
        @click="entryBtn(nowSession.id)">
        Entry
        </button>
      </div>
      <div class="flex"> 
        <p class="mr-2 entryBoxInfo2">2022년 3월4일</p> ~ 
        <p class="ml-2 entryBoxInfo2">222년 4월 4일</p>
      </div>
    </div>
  
    <!--드롭다운-->
    <div class="grid grid-cols-1 gap-card mt-10">
      <select
      v-model="sortBtn"
      class="border-solid
      border-1
      border-gray-300
      focus:outline-none 
      font-medium
      text-xl
      p-8 
      py-2.5 
      text-center 
      inline-flex 
      items-center 
      dark:focus:ring-green-800
      focus:ring-4 
      focus:ring-green-300 
      dark:bg-green-600 
      dark:hover:bg-green-700 
      "
      >
        <option value="Vote">Vote</option>
        <option value="Title">Title</option>
      </select>
    </div>
    <!-- 카드 -->
    <!-- row에 카드2개씩 -->
    <div class="grid grid-cols-2 gap-card">
        <!-- 카드1 -->
      <div v-for="item in newItems.slice(0,moreLimit)" :key="item.id" class="mt-7 p-5 bg-white">
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
              <div>{{item.like}}</div>
            </div>
          </div>
        </div>
        <!-- 테테루그림 -->
        <div class="flex justify-center mt-4" @click="detailInfo(item.wallet_address,  item.session_id)">
          <img class="w-full cardImg" :src="item.img"/>
        </div>
        <!-- teteru bear -->
        <div class="pt-2 pb-2 font-medium text-truncate cardText">{{ item.cardName }}</div>
        <!--굿버튼  -->
        <div> 
          <button
          type="button" 
          data-modal-target="staticModal" 
          data-modal-toggle="staticModal"
          href="#" 
          class="
          text-xl
          text-white 
          focus:ring-4 
          focus:ring-green-300 
          dark:bg-green-600 
          dark:hover:bg-green-700 
          dark:focus:ring-green-800
          cardBbtn"
          @click="openModal()"
          >
            Vote
          </button>
        </div>
      </div>
    </div>
    <voting  @close-modal="modalChange" v-if="isModalOpen"></voting>

    <!-- 더보기버튼 -->
    <button href="#" 
    v-if="newItems.length >10"
    @click = "moreBtn"
    class="
    my-32
    text-xl
    text-white 
    py-2 
    font-semibold
    focus:ring-4 
    focus:ring-green-300 
    dark:bg-green-600 
    dark:hover:bg-green-700 
    dark:focus:ring-green-800
    cardTbtn"
    >더보기
    </button>

    <!-- Past Session -->
    <button type="button" class="mt-10 flex justify-end items-center mediaBottom" @click="AllSession()">
      <div class="pr-4 sessionBtn">Past Sessions</div>
      <img 
      class="sessionImg" 
      src="../assets/images/img_icon_trangle.png"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import router from "@/router"
import store from "@/store";
import voting from "@/components/Modal/VoteBtn.vue"
import { sessions, entries } from "@/utils/mockData"
import { nowSessionType } from "@/types/IBattleType"



//내 임시주소
const myAddress = '0x580be183e8sdf181DAC94c72FC6dCC49Bc2c03AA62f'

//esgp
const getBalances = store.getters["auth/getBalances"].ESGP.balance

//현재 15th session
//db 최신session 1개 받아서 보여주면 됨
const nowSession:nowSessionType | undefined= sessions.find(e => e.id === 15)

//default sorting
const sortBtn = ref("Vote")

//sorting기능 //15th session에 해당하는 데이터만 보여줌
const newItems = computed(()=>{
  const newEntry = entries.filter(e => e.session_id === 15)

  switch(sortBtn.value){
    case "Vote":
      return newEntry.slice().sort((a,b) => b.like - a.like)
    case "Title":
      return newEntry.slice().sort((a, b) => a.cardName.localeCompare(b.cardName))  
  }
  return newEntry
})

//더보기
const moreLimit = ref(10)
const moreBtn = () => {
  moreLimit.value +=10;
}

//모달
const isModalOpen= ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const modalChange = (voteModalEmit:boolean) => {
  isModalOpen.value = voteModalEmit
}

// router
const myEntry = (myAddress:string) => {

  router.push({
    params:{myAddress},
    name:"myEntry"
  })
}

const entryBtn = (sessionId:number) => {

  router.push({
    params:{ sessionId },
    name:'entryPage'
  })
}

const detailInfo = (walletAddress:string,  sessionId:number) => {

  router.push({
    params:{ walletAddress, sessionId },
    name:'battleDetailInfo'
  })
}

const AllSession = () => {

  router.push({
    path:'/AllSession',
    name:'AllSession'
  })
}
</script>

<style lang="scss" scoped>

  .voteColor {
    background-color: #24d120;
  }
  .text-esg-color {
    color:#24d120
  }

  .bannerImg {
    width: 100vw;
    max-width: 620px;
    height: 19.5vw;
    max-height: 160px;
  }

  .entryBoxInfo {
    font-size: clamp(1.2rem, 2vw, 2rem);
  }

  .entryBoxInfo2 {
    font-size: clamp(1rem, 2vw, 2rem);
  }
  .entryBtn {
    width: 75.88px;
    height:28px;
    background-color: #0c5c26;
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

  .cardImg:hover {
    transform: translateY(-0.4rem);
    cursor: pointer;
  }

  .cardText {
    font-size: clamp(1.5rem, 4.3vw, 3rem);
  }

 .cardBbtn {
  background-color: #0c5c26;
  width: 24vw;
  max-width : 300px;
  height: 30px;
  border-radius: 7px;
} 

  .sessionBtn {
    font-size: clamp(1.5rem, 3.3vw, 2rem);
    color: #18C050 ;
  }

  .sessionImg {
    width: 4vw;
    max-width: 15px;
  }

  .mediaBottom {
    margin-bottom: 70px;

    @media(min-width:768px){
      margin-bottom: 200px;
    }
  }
</style>@/utils/LogoState@/utils/Logo