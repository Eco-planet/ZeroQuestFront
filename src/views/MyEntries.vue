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
    :class="myEntries.myEntriesArr.length>10 ? '': 'cardMediaBottom'">
        <!-- 카드1 -->
      <div v-for="(item) in myEntriesOrder.slice(0,moreLimit)" :key="item.idx" class="mt-7 p-5 bg-white">
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
        <!-- 수정,삭제 버튼 -->
        <div class="flex justify-between">
          <svg @click="updataEntryData(item.image, item.title, item.desc, item.idx, item.session_id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          <svg @click="deleteBtn(item.idx)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </div>
      </div>
    </div>
    <!-- 더보기버튼 -->
    <button href="#" 
    v-if="myEntries.myEntriesArr.length >10"
    @click="moreBtn"
    class="
    mt-32
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
import { ref, reactive, onMounted, computed} from 'vue'
import router from "@/router"
import http from "@/api/http"
import { useStore } from 'vuex'

const store = useStore()

const updataEntryData = (entryImage, entryTitle, entryDesc, entryIdx, entrySessionId) => {

  const updataDataSave = {
    entryImage,
    entryTitle,
    entryDesc,
    entryIdx,
    entrySessionId
  }
  store.dispatch('updateEntryInfo',updataDataSave )

  router.push({
    path:'/entryPage',
    name:'entryUpdatePage'
  })
}

const myEntries = reactive({
  myEntriesArr:[]
})

onMounted(()=>{
  battleMyEntry()
})

// myEntry API요청
const battleMyEntry = () => {
  http.get("/api/battle/myEntry")
  .then((response) => {
    myEntries.myEntriesArr = response.data.data;
  })
  .catch((error)=>{
    alert(error)
  })
}

// delete API요청
const deleteBtn = (contents_id) => {
  http.delete(`/api/battle/deleteEntry/${contents_id}`)
  .then((response) => {
    alert("삭제되었습니다")
    // alert("has been deleted")
    battleMyEntry()
  })
  .catch((error) => {
      alert("삭제가 되지 않았습니다. 다시 시도해주세요");
      // alert("There was a problem deleting the item. please try again");
  })
}

const myEntriesOrder = computed(()=>{
  return myEntries.myEntriesArr
})

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
    object-fit: contain;
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