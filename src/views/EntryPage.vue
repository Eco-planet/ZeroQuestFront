<template>
  <div class="flex flex-col justify-center mm">
    <div class="h-8"></div>
    <!-- All Session-->
    <div>    
      <div class="flex pb-4 font-semibold text-4xl">Battle Entry</div>
    </div>
    <!-- 박스 -->
    <div class="mt-2 p-3 w-auto">
      <div class="flex justify-between">
        <div>       
          <p class="font-semibold text-left entryBoxInfo">{{ recentSession?.title }}</p>
          <p class="pb-4 entryBoxInfo text-start">
            <span class="font-semibold">
              Topic : 
            </span>
            {{ recentSession?.topic }}</p>
        </div>
      </div>
      <div class="flex"> 
        <p class="mr-2 entryBoxInfo2">{{ formattedCreatedAt }}</p> ~ 
        <p class="ml-2 entryBoxInfo2">{{ formattedEndAt }}</p>
      </div>
    </div>
    <!-- 사진 -->
    <input id="entryImg" type="file" class="mt-7 hidden" accept="image/*">
    <label type="button" for="entryImg" class="mt-8 flex justify-center border-1 border-gray-300 bg-gray-100">
      <img src="../assets/images/upload.png"/>
    </label>

    <!--info -->
    <div class="text-start"> 
      <div class="pt-4 font-semibold info">Entry New Item</div>
      <div class="pt-2 info1">    
        <div class="font-semibold">File types supported:</div>
        <div>JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF.</div>
      </div>
      <div class="info2">
        <span class="font-semibold">Max Size: </span>
        <span>100MB</span>
      </div>
    </div>
    <!-- nameInput -->
    <div>  
      <div class="pt-9 text-start font-semibold inputNameText">Name</div>
      <input type="text" class="w-full border-solid border-gray-300"/>
    </div>

     <!-- descriptionInput -->
     <div>  
      <div class="pt-9 text-start font-semibold inputNameText">Description</div>
      <textarea type="text" class="w-full h-56 border-solid border-gray-300" placeholder="Description this item."/>
    </div>

    <!--check-->
    <div class="flex pt-4">
      <div class="pr-2 flex items-center">      
        <input type="checkbox" class="border-solid border-gray-300 entryCheckbox"/>
      </div>

      <div class="pl-3 text-start info1">
       The entry of stolen item is against our terms of service and not allowed on ECO NFT. 
       The award of the stolen item can be revoked.
      </div>
    </div>
  
    <!--entry버튼  -->
    <button href="#" 
    class="
    mt-12
    mb-32
    text-xl
    text-white 
    focus:ring-4 
    focus:ring-green-300 
    dark:bg-green-600 
    dark:hover:bg-green-700 
    dark:focus:ring-green-800
    entryBtn"
    >
      <div>Entry</div>
    </button>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router"
import { nowSessionType } from "@/types/IBattleType"
import http from "@/api/http"
import { onMounted, ref, computed } from "vue"

onMounted(()=>{
  battleSession()
})

const recentSession = ref()


//post요청할때 필요 
const sessionId = router.currentRoute.value.params.sessionId


//session 백API 엔드포인트에 get요청하는 함수
const battleSession = () => {
  http.get("/api/battle/session")
  .then((response)=>{
    recentSession.value = response.data.data
  })
}

const formattedCreatedAt = computed(()=>{
  if(recentSession.value && recentSession.value.createdAt){
    const startAt = new Date(recentSession.value.createdAt)

    return startAt.toLocaleDateString ()
  }
})

const formattedEndAt = computed(()=>{
  if(recentSession.value && recentSession.value.period){
    const endAt = new Date(recentSession.value.period)
    console.log("session",recentSession.value.idx)

    return endAt.toLocaleDateString ()
  }
})
</script>

<style lang="scss" scoped>
  .entryBoxInfo {
    font-size: clamp(1.2rem, 2vw, 2rem);
  }

  .entryBoxInfo2 {
    font-size: clamp(1rem, 2vw, 2rem);
  }

  .info {
    font-size: clamp(1.6rem, 2.5vw, 2.5rem);
  }

  .info1 {
    font-size: clamp(1.2rem, 1.9vw, 2.1rem);
  }

  .inputNameText {
    font-size: clamp(1.4rem, 2.5vw, 2.3rem);
  }

  .entryCheckbox {
    transform: scale(1.5);
  }

  .entryBtn {
    background-color: #24d120;
    height: 30px;
    border-radius: 7px;
  } 
</style>