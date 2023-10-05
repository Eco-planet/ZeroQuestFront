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
      myEntriesBtn
     "
      @click="myEntry">
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
    <!-- 카드 이미지 -->
    <div class="flex justify-center">
      <img class="w-full object-contain mb-20" :src="findDetailEntry?.image">
    </div>
    
    <!-- 좋아요버튼 -->
    <div class="flex justify-between pt-9">
      <div class="font-semibold wp-80  text-start subText">{{ findDetailEntry?.title }}</div>
      <div class=" ">
        <button href="#" 
        class="
        flex
        justify-center
        items-center
        rounded-lg
        focus:ring-4 
        focus:ring-green-300 
        likeBtn"
        @click="openModal(findDetailEntry?.idx, findDetailEntry?.uid)"
        >
          <img class="w-7" src="../assets/images/img_icon_like.png"/>
        </button>  
      </div>
    </div>
    <!--지갑주소  -->
    <div class="flex mt-12 items-center">
      <div class="mr-2">
        <img class="walletImg" src="../assets/images/img_icon_wallet1.png"/>
      </div>
      <!-- 길어지면 뒤에 ... -->
      <div class="text-truncate walletAddress ">{{ findDetailEntry?.address }} </div>
    </div> 

    <voting :voteIdx = "voteIdx" @close-modal="isModalChange" v-if="isModalOpen">
    </voting>
    <completedVote @close-modal="modalChange" v-if="modalOpen"></completedVote>

    <!-- infoBox -->
    <div class="mt-7 p-5 w-auto rounded-lg text-start infoBox"> 
      {{ findDetailEntry?.desc }}
    </div>
    <!-- 다른 entry sub -->
    <div class="mt-9 text-start font-semibold otherEntriesText">User’s other entries in this session</div>
    <!-- 카드 -->
    <!-- row에 카드2개씩 -->
    <div class="grid grid-cols-2"
    :class="otherEntries.length>10 ? '': 'cardMediaBottom'">
        <!-- 카드1 -->
      <div v-for="(item) in otherEntries.slice(0, moreLimit)" :key="item.idx" class="p-5">
        <!-- 테테루그림 -->
        <div class="flex justify-center">
          <img class="w-full cardImg" :src="item.image"/>
        </div>
        <!-- teteru bear -->
        <div class="pt-2 pb-2 font-medium text-truncate cardText">{{ item.title }}</div> 
        <!-- 투표수 확인 -->
        <div href="#" 
        class="
        w-full
        text-xl
        text-white 
        py-2 
        focus:ring-4 
        focus:ring-green-300 
        cardVoteNum"
        >
          <div class="flex justify-center">
            <div class="pr-4">Vote.</div>
            <div>{{ item.vote }}</div>
          </div>
        </div>   
      </div>
    </div>
    <!-- 더보기버튼 -->
    <button href="#" 
    v-if="otherEntries.length >10"
    @click="moreBtn"
    class="
    text-xl
    text-white 
    py-2 
    font-semibold
    focus:ring-4 
    focus:ring-green-300 
    moreMediaBottom"
    >MORE
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import router from "@/router"
import voting from "@/components/Modal/VoteBtn.vue"
import completedVote from "@/components/Modal/completedVote.vue"
import http from "@/api/http"
import { useStore } from "vuex"
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const store = useStore()

const myUid = computed(() =>store.getters["auth/getUserId"])
const userVote = computed(() => Number(store.getters["auth/getUserVote"]))

onMounted(()=>{
  battleContents()
})

//지갑주소와 sessionId, idx가 필요한이유
//해당세션에서 해당 지갑주소에 해당하는 사람의 해당 데이터를 보여주려고
//그리고 otherEnties에서는 해당세션의 그 지갑주소에 해당하는사람의 나머지 데이터

//해당카드의 detail page니까 카드를 올린 사람의 지갑주소와 해당 session을 가지고 와서 해당하는 데이터만 보여줌
const walletAddress = router.currentRoute.value.params.walletAddress
const sessionId = router.currentRoute.value.params.sessionId
const thisCardIdx = router.currentRoute.value.params.cardIdx

//esgp
const getBalances = store.getters["auth/getBalances"].ESGP.balance

const detailCardInfo = reactive({
  cardData:[]
})

//Contents 백엔드 api 엔드포인트로 get요청보내는 함수
const battleContents = () => {
  http.get(`/api/battle/detailContents/${sessionId}/${walletAddress}`)
  .then((response)=>{
    detailCardInfo.cardData = response.data.data
  })
  .catch((error)=>{
    alert(error)
  })
}

//메인에서 클릭한 카드이미지
const findDetailEntry = computed(() => {
  if(detailCardInfo && detailCardInfo.cardData && sessionId && walletAddress && thisCardIdx){
    return detailCardInfo.cardData.find(e => 
      e.session_id === Number(sessionId) &&
      e.address === walletAddress &&
      e.idx === Number(thisCardIdx)
    )
  }
})

//이번세션에 등록한 다른 카드이미지
const otherEntries = computed(() => {
  if(detailCardInfo && detailCardInfo.cardData && sessionId && walletAddress && thisCardIdx){
    return detailCardInfo.cardData.filter((e)=>
      e.address === walletAddress &&
      e.session_id === Number(sessionId) && 
      e.idx !== Number(thisCardIdx) 
    ).sort((a,b) => b.vote - a.vote)
  }
})

//더보기
const moreLimit = ref(10)
const moreBtn = () => {
  moreLimit.value +=10;
}

//모달
const isModalOpen= ref(false)
const modalOpen = ref(false)

const voteIdx = ref()

const openModal = (voteDataidx: number, voteUid:string) => {
  voteIdx.value = voteDataidx

  if(myUid.value === voteUid){
    alert(t("message.vote"))
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
const myEntry = (myAddress:string) => {

  router.push({
    params:{myAddress},
    name:"myEntry"
  })
}
</script>

<style lang="scss" scoped>
  .myEntriesBtn {
    background-color: #24d120;
  }

  .text-esg-color {
    color:#24d120
  }

  .bannerImg {
    width: 100vw;
    max-width: 700px;
  
   
  }

  .subText {
    font-size: clamp(1.6rem, 3vw, 3rem);
  }

  .likeBtn {
    background-color: #24d120;
    width: 16.5vw;
    max-width : 300px;
    height: 24px;
  } 

  .walletImg {
    width: 9vw;
    max-width: 50px;
  }

  .walletAddress {
    font-size: clamp(1.1rem, 1.9vw, 3rem);
  } 

  .infoBox {
    background-color: #f0f4ee;
    font-size: clamp(1rem, 3vw, 1.7rem);
  }

  .otherEntriesText {
    font-size: clamp(1.4rem, 3.5vw, 2rem);
  }

  .cardImg {
    width: 33vw;
    height: 34.1vw;
    max-height: 350px;
  }

  .cardText {
    font-size: clamp(1.5rem, 4.3vw, 3rem);
  }

  .cardVoteNum {
    background-color: #0c5c26;
    border-radius: 7px;
  }

  .cardMediaBottom {
    margin-bottom: 70px;

    @media(min-width:768px){
      margin-bottom: 200px;
    }
  }

  .moreMediaBottom {
    margin-top: 70px;
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