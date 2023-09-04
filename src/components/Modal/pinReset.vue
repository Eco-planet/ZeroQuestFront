<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-opacity-50 bg-gray-900 transition-opacity"></div>
    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div class="p-5 relative transform overflow-hidden bg-white shadow-xl transition-all">
          <div class="bg-white px-4 pb-4">
            <div class="flex justify-end text-4xl font-bold" @click="modalClose">x</div>
            <div class="mb-10 text-center">
              <h3 class="mt-4 font-semibold text-black voteText" id="modal-title">출금 비밀번호 초기화</h3>
            </div>
            <div class="py-3 bg-gray-100 rounded-lg">인증코드 요청 시 <br>
              현재 로그인 된 구글 메일로 <br>
              임의로 생성된 인증번호를 전송합니다.
            </div>
            <button 
            type="button" 
            class="
            moduleBtnBg
            mb-16
            text-white 
            hover:bg-green-800 
            focus:outline-none 
            focus:ring-4 
            focus:ring-green-300 
            font-medium
            text-sm 
            rounded-lg
            mt-4
            w-full
            h-16
            text-2xl
            text-center 
            dark:bg-green-600 
            dark:hover:bg-green-700 
            dark:focus:ring-green-800"
            @click="codeRequest"
            >
            인증코드 요청
            </button>
            <div class="font-bold text-xl">인증번호를 아래에 입력하세요</div>
            <input type="text" v-model.trim="certificationNumber" class="rounded-lg border-solid" placeholder="인증번호 입력">
            <button type="button" 
            class="
            mb-16
            text-white 
            bg-red-400
            hover:bg-green-800 
            focus:outline-none 
            focus:ring-4 
            focus:ring-green-300 
            font-medium
            text-sm 
            rounded-lg
            mt-4
            w-full
            h-16
            text-2xl
            text-center 
            dark:bg-green-600 
            dark:hover:bg-green-700 
            dark:focus:ring-green-800"
            @click="resetRequest"
            >
            초기화 요청
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useStore } from "vuex"
import http from "@/api/http"

const store = useStore()
const userEmail = computed(() => store.getters["auth/getUserEmail"])

const certificationNumber = ref()
const md5Hash = ref()

// const modalBool = computed(() => store.getters["auth/getModalBool"])

//인증코드요청
const codeRequest = () => {
  http.post("/auth/signStart",{ email: userEmail.value })
    .then((response) => {
      md5Hash.value = response.data.data
      alert("인증코드가 전송되었습니다")
  })
  .catch((error) => {
    alert(error)
  })
}

//초기화요청검증
const resetRequest = () => {
  if(!md5Hash.value){
    alert("인증코드 요청을 먼저 진행해주세요")
  }else if(!certificationNumber.value){
    alert("인증번호를 입력해주세요")
  }else if(md5Hash.value && certificationNumber.value){
    http.post("/auth/signVerify", {
    verifyToken: md5Hash.value,
    verifyCode: certificationNumber.value

    })
    .then((response) => {
  
      if(response && response.data){
        console.log("response",response.data.data)
        //스토어에 해쉬, 인증번호 넣어주고 비밀번호 입력모달에서 가져와서 쓰기
        store.dispatch("auth/pwHash", md5Hash.value)
        store.dispatch("auth/pwNumber", certificationNumber.value)
        console.log("스토어 디스패치됬니")
        //
        store.state.popupType = 'withdraw_pass_update';
    
        console.log("withdraw_pass팝업")
        store.state.isPopup = true;
        console.log("팝업 트루")
      }
    })
    .catch((error) => {
      alert("인증번호를 확인후 다시입력해주세요")
    })
  }
}

const emit = defineEmits(['modalClose'])

const modalClose = () => {
  emit("modalClose",false);
}

</script>

<style lang="scss" scoped>

.voteText {
  font-size: clamp(1.7rem, 2.5vw, 2.5rem);
}
.VoteBtn {
  background-color: #24d120;
  width: 34vw;
  max-width : 180px;
  height: 30px;
} 

.moduleBtnBg{
  background-color: #31847F;
}
</style>