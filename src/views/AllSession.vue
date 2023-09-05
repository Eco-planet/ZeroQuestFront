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
      focus:ring-4 
      focus:ring-green-300 
      "
      >
        <option v-for="session in allSession.allSessionData" :key="session.idx" :value=session.idx>{{ session.title }}</option>
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
        <p class="mr-2 entryBoxInfo2">{{ date(nowSession?.createdAt)}}</p> ~ 
        <p class="ml-2 entryBoxInfo2">{{ date(nowSession?.period) }}</p>
      </div>
    </div>
    <!-- 카드 -->
    <!-- row에 카드2개씩 -->
    <div class="mt-5 grid grid-cols-2 gap-card"
    :class="nowSessionItems.length>10 ? '': 'cardMediaBottom'">
        <!-- 카드1 -->
      <div v-for="(item) in nowSessionItems.slice(0,moreLimit)" :key="item.idx" class="mt-7 p-5 bg-white">
        <!-- 하트버튼 -->
        <div href="#" 
        class="
        w-full
        text-xl
        text-white 
        py-2 
        focus:ring-4 
        focus:ring-green-300 
        cardTbtn"
        >
          <div class="flex justify-center">
            <div class="pr-4">Vote.</div>
            <div class="flex">
              <div>
                <img class="w-8" src="../assets/images/img_icon_heart_white.png"/>
              </div>
              <div>{{ item.vote }}</div>
            </div>
          </div>
        </div>
          <!-- 테테루그림 -->
        <div class="flex justify-center mt-4">
          <img class="w-full cardImg" :src="item.image"/>
        </div>
        <!-- teteru bear -->
        <div class="pt-2 pb-2 font-medium text-truncate cardText">{{ item.title }}</div>      
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
    mediaBottom"
    >MORE
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'
import http from "@/api/http"
import { useRoute } from 'vue-router'

const route = useRoute()
const recentSessionIdx = ref(route.params.recentSessionIdx)

const allSession = reactive({
  allSessionData : []
})

onMounted(()=>{
  allSessions()
})

//allSession 백엔드 api 엔드포인트로 get요청보내는 함수
//여기 contents도 들어있다
const allSessions = () => {
  http.get("/api/battle/allSession")
  .then((response) => {
    allSession.allSessionData = response.data.data
  })
  .catch((error)=>{
    alert(error)
  })
}

// 드롭다운 value === session의 id
const sessionSort = ref(Number(recentSessionIdx.value))

//드롭다운 value로 해당하는 session id를 찾아 화면에 뿌려줌
const nowSession= computed(()=>{
  if(allSession.allSessionData){
    return allSession.allSessionData.find((e)=> e.idx === sessionSort.value)
  } 
})
const date = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

//현재 sessionid에 해당하는entries를 화면에 뿌려줌
const nowSessionItems = computed(()=>{
  if(allSession && allSession.allSessionData){
    const nowSession = allSession.allSessionData.find(e => e.idx === sessionSort.value)

    return nowSession ? nowSession.contents.sort((a,b) => b.vote - a.vote) : []
  }
})

//더보기
const moreLimit = ref(10)
const moreBtn = () => {
  moreLimit.value +=10;
}
</script>

<style lang="scss" scoped>
.entryBoxInfo {
  font-size: clamp(1.2rem, 3.5vw, 3rem);
}

.entryBoxInfo2 {
  font-size: clamp(1rem, 3vw, 2rem);
}

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

  .mediaBottom {
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