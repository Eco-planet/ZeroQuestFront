<template>
  <div class="flex flex-col justify-center mm">
    <div class="h-8"></div>
    <!-- battle -->
    <div class="flex justify-between mb-10">
      <div class="flex font-semibold text-3xl">Battle</div>
      <button type="button" class="
      mt-1.5
      w-24
      h-10
      text-white 
      text-sm 
      rounded-full
      entryBtn" @click="myEntry">
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
      <!-- <img class="w-full object-cover bannerImg" :src="nowSession?.bannerImg"> -->
      <img class="w-full object-cover bannerImg" :src="recentSession?.banner">
    </div>
    <!-- 박스 -->
    <div class="mt-7 p-3 w-auto">
      <div class="flex justify-between">
        <div>
          <p class="font-semibold text-left entryBoxInfo">{{ recentSession?.title }}</p>
          <p class="pb-4 entryBoxInfo text-start">
            <span class="font-semibold">
              Topic :
            </span>
            {{ recentSession?.topic }}
          </p>
        </div>
        <button type="button" class="
        mt-1.5
        text-white 
        font-medium 
        text-sm 
        rounded-lg
        entryBtn" @click="entryBtn(recentSession?.idx)">
          Entry
        </button>
      </div>
      <div class="flex">
        <p class="mr-2 entryBoxInfo2">{{ date(recentSession?.createdAt) }}</p> ~
        <p class="ml-2 entryBoxInfo2">{{ date(recentSession?.period) }}</p>
      </div>
    </div>

    <!--드롭다운-->
    <div class="grid grid-cols-1 gap-card mt-10">
      <select v-model="sortBtn" class="border-solid
      border-1
      border-gray-300
      font-medium
      text-xl
      p-8 
      py-2.5 
      text-center 
      inline-flex 
      items-center 
      focus:ring-4 
      focus:ring-green-300 
      ">
        <option value="Vote">Vote</option>
        <option value="Title">Title</option>
      </select>
    </div>
    <!-- 카드 -->
    <!-- row에 카드2개씩 -->
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="recentSessionCard && recentSessionCard.cardData" class="grid grid-cols-2 gap-card">
      <!-- 카드1 -->
      <div v-for="item in newItems.slice(0, moreLimit)" :key="item.idx" class="mt-7 p-5 bg-white">
        <!-- 하트버튼 -->
        <div href="#" class="
        w-full
        text-xl
        text-white 
        py-2 
        cardTbtn">
          <div class="flex justify-center">
            <div class="pr-4">Vote.</div>
            <div class="flex">
              <div>
                <img class="w-8" src="../assets/images/img_icon_heart_white.png" />
              </div>
              <div>{{ item.vote }}</div>
            </div>
          </div>
        </div>
        <!-- 테테루그림 -->
        <div class="flex justify-center mt-4" @click="detailInfo(item.address, item.session_id, item.idx)">
          <img class="w-full cardImg" :src="item.image" />
        </div>
        <!-- teteru bear -->
        <div class="pt-2 pb-2 font-medium text-truncate cardText">{{ item.title }}</div>
        <!--굿버튼  -->
        <div>
          <button type="button" data-modal-target="staticModal" data-modal-toggle="staticModal" href="#" class="
          text-xl
          text-white 
          cardBbtn" @click="openModal(item.idx, item.uid)">
            Vote
          </button>
        </div>
      </div>
    </div>
   
    <voting :voteIdx = "voteIdx" @close-modal="isModalChange" v-if="isModalOpen">
    </voting>
    <completedVote @close-modal="modalChange" v-if="modalOpen"></completedVote>

    <!-- 더보기버튼 -->
    <button href="#" v-if="recentSessionCard.cardData.length > 10" @click="moreBtn" class="
    my-32
    text-xl
    text-white 
    py-2 
    font-semibold
    moreBtn">MORE
    </button>

    <!-- Past Session -->
    <button type="button" class="mt-10 flex justify-end items-center mediaBottom" @click="AllSession(recentSession?.idx)">
      <div class="pr-4 sessionBtn">Past Sessions</div>
      <img class="sessionImg" src="../assets/images/img_icon_trangle.png" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue'
import router from "@/router"
import voting from "@/components/Modal/VoteBtn.vue"
import completedVote from "@/components/Modal/completedVote.vue"
import http from "@/api/http"
import { useStore } from "vuex"

const store = useStore()

const userVote = computed(() => Number(store.getters["auth/getUserVote"]))
const battleCardData = computed(()=> store.getters.cardData)
const myUid = computed(() =>store.getters["auth/getUserId"])
console.log("myUid",myUid.value)

const entryBtn = (sessionId: number) => {

  const updataDataSave = {
    entryImage: "",
    entryTitle: "",
    entryDesc: "",
    entryIdx: ""
  }

  store.dispatch('updateEntryInfo', updataDataSave)

  router.push({
    params: { sessionId },
    name: 'entryPage'
  })
}

const recentSession = ref()
const recentSessionCard = reactive({
  cardData: []
})

const isLoading = ref(true)

onMounted(() => {
  console.log("투표 끝났니?")
  isLoading.value = true
  battleSession()
})

//session 백엔드 api 엔드포인트로 get요청보내는 함수
const battleSession = () => {

  http.get("/api/battle/session")
    .then((response) => {
      recentSession.value = response.data.data;
      recentSessionCard.cardData = response.data.data.contents;
      
      store.dispatch('cardData', recentSessionCard.cardData)

      isLoading.value = false
    })
    .catch((error) => {
      alert(error)

    })
}

const date = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString();
}

//esgp
const getBalances = store.getters["auth/getBalances"].ESGP.balance

//default sorting
const sortBtn = ref("Vote")

//sorting기능 //현재 session에 해당하는 카드데이터만 보여줌
// const newItems = computed(() => {
//   switch (sortBtn.value) {
//     case "Vote":
//       return recentSessionCard.cardData.slice().sort((a, b) => b.vote - a.vote)
//     case "Title":
//       return recentSessionCard.cardData.slice().sort((a, b) => a.title.localeCompare(b.title))
//   }
//   return recentSessionCard.cardData
// })

const newItems = computed(() => {
  switch (sortBtn.value) {
    case "Vote":
      return battleCardData.value.slice().sort((a, b) => b.vote - a.vote)
    case "Title":
      return battleCardData.value.slice().sort((a, b) => a.title.localeCompare(b.title))
  }
})

//더보기
const moreLimit = ref(10)
const moreBtn = () => {
  moreLimit.value += 10;
}

//모달
const isModalOpen = ref(false)
const modalOpen = ref(false)

const voteIdx = ref()

const openModal = (voteDataidx: number, voteUid:string) => {
  voteIdx.value = voteDataidx

  if(myUid.value === voteUid){
    alert("You cannot vote on your own content")
  }else {
    if(userVote.value>0){
      isModalOpen.value = true
    }else{
      modalOpen.value = true
    }
  }



}
const isModalChange = (voteModalEmit: boolean) => {
  isModalOpen.value = voteModalEmit
}

const modalChange = (voteModalEmit: boolean) => {
  modalOpen.value = voteModalEmit
}

// router
const myEntry = () => {

  router.push({
    path: '/myEntry',
    name: 'myEntry'
  })
}

const detailInfo = (walletAddress: string, sessionId: number, cardIdx: number) => {

  router.push({
    params: { walletAddress, sessionId, cardIdx },
    name: 'battleDetailInfo'
  })
}

const AllSession = (recentSessionIdx: number) => {

  router.push({
    params: { recentSessionIdx },
    name: 'AllSession'
  })
}
</script>

<style lang="scss" scoped>
.text-esg-color {
  color: #24d120
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
  height: 28px;
  background-color: #24d120;
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

.cardImg:hover {
  transform: translateY(-0.4rem);
  cursor: pointer;
}

.cardText {
  font-size: clamp(1.5rem, 4.3vw, 3rem);
}

.cardBbtn {
  background-color: #24d120;
  width: 24vw;
  max-width: 300px;
  height: 30px;
  border-radius: 7px;
}

.moreBtn {
  background-color: #24d120;
  border-radius: 7px;
}

.sessionBtn {
  font-size: clamp(1.5rem, 3.3vw, 2rem);
  color: #18C050;
}

.sessionImg {
  width: 4vw;
  max-width: 15px;
}

.mediaBottom {
  margin-bottom: 70px;

  @media(min-width:768px) {
    margin-bottom: 200px;
  }
}
</style>@/utils/LogoState@/utils/Logo