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
            {{ recentSession?.topic }}
          </p>
        </div>
      </div>
      <div class="flex">
        <p class="mr-2 entryBoxInfo2">{{ date(recentSession?.createdAt) }}</p> ~
        <p class="ml-2 entryBoxInfo2">{{ date(recentSession?.period) }}</p>
      </div>
    </div>
    <!-- 사진 -->
    <input id="entryImg" type="file" class="mt-7 hidden" accept="image/*" @change="handleFileValue" />
    <label type="button" for="entryImg" class="mt-8 flex justify-center border-1 border-gray-300 bg-gray-100">
      <img v-if="!imagePreviewUrl" src="../assets/images/upload.png" />
      <img v-if="imagePreviewUrl" :src="imagePreviewUrl" />
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
        <span>10MB</span>
      </div>
    </div>
    <!-- nameInput -->
    <div>
      <div class="pt-9 text-start font-semibold inputNameText">Name</div>
      <input type="text" class="w-full border-solid border-gray-300" v-model.trim="titleValue" />
    </div>

    <!-- descriptionInput -->
    <div>
      <div class="pt-9 text-start font-semibold inputNameText">Description</div>
      <textarea type="text" class="w-full h-56 border-solid border-gray-300" v-model.trim="descValue"
        placeholder="Description this item." />
    </div>

    <!--check-->
    <div class="flex pt-4">
      <div class="pr-2 flex items-center">
        <input id="entryCheck" type="checkbox" class="border-solid border-gray-300 entryCheckbox"
          v-model="checkboxValue" />
        <label for="entryCheck" class="pl-3 text-start info1">
          {{ t("message.battleEntry") }}
        </label>
      </div>
    </div>

    <!--entry버튼  -->
    <button href="#" class="
    mt-12
    mb-32
    text-xl
    text-white 
    focus:ring-4 
    focus:ring-green-300 
    entryBtn" 
    @click="enrollmentBtn">
      <div v-if="sessionId">Entry</div>
      <div v-else>Edit</div>

    </button>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router"
import http from "@/api/http"
import { computed, onMounted, ref } from "vue"
import { useRoute } from 'vue-router'
import store from "@/store"
import { useI18n } from "vue-i18n";

const { t } = useI18n();

//post요청할때 필요 
const route = useRoute()
const sessionId = ref(route.params.sessionId)
const entryIdx = computed(() => store.getters.updateEntryInfo.entryIdx)

const entrySessionId = computed(() => store.getters.updateEntryInfo.entrySessionId)

onMounted(() => {
  battleSession()
})

const recentSession = ref()

//session 백API 엔드포인트에 get요청하는 함수
const battleSession = () => {
  http.get("/api/battle/session")
    .then((response) => {
      recentSession.value = response.data.data
    })
    .catch((error) => {
      alert(error)
    })
}

const date = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString();
}

//input
const imageValue = ref('')

const imagePreviewUrl = ref('')
const originalImage = store.getters.updateEntryInfo.entryImage
imageValue.value = originalImage
imagePreviewUrl.value = originalImage

const handleFileValue = ((event) => {
  imageValue.value = event.target.files[0]

  const maxSize = 10 * 1024 * 1024; // 10MB, adjust as needed

  if (imageValue.value) {
      if (imageValue.value.size > maxSize) {
          alert(t("message.entryPage1"))
          
          imagePreviewUrl.value = undefined; // clear the preview URL
          return; // exit the function early
      } 
  }

  //선택한 파일의 내용을 읽는데 도움을 주는 js 웹 API의 일부, 객체
  let reader = new FileReader()

  //만약 imageValue에 값이 있다는것은 파일이 선택되었다는거
  if (imageValue.value) {
    //readAsDataURL는 FileReader에 정의된 매서드이다
    //지정된 file을 읽고 데이터url을 반환한다.
    reader.readAsDataURL(imageValue.value)
  } else if (imageValue.value === undefined) {
    imagePreviewUrl.value = undefined
  }

  // 다음 코드가 성공적으로 실행되어서 ( reader.readAsDataURL(imageValue.value))
  //파일을 성공적으로 읽었으면 객체에 정의된 onload이벤트가 실행되서 
  //onload에 할당된 함수가 호출된다 
  //그함수는 event.target.result를 통해 위에서 반환된 url에 접근할수 있다
  reader.onload = (event) => {
    imagePreviewUrl.value = event.target.result
  }


})


const titleValue = ref('')
const originalTitle = store.getters.updateEntryInfo.entryTitle 
titleValue.value = originalTitle

const descValue = ref('')
const originalDesc = store.getters.updateEntryInfo.entryDesc
descValue.value = originalDesc

const checkboxValue = ref(true)

const enrollmentBtn = (() => {
  if (sessionId.value) {
    //entryAdd코드
    if (!titleValue.value || !descValue.value || checkboxValue.value === false || !imageValue.value) {
      alert(t("message.entryPage2"))
      return

    } else if (titleValue.value && descValue.value && checkboxValue.value && imageValue.value) {

      const formData = new FormData();
      formData.append('image', imageValue.value)
      formData.append('title', titleValue.value)
      formData.append('desc', descValue.value)
      formData.append('session_id', Number(sessionId.value))

      http.post("/api/battle/entry", formData)
        .then((response) => {
          alert(t("message.entryPage3"))
          router.push({
            path: '/battle',
            name: 'battle'
          })
        })
        .catch((error) => {
          alert(error)
        })
    }
  } else {
    //entryUpdate코드

    //필드를 안채웠을경우
    if (!titleValue.value || !descValue.value || checkboxValue.value === false || !imageValue.value) {
      alert(t("message.entryPage2"))
      return

      //수정하러들어왔지만 수정하지않고 그냥 나가는 경우 
    } else if(titleValue.value  === originalTitle
    && descValue.value === originalDesc
    && checkboxValue.value 
    && imageValue.value === originalImage){
 
      router.push({
        path: '/myEntry',
        name: 'myEntry'
      })

    //필드는 채웠지만 idx, sessionID가 없는경우 
    }else if (!entryIdx.value || !entrySessionId.value){
      console.log("idx, sessionId가 없네")
      return 

      //필드도 채웠고 idx, sessionID도 었는 경우
    } else if (titleValue.value 
    && descValue.value 
    && checkboxValue.value
    && imageValue.value
    && entryIdx.value
    && entrySessionId.value
    ) {
      const formData = new FormData();
      formData.append('image', imageValue.value)
      formData.append('title', titleValue.value)
      formData.append('desc', descValue.value)

      http.post(`/api/battle/editEntry/${entryIdx.value}/${entrySessionId.value}`, formData)
        .then((response) => {
          alert(t("message.entryPage4"))
          router.push({
            path: '/myEntry',
            name: 'myEntry'
          })
        })
        .catch((error) => {
          alert(error.response.data.message)
        })
    }
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

  @media(min-width:390px) {
    margin-bottom: 200px;
  }
}
</style>